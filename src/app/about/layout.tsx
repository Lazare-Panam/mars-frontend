import type { Metadata } from "next";
import { JsonLd } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "About Mars Valvenok | Authorised UK MARS Valve Distributor",
  },
  alternates: { canonical: "/about" },
  description:
    "Mars Valvenok is the MARS valve website of Valvenok Ltd, authorised by Mars Valve Co., Ltd. of Taiwan to supply genuine MARS ball valves in the UK.",
};

// The page is a Client Component, so its schema lives here in the layout.
// It refers to the site-wide Organization node defined in the root layout.
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Mars Valvenok",
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
