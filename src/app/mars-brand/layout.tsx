import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/mars-brand" },
  title: {
    absolute:
      "Mars Valves: Genuine industrial valve supplier and distributers- Mars valve",
  },
  description:
    "Official authenticity and anti-counterfeit notice from MARS® — how to verify genuine MARS ball valves and buy from an authorised industrial valve supplier and distributor.",
};

export default function MarsBrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
