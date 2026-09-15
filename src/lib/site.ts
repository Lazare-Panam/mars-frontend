// Canonical, absolute base URL for the public site. Read from an env var so
// staging/preview deploys can differ, with the production host as a fallback so
// nothing breaks if the var is missing. NEXT_PUBLIC_ is required because this
// value is used in client-inlined code paths (it's a public URL, not a secret).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.marsvalvenok.com";
