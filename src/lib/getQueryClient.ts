import { QueryClient } from "@tanstack/react-query";

// A fresh QueryClient per server render. Used by product/category/variant
// pages to prefetch their data on the server, then dehydrate it into a
// <HydrationBoundary> so the client components' useQuery calls resolve during
// the (static) server render — putting the real content in the HTML for
// crawlers instead of an empty skeleton.
//
// staleTime matches the client provider so the hydrated data is considered
// fresh and the client doesn't immediately refetch on mount.
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000 } },
  });
}
