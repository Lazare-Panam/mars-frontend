import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the items in your MarsValvenok cart.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
