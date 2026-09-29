import FeaturedProducts from "./Landing/FeaturedProducts/FeaturedProducts";
import Hero from "./Landing/HeroComponent";
import MarsSection from "./Landing/MarsSection";
import IndustriesSection from "./Landing/FeaturedProducts/IndustriesSection";
import MarsStats from "./Landing/MarsStats";
import ContactCTA from "./Landing/ContactCTA";
import TrustBar from "./Landing/TrustBar";
import ProcessSection from "./Landing/ProcessSection";
import DistributorComparison from "./Landing/DistributorComparison";
import FAQSection from "./Landing/FAQSection";
import ValuePropBanner from "./Landing/ValuePropBanner";
import type { Metadata } from "next";
// TestimonialsSection intentionally not rendered: it still contains placeholder
// ("REPLACE — real customer quote goes here") entries. Re-add <TestimonialsSection/>
// below only once TESTIMONIALS in that file holds real, named customer quotes.

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: {
    absolute: "MARS Ball Valves UK — Authorised Distributor | Mars Valvenok",
  },
};

export default function Home() {
  return (
    <>
      <Hero/>
      <TrustBar/>
      <MarsSection/>
      <DistributorComparison/>
      <ValuePropBanner/>
      <FeaturedProducts/>
      <ProcessSection/>
      <IndustriesSection/>
      <MarsStats/>
      <FAQSection/>
      <ContactCTA/>
    </>
  );
}
