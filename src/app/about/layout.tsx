import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MarsValvenok designs, manufactures, and quality-controls MARS® industrial ball valves for oil & gas, water treatment, chemical processing, and power generation.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
