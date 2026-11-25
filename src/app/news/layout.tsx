import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Technical Guides",
  description:
    "Technical guides and updates on Kronox ball valves — actuation, fire-safe certification, materials and valve selection.",
  alternates: { canonical: "/news" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
