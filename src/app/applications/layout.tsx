import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "See where MARS ball valves are used: oil & gas, chemical processing, general machinery, power generation, and marine applications.",
};

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
