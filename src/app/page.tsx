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
import TestimonialsSection from "./Landing/TestimonialsSection";
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
      <TestimonialsSection/>
      <FAQSection/>
      <ContactCTA/>
    </>
  );
}
