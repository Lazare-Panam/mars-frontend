import type { Metadata } from "next";
import { fetchVariants, ProductSeriesVariants } from "@/api/useProductVariants";
import { canonicalProductPath } from "@/lib/canonicalCategory";
import { fitBrandTitle } from "@/lib/seoTitle";
import { firstThatFits, modelsDescription } from "@/lib/seoDescription";

type Props = {
  params: Promise<{ id: string; productId: string }>;
  children: React.ReactNode;
};

// The models table is its own indexable page (it links every variant), so it
// needs its own canonical, title and description; otherwise it inherits the
// product page's and SE Ranking flags them as duplicates.
export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { id, productId } = await params;
  const canonical = `${await canonicalProductPath(id, productId)}/variants`;

  let data: ProductSeriesVariants | null = null;
  try {
    data = await fetchVariants(productId);
  } catch {
    // No variants record: keep the canonical, inherit the rest.
  }
  if (!data) return { alternates: { canonical } };

  const base = firstThatFits([`${data.name} — All Models`, `${data.name} Models`, data.name]);
  const description = modelsDescription(data.name, data.variants.length);
  return {
    title: fitBrandTitle(base),
    description,
    alternates: { canonical },
    openGraph: { title: base, description, url: canonical },
  };
}

export default function VariantsLayout({ children }: Props) {
  return children;
}
