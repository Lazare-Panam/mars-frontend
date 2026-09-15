import { SITE_URL } from "./site";

/**
 * Renders a JSON-LD <script>. The "</" escape prevents a value containing
 * "</script>" from breaking out of the tag (standard XSS-safety for inline
 * JSON-LD). Use from Server Components so the schema is in the static HTML.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Build a schema.org BreadcrumbList from ordered {name, path} crumbs. */
export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
