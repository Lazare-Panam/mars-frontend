import type { Metadata } from "next";
import { fetchVariants, ProductSeriesVariants } from "@/api/useProductVariants";
import { SITE_URL } from "@/lib/site";
import { fitBrandTitle } from "@/lib/seoTitle";
import { firstThatFits, modelsDescription } from "@/lib/seoDescription";

type MetadataProps = { params: Promise<{ id: string }> };
type LayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

// The two-segment "all models" page (/products/{series}/variants) is a client
// component, so it can't export metadata itself. Without this layout every one
// of these pages inherits the root default title and they all read as
// duplicates. Give each series its own "<name> — All Models" title and a
// self-canonical.
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { id } = await params;

  let data: ProductSeriesVariants | null = null;
  try {
    data = await fetchVariants(id);
  } catch (err) {
    // 404 = this id has no variants record; expected for some entries, so keep
    // the build log quiet (same handling as the sibling variant layouts).
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status !== 404) {
      console.error(
        `[generateMetadata] fetchVariants(${id}) failed (status ${status ?? "?"})`,
      );
    }
  }

  if (!data) {
    return { title: "Mars Valvenok" };
  }

  // Shorter fallbacks for long names (e.g. Series 77SN) so the title fits.
  const base = firstThatFits([`${data.name} — All Models`, `${data.name} Models`, data.name]);
  const title = fitBrandTitle(base);
  const description = modelsDescription(data.name, data.variants.length);
  const canonical = `${SITE_URL}/products/${id}/variants`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "Mars Valvenok",
      title: base,
      description,
      url: canonical,
      images: data.thumbnailImage ? [{ url: data.thumbnailImage }] : undefined,
    },
  };
}

export default function ProductVariantsLayout({ children }: LayoutProps) {
  return children;
}
