import PageHeader from "@/components/ui/PageHeader";
import GoogleEmbed from "@/components/content/GoogleEmbed";
import { LINKS } from "@/lib/site";

export const metadata = {
  title: "Member Attendance — Westwood AI Club",
  description: "The Westwood AI Club member attendance sheet.",
};

export default function AttendancePage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          eyebrow="Members"
          title="Member attendance"
          description="Check which meetings you've been marked present for. If something looks wrong, let an officer know at the next meeting or on Discord."
        />
        <GoogleEmbed
          src={`${LINKS.attendanceSheet}/htmlembed`}
          href={LINKS.attendanceSheet}
          title="Member attendance spreadsheet"
          linkLabel="Open the attendance spreadsheet in Google Sheets"
          aspect="h-[70vh]"
        />
      </div>
    </div>
  );
}
