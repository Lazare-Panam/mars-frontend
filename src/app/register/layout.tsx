import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account with Kronox Valves.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
