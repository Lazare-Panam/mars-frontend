// Part numbers were renamed from Mars "V…" codes to Kronox "KX-…" codes
// (V20-40-1-4IN-… -> KX-20-40-1-4IN-…, v77-1-4in-… -> kx-77-1-4in-…).
// Returns the new code for an old one, or null when it isn't an old code.
export function kxSku(part: string): string | null {
  if (/^V[0-9A-Z]/.test(part)) return `KX-${part.slice(1)}`;
  if (/^v[0-9a-z]/.test(part)) return `kx-${part.slice(1)}`;
  return null;
}
