import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for a Credit Line",
  description:
    "Apply for a trade credit line with Mars Valvenok. Submit your company and contact details and our team will review your application.",
  alternates: { canonical: "/credit-application" },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CreditApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
