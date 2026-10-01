"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  IconButton,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useQuoteStore } from "@/store/useQuoteStore";
import Reveal from "@/Common/Reveal";
import MagneticWrap from "@/Common/MagneticWrap";

export default function CartPage() {
  const { basket, isLoading, error, fetchBasket, updateQuantity, removeItem } =
    useCartStore();
  const setQuote = useQuoteStore((s) => s.setRequest);
  const router = useRouter();

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  // Tracks the confirm-before-delete state for the qty-1 minus button
  // locally, keyed by productId, so only the row being confirmed shows the
  // warning rather than a global flag.
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const items = basket?.items ?? [];
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const hasUnpricedItems = items.some((i) => i.unitPrice === 0);
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const shipping = subtotal > 0 ? 12.5 : 0;
  const total = subtotal + shipping;

  const handleDecrement = (productId: string, quantity: number) => {
    if (quantity <= 1) {
      // Decrementing from 1 removes the item server-side (backend treats
      // quantity <= 0 as a delete) — confirm instead of silently dropping it.
      if (confirmRemoveId === productId) {
        updateQuantity(productId, 0);
        setConfirmRemoveId(null);
      } else {
        setConfirmRemoveId(productId);
      }
      return;
    }
    updateQuantity(productId, quantity - 1);
  };

  // "Proceed to quote" hands the whole cart to the contact form using the
  // same in-memory pattern the product pages use (useQuoteStore -> /contact):
  // the message is pre-filled with every line, and the user finishes and sends
  // the enquiry from there. No order/basket API call is made.
  const handleRequestQuote = () => {
    if (items.length === 0) return;
    const lines = items.map((i) => ({
      sku: i.productDescription,
      quantity: i.quantity,
    }));
    setQuote({ sku: lines[0].sku, items: lines });
    router.push("/contact");
  };

  if (isLoading && !basket) {
    return (
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Reveal>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
              mb: 4,
            }}
          >
            <ShoppingCartOutlinedIcon
              sx={{ color: "primary.main", fontSize: 32 }}
            />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Your Cart
            </Typography>
            {itemCount > 0 && (
              <Chip
                label={`${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                size="small"
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.dark",
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
        </Reveal>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {items.length === 0 ? (
          <Reveal>
            <Card
              variant="outlined"
              sx={{
                py: 8,
                textAlign: "center",
                borderStyle: "dashed",
                borderColor: "divider",
                bgcolor: "transparent",
              }}
            >
              <ShoppingCartOutlinedIcon
                sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Your cart is empty
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Browse our valve and fitting ranges to get started.
              </Typography>
              <Button variant="contained" color="primary" href="/products">
                Continue Shopping
              </Button>
            </Card>
          </Reveal>
        ) : (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map((item) => (
                  <Card
                    key={item.id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      borderColor: "divider",
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        bgcolor: "rgba(231,57,15,0.03)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: 88,
                        height: 88,
                        flexShrink: 0,
                        borderRadius: 1.5,
                        overflow: "hidden",
                        bgcolor: "grey.100",
                      }}
                    >
                      <Image
                        src={item.pictureUrl}
                        alt={item.productDescription}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </Box>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle1"
                        noWrap
                        sx={{ fontWeight: 600 }}
                      >
                        {item.productDescription}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`SKU: ${item.productId}`}
                      </Typography>
                      {item.unitPrice > 0 ? (
                        <Typography
                          variant="body2"
                          color="primary.dark"
                          sx={{ fontWeight: 600, mt: 0.5 }}
                        >
                          {`£${item.unitPrice.toFixed(2)}`}
                        </Typography>
                      ) : (
                        <Chip
                          label="Quote pending"
                          size="small"
                          sx={{
                            mt: 0.5,
                            bgcolor: "primary.light",
                            color: "primary.dark",
                            fontWeight: 600,
                          }}
                        />
                      )}
                      {confirmRemoveId === item.productId && (
                        <Typography
                          variant="caption"
                          color="warning.main"
                          sx={{ display: "block", mt: 0.5, fontWeight: 600 }}
                        >
                          Click − again to remove this item
                        </Typography>
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleDecrement(item.productId, item.quantity)
                        }
                        sx={{
                          border: "1px solid",
                          borderColor:
                            confirmRemoveId === item.productId
                              ? "warning.main"
                              : "divider",
                          transition:
                            "background-color 0.2s ease, transform 0.2s ease",
                          "&:hover": {
                            bgcolor: "rgba(231,57,15,0.08)",
                            transform: "scale(1.05)",
                          },
                        }}
                        aria-label={
                          item.quantity <= 1
                            ? `Remove ${item.productDescription}`
                            : `Decrease quantity of ${item.productDescription}`
                        }
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{ width: 24, textAlign: "center", fontWeight: 600 }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setConfirmRemoveId(null);
                          updateQuantity(item.productId, item.quantity + 1);
                        }}
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          transition:
                            "background-color 0.2s ease, transform 0.2s ease",
                          "&:hover": {
                            bgcolor: "rgba(231,57,15,0.08)",
                            transform: "scale(1.05)",
                          },
                        }}
                        aria-label={`Increase quantity of ${item.productDescription}`}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Typography
                      sx={{ width: 90, textAlign: "right", fontWeight: 700 }}
                    >
                      {item.unitPrice > 0
                        ? `£${(item.unitPrice * item.quantity).toFixed(2)}`
                        : "—"}
                    </Typography>

                    <IconButton
                      onClick={() => removeItem(item.productId)}
                      sx={{
                        color: "text.secondary",
                        transition: "color 0.2s ease, transform 0.2s ease",
                        "&:hover": {
                          color: "error.main",
                          transform: "scale(1.1)",
                        },
                      }}
                      aria-label={`Remove ${item.productDescription}`}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Card>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Reveal>
              <Card
                variant="outlined"
                sx={{
                  p: 3,
                  position: { md: "sticky" },
                  top: { md: 24 },
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Order Summary
                </Typography>

                {hasUnpricedItems && (
                  <Alert severity="info" sx={{ mb: 2, fontSize: "0.8rem" }}>
                    Some items need a quote before pricing is confirmed.
                  </Alert>
                )}

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Subtotal
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {`£${subtotal.toFixed(2)}`}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <LocalShippingOutlinedIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Shipping
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                     To be resolved
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary.dark"
                    sx={{ fontWeight: 700 }}
                  >
                    {`£${total.toFixed(2)}`}
                  </Typography>
                </Box>

                <Box sx={{ display: "grid" }}>
                  <MagneticWrap strength={0.15}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={handleRequestQuote}
                      sx={{
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Request Quote
                    </Button>
                  </MagneticWrap>
                </Box>
                <Button
                  variant="text"
                  color="inherit"
                  fullWidth
                  href="/products"
                  sx={{ mt: 1 }}
                >
                  Continue Shopping
                </Button>
              </Card>
              </Reveal>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
