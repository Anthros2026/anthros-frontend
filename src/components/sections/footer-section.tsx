import { Footer } from "@/components/ui";
import { siteContent } from "@/data/site-content";

export function FooterSection() {
  const content = siteContent.footer;

  return (
    <Footer
      columns={content.columns}
      bottomText={content.bottomText}
    />
  );
}
