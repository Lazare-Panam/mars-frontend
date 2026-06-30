import Navbar from "@/Common/Navbar/Navbar";
import FeaturedProducts from "./Landing/FeaturedProducts/FeaturedProducts";
import Hero from "./Landing/HeroComponent";
export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <FeaturedProducts/>
    </>
  );
}
