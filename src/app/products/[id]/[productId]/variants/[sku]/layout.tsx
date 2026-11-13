import type { Metadata } from "next";
import { fetchVariants, ProductSeriesVariants } from "@/api/useProductVariants";
import { canonicalProductPath } from "@/lib/canonicalCategory";
import { SITE_URL } from "@/lib/site";
import { variantTitleParts } from "@/lib/variantTitle";
import { fitBrandTitle } from "@/lib/seoTitle";
import { VARIANT_META } from "@/lib/variantMeta";

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
  // Hand-written per-SKU meta from the marketing sheet wins, verbatim, when we
  // have one for this slug.
  const override = VARIANT_META[sku];
  // Keep the <title> within the ~65-char SERP guideline. For very long,
  // multi-attribute variants (the V88 family) drop the product name so the
  // unique distinguishing specs still fit; fitBrandTitle then drops the brand
  // suffix when the result still wouldn't fit with it appended.
  const metaTitle = override
    ? { absolute: override.title }
    : fitBrandTitle(readable.length > 65 && detail ? detail : readable);
  const specSummary = Object.entries(variant.specs)
    .filter(([k]) => k !== "SKU" && k !== "Price")
    .map(([, v]) => v)
    .join(", ");
  const description =
    override?.description ??
    (specSummary
      ? `${data.name} — ${specSummary}. SKU: ${variant.id}.`
      : `${data.name}, SKU: ${variant.id}.`);
  const ogTitle = override?.title ?? readable;
  const ogImage = variant.thumbnailImage || data.thumbnailImage;

  // Variant pages are canonicalised to their parent product page (SEO audit,
  // 29 Sep 2026): ~290 thin, deep variant URLs were each ranking at positions
  // 11-59, so the product page now collects that authority instead. The real
  // subcategory is used so the umbrella "ball-valves" duplicate folds in too;
  // it falls back to the visited id for products that only live under the
  // umbrella (e.g. sanitary valves). Variant pages stay live for customers and
  // are left out of the sitemap (next-sitemap.config.js).
  const canonical = `${SITE_URL}${await canonicalProductPath(id, productId)}`;

  return {
    title: metaTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "Mars Valvenok",
      title: ogTitle,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function VariantDetailLayout({ children }: LayoutProps) {
  return children;
}
