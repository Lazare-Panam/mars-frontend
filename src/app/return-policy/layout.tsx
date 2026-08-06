import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns Policy",
  description:
    "Our returns policy: 30-day return window, faulty goods process, and how to start a return.",
};

export default function ReturnsPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
