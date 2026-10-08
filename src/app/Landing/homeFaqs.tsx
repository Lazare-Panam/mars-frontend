import Link from "next/link";
import type { ReactNode } from "react";

// Homepage FAQ (build sheet block 11). Kept out of the "use client" FAQSection
// so the server page can read the plain-text answers for the FAQPage schema.

const LETTER_URL =
  "https://pblol2.blob.core.windows.net/mars-valves/home/Trust-Certfilicate.jpeg";

const linkStyle = { color: "inherit", fontWeight: 600 } as const;

/** `a` is what the accordion shows; `text` is the same answer for JSON-LD. */
export const HOME_FAQS: { q: string; a: ReactNode; text: string }[] = [
  {
    q: "Are you an authorised MARS distributor?",
    text: "Yes. Mars Valvenok is an authorised UK distributor of Mars Valve Co., Ltd., Taiwan. You can view our letter of authorisation from Mars Valve Co.",
    a: (
      <>
        Yes. Mars Valvenok is an authorised UK distributor of Mars Valve Co.,
        Ltd., Taiwan. You can view our{" "}
        <a href={LETTER_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
          letter of authorisation
        </a>{" "}
        from Mars Valve Co.
      </>
    ),
  },
  {
    q: "Which MARS valves are fire-safe to API 607?",
    text: "Fire-safe testing applies to specific series, including Series 28, 83, 88, 90, 90D and 91D. Tell us your application and we'll confirm the right series and send the certificate.",
    a: "Fire-safe testing applies to specific series, including Series 28, 83, 88, 90, 90D and 91D. Tell us your application and we'll confirm the right series and send the certificate.",
  },
  {
    q: "Do you supply custom sizes or non-standard specs?",
    text: "Yes. Send us your size, pressure rating, end connection and material, and we'll work with Mars Valve Co. to confirm availability and pricing.",
    a: (
      <>
        Yes.{" "}
        <Link href="/contact" style={linkStyle}>
          Send us your requirements
        </Link>{" "}
        (size, pressure rating, end connection and material) and we&apos;ll work
        with Mars Valve Co. to confirm availability and pricing.
      </>
    ),
  },
  {
    q: "Is there a minimum order quantity?",
    text: "No minimum for standard catalogue items. Custom or non-stock configurations may carry a manufacturer MOQ, which we'll flag up front.",
    a: "No minimum for standard catalogue items. Custom or non-stock configurations may carry a manufacturer MOQ, which we'll flag up front.",
  },
  {
    q: "Do you ship internationally?",
    text: "No. We're an authorised MARS distributor for the United Kingdom, so we supply customers in the UK only.",
    a: "No. We're an authorised MARS distributor for the United Kingdom, so we supply customers in the UK only.",
  },
  {
    q: "What certifications come with each valve?",
    text: "It depends on the series. Fire-safe series carry API 607 certification. We send the certificates for the series you order.",
    a: "It depends on the series. Fire-safe series carry API 607 certification. We send the certificates for the series you order.",
  },
  {
    q: "What's your returns and warranty policy?",
    text: "Unused valves in original packaging can be returned within 30 days. Products carry the Mars Valve Co. manufacturer warranty.",
    a: "Unused valves in original packaging can be returned within 30 days. Products carry the Mars Valve Co. manufacturer warranty.",
  },
];
