import type { Metadata } from "next";

// The page itself is a Client Component ("use client"), which cannot export
// metadata — so this server layout supplies /mars-brand its own title instead
// of letting it fall back to the site-wide default (which collided with the
// homepage title). Purely additive: it just wraps the page in children.
export const metadata: Metadata = {
  title: "About the MARS Valve Brand",
  description:
    "Who MARS is, why we supply only genuine MARS valves, and what authorised UK distribution means for quality, traceability and warranty.",
  alternates: { canonical: "/mars-brand" },
  openGraph: {
    type: "website",
    siteName: "Mars Valvenok",
    title: "About the MARS Valve Brand | Mars Valvenok",
    description:
      "Who MARS is, why we supply only genuine MARS valves, and what authorised UK distribution means for quality, traceability and warranty.",
    url: "/mars-brand",
  },
};

export default function MarsBrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
