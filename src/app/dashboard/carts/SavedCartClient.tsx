"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import type { BasketItem } from "@/api/cart.api";
import { useSavedCartStore } from "@/store/useSavedCartStore";
import { useQuoteStore } from "@/store/useQuoteStore";

const MAX_QUANTITY = 10000;

interface Props {
  // Series id → category id, so each product code can link to its variant page.
  categoryBySeries: Record<string, string>;
}

const variantHref = (item: BasketItem, categoryBySeries: Record<string, string>) => {
  const category = item.seriesId ? categoryBySeries[item.seriesId] : undefined;
  return category ? `/products/${category}/${item.seriesId}/variants/${item.productId}` : null;
};

export default function SavedCartClient({ categoryBySeries }: Props) {
  const { basket, isLoading, error, fetchSavedCart, updateQuantity, removeItem } = useSavedCartStore();
  const setQuote = useQuoteStore((s) => s.setRequest);
  const router = useRouter();

  useEffect(() => {
    fetchSavedCart();
  }, [fetchSavedCart]);

  const items = basket?.items ?? [];

  // Edit dialog (quantity) for one item.
  const [editing, setEditing] = useState<BasketItem | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [saving, setSaving] = useState(false);
  const quantityNumber = Number(quantity);
  const quantityValid = Number.isInteger(quantityNumber) && quantityNumber >= 1 && quantityNumber <= MAX_QUANTITY;

  const openEdit = (item: BasketItem) => {
    setEditing(item);
    setQuantity(String(item.quantity));
  };

  const saveEdit = async () => {
    if (!editing || !quantityValid) return;
    setSaving(true);
    const ok = await updateQuantity(editing.productId, quantityNumber);
    setSaving(false);
    if (ok) setEditing(null);
  };

  // Delete asks once, inside the row, before removing.
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Until the RFQ APIs exist, the saved cart is handed to the contact form
  // (same as product pages).
  const handleSubmitQuote = () => {
    if (items.length === 0) return;
    const lines = items.map((i) => ({
      sku: i.productDescription,
      quantity: i.quantity,
    }));
    setQuote({ sku: lines[0].sku, items: lines });
    router.push("/contact");
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, mb: 3, pl: 2, borderLeft: "4px solid", borderColor: "primary.main" }}
      >
        Saved Cart
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {isLoading && !basket ? (
        <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
          <CircularProgress color="primary" />
        </Box>
      ) : items.length === 0 ? (
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Your saved cart is empty
          </Typography>
          <Typography color="text.secondary" className="no-capitalize" sx={{ mb: 3 }}>
            Add products to your cart, then click &quot;Save Cart&quot; to keep them here.
          </Typography>
          <Button variant="contained" component={Link} href="/products">
            Browse Products
          </Button>
        </Paper>
      ) : (
        <>
          <TableContainer component={Paper} variant="outlined" sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 480 }} aria-label="Saved cart items">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Product Code</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">
                    Qty
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Manage
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          sx={{
                            position: "relative",
                            width: 56,
                            height: 56,
                            flexShrink: 0,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          {item.pictureUrl && (
                            <Image
                              src={item.pictureUrl}
                              alt={item.productDescription}
                              fill
                              sizes="56px"
                              style={{ objectFit: "contain" }}
                            />
                          )}
                        </Box>
                        {(() => {
                          const href = variantHref(item, categoryBySeries);
                          const codeSx = { fontWeight: 600, color: "primary.main", whiteSpace: "nowrap" } as const;
                          return href ? (
                            <Box
                              component={Link}
                              href={href}
                              sx={{ ...codeSx, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                            >
                              {item.productDescription}
                            </Box>
                          ) : (
                            <Box component="span" sx={codeSx}>
                              {item.productDescription}
                            </Box>
                          );
                        })()}
                      </Box>
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                      {confirmDeleteId === item.productId ? (
                        <>
                          <Button size="small" color="error" onClick={async () => {
                            await removeItem(item.productId);
                            setConfirmDeleteId(null);
                          }}>
                            Remove
                          </Button>
                          <Button size="small" color="inherit" onClick={() => setConfirmDeleteId(null)}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Tooltip title="Edit quantity">
                            <IconButton aria-label={`Edit ${item.productDescription}`} onClick={() => openEdit(item)}>
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Remove">
                            <IconButton
                              aria-label={`Remove ${item.productDescription}`}
                              onClick={() => setConfirmDeleteId(item.productId)}
                              sx={{ color: "error.main" }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 1.5, mt: 3 }}>
            <Button variant="outlined" component={Link} href="/products">
              Add More Products
            </Button>
            <Button variant="contained" size="large" onClick={handleSubmitQuote}>
              Submit Quotation Request
            </Button>
          </Box>
        </>
      )}

      <Dialog open={editing !== null} onClose={() => !saving && setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit {editing?.productDescription}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: "8px !important" }}>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={!quantityValid}
            helperText={!quantityValid ? `Enter a whole number from 1 to ${MAX_QUANTITY}.` : " "}
            slotProps={{ htmlInput: { min: 1, max: MAX_QUANTITY, step: 1 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setEditing(null)} disabled={saving}>
            Cancel
          </Button>
          <Button variant="contained" onClick={saveEdit} disabled={!quantityValid || saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
