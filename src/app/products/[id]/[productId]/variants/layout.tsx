import type { Metadata } from "next";
import { fetchVariants, ProductSeriesVariants } from "@/api/useProductVariants";
import { fetchProductDetail } from "@/api/useProductDetail";
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
    // Handled below.
  }
  // No models in the API for this product (e.g. economical-sanitary-ball-valve):
  // the page has nothing on it, so keep it out of search results and point at
  // the product page. Its own title stops it duplicating the product's.
  if (!data || data.variants.length === 0) {
    const productUrl = await canonicalProductPath(id, productId);
    const name = await fetchProductDetail(productId).then((d) => d.name).catch(() => null);
    return {
      title: fitBrandTitle(`${name ?? "MARS Ball Valve"} — All Models`),
      robots: { index: false, follow: true },
      alternates: { canonical: productUrl },
    };
  }

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
