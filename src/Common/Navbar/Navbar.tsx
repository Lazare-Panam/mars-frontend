"use client";

import React, { useEffect, useState, useRef } from "react";
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
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { LEFT_NAV, RIGHT_NAV, type NavItem } from "./navData";
import MegaMenuPanel from "./MegaMenuPanel";
import { useCartStore } from "@/store/useCartStore";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const INK = theme.palette.text.primary;
  const RUST = theme.palette.text.secondary;
  const PAPER = theme.palette.background.default;
  const ACCENT = theme.palette.primary.main;
  const LINE = theme.palette.divider;
  const REGISTER_RED = "#D32F2F";

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchBasket = useCartStore((s) => s.fetchBasket);
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const activeItem = LEFT_NAV.find((i) => i.label === openMenu);
  const filteredRightNav = RIGHT_NAV.filter(
    (item) => item.label !== "Contact Us",
  );

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

  const AccountButton = ({ size }: { size: number }) => (
    <Box
      component={Link}
      href="/login"
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
      <Typography
        sx={{
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: REGISTER_RED,
          lineHeight: 1,
        }}
      >
        Register
      </Typography>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: PAPER, color: INK, borderBottom: `1px solid ${LINE}` }}
        onMouseLeave={handleLeave}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ height: 88, justifyContent: "space-between" }}
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
                gap: 4,
                ml: 6,
              }}
            >
              {LEFT_NAV.map((item) => {
                const active = openMenu === item.label;
                return (
                  <Box
                    key={item.label}
                    onMouseEnter={() =>
                      item.megaMenu && handleEnter(item.label)
                    }
                  >
                    <Box
                      component={Link}
                      href={item.href}
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        textDecoration: "none",
                        color: active ? INK : RUST,
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
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
                gap: 4,
              }}
            >
              {filteredRightNav.map((item) => (
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
                  fontSize: "0.74rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  px: 2.5,
                  py: 1,
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: ACCENT,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                enquiry
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

        {/* Mega menu */}
        {openMenu && activeItem?.megaMenu && (
          <Box onMouseEnter={() => activeItem && handleEnter(activeItem.label)}>
            <MegaMenuPanel columns={activeItem.megaMenu} />
          </Box>
        )}
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
              href="/login"
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
              Login / Register
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
