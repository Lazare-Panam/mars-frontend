import ProductCatalogPageClient from "./components/ProductCatalogPageClient";

type Props = { params: Promise<{ id: string }> };



export default async function ProductCatalogPage({ params }: Props) {
  const { id } = await params;
  return <ProductCatalogPageClient id={id} />;
}