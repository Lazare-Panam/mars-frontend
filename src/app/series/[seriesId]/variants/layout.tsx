import type { Metadata } from "next";
import { fetchSeriesVariants } from "@/api/useSeriesCatalog";
import { ProductSeriesVariants } from "@/api/useProductVariants";
import { SITE_URL } from "@/lib/site";
import { fitBrandTitle } from "@/lib/seoTitle";
import { modelsDescription } from "@/lib/seoDescription";

type MetadataProps = { params: Promise<{ seriesId: string }> };
type LayoutProps = {
  params: Promise<{ seriesId: string }>;
  children: React.ReactNode;
};

// The series "all models" page is a client component, so metadata is set here.
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { seriesId } = await params;

  let data: ProductSeriesVariants | null = null;
  try {
    data = await fetchSeriesVariants(seriesId);
  } catch (err) {
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status !== 404) {
      console.error(
        `[generateMetadata] fetchSeriesVariants(${seriesId}) failed (status ${status ?? "?"})`,
      );
    }
  }

  if (!data) {
    return { title: "Mars Valvenok" };
  }

  const base = `${data.name} — All Models`;
  const title = fitBrandTitle(base);
  const description = modelsDescription(data.name, data.variants.length);
  const canonical = `${SITE_URL}/series/${seriesId}/variants`;

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

export default function SeriesVariantsLayout({ children }: LayoutProps) {
  return children;
}
