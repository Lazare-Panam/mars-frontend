import type { Metadata } from "next";
import { JsonLd } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "About Kronox Valves | Industrial Ball Valve Manufacturer",
  },
  alternates: { canonical: "/about" },
  description:
    "Kronox Valves manufactures industrial ball valves — the Kronox brand of Valvenok Ltd, supplied from UK stock with full documentation.",
};

// The page is a Client Component, so its schema lives here in the layout.
// It refers to the site-wide Organization node defined in the root layout.
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Kronox Valves",
  url: `${SITE_URL}/about`,
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: { "@id": `${SITE_URL}/#organization` },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={aboutSchema} />
      {children}
    </>
  );
}
