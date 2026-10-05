import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/mars-brand" },
  title: {
    absolute:
      "Genuine MARS® Valves — Authenticity Notice | Mars Valvenok",
  },
  description:
    "Official MARS® authenticity and anti-counterfeit notice: how to verify genuine MARS ball valves and buy from an authorised UK distributor.",
};

export default function MarsBrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
