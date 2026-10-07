"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

/**
 * Lives in the root layout (already loaded), so the instant an internal link is
 * clicked it shows a centered spinner over the page — covering the gap while the
 * target route's chunk + data load. Clears once the new path is active.
 */
export default function NavProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const doneRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show on any internal left-click navigation.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (!href || !href.startsWith("/") || target === "_blank") return;
      const dest = href.split("#")[0];
      if (dest === "" || dest === pathname) return;

      if (doneRef.current) {
        clearTimeout(doneRef.current);
        doneRef.current = null;
      }
      setLoading(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // Hide once the new route is active (its own spinner/content takes over).
  useEffect(() => {
    if (!loading) return;
    doneRef.current = setTimeout(() => setLoading(false), 150);
    return () => {
      if (doneRef.current) {
        clearTimeout(doneRef.current);
        doneRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!loading) return null;

  return (
    <Box
      aria-live="polite"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(255,255,255,0.6)",
        pointerEvents: "none",
      }}
    >
      <CircularProgress sx={{ color: "#E7390F" }} />
    </Box>
  );
}
