import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Shop Kronox Ball Valves",
  description:
    "Shop Kronox industrial ball valves online: prices for standard items, trade accounts, and quotes for projects, direct from the manufacturer.",
};

export default function ShopLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}