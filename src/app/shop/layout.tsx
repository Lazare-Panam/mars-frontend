import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Shop MARS Ball Valves",
  description:
    "Shop MARS industrial ball valves online: prices for standard items, trade accounts, and quotes for projects from an authorised UK distributor.",
};

export default function ShopLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}