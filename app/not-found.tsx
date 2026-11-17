import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <div className="px-4 sm:px-6 py-24">
      <div className="max-w-lg mx-auto">
        <PageHeader
          eyebrow="404"
          title="Page not found"
          description="That page doesn’t exist, or it moved. Here’s where to go instead."
          centered
        />
        <div className="flex flex-wrap justify-center gap-6">
          <Button href="/" variant="primary">Back home</Button>
          <Button href="https://discord.gg/7QctqCABR" external variant="secondary">
            Join our Discord
          </Button>
        </div>
      </div>
    </div>
  );
}
