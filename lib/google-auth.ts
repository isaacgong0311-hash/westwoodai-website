// Access tokens for a Google Cloud service account, via the standard
// signed-JWT exchange (https://developers.google.com/identity/protocols/oauth2/service-account).
// Done by hand with node:crypto rather than pulling in google-auth-library
// for one request. Server-only: reads the key from a non-NEXT_PUBLIC env var.
import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

/** The parsed GOOGLE_SERVICE_ACCOUNT_KEY (the JSON file Google Cloud gives you), or null if unset. */
function serviceAccountKey(): ServiceAccountKey | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  const key = JSON.parse(raw) as Partial<ServiceAccountKey>;
  if (!key.client_email || !key.private_key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is missing client_email or private_key");
  }
  return { client_email: key.client_email, private_key: key.private_key };
}

const base64url = (value: string) => Buffer.from(value).toString("base64url");

/** A one-hour access token for the given scope, or null if no service account is configured. */
export async function getServiceAccountToken(scope: string): Promise<string | null> {
  const key = serviceAccountKey();
  if (!key) return null;

  const now = Math.floor(Date.now() / 1000);
  const unsigned = [
    base64url(JSON.stringify({ alg: "RS256", typ: "JWT" })),
    base64url(JSON.stringify({ iss: key.client_email, scope, aud: TOKEN_URL, iat: now, exp: now + 3600 })),
  ].join(".");
  const signature = createSign("RSA-SHA256").update(unsigned).sign(key.private_key, "base64url");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error_description?: string } | null;
    throw new Error(`Google token exchange returned ${res.status}: ${body?.error_description ?? "no details"}`);
  }
  return ((await res.json()) as { access_token: string }).access_token;
}
