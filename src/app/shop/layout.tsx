import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our range of industrial ball valves, all in stock with fast dispatch.",
};

export default function ShopLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}