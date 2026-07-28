"use client";

import { useEffect } from "react";
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
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { basket, isLoading, error, fetchBasket, updateQuantity, removeItem } =
    useCartStore();

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  const items = basket?.items ?? [];
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const hasUnpricedItems = items.some((i) => i.unitPrice === 0);
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const shipping = subtotal > 0 ? 12.5 : 0;
  const total = subtotal + shipping;

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

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {items.length === 0 ? (
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Browse our valve and fitting ranges to get started.
            </Typography>
            <Button variant="contained" color="primary" href="/products">
              Continue Shopping
            </Button>
          </Card>
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
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        sx={{ border: "1px solid", borderColor: "divider" }}
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
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        sx={{ border: "1px solid", borderColor: "divider" }}
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
                      sx={{ color: "text.secondary" }}
                      aria-label={`Remove ${item.productDescription}`}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Card>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
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
                      {`£${shipping.toFixed(2)}`}
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

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  {hasUnpricedItems ? "Request Quote" : "Proceed to Checkout"}
                </Button>
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
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}