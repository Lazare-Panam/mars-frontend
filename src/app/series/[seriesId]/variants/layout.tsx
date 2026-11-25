import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/getQueryClient";
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
    return { title: "Kronox Valves" };
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
      siteName: "Kronox Valves",
      title: base,
      description,
      url: canonical,
      images: data.thumbnailImage ? [{ url: data.thumbnailImage }] : undefined,
    },
  };
}

// Prefetch the models on the server so the heading and table are in the HTML
// crawlers read, not only after the page loads in a browser.
export default async function SeriesVariantsLayout({ params, children }: LayoutProps) {
  const { seriesId } = await params;
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery({ queryKey: ["series-variants", seriesId], queryFn: () => fetchSeriesVariants(seriesId) });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
