import Link from "next/link";
import type { ReactNode } from "react";

// Homepage FAQ (build sheet block 11). Kept out of the "use client" FAQSection
// so the server page can read the plain-text answers for the FAQPage schema.

const linkStyle = { color: "inherit", fontWeight: 600 } as const;

/** `a` is what the accordion shows; `text` is the same answer for JSON-LD. */
export const HOME_FAQS: { q: string; a: ReactNode; text: string }[] = [
  {
    q: "Are Kronox valves genuine?",
    text: "Yes. Kronox Valves supplies genuine Kronox ball valves from UK stock, with full certificates and datasheets for the series you order.",
    a: "Yes. Kronox Valves supplies genuine Kronox ball valves from UK stock, with full certificates and datasheets for the series you order.",
  },
  {
    q: "Which Kronox valves are fire-safe to API 607?",
    text: "Fire-safe testing applies to specific series, including Series 28, 83, 88, 90, 90D and 91D. Tell us your application and we'll confirm the right series and send the certificate.",
    a: "Fire-safe testing applies to specific series, including Series 28, 83, 88, 90, 90D and 91D. Tell us your application and we'll confirm the right series and send the certificate.",
  },
  {
    q: "Do you supply custom sizes or non-standard specs?",
    text: "Yes. Send us your size, pressure rating, end connection and material, and we'll confirm availability and pricing.",
    a: (
      <>
        Yes.{" "}
        <Link href="/contact" style={linkStyle}>
          Send us your requirements
        </Link>{" "}
        (size, pressure rating, end connection and material) and we&apos;ll
        confirm availability and pricing.
      </>
    ),
  },
  {
    q: "Is there a minimum order quantity?",
    text: "No minimum for standard catalogue items. Custom or non-stock configurations may carry an MOQ, which we'll flag up front.",
    a: "No minimum for standard catalogue items. Custom or non-stock configurations may carry an MOQ, which we'll flag up front.",
  },
  {
    q: "Do you ship internationally?",
    text: "No. Kronox Valves supplies customers in the United Kingdom only.",
    a: "No. Kronox Valves supplies customers in the United Kingdom only.",
  },
  {
    q: "What certifications come with each valve?",
    text: "It depends on the series. Fire-safe series carry API 607 certification. We send the certificates for the series you order.",
    a: "It depends on the series. Fire-safe series carry API 607 certification. We send the certificates for the series you order.",
  },
  {
    q: "What's your returns and warranty policy?",
    text: "Unused valves in original packaging can be returned within 30 days. Products carry the Kronox manufacturer warranty.",
    a: "Unused valves in original packaging can be returned within 30 days. Products carry the Kronox manufacturer warranty.",
  },
];
