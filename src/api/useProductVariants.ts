import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

export interface ProductSeriesVariants {
  seriesId: string;
  catalogId: string;
  name: string;
  thumbnailImage: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  specs: Record<string, string>;
}

const fetchVariants = async (catalogId: string, seriesId: string): Promise<ProductSeriesVariants> => {
  const { data } = await axiosClient.get(`/api/product/${catalogId}/products/${seriesId}/variants`);
  return data;
};

export const useProductVariants = (catalogId: string, seriesId: string) => {
  return useQuery({
    queryKey: ["variants", catalogId, seriesId],
    queryFn: () => fetchVariants(catalogId, seriesId),
    enabled: !!catalogId && !!seriesId,
  });
};