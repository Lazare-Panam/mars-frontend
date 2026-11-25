const BRAND_SUFFIX = " | Kronox Valves";
const MAX_TITLE = 65;

// The root layout applies the `%s | Kronox Valves` title template. Keep that
// brand suffix only when the finished title still fits within the ~65-char SERP
// guideline; otherwise return an absolute title (no suffix) so a long base
// title doesn't blow past the limit. Returns a value assignable to Metadata.title.
export function fitBrandTitle(base: string): string | { absolute: string } {
  return base.length + BRAND_SUFFIX.length <= MAX_TITLE
    ? base
    : { absolute: base };
}
