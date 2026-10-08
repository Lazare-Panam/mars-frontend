import type { Metadata } from "next";
import { fetchSeriesCategory } from "@/api/useSeriesCatalog";
import { SITE_URL } from "@/lib/site";
import { fitBrandTitle } from "@/lib/seoTitle";

type Props = { params: Promise<{ seriesId: string; sku: string }>; children: React.ReactNode };

// Each part-number page gets its own title (it used to inherit the series
// "All Models" title, so every SKU read as a duplicate). It still points
// Google at the series models page, which is the page meant to rank.
export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { seriesId, sku } = await params;
  const part = decodeURIComponent(sku);
  const series = await fetchSeriesCategory(seriesId).catch(() => null);
  const name = series?.name ?? "MARS ball valve";
  return {
    title: fitBrandTitle(`${part} — ${name}`),
    description: `MARS ${name} part number ${part}: specifications, price and quote request from an authorised UK distributor.`,
    alternates: { canonical: `${SITE_URL}/series/${seriesId}/variants` },
  };
}

export default function SeriesSkuLayout({ children }: Props) {
  return children;
}
