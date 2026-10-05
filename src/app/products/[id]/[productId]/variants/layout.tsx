import type { Metadata } from "next";
import { canonicalProductPath } from "@/lib/canonicalCategory";

type Props = {
  params: Promise<{ id: string; productId: string }>;
  children: React.ReactNode;
};

// The models table is its own indexable page (it links every variant), so it
// needs its own canonical; otherwise it inherits the product page's canonical
// from the parent layout and reads as a duplicate of it.
export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { id, productId } = await params;
  return {
    alternates: { canonical: `${await canonicalProductPath(id, productId)}/variants` },
  };
}

export default function VariantsLayout({ children }: Props) {
  return children;
}
