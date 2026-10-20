"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useSubmitStockListRequest } from "@/api/useSubmitStockListRequest";

export default function StockNotifyDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { mutate, isPending, isSuccess, isError, reset } = useSubmitStockListRequest();

  const handleClose = () => {
    onClose();
    // Reset after the close animation so the form is fresh next time.
    setTimeout(() => {
      reset();
      setName("");
      setEmail("");
      setPhone("");
    }, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    mutate({ name: name.trim(), email: email.trim(), phone: phone.trim() });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <IconButton
        onClick={handleClose}
        aria-label="Close"
        sx={{ position: "absolute", top: 8, right: 8, color: "text.secondary" }}
      >
        <CloseRoundedIcon />
      </IconButton>

      {isSuccess ? (
        <DialogContent sx={{ textAlign: "center", py: 5 }}>
          <CheckCircleRoundedIcon sx={{ fontSize: 52, color: "success.main", mb: 1.5 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            You&apos;re on the list
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
            Check your inbox — we&apos;ve sent the stock list and catalogue, and you&apos;ll get
            first pick when the November shipment lands.
          </Typography>
          <Button onClick={handleClose} variant="contained" sx={{ mt: 3, fontWeight: 700 }}>
            Done
          </Button>
        </DialogContent>
      ) : (
        <>
          <DialogTitle sx={{ pr: 6, fontWeight: 800 }}>
            Get the November stock list
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", fontWeight: 400, mt: 0.5 }}>
              We&apos;ll email you the stock list and catalogue, and put you on the priority list.
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 0.5 }}>
              {isError && (
                <Alert severity="error" sx={{ fontSize: "0.85rem" }}>
                  Something went wrong. Please try again, or email{" "}
                  <a href="mailto:sales@marsvalvenok.com">sales@marsvalvenok.com</a>.
                </Alert>
              )}
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                size="small"
                autoFocus
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                size="small"
              />
              <TextField
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                fullWidth
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                sx={{ fontWeight: 700, py: 1.1, mt: 0.5 }}
              >
                {isPending ? <CircularProgress size={22} color="inherit" /> : "Send me the stock list"}
              </Button>
              <Typography sx={{ color: "text.secondary", fontSize: "0.72rem", textAlign: "center" }}>
                We&apos;ll only use your details to send the stock list and contact you about this shipment.
              </Typography>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
