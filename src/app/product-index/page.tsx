import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import ProductLinkList, { buildProductIndex } from "./ProductLinkList";
import styles from "./product-index.module.css";

export const metadata: Metadata = {
  title: "Product Index — Every MARS Ball Valve & Variant",
  description:
    "A complete browsable index of every MARS ball valve product and variant we stock, grouped by category. Jump straight to any size, port or seat configuration.",
  alternates: { canonical: "/product-index" },
  openGraph: {
    type: "website",
    siteName: "Mars Valvenok",
    title: "Product Index — Every MARS Ball Valve & Variant",
    description:
      "A complete browsable index of every MARS ball valve product and variant we stock, grouped by category.",
    url: `${SITE_URL}/product-index`,
  },
};

export default async function ProductIndexPage() {
  const index = await buildProductIndex();

  return (
    <main className={styles.page}>
      <h1 className={styles.h1}>Product Index</h1>
      <p className={styles.lead}>
        Every MARS ball valve product and variant we stock, grouped by category.
        Select a product to view its full detail, or jump straight to a specific
        variant.
      </p>
      <ProductLinkList index={index} />
    </main>
  );
}
