import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

export enum ProductType {
  ProductListing = 0,
  Grid = 1
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  thumbnailImage: string;
  type: ProductType;
  specs?: Record<string, string>;
  features?: string[];
}

export interface ProductCatalog {
  id: string;
  type: ProductType;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImage: string;
  products: ProductItem[];
}

const fetchCatalog = async (id: string): Promise<ProductCatalog> => {
  const { data } = await axiosClient.get(`/api/product/${id}`);
  return data;
};

export const useProductCatalog = (id: string) => {
  return useQuery({
    queryKey: ["catalog", id],
    queryFn: () => fetchCatalog(id),
    enabled: !!id,
  });
};