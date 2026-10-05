// Meta description helpers. SE Ranking (and Google's snippet) cut descriptions
// at ~160 characters, so longer ones are shortened at a word boundary.

const MAX_DESCRIPTION = 155;

/** Shortens a description to ~155 chars at a word boundary, ending with "…". */
export function fitDescription(text: string | null | undefined, max = MAX_DESCRIPTION): string {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–—-]+$/, "")}…`;
}

/**
 * A unique description for an "all models" page, so it doesn't repeat its
 * product page or the site-wide default (SE Ranking: duplicate descriptions).
 */
export function modelsDescription(name: string, count: number): string {
  const models = count === 1 ? "1 model" : `${count} models`;
  return fitDescription(
    `Compare all ${models} of the MARS ${name} — sizes, specs and UK prices — and order online from Mars Valvenok, authorised MARS distributor.`,
  );
}

/** The first of the candidate titles that fits ~60 chars (before the brand suffix). */
export function firstThatFits(candidates: string[], max = 60): string {
  return candidates.find((t) => t.length <= max) ?? candidates[candidates.length - 1];
}
