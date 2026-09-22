import type { Metadata } from "next";
import { fetchVariants, ProductSeriesVariants } from "@/api/useProductVariants";
import { canonicalCategoryFor } from "@/lib/canonicalCategory";
import { SITE_URL } from "@/lib/site";
import { variantTitleParts } from "@/lib/variantTitle";
import { fitBrandTitle } from "@/lib/seoTitle";

type MetadataProps = {
  params: Promise<{ id: string; productId: string; sku: string }>;
};
type LayoutProps = {
  params: Promise<{ id: string; productId: string; sku: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { id, productId, sku } = await params;

  let data: ProductSeriesVariants | null = null;
  try {
    data = await fetchVariants(productId);
  } catch (err) {
    // 404 = product has no variants; expected, so keep the build log quiet.
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status !== 404) {
      console.error(
        `[generateMetadata] fetchVariants(${productId}) failed (status ${status ?? "?"})`,
      );
    }
  }

  const variant = data?.variants.find((v) => v.id === sku);

  if (!data || !variant) {
    return { title: data?.name ?? "Mars Valvenok" };
  }

  const { detail, name } = variantTitleParts(data, sku);
  const readable = detail ? `${detail} — ${name}` : name;
  // Keep the <title> within the ~65-char SERP guideline. For very long,
  // multi-attribute variants (the V88 family) drop the product name so the
  // unique distinguishing specs still fit; fitBrandTitle then drops the brand
  // suffix when the result still wouldn't fit with it appended.
  const metaTitle = fitBrandTitle(
    readable.length > 65 && detail ? detail : readable,
  );
  const specSummary = Object.entries(variant.specs)
    .filter(([k]) => k !== "SKU" && k !== "Price")
    .map(([, v]) => v)
    .join(", ");
  const description = specSummary
    ? `${data.name} — ${specSummary}. SKU: ${variant.id}.`
    : `${data.name}, SKU: ${variant.id}.`;
  const ogImage = variant.thumbnailImage || data.thumbnailImage;

  // Point every variant URL at its product's real subcategory so the duplicate
  // reachable under the umbrella "ball-valves" slug (and any other unvalidated
  // [id]) is folded into one canonical page. Falls back to the visited id for
  // products that only live under the umbrella (e.g. sanitary valves).
  const canonicalCategory = (await canonicalCategoryFor(productId)) ?? id;
  const canonical = `${SITE_URL}/products/${canonicalCategory}/${productId}/variants/${sku}`;

  return {
    title: metaTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "Mars Valvenok",
      title: readable,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: readable,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function VariantDetailLayout({ children }: LayoutProps) {
  return children;
}
