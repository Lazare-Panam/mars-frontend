import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description:
    "How Valvenok Ltd (Mars Valvenok) collects, uses and protects your personal data when you use our website, place orders or apply for a credit account.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
