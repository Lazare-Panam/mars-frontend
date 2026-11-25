import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing use of the Kronox Valves website, orders, quotations, payment, delivery and credit accounts.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
