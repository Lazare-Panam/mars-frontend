import FeaturedProducts from "./Landing/FeaturedProducts/FeaturedProducts";
import Hero from "./Landing/HeroComponent";
import MarsSection from "./Landing/MarsSection";
import IndustriesSection from "./Landing/FeaturedProducts/IndustriesSection";
import MarsStats from "./Landing/MarsStats";
import ContactCTA from "./Landing/ContactCTA";
export default function Home() {
  return (
    <>
      <Hero/>
      <MarsSection/>
      <FeaturedProducts/>
      <IndustriesSection/>
      <MarsStats/>
      <ContactCTA/>
    </>
  );
}
