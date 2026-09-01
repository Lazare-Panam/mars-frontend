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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import Reveal from "@/Common/Reveal";
import MagneticWrap from "@/Common/MagneticWrap";

export default function CartPage() {
  const {
    basket,
    isLoading,
    error,
    fetchBasket,
    updateQuantity,
    removeItem,
    submitForQuote,
    isSubmittingQuote,
    lastQuoteRequest,
    submitQuoteError,
    clearSubmitQuoteError,
  } = useCartStore();
  const { isAuthenticated, hydrate } = useAuthStore();

  // Auth state is read from localStorage, which isn't available during SSR —
  // hydrate() syncs the store to it on mount, same pattern the store already
  // uses elsewhere.
  useEffect(() => {
    hydrate();
    fetchBasket();
  }, [fetchBasket, hydrate]);

  // Tracks the confirm-before-delete state for the qty-1 minus button
  // locally, keyed by productId, so only the row being confirmed shows the
  // warning rather than a global flag.
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  // Two distinct dialogs, deliberately not merged into one boolean:
  // - confirmQuoteOpen: "are you sure" gate before an authenticated user's
  //   request actually fires (a real network call with side effects on the
  //   backend — the basket gets deleted on success).
  // - loginPromptOpen: shown instead of the confirm dialog when there's no
  //   token, since submitting isn't even possible yet — the action here is
  //   "go log in", not "confirm".
  const [confirmQuoteOpen, setConfirmQuoteOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

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

  // Entry point from the main button: branch on auth *before* opening any
  // dialog, so an anonymous user never sees the confirm-and-submit dialog
  // for a request that's guaranteed to 401.
  const handleOpenSubmitFlow = () => {
    if (!isAuthenticated) {
      setLoginPromptOpen(true);
      return;
    }
    setConfirmQuoteOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmQuoteOpen(false);
    await submitForQuote();
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

  // After a successful RFQ submission the basket is cleared, so show a
  // confirmation instead of falling through to the empty-cart state, which
  // would otherwise look identical and give no indication anything happened.
  if (lastQuoteRequest) {
    return (
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          py: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth="sm">
          <Card variant="outlined" sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Quote request submitted
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {`Reference: ${lastQuoteRequest.quoteRequestId}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We&apos;ll be in touch with pricing and availability shortly.
            </Typography>
            <Button variant="contained" color="primary" href="/products">
              Continue Shopping
            </Button>
          </Card>
        </Container>
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

        {submitQuoteError?.kind === "empty-basket" && (
          <Alert severity="info" sx={{ mb: 3 }} onClose={clearSubmitQuoteError}>
            Your cart is empty — add an item before requesting a quote.
          </Alert>
        )}
        {submitQuoteError?.kind === "not-authenticated" && (
          <Alert
            severity="warning"
            sx={{ mb: 3 }}
            onClose={clearSubmitQuoteError}
            action={
              <Button color="inherit" size="small" href="/login?redirect=/cart">
                Log in
              </Button>
            }
          >
            {/* Covers the case where the token expired between page load and
                the confirm dialog — the store still surfaces a 401 as this
                same error kind, so it needs its own render path here too. */}
            Please log in to submit a quote request. Your cart will be waiting
            for you.
          </Alert>
        )}
        {submitQuoteError?.kind === "unknown" && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            onClose={clearSubmitQuoteError}
          >
            {submitQuoteError.message}
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
                      onClick={handleOpenSubmitFlow}
                      disabled={isSubmittingQuote}
                      sx={{
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {isSubmittingQuote ? (
                        <CircularProgress size={22} color="inherit" />
                      ) : hasUnpricedItems ? (
                        "Request Quote"
                      ) : (
                        "Proceed to Checkout"
                      )}
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

      {/* Confirm-before-submit modal — only reachable when isAuthenticated,
          since handleOpenSubmitFlow routes anonymous users to the login
          dialog instead. */}
      <Dialog
        open={confirmQuoteOpen}
        onClose={() => setConfirmQuoteOpen(false)}
        aria-labelledby="confirm-quote-title"
      >
        <DialogTitle id="confirm-quote-title">
          Submit this quote request?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`You're about to submit ${itemCount} ${
              itemCount === 1 ? "item" : "items"
            } for a quote. Your cart will be cleared once it's submitted.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmQuoteOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            variant="contained"
            color="primary"
            autoFocus
          >
            Submit Quote Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Login-required modal — shown instead of the confirm dialog when
          there's no valid token, so the user isn't asked to "confirm" a
          submission that can't succeed. */}
      <Dialog
        open={loginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        aria-labelledby="login-required-title"
      >
        <DialogTitle id="login-required-title">
          Log in to request a quote
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You&apos;ll need to be logged in to submit a quote request. Your
            cart will still be here when you get back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginPromptOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            href="/login?redirect=/cart"
            variant="contained"
            color="primary"
            autoFocus
          >
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
