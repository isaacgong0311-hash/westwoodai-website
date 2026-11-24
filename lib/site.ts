// Single source of truth for the site's canonical URL.
// Update this if the club gets a custom domain (see README.md "Adding a custom domain").
export const SITE_URL = "https://westwoodai-website2.vercel.app";

// Every outside link the club uses, defined once. Discord is the
// tinyurl.com/aicord short link (the one on the slides and the old Google
// Site), so officers can change the invite without touching code.
export const LINKS = {
  interestForm: "https://forms.gle/m1a5LrzEBHhacpbg6",
  discord: "https://tinyurl.com/aicord",
  instagram: "https://www.instagram.com/warriorai/",
  github: "https://github.com/westwoodai",
} as const;
