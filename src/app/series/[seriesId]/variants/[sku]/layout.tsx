import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/getQueryClient";
import { fetchSeriesCategory, fetchSeriesProduct } from "@/api/useSeriesCatalog";
import { SITE_URL } from "@/lib/site";
import { fitBrandTitle } from "@/lib/seoTitle";
import { VARIANT_META } from "@/lib/variantMeta";

type Props = { params: Promise<{ seriesId: string; sku: string }>; children: React.ReactNode };

// Each part-number page gets its own title (it used to inherit the series
// "All Models" title, so every SKU read as a duplicate). It still points
// Google at the series models page, which is the page meant to rank.
export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { seriesId, sku } = await params;
  const part = decodeURIComponent(sku);
  // Hand-written per-SKU meta from the marketing sheet wins, verbatim, when we
  // have one for this part number; otherwise fall back to the generic template.
  const override = VARIANT_META[part];
  const series = await fetchSeriesCategory(seriesId).catch(() => null);
  const name = series?.name ?? "Kronox ball valve";
  return {
    title: override ? { absolute: override.title } : fitBrandTitle(`${part} — ${name}`),
    description:
      override?.description ??
      `Kronox ${name} part number ${part}: specifications, price and quote request direct from the manufacturer.`,
    alternates: { canonical: `${SITE_URL}/series/${seriesId}/variants` },
  };
}

// Prefetch the model on the server so its heading and specs are in the HTML
// crawlers read, not only after the page loads in a browser.
export default async function SeriesSkuLayout({ params, children }: Props) {
  const { sku } = await params;
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery({ queryKey: ["series-product", sku], queryFn: () => fetchSeriesProduct(sku) });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
