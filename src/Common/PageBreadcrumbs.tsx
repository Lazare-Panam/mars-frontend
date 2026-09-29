"use client";

import { Box, Breadcrumbs, Typography } from "@mui/material";
import NextLink from "next/link";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Crumb } from "@/lib/breadcrumbs";

const BRAND = "#E7390F";

/**
 * Visible breadcrumb trail. The last crumb is the current page (not a link).
 * `tone="onDark"` is for the dark page banners; `tone="default"` for light
 * backgrounds. Pair with the BreadcrumbList JSON-LD where a page has one.
 */
export default function PageBreadcrumbs({
  items,
  tone = "default",
  sx,
}: {
  items: Crumb[];
  tone?: "default" | "onDark";
  sx?: SxProps<Theme>;
}) {
  const onDark = tone === "onDark";
  const linkColor = onDark ? "rgba(255,255,255,0.65)" : "text.secondary";
  const hoverColor = onDark ? "#fff" : BRAND;
  const currentColor = onDark ? "primary.light" : BRAND;
  const separatorColor = onDark ? "rgba(255,255,255,0.35)" : "text.disabled";

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator="/"
      sx={[
        {
          fontSize: "0.8rem",
          "& .MuiBreadcrumbs-separator": { color: separatorColor, mx: 0.75 },
          "& .MuiBreadcrumbs-ol": { rowGap: 0.5 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        if (isLast || !c.href) {
          return (
            <Typography
              key={`${c.label}-${i}`}
              aria-current={isLast ? "page" : undefined}
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: isLast ? currentColor : linkColor,
                fontFamily: c.mono ? "monospace" : undefined,
              }}
            >
              {c.label}
            </Typography>
          );
        }
        return (
          <Box
            key={c.href}
            component={NextLink}
            href={c.href}
            sx={{
              color: linkColor,
              textDecoration: "none",
              fontWeight: 600,
              transition: "color 0.15s",
              "&:hover": { color: hoverColor },
            }}
          >
            {c.label}
          </Box>
        );
      })}
    </Breadcrumbs>
  );
}
