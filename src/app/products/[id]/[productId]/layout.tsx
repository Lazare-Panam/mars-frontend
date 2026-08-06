import type { Metadata } from "next";
import { fetchProductDetail, ProductDetail } from "@/api/useProductDetail";

type MetadataProps = { params: Promise<{ id: string; productId: string }> };
type LayoutProps = {
  params: Promise<{ id: string; productId: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { productId } = await params;

  let data: ProductDetail | null = null;
  try {
    data = await fetchProductDetail(productId);
  } catch (err) {
    console.error(
      `[generateMetadata] fetchProductDetail(${productId}) failed:`,
      err,
    );
  }

  if (!data) {
    return { title: "Mars Valves" };
  }

  const { name: title, description, image: ogImage } = data;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "Mars Valves",
      title,
      description,
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
