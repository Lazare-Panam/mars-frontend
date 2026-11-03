import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/mars-brand" },
  title: {
    absolute: "MARS Valves Distributor UK | Authorised – Mars Valvenok",
  },
  description:
    "Mars Valvenok is an authorised UK distributor of genuine MARS® ball valves. See our letter of authorisation and how to verify authentic MARS valves.",
};

export default function MarsBrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
