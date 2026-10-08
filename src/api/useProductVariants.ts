import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";
import { serverMemo } from "@/lib/serverMemo";

export interface ProductSeriesVariants {
  id: string;
  name: string;
  thumbnailImage: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  thumbnailImage?: string;
  specs: Record<string, string>;
}

export const fetchVariants = (id: string): Promise<ProductSeriesVariants> =>
  serverMemo(`variants:${id}`, async () => {
    const { data } = await axiosClient.get(`/api/product/${id}/variants`);
    return data;
  });

export const useProductVariants = (id: string) => {
  return useQuery({
    queryKey: ["variants", id],
    queryFn: () => fetchVariants(id),
    enabled: !!id,
  });
};
