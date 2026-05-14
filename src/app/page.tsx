import { TechnicalGrid } from "@/components/ui";
import {
  Header,
  Hero,
  PainSection,
  Services,
  Process,
  Benefits,
  OfferCta,
  FooterSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <TechnicalGrid />
      <Header />
      <Hero />
      <PainSection />
      <Services />
      <Process />
      <Benefits />
      <OfferCta />
      <FooterSection />
    </>
  );
}
