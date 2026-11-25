import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/mars-brand" },
  title: {
    absolute: "The Kronox Brand | Genuine Industrial Ball Valves",
  },
  description:
    "Kronox Valves is the industrial ball valve brand of Valvenok Ltd. Genuine Kronox valves, UK stock and full documentation — and how to verify authentic Kronox product.",
};

export default function MarsBrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
