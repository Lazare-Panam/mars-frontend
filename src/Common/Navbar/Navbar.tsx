"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Drawer,
  Collapse,
  Badge,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { LEFT_NAV, RIGHT_NAV, type NavItem } from "./navData";
import CategoryBar from "./CategoryBar";
import { CATEGORY_BAR } from "./categoryBarData";
import { useCategoryMenu } from "./useCategoryMenu";
import { useCartStore } from "@/store/useCartStore";
import { useIsLoggedIn } from "@/lib/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { logout } from "@/lib/logout";
import { useRouter } from "next/navigation";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const INK = theme.palette.text.primary;
  const RUST = theme.palette.text.secondary;
  const PAPER = theme.palette.background.default;
  const ACCENT = theme.palette.primary.main;
  const LINE = theme.palette.divider;
  const REGISTER_RED = "#D32F2F";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const itemCount = useCartStore((s) => s.itemCount());

  // Logged in → "My Account" (saved cart); otherwise "Register".
  const loggedIn = useIsLoggedIn();
  const initials = useAuthStore((s) => s.initials);
  const userName = useAuthStore((s) => s.userName);
  const hydrateAuth = useAuthStore((s) => s.hydrate);
  const router = useRouter();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  // Load the name/initials from the stored token after a page refresh.
  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth, loggedIn]);
  const handleLogout = async () => {
    setAccountMenuOpen(false);
    await logout();
    router.push("/");
  };
  const accountHref = loggedIn ? "/dashboard/carts" : "/login";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On desktop, "Products" (the item with a megaMenu) no longer has its own
  // dropdown: hovering it opens the category bar's first dropdown instead.
  // (megaMenu data is still used by the mobile drawer.)
  const categoryOpen = useCategoryMenu((s) => s.open);
  const openCategory = useCategoryMenu((s) => s.openItem);
  const scheduleCategoryClose = useCategoryMenu((s) => s.scheduleClose);
  const closeCategory = useCategoryMenu((s) => s.close);
  const openProducts = () => openCategory(CATEGORY_BAR[0].label);
  // Touch screens have no hover: the first tap on Products shows the bar,
  // a second tap follows the link. Recorded at pointerdown, before the
  // hover/focus events a tap also fires.
  const productsTap = React.useRef({ isTouch: false, wasOpen: false });
  const filteredRightNav = RIGHT_NAV.filter(
    (item) => item.label !== "Contact Us",
  );
  // Desktop shows the e-catalogue in the red top bar instead.
  const desktopRightNav = filteredRightNav.filter((item) => item.label !== "E-Catalogue");

  const CartButton = ({ size }: { size: number }) => (
    <IconButton
      component={Link}
      href="/cart"
      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      sx={{ color: INK }}
    >
      <Box
        component="span"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        View cart
      </Box>
      <Badge
        badgeContent={itemCount}
        max={99}
        invisible={itemCount === 0}
        sx={{
          "& .MuiBadge-badge": {
            bgcolor: ACCENT,
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
            fontSize: "0.65rem",
          },
        }}
      >
        <ShoppingCartOutlinedIcon sx={{ fontSize: size }} />
      </Badge>
    </IconButton>
  );

  // Logged out: "Register" link. Logged in: red circle with the user's
  // initials; hovering (or tapping) it opens My Account / Logout.
  const AccountButton = ({ size }: { size: number }) => {
    if (!loggedIn) {
      return (
        <Box
          component={Link}
          href={accountHref}
          aria-label="Login or register"
          sx={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.25,
            textDecoration: "none",
            color: REGISTER_RED,
            px: 0.5,
          }}
        >
          <PersonOutlineOutlinedIcon sx={{ fontSize: size, color: REGISTER_RED }} />
          <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.01em", color: REGISTER_RED, lineHeight: 1 }}>
            Register
          </Typography>
        </Box>
      );
    }

    const menuItemSx = {
      display: "flex",
      alignItems: "center",
      gap: 1.25,
      width: "100%",
      px: 2,
      py: 1.1,
      fontSize: "0.92rem",
      textDecoration: "none",
      color: INK,
      bgcolor: "transparent",
      border: "none",
      cursor: "pointer",
      font: "inherit",
      textAlign: "left" as const,
      "&:hover": { bgcolor: "rgba(231,57,15,0.06)" },
    };

    return (
      <Box
        onMouseEnter={() => setAccountMenuOpen(true)}
        onMouseLeave={() => setAccountMenuOpen(false)}
        sx={{ position: "relative" }}
      >
        <Box
          component="button"
          type="button"
          aria-label={userName ? `Account menu for ${userName}` : "Account menu"}
          aria-haspopup="menu"
          aria-expanded={accountMenuOpen}
          onClick={() => setAccountMenuOpen((o) => !o)}
          sx={{
            width: size + 14,
            height: size + 14,
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            bgcolor: ACCENT,
            color: "#fff",
            fontWeight: 700,
            fontSize: size > 22 ? "0.85rem" : "0.78rem",
            letterSpacing: "0.02em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "box-shadow 0.15s ease",
            "&:hover": { boxShadow: "0 0 0 3px rgba(231,57,15,0.2)" },
          }}
        >
          {initials ?? <PersonOutlineOutlinedIcon sx={{ fontSize: size - 4 }} />}
        </Box>

        {accountMenuOpen && (
          <Box
            role="menu"
            sx={{
              position: "absolute",
              top: "100%",
              right: 0,
              pt: 1, // hover bridge between the circle and the menu
              zIndex: 40,
            }}
          >
            <Box
              sx={{
                minWidth: 180,
                bgcolor: "#fff",
                border: `1px solid ${LINE}`,
                borderRadius: "6px",
                boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                py: 0.75,
              }}
            >
              {userName && (
                <Typography sx={{ px: 2, pt: 0.5, pb: 1, fontSize: "0.78rem", color: RUST, borderBottom: `1px solid ${LINE}`, mb: 0.5 }}>
                  {userName}
                </Typography>
              )}
              <Box component={Link} href="/dashboard/carts" role="menuitem" onClick={() => setAccountMenuOpen(false)} sx={menuItemSx}>
                <AccountCircleOutlinedIcon sx={{ fontSize: 20, color: ACCENT }} />
                My Account
              </Box>
              <Box component="button" type="button" role="menuitem" onClick={handleLogout} sx={{ ...menuItemSx, color: ACCENT }}>
                <LogoutIcon sx={{ fontSize: 20 }} />
                Logout
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: PAPER,
          color: INK,
          borderBottom: `1px solid ${LINE}`,
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow 0.25s ease",
        }}
        onMouseLeave={scheduleCategoryClose}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              height: scrolled ? 68 : 88,
              justifyContent: "space-between",
              transition: "height 0.25s ease",
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
            >
              <Image
                src="https://pblol2.blob.core.windows.net/mars-valves/logo.jpg"
                alt="MARS Valve"
                width={120}
                height={40}
                priority
                style={{ objectFit: "contain", height: 40, width: "auto" }}
              />
            </Box>

            {/* Left nav (desktop) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                gap: { md: 1.5, lg: 2.5, xl: 4 },
                ml: 6,
              }}
            >
              {LEFT_NAV.map((item) => {
                // Products shows as open while any category dropdown is open.
                const active = !!item.megaMenu && categoryOpen !== null;
                return (
                  <Box
                    key={item.label}
                    // Other header links close the products dropdown.
                    onMouseEnter={() => (item.megaMenu ? openProducts() : closeCategory())}
                    onFocus={() => item.megaMenu && openProducts()}
                  >
                    <Box
                      component={Link}
                      href={item.href}
                      onPointerDown={(e: React.PointerEvent) => {
                        if (item.megaMenu) {
                          productsTap.current = { isTouch: e.pointerType !== "mouse", wasOpen: categoryOpen !== null };
                        }
                      }}
                      onClick={(e: React.MouseEvent) => {
                        if (item.megaMenu && productsTap.current.isTouch && !productsTap.current.wasOpen) {
                          e.preventDefault();
                          openProducts();
                        }
                      }}
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        textDecoration: "none",
                        color: active ? INK : RUST,
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        letterSpacing: "0.01em",
                        textTransform: "none",
                        py: 3,
                        transition: "color 0.15s ease",
                        "&:hover": { color: INK },
                      }}
                    >
                      {item.label}
                      {item.megaMenu && (
                        <KeyboardArrowDownIcon
                          sx={{
                            fontSize: 16,
                            transition: "transform 0.2s ease",
                            transform: active ? "rotate(180deg)" : "none",
                            color: active ? ACCENT : RUST,
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 14,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: active ? 22 : 0,
                          height: 2,
                          bgcolor: ACCENT,
                          transition: "width 0.2s ease",
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Right nav (desktop) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                alignItems: "center",
                // Tighter on laptop widths so the extra Credit button fits.
                gap: { md: 1.5, lg: 2.5, xl: 4 },
              }}
            >
              {desktopRightNav.map((item) => (
                <Box
                  key={item.label}
                  component={Link}
                  href={item.href}
                  target={item.newTab ? "_blank" : undefined}
                  rel={item.newTab ? "noopener noreferrer" : undefined}
                  sx={{
                    textDecoration: "none",
                    color: RUST,
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    transition: "color 0.15s ease",
                    "&:hover": { color: INK },
                  }}
                >
                  {item.label}
                </Box>
              ))}

              <Box
                component={Link}
                href="/credit-application"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  textDecoration: "none",
                  border: `1.5px solid ${ACCENT}`,
                  color: ACCENT,
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.04em",
                  px: 2,
                  py: 1,
                  whiteSpace: "nowrap",
                  transition: "background-color 0.15s ease, color 0.15s ease",
                  "&:hover": {
                    bgcolor: ACCENT,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                <CreditCardOutlinedIcon sx={{ fontSize: 19 }} />
                {/* Short label on laptop widths so the nav doesn't wrap. */}
                <Box component="span" sx={{ display: { xs: "none", xl: "inline" } }}>
                  Apply for Credit
                </Box>
                <Box component="span" sx={{ display: { xs: "inline", xl: "none" } }}>
                  Credit
                </Box>
              </Box>

              <Box
                component={Link}
                href="/shop"
                aria-label="Shop"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  textDecoration: "none",
                  bgcolor: ACCENT,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.04em",
                  px: 2,
                  py: 1,
                  transition: "background-color 0.15s ease",
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark ?? "#A8270A",
                  },
                }}
              >
                <StorefrontOutlinedIcon sx={{ fontSize: 19 }} />
                Shop
              </Box>

              <Box
                component={Link}
                href="/contact"
                sx={{
                  textDecoration: "none",
                  border: `1.5px solid ${ACCENT}`,
                  color: ACCENT,
                  fontWeight: 600,
                  fontSize: "0.84rem",
                  letterSpacing: "0.01em",
                  textTransform: "none",
                  px: 2.5,
                  py: 1,
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: ACCENT,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                Contact
              </Box>

              <AccountButton size={24} />
              <CartButton size={24} />
            </Box>

            {/* Mobile trigger */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <AccountButton size={22} />
              <CartButton size={22} />
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ color: INK }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>

        <CategoryBar />
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: { sx: { width: "100%", maxWidth: 360, bgcolor: PAPER } },
        }}
      >
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${LINE}`,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.06em",
            }}
          >
            MENU
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", px: 1.5, py: 1 }}>
          {/* Login / Register entry point */}
          <Box sx={{ borderBottom: `1px solid ${LINE}` }}>
            <Box
              component={Link}
              href={accountHref}
              onClick={() => setMobileOpen(false)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                py: 2,
                px: 1,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.02em",
                color: REGISTER_RED,
              }}
            >
              <PersonOutlineOutlinedIcon
                sx={{ fontSize: 18, color: REGISTER_RED }}
              />
              {loggedIn ? "My Account" : "Login / Register"}
            </Box>
          </Box>

          {[...LEFT_NAV, ...filteredRightNav].map((item: NavItem) => (
            <Box key={item.label} sx={{ borderBottom: `1px solid ${LINE}` }}>
              <Box
                onClick={() =>
                  item.megaMenu
                    ? setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label,
                      )
                    : setMobileOpen(false)
                }
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                  px: 1,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  letterSpacing: "0.02em",
                  color: INK,
                }}
              >
                {item.megaMenu ? (
                  item.label
                ) : (
                  <Link
                    href={item.href}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    style={{ color: "inherit", textDecoration: "none" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {item.megaMenu && (
                  <ExpandMoreIcon
                    sx={{
                      fontSize: 18,
                      color: RUST,
                      transition: "transform 0.2s ease",
                      transform:
                        mobileExpanded === item.label
                          ? "rotate(180deg)"
                          : "none",
                    }}
                  />
                )}
              </Box>
              {item.megaMenu && (
                <Collapse in={mobileExpanded === item.label}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      pb: 2,
                      pl: 2,
                      gap: 2,
                    }}
                  >
                    {item.megaMenu.map((col) => (
                      <Box key={col.heading}>
                        <Typography
                          component={Link}
                          href={col.href}
                          onClick={() => setMobileOpen(false)}
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.68rem",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: ACCENT,
                            mb: 1,
                            display: "block",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {col.heading}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          {col.items.map((it) => (
                            <Box
                              key={it.label}
                              component={Link}
                              href={it.href}
                              onClick={() => setMobileOpen(false)}
                              sx={{
                                textDecoration: "none",
                                color: RUST,
                                fontSize: "0.85rem",
                                "&:hover": { color: INK },
                              }}
                            >
                              {it.label}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              )}
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
