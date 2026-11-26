"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "./SearchBar";


const Navbar: React.FC = () => {
  const theme = useTheme();
  const INK = theme.palette.text.primary;
  const RUST = theme.palette.text.secondary;
  // Header matches the logo PNG's own background (#F3F3F3) so the logo sits
  // seamlessly, with no visible box around it.
  const PAPER = "#F3F3F3";
  const ACCENT = theme.palette.primary.main;
  const LINE = theme.palette.divider;
  const REGISTER_RED = "#E0393E";

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
  const pathname = usePathname() ?? "/";
  const isCurrent = (href: string) => href !== "/" && (pathname === href || pathname.startsWith(`${href}/`));
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
  const desktopRightNav = filteredRightNav.filter(
    (item) => item.label !== "E-Catalogue",
  );

  // Account and cart share one look: a square icon button with a hairline
  // border that turns red on hover.
  const iconBtnSx = {
    // smaller on phones so the logo, search, account, cart and menu fit
    width: { xs: 36, md: 42 },
    height: { xs: 36, md: 42 },
    borderRadius: "3px",
    border: `1px solid ${LINE}`,
    bgcolor: "#fff",
    color: INK,
    transition: "border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease",
    "&:hover": { borderColor: ACCENT, color: ACCENT, bgcolor: "#fff" },
  } as const;

  const CartButton = ({ size }: { size: number }) => (
    <IconButton
      component={Link}
      href="/cart"
      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      title="Cart"
      sx={iconBtnSx}
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
        <IconButton
          component={Link}
          href={accountHref}
          aria-label="Sign in or register"
          title="Sign in or register"
          sx={iconBtnSx}
        >
          <PersonOutlineOutlinedIcon sx={{ fontSize: size }} />
        </IconButton>
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
      "&:hover": { bgcolor: "rgba(224,57,62,0.06)" },
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
          aria-label={
            userName ? `Account menu for ${userName}` : "Account menu"
          }
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
            "&:hover": { boxShadow: "0 0 0 3px rgba(224,57,62,0.2)" },
          }}
        >
          {initials ?? (
            <PersonOutlineOutlinedIcon sx={{ fontSize: size - 4 }} />
          )}
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
                <Typography
                  sx={{
                    px: 2,
                    pt: 0.5,
                    pb: 1,
                    fontSize: "0.78rem",
                    color: RUST,
                    borderBottom: `1px solid ${LINE}`,
                    mb: 0.5,
                  }}
                >
                  {userName}
                </Typography>
              )}
              <Box
                component={Link}
                href="/dashboard/carts"
                role="menuitem"
                onClick={() => setAccountMenuOpen(false)}
                sx={menuItemSx}
              >
                <AccountCircleOutlinedIcon
                  sx={{ fontSize: 20, color: ACCENT }}
                />
                My Account
              </Box>
              <Box
                component="button"
                type="button"
                role="menuitem"
                onClick={handleLogout}
                sx={{ ...menuItemSx, color: ACCENT }}
              >
                <LogoutIcon sx={{ fontSize: 20 }} />
                Logout
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  const subtotal = useCartStore((s) => s.subtotal());

  // Desktop account: a labelled box when signed out, the initials circle
  // (with its menu) when signed in.
  const DesktopAccount = () =>
    loggedIn ? (
      <AccountButton size={24} />
    ) : (
      <Box
        component={Link}
        href={accountHref}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          height: 48,
          px: 1.75,
          flexShrink: 0,
          textDecoration: "none",
          color: INK,
          bgcolor: "#fff",
          border: `1px solid ${LINE}`,
          borderRadius: "3px",
          transition: "border-color 0.15s ease",
          "&:hover": { borderColor: ACCENT },
          "&:hover .acc-top": { color: ACCENT },
        }}
      >
        <PersonOutlineOutlinedIcon sx={{ fontSize: 24, color: ACCENT }} />
        <Box sx={{ lineHeight: 1.15, whiteSpace: "nowrap", display: { md: "none", lg: "block" } }}>
          <Box component="span" className="acc-top" sx={{ display: "block", fontSize: "0.7rem", fontWeight: 600, color: RUST, transition: "color 0.15s ease" }}>
            Sign in
          </Box>
          <Box component="span" sx={{ display: "block", fontSize: "0.86rem", fontWeight: 800 }}>
            Register
          </Box>
        </Box>
      </Box>
    );

  // Desktop cart: a slanted red block with the item count and subtotal.
  const DesktopCart = () => (
    <Box
      component={Link}
      href="/cart"
      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: 48,
        px: 2.25,
        ml: 0.75,
        flexShrink: 0,
        textDecoration: "none",
        color: "#fff",
        background: "linear-gradient(135deg, #E0393E 0%, #C42E33 100%)",
        transform: "skewX(-14deg)",
        boxShadow: "0 8px 20px rgba(224,57,62,0.28)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        "&:hover": { transform: "skewX(-14deg) translateY(-2px)", boxShadow: "0 12px 26px rgba(224,57,62,0.38)" },
        "& > .inner": { transform: "skewX(14deg)", display: "flex", alignItems: "center", gap: 1.25 },
      }}
    >
      <span className="inner">
        <Badge
          badgeContent={itemCount}
          max={99}
          invisible={itemCount === 0}
          sx={{ "& .MuiBadge-badge": { bgcolor: "#fff", color: ACCENT, fontWeight: 800, fontSize: "0.65rem" } }}
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />
        </Badge>
        <Box component="span" sx={{ lineHeight: 1.15, whiteSpace: "nowrap", display: { md: "none", lg: "block" } }}>
          <Box component="span" sx={{ display: "block", fontSize: "0.7rem", fontWeight: 600, opacity: 0.9 }}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Box>
          <Box component="span" sx={{ display: "block", fontSize: "0.9rem", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>
            £{subtotal.toFixed(2)}
          </Box>
        </Box>
      </span>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: PAPER,
          color: INK,
          borderBottom: `1px solid ${LINE}`,
          "& a:focus:not(:focus-visible), & button:focus:not(:focus-visible)": { outline: "none" },
          "& a:focus-visible, & button:focus-visible": { outline: `2px solid ${ACCENT}`, outlineOffset: 3, borderRadius: "3px" },
          // Links show focus with their red text and slanted highlight instead
          // of a box (a box appeared around the menu link after a click).
          "& a:focus-visible": { outline: "none", color: ACCENT },
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
              className="kx-logo"
              aria-label="Kronox Valves home"
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                // Tightly cropped SVG (no built-in margins, about 5.7:1), so
                // the letters fill the height: 40px tall is ~228px across on
                // desktop, shrinking a little when the header compacts.
                height: { xs: 22, sm: 28, md: scrolled ? 34 : 40, xl: scrolled ? 38 : 46 },
                transition: "height 0.25s ease",
              }}
            >
              <Image
                src="https://pblol2.blob.core.windows.net/kronox/favicons/kronox-logo-cropped.svg"
                alt="Kronox Valves"
                width={262}
                height={46}
                priority
                unoptimized
                style={{ height: "100%", width: "auto" }}
              />
            </Box>

            {/* Search + account + cart (desktop), all on the logo line */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                gap: { md: 1.5, lg: 2 },
                ml: { md: 3, lg: 5 },
              }}
            >
              <Box sx={{ flex: 1, maxWidth: 760, mx: "auto", pr: { md: 0.5, lg: 2 } }}>
                <SearchBar fullWidth prominent />
              </Box>
              <DesktopAccount />
              <DesktopCart />
            </Box>

            {/* Mobile trigger */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <IconButton
                component={Link}
                href="/search"
                aria-label="Search"
                sx={{ color: INK }}
              >
                <SearchIcon />
              </IconButton>
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

        {/* Second line (desktop): page links left, actions right */}
        <Box sx={{ display: { xs: "none", md: "block" }, bgcolor: "#fff", borderTop: `1px solid ${LINE}` }}>
          <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 56 }}>
            {/* Left nav (desktop) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                whiteSpace: "nowrap",
                gap: { md: 2.5, lg: 3.5, xl: 4.5 },
              }}
            >
              {LEFT_NAV.map((item) => {
                // Products shows as open while any category dropdown is open.
                const active = !!item.megaMenu && categoryOpen !== null;
                const current = isCurrent(item.href);
                return (
                  <Box
                    key={item.label}
                    sx={
                      typeof item.wideOnly === "number"
                        ? {
                            display: "none",
                            [`@media (min-width:${item.wideOnly}px)`]: {
                              display: "block",
                            },
                          }
                        : item.wideOnly
                          ? { display: { md: "none", lg: "block" } }
                          : undefined
                    }
                    // Other header links close the products dropdown.
                    onMouseEnter={() =>
                      item.megaMenu ? openProducts() : closeCategory()
                    }
                    onFocus={() => item.megaMenu && openProducts()}
                  >
                    <Box
                      component={Link}
                      href={item.href}
                      onPointerDown={(e: React.PointerEvent) => {
                        if (item.megaMenu) {
                          productsTap.current = {
                            isTouch: e.pointerType !== "mouse",
                            wasOpen: categoryOpen !== null,
                          };
                        }
                      }}
                      onClick={(e: React.MouseEvent) => {
                        if (
                          item.megaMenu &&
                          productsTap.current.isTouch &&
                          !productsTap.current.wasOpen
                        ) {
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
                        color: active || current ? ACCENT : INK,
                        fontSize: "0.98rem",
                        fontWeight: 700,
                        letterSpacing: "0.01em",
                        textTransform: "none",
                        py: 1.6,
                        transition: "color 0.15s ease",
                        isolation: "isolate",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          zIndex: -1,
                          top: "50%",
                          left: -10,
                          right: -10,
                          height: 30,
                          mt: "-15px",
                          bgcolor: "rgba(224,57,62,0.1)",
                          transform: current ? "skewX(-18deg) scaleX(1)" : "skewX(-18deg) scaleX(0)",
                          transformOrigin: "left center",
                          transition: "transform 0.25s cubic-bezier(.6,.05,.3,1)",
                        },
                        "&:hover": { color: ACCENT },
                        "&:hover::before": { transform: "skewX(-18deg) scaleX(1)" },
                      }}
                    >
                      {item.label}
                      {item.megaMenu && (
                        <KeyboardArrowDownIcon
                          sx={{
                            fontSize: 16,
                            transition: "transform 0.2s ease",
                            transform: active ? "rotate(180deg)" : "none",
                            color: active || current ? ACCENT : INK,
                          }}
                        />
                      )}
                      <Box
                        className="nav-underline"
                        sx={{
                          position: "absolute",
                          bottom: 4,
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
                gap: { md: 1.25, lg: 1.75, xl: 2.25 },
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
                    position: "relative",
                    textDecoration: "none",
                    color: RUST,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    py: 1.6,
                    transition: "color 0.15s ease",
                    "&:hover": { color: INK },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 2,
                      bgcolor: ACCENT,
                      transition: "width 0.2s ease",
                    },
                    "&:hover::after": { width: 22 },
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
                  color: INK,
                  fontWeight: 700,
                  fontSize: "0.84rem",
                  height: 40,
                  px: 1,
                  whiteSpace: "nowrap",
                  transition: "color 0.15s ease",
                  "& svg": { color: ACCENT },
                  "&:hover": { color: ACCENT },
                }}
              >
                <CreditCardOutlinedIcon sx={{ fontSize: 19 }} />
                {/* Short label on laptop widths so the nav doesn't wrap. */}
                <Box
                  component="span"
                  sx={{ display: { xs: "none", xl: "inline" } }}
                >
                  Apply for Credit
                </Box>
                <Box
                  component="span"
                  sx={{ display: { xs: "inline", xl: "none" } }}
                >
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
                  position: "relative",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, #E0393E 0%, #C42E33 100%)",
                  color: theme.palette.primary.contrastText,
                  fontWeight: 800,
                  fontSize: "0.84rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  height: 40,
                  px: 2.5,
                  transform: "skewX(-14deg)",
                  boxShadow: "0 8px 20px rgba(224,57,62,0.3)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  "& > .inner": { transform: "skewX(14deg)", display: "inline-flex", alignItems: "center", gap: 0.75 },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "40%",
                    left: "-60%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
                    animation: "kxShine 3.6s ease-in-out infinite",
                  },
                  "@keyframes kxShine": {
                    "0%, 60%": { left: "-60%" },
                    "100%": { left: "130%" },
                  },
                  "&:hover": {
                    transform: "skewX(-14deg) translateY(-2px)",
                    boxShadow: "0 12px 26px rgba(224,57,62,0.4)",
                  },
                  "@media (prefers-reduced-motion: reduce)": { "&::after": { animation: "none" } },
                }}
              >
                <span className="inner">
                  <StorefrontOutlinedIcon sx={{ fontSize: 19 }} />
                  Shop
                </span>
              </Box>

              <Box
                component={Link}
                href="/contact"
                sx={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  border: `1.5px solid ${ACCENT}`,
                  color: ACCENT,
                  bgcolor: "#fff",
                  fontWeight: 800,
                  fontSize: "0.84rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  height: 40,
                  px: 2.5,
                  transform: "skewX(-14deg)",
                  transition: "background-color 0.15s ease, color 0.15s ease",
                  "& > .inner": { transform: "skewX(14deg)", display: "inline-block" },
                  "&:hover": {
                    bgcolor: ACCENT,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                <span className="inner">Contact</span>
              </Box>

            </Box>

          </Container>
        </Box>

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
