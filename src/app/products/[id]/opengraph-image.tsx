import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";
import { CATEGORIES, SERIES } from "../data/categories";

// Per-category Open Graph image. Colocated in the /products/[id] segment, so
// each category/series share link gets its own branded card titled after the
// range, instead of the CMS banner photo (which was inconsistent — missing on
// most, a ships photo on multi-port). Overrides the root default for these
// routes.
export const alt = "MARS Ball Valves — Authorised UK Distributor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Prerender an image per category (matches the page's generateStaticParams).
// Ids outside this list (moved series, etc.) still render on-demand via the
// label lookup below, falling back to a generic title.
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const label = [...CATEGORIES, ...SERIES].find((c) => c.id === id)?.label;
  return renderOgImage({ title: label ?? "MARS Ball Valves" });
}
