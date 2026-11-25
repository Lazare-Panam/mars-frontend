import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/delivery-information" },
  title: "Delivery & Returns",
  description:
    "Delivery timeframes, UK stock and factory lead times, shipping costs, and our 30-day returns policy for Kronox valve orders.",
};

export default function DeliveryReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
