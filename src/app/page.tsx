import Hero from "./Landing/HeroComponent";
import MarsSection from "./Landing/MarsSection";
import MarsStats from "./Landing/MarsStats";
import ContactCTA from "./Landing/ContactCTA";
import TrustBar from "./Landing/TrustBar";
import ProcessSection from "./Landing/ProcessSection";
import DistributorComparison from "./Landing/DistributorComparison";
import FAQSection from "./Landing/FAQSection";
import ValuePropBanner from "./Landing/ValuePropBanner";
import ProductRangeSections from "./products/components/ProductRangeSections";
import { HOME_FAQS } from "./Landing/homeFaqs";
import { JsonLd } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
// TestimonialsSection intentionally not rendered: it still contains placeholder
// ("REPLACE — real customer quote goes here") entries. Re-add <TestimonialsSection/>
// below only once TESTIMONIALS in that file holds real, named customer quotes.

const TITLE = "Ball Valve and Industrial Valves Manufacturer in the UK - Mars Valve";
const DESCRIPTION =
  "Authorised UK distributor of MARS ball valves from Mars Valve Co., Taiwan. 2-piece, 3-piece, flanged, sanitary and fire-safe ranges. Prices online.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: TITLE },
  description: DESCRIPTION,
  // Page-level openGraph/twitter replace the root layout's objects wholesale,
  // so the shared fields are repeated here.
  openGraph: {
    type: "website",
    siteName: "Mars Valvenok",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// Organization schema lives in the root layout (site-wide); FAQPage is
// homepage-only.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.text },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Hero/>
      {/* Same series + categories sections as /products. */}
      <ProductRangeSections />
      {/* Section backgrounds alternate white / cream down the page, with the
          two orange bands (ValuePropBanner, MarsStats) as accents. */}
      <ValuePropBanner/>
      <TrustBar/>
      <MarsSection/>
      <MarsStats/>
      <FAQSection id="faq" faqs={HOME_FAQS.map(({ q, a }) => ({ q, a }))} />
      <ContactCTA/>
    </>
  );
}
