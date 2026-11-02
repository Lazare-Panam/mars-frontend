import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/cookie-policy" },
  title: "Cookie Policy",
  description:
    "What cookies the Mars Valvenok website uses, why we use them, and how you can manage or disable them.",
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
