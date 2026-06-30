import Navbar from "@/Common/Navbar/Navbar";
import FeaturedProducts from "./Landing/FeaturedProducts/FeaturedProducts";
import Hero from "./Landing/HeroComponent";
import MarsSection from "./Landing/MarsSection";
import IndustriesSection from "./Landing/FeaturedProducts/IndustriesSection";
import MarsStats from "./Landing/MarsStats";
import ContactCTA from "./Landing/ContactCTA";
import Footer from "@/Common/Footer/Footer";
export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <MarsSection/>
      <FeaturedProducts/>
      <IndustriesSection/>
      <MarsStats/>
      <ContactCTA/>
      <Footer/>
    </>
  );
}
