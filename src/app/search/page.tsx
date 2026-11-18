import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search | Mars Valvenok",
  description: "Search MARS ball valves by series, part number or specification.",
  robots: { index: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "";
  // key by query so the facet selections reset cleanly on a new search.
  return <SearchClient key={query} q={query} />;
}
