"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FeaturedCard from "./FeaturedCard";
import { FEATURED_VALVES } from "./featuredValveData";
import Reveal from "@/Common/Reveal";

const CARD_GAP = 24;

/** Width that fits exactly `n` cards in the track, so none is cut off at the edge. */
const cardsPerView = (n: number) => `calc((100% - ${(n - 1) * CARD_GAP}px) / ${n})`;
const AUTOPLAY_MS = 3200;

const arrowBtnSx = {
  width: 40,
  height: 40,
  border: "1px solid",
  borderColor: "primary.main",
  borderRadius: "2px",
  color: "primary.main",
  transition: "background-color 0.2s ease, color 0.2s ease",
  "&:hover": {
    bgcolor: "primary.main",
    color: "#fff",
  },
} as const;

export default function FeaturedProducts() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);
  const dragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 320) + CARD_GAP;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch and pen already scroll the track natively; drag-to-scroll is
    // only for mouse.
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    dragged.current = false;
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    setPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartX.current;
    // Capture only once it's really a drag. Capturing on pointerdown would
    // retarget the click to the track, so tapping a card never followed its link.
    if (!dragged.current && Math.abs(dx) > 5) {
      dragged.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    el.scrollLeft = dragStartScroll.current - dx;
  };

  const endDrag = () => {
    isDragging.current = false;
    setPaused(false);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, scrollByCard]);

  return (
    <Box component="section" id="range" sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.default" }}>
      <Reveal>
        <Box
          sx={{
            maxWidth: "1280px",
            mx: "auto",
            px: { xs: 3, md: 8 },
            mb: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              component="span"
              sx={{
                color: "primary.main",
                letterSpacing: "0.3em",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Featured Range
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 800,
                color: "text.primary",
                mt: 1,
              }}
            >
              Featured MARS ball valves
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            <IconButton
              onClick={() => scrollByCard(-1)}
              aria-label="Previous products"
              sx={arrowBtnSx}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              onClick={() => scrollByCard(1)}
              aria-label="Next products"
              sx={arrowBtnSx}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>
      </Reveal>

      {/* Padding lives on this wrapper, not the scroll box, so cards clip at
          the column edge instead of sliding through the side gutters. */}
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 } }}>
      <Box
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          endDrag();
        }}
        onTouchStart={() => setPaused(true)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onClickCapture={handleClickCapture}
        sx={{
          display: "flex",
          gap: `${CARD_GAP}px`,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          // Room for the hover lift and shadow, which the scroll box would clip.
          pt: 1.5,
          pb: 4,
          cursor: "grab",
          userSelect: "none",
          "&:active": { cursor: "grabbing" },
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {FEATURED_VALVES.map((valve) => (
          <Box
            key={valve.code}
            data-card
            sx={{
              scrollSnapAlign: "start",
              display: "flex",
              flex: "0 0 auto",
              width: { xs: cardsPerView(1), sm: cardsPerView(2), lg: cardsPerView(3) },
            }}
          >
            <FeaturedCard valve={valve} />
          </Box>
        ))}
      </Box>
      </Box>
    </Box>
  );
}
