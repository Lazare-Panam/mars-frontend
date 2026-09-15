## Confusion Log
- [ ] 2026-09-15 — Why did category & variant pages render content in static HTML but product-detail pages showed a spinner, when the fix was the same? — turned out most were a *backend data gap* (`/api/product/{id}/detail` returns 404 for the one-piece series), not a frontend bug. Lesson: verify the API response before assuming the render code is wrong.

## Concepts To Learn Next
- [ ] 2026-09-15 — **TanStack Query SSR: `prefetchQuery` + `dehydrate` + `<HydrationBoundary>`** — this is exactly the pattern used to make the client-rendered product/category/variant pages emit real HTML for crawlers, without rewriting the MUI components. Read the official guide: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr — focus on why `staleTime > 0` matters (so the client doesn't refetch and discard the server-rendered data) and how `dehydrate` only serializes *successful* queries by default (which is why 404'd products fall back to the client fetch).
