import type { Metadata } from "next";
import { fetchVariants, ProductSeriesVariants } from "@/api/useProductVariants";
import { SITE_URL } from "@/lib/site";
import { fitBrandTitle } from "@/lib/seoTitle";

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

  const title = fitBrandTitle(`${data.name} — All Models`);
  const canonical = `${SITE_URL}/products/${id}/variants`;

  return {
    title,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "Mars Valvenok",
      title: `${data.name} — All Models`,
      url: canonical,
      images: data.thumbnailImage ? [{ url: data.thumbnailImage }] : undefined,
    },
  };
}

export default function ProductVariantsLayout({ children }: LayoutProps) {
  return children;
}
