import type { Metadata } from "next";
import { fetchProductDetail, ProductDetail } from "@/api/useProductDetail";
import { canonicalProductPath } from "@/lib/canonicalCategory";
import { fitDescription } from "@/lib/seoDescription";

type MetadataProps = { params: Promise<{ id: string; productId: string }> };
type LayoutProps = {
  params: Promise<{ id: string; productId: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { id, productId } = await params;

  let data: ProductDetail | null = null;
  try {
    data = await fetchProductDetail(productId);
  } catch (err) {
    // 404 just means this product has no detail record yet — expected for some
    // catalog entries, so don't spam the build log with the full axios error.
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status !== 404) {
      console.error(
        `[generateMetadata] fetchProductDetail(${productId}) failed (status ${status ?? "?"})`,
      );
    }
  }

  if (!data) {
    return { title: "Mars Valvenok" };
  }

  const { name: title, image: ogImage } = data;
  const description = fitDescription(data.description);

  // A product can be listed under more than one category; point every copy at
  // one canonical URL (same rule as the variant pages).
  const canonical = await canonicalProductPath(id, productId);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "Mars Valvenok",
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function ProductDetailLayout({ children }: LayoutProps) {
  return children;
}
