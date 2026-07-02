import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

export interface ProductDetail {
  id: string;
  catalogId: string;
  name: string;
  description: string;
  image: string;
  specs: Record<string, string>;
  features: string[];
  applications: string[];
  temperature: string;
  relatedProducts: string[];
}

const fetchProductDetail = async (catalogId: string, productId: string): Promise<ProductDetail> => {
  const { data } = await axiosClient.get(`/api/product/${catalogId}/products/${productId}`);
  return data;
};

export const useProductDetail = (catalogId: string, productId: string) => {
  return useQuery({
    queryKey: ["product", catalogId, productId],
    queryFn: () => fetchProductDetail(catalogId, productId),
    enabled: !!catalogId && !!productId,
  });
};