import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery & Returns",
  description:
    "Delivery timeframes, shipping costs, and our 30-day returns policy for Mars Valves orders.",
};

export default function DeliveryReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
