import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";
import { ProductSeriesVariants, ProductVariant } from "./useProductVariants";

// --- Shapes returned by the new SQL-backed SeriesProduct API (Mars.API) ---

export interface SeriesCertificate {
  label: string;
  url: string;
}

export interface SeriesCategory {
  categoryId: number;
  name: string;
  catalogUrl?: string | null;
  cadUrl?: string | null;
  description?: string | null;
  bodyMaterial?: string | null;
  seatMaterial?: string | null;
  design?: string | null;
  temperatureRange?: string | null;
  approvals?: string | null;
  datasheetUrl?: string | null;
  keyFeatures: string[];
  certificates: SeriesCertificate[];
}

export interface SeriesFilter {
  filterId: number;
  name: string;
  sortOrder: number;
  values: string[];
}

interface SeriesSpec {
  filter: string;
  value: string;
}

interface SeriesProductDto {
  productId: number;
  partNumber: string;
  productStatus: string;
  familyDescription?: string | null;
  detailDescription?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  specs: SeriesSpec[];
}

export const fetchSeriesCategories = async (): Promise<SeriesCategory[]> => {
  const { data } = await axiosClient.get<SeriesCategory[]>(
    `/api/SeriesProduct/categories`,
  );
  return data;
};

export const fetchSeriesCategory = async (
  id: string,
): Promise<SeriesCategory | null> => {
  const cats = await fetchSeriesCategories();
  return cats.find((c) => String(c.categoryId) === id) ?? null;
};

// Adapts the SeriesProduct API response into the same ProductSeriesVariants
// shape the existing VariantsTable / VariantsSidebar already consume, so those
// components are reused unchanged. Each product becomes a "variant" whose specs
// are a flat Record (plus a synthetic SKU = PartNumber).
export const fetchSeriesVariants = async (
  id: string,
): Promise<ProductSeriesVariants> => {
  const [cats, productsRes] = await Promise.all([
    fetchSeriesCategories(),
    axiosClient.get<SeriesProductDto[]>(
      `/api/SeriesProduct/categories/${id}/products`,
    ),
  ]);

  const products = productsRes.data;
  const category = cats.find((c) => String(c.categoryId) === id);
  const name =
    category?.name ?? products[0]?.familyDescription ?? `Series ${id}`;
  const thumbnailImage = products[0]?.imageUrl ?? "";

  const variants: ProductVariant[] = products.map((p) => {
    const specs: Record<string, string> = { SKU: p.partNumber };
    for (const s of p.specs) specs[s.filter] = s.value;
    if (p.price != null) specs["Price"] = p.price.toFixed(2);
    return {
      id: p.partNumber,
      thumbnailImage: p.imageUrl ?? undefined,
      specs,
    };
  });

  return { id, name, thumbnailImage, variants };
};

export const useSeriesCategory = (id: string) =>
  useQuery({
    queryKey: ["series-category", id],
    queryFn: () => fetchSeriesCategory(id),
    enabled: !!id,
  });

export const useSeriesVariants = (id: string) =>
  useQuery({
    queryKey: ["series-variants", id],
    queryFn: () => fetchSeriesVariants(id),
    enabled: !!id,
  });

// --- Server-side configurator (no full product download) ---

export interface ConfiguratorValue {
  value: string;
  available: boolean;
}

export interface ConfiguratorOption {
  filterId: number;
  name: string;
  sortOrder: number;
  values: ConfiguratorValue[];
}

export interface ResolvedProduct {
  productId: number;
  partNumber: string;
  productStatus: string;
  familyDescription?: string | null;
  detailDescription?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  specs: { filter: string; value: string }[];
}

export interface ConfiguratorState {
  options: ConfiguratorOption[];
  matchCount: number;
  totalCount: number;
  resolved: ResolvedProduct | null;
  imageUrl?: string | null;
}

export const fetchConfiguratorState = async (
  id: string,
  selection: Record<string, string>,
): Promise<ConfiguratorState> => {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(selection))
    params.append(`filters[${k}]`, v);
  const qs = params.toString();
  const { data } = await axiosClient.get<ConfiguratorState>(
    `/api/SeriesProduct/categories/${id}/configure${qs ? `?${qs}` : ""}`,
  );
  return data;
};

export const fetchSeriesProduct = async (
  partNumber: string,
): Promise<ResolvedProduct> => {
  const { data } = await axiosClient.get<ResolvedProduct>(
    `/api/SeriesProduct/products/${encodeURIComponent(partNumber)}`,
  );
  return data;
};

export const useSeriesProduct = (partNumber: string) =>
  useQuery({
    queryKey: ["series-product", partNumber],
    queryFn: () => fetchSeriesProduct(partNumber),
    enabled: !!partNumber,
  });

export const useSeriesConfigurator = (
  id: string,
  selection: Record<string, string>,
) =>
  useQuery({
    queryKey: ["series-configurator", id, selection],
    queryFn: () => fetchConfiguratorState(id, selection),
    enabled: !!id,
    // Keep the previous options on screen while the next selection resolves,
    // so the buttons don't flash/empty between clicks.
    placeholderData: (prev) => prev,
  });
