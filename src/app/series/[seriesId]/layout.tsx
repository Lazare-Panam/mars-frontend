import type { Metadata } from "next";
import { fetchSeriesVariants } from "@/api/useSeriesCatalog";
import { ProductSeriesVariants } from "@/api/useProductVariants";
import { SITE_URL } from "@/lib/site";
import { fitBrandTitle } from "@/lib/seoTitle";

type MetadataProps = { params: Promise<{ seriesId: string }> };
type LayoutProps = {
  params: Promise<{ seriesId: string }>;
  children: React.ReactNode;
};

// The landing page is a client component, so its metadata lives here.
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

  const title = fitBrandTitle(data.name);
  const description = `${data.name} — ${data.variants.length} stocked models. Filter by size, end connection, operating pressure and lock, and request a quote.`;
  const canonical = `${SITE_URL}/series/${seriesId}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "Mars Valvenok",
      title: data.name,
      description,
      url: canonical,
      images: data.thumbnailImage ? [{ url: data.thumbnailImage }] : undefined,
    },
  };
}

export default function SeriesLayout({ children }: LayoutProps) {
  return children;
}
