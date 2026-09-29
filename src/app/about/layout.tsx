import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  alternates: { canonical: "/about" },
  description:
    "Mars Valvenok is an authorised UK distributor of Mars Valve Co., Ltd., supplying genuine MARS® industrial ball valves for oil & gas, water treatment, chemical processing and power generation.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
