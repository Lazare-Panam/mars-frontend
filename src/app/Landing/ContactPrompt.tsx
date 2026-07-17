"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SCROLL_DOWN_COUNT_TRIGGER = 2;
const MIN_SCROLL_DELTA = 20; // px — ignore tiny/accidental scrolls
const STORAGE_KEY = "hasSeenContactPrompt";

export default function ContactPrompt() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const lastScrollY = React.useRef(0);
  const scrollDownCount = React.useRef(0);
  const hasTriggered = React.useRef(false);
  const isFirstTimeVisitor = React.useRef(false);

  React.useEffect(() => {
    const alreadySeen = localStorage.getItem(STORAGE_KEY);

    if (alreadySeen) {
      hasTriggered.current = true;
      isFirstTimeVisitor.current = false;
    } else {
      isFirstTimeVisitor.current = true;
    }

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (hasTriggered.current || !isFirstTimeVisitor.current) return;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (delta > MIN_SCROLL_DELTA) {
        scrollDownCount.current += 1;

        if (scrollDownCount.current >= SCROLL_DOWN_COUNT_TRIGGER) {
          hasTriggered.current = true;
          localStorage.setItem(STORAGE_KEY, "true");
          setOpen(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoToContact = () => {
    setOpen(false);
    router.push("/contact");
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 2, p: 1 },
        },
      }}
    >
      <IconButton
        onClick={() => setOpen(false)}
        sx={{ position: "absolute", top: 8, right: 8 }}
        size="small"
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogContent sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
          Looking for something specific?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Skip the scrolling — talk to us directly. We'll give you the best
          price in the market, fast.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            endIcon={<ArrowForwardIcon />}
            onClick={handleGoToContact}
            sx={{
              py: 1.3,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "4px",
            }}
          >
            Get in touch
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => setOpen(false)}
            sx={{ textTransform: "none", color: "text.secondary" }}
          >
            Keep browsing
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
