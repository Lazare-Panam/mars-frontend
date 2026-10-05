"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Box, Button, Container, Typography, CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { hasValidLogin, useIsLoggedIn } from "@/lib/auth";
import { logout } from "@/lib/logout";

interface SideLink {
  label: string;
  href: string;
}

const WORKSPACE: SideLink[] = [{ label: "Saved Cart", href: "/dashboard/carts" }];

/**
 * My Account: a sidebar plus the selected page. Only for logged-in users;
 * anyone else is sent to login and brought back here afterwards.
 */
export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const loggedIn = useIsLoggedIn();
  // Logging out goes to the home page, not to login like an expired session.
  const loggingOut = useRef(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Checked directly: during hydration loggedIn is briefly false (server value).
    if (!loggingOut.current && !hasValidLogin()) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loggedIn, pathname, router]);

  const handleLogout = async () => {
    loggingOut.current = true;
    setIsLoggingOut(true);
    await logout();
    router.replace("/");
  };

  if (!loggedIn) {
    return (
      <Box sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: { xs: 3, md: 6 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "220px 1fr" },
            gap: { xs: 3, md: 5 },
            alignItems: "start",
          }}
        >
          <Box component="nav" aria-label="My account">
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.12em" }}
            >
              Workspace
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>
              My Transactions
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {WORKSPACE.map((link) => {
                const active = link.href === pathname;
                const sx = {
                  display: "block",
                  py: 0.75,
                  px: 1.5,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  borderLeft: "3px solid",
                  borderColor: active ? "primary.main" : "transparent",
                  bgcolor: active ? "action.hover" : "transparent",
                  color: active ? "primary.main" : "text.secondary",
                  fontWeight: active ? 700 : 500,
                };
                return (
                  <li key={link.label}>
                    <Box component={Link} href={link.href} aria-current={active ? "page" : undefined} sx={sx}>
                      {link.label}
                    </Box>
                  </li>
                );
              })}
            </Box>

            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              disabled={isLoggingOut}
              sx={{ mt: 3, borderColor: "divider", color: "text.secondary" }}
            >
              {isLoggingOut ? "Logging out..." : "Log out"}
            </Button>
          </Box>

          <Box sx={{ minWidth: 0 }}>{children}</Box>
        </Box>
      </Container>
    </Box>
  );
}
