import { ProductSeriesVariants, ProductVariant } from "@/api/useProductVariants";

// Shared concise variant naming, used by BOTH the visible <h1>
// (VariantDetailClient) and the <title> (variant layout generateMetadata) so
// they can't drift. Series-level variants collapse to their "Series X" code;
// sized variants keep only the specs that differ between the sized siblings,
// dropping the boilerplate every size shares.
export function variantTitleParts(
  series: ProductSeriesVariants,
  sku: string,
): { detail: string; name: string } {
  const variant = series.variants.find((v) => v.id === sku);
  if (!variant) return { detail: "", name: series.name };

  const specValues = (specs: Record<string, string>) =>
    Object.entries(specs).filter(([k]) => k !== "SKU" && k !== "Price");

  // Whole-series entry (e.g. slug "series-f88") — every spec differs between
  // series, so listing them all is pointless; the series code is the identity.
  if (/^series/i.test(sku)) {
    const code = `Series ${sku.replace(/^series-?/i, "").toUpperCase()}`.trim();
    return { detail: code, name: series.name };
  }

  const sizedPeers = series.variants.filter((v) => !/^series/i.test(v.id));
  const distinguishing = specValues(variant.specs)
    .filter(([k, val]) => sizedPeers.some((o) => o.specs[k] !== val))
    .map(([, val]) => val);
  const detail = distinguishing.length
    ? distinguishing.join(", ")
    : specValues(variant.specs)
        .map(([, val]) => val)
        .join(", ");
  return { detail, name: series.name };
}

// Descriptive image alt text for a variant, e.g.
// "Kronox Economical 2-Piece Ball Valve, 1/4 Inch, V20-20-1-4IN-W-O-LOCK".
export function variantImageAlt(productName: string, variant: ProductVariant): string {
  const sku = variant.specs["SKU"] ?? variant.id;
  return [`Kronox ${productName}`, variant.specs["Size"], sku].filter(Boolean).join(", ");
}
