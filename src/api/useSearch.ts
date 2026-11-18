import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

// Shapes mirror the Mars.API SearchController response (SearchResultsDto).

export interface SeriesHit {
  id: string;
  name: string;
  description?: string | null;
  keyFeatures?: string | null;
  design?: string | null;
  image?: string | null;
  href: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface ProductHit {
  id: string;
  partNumber: string;
  series?: string | null;
  seriesName?: string | null;
  attributes?: ProductAttribute[] | null;
  specs?: string | null;
  image?: string | null;
  href: string;
}

export interface SearchResults {
  series: SeriesHit[];
  products: ProductHit[];
}

export const fetchSearch = async (q: string, limit = 100): Promise<SearchResults> => {
  const { data } = await axiosClient.get<SearchResults>(`/api/Search`, {
    params: { q, limit },
  });
  return data;
};

export const useSearch = (q: string) =>
  useQuery({
    queryKey: ["search", q],
    queryFn: () => fetchSearch(q),
    enabled: q.trim().length > 0,
    // Keep the old results on screen while the next query resolves (no flash of empty).
    placeholderData: (prev) => prev,
  });
