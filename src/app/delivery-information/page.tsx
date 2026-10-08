"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PlaceIcon from "@mui/icons-material/Place";
import PaymentsIcon from "@mui/icons-material/Payments";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import BlockIcon from "@mui/icons-material/Block";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import { alpha } from "@mui/material/styles";
import Reveal from "@/Common/Reveal";

// Only what's confirmed (Oct 2026): UK supply only (the MARS authorisation
// covers the UK), UK stock series, 4–5 week factory lead time, packages made
// to order. Dispatch days, delivery charges and tracking are confirmed per
// order rather than promised here.
const deliveryPoints = [
  {
    icon: <Inventory2Icon />,
    title: "UK Stock",
    text: "We hold UK stock of MARS Series 10-10, 20-40, 77 and 88. Stock availability and the dispatch date are confirmed with your order.",
  },
  {
    icon: <LocalShippingIcon />,
    title: "Factory Items",
    text: "Series and sizes not held in UK stock are supplied from the MARS factory with a lead time of 4–5 weeks, confirmed when you order.",
  },
  {
    icon: <PrecisionManufacturingIcon />,
    title: "Actuated Packages",
    text: "Valve and actuator packages are made to order, not held ready-made. The lead time is confirmed with your quote.",
  },
  {
    icon: <PlaceIcon />,
    title: "UK Delivery Only",
    text: "We supply MARS valves to customers in the United Kingdom only, as an authorised UK distributor.",
  },
  {
    icon: <PaymentsIcon />,
    title: "Delivery Costs",
    text: "Delivery charges depend on the size and weight of the order and are confirmed on your quote or at checkout.",
  },
  {
    icon: <TrackChangesIcon />,
    title: "Order Updates",
    text: "We keep you updated on your order and send dispatch details when it leaves us. For an update at any time, contact our team.",
  },
];

const returnPoints = [
  {
    icon: <EventBusyIcon />,
    title: "30-Day Return Window",
    text: "Items may be returned within 30 days of delivery for a refund or exchange, provided they're unused and in original packaging.",
  },
  {
    icon: <BlockIcon />,
    title: "Non-Returnable Items",
    text: "Made-to-order items, including actuated packages and factory-ordered valves, can't be returned unless faulty or damaged.",
  },
  {
    icon: <BuildCircleIcon />,
    title: "Faulty or Damaged Goods",
    text: "Report faulty or damaged items within 48 hours of delivery. We'll arrange a replacement or full refund at no cost to you.",
  },
  {
    icon: <AssignmentReturnIcon />,
    title: "How to Start a Return",
    text: "Email us with your order number and reason for return. We'll issue return instructions within 1 working day.",
  },
];

const InfoCard = ({
  icon,
  title,
  text,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  index: number;
}) => (
  <Grid size={{ xs: 12, sm: 6 }}>
    <Reveal delay={Math.min(index * 60, 300)}>
      <Stack
        spacing={2}
        sx={{
          height: "100%",
          p: 4,
          bgcolor: "#fff",
          border: "1px solid",
          borderColor: "divider",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "primary.main",
            boxShadow: (theme) =>
              `0 15px 30px ${alpha(theme.palette.primary.main, 0.12)}`,
          },
        }}
      >
        <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 800, color: "text.primary" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.7 }}
        >
          {text}
        </Typography>
      </Stack>
    </Reveal>
  </Grid>
);

const DeliveryReturnsPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box component="section" sx={{ bgcolor: "background.default" }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", mb: 2 }}
          >
            <Typography
              variant="overline"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                letterSpacing: 1.5,
              }}
            >
              Customer Service
            </Typography>
            <Box sx={{ width: 40, height: "1px", bgcolor: "primary.main" }} />
          </Stack>
          <Reveal>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 800, fontSize: { xs: "2.25rem", md: "3rem" } }}
            >
              Delivery{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                & Returns
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", maxWidth: 640, mt: 2 }}
            >
              How we supply MARS valves in the UK, our lead times, and how to
              return an order if something isn&apos;t right.
            </Typography>
          </Reveal>
        </Container>
      </Box>

      {/* Tabs */}
      <Box sx={{ bgcolor: "#fff", borderBottom: 1, borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Tabs
            value={tab}
            onChange={(_e, v) => setTab(v)}
            sx={{
              "& .MuiTabs-indicator": {
                bgcolor: "primary.main",
                height: 3,
                borderRadius: 0,
              },
              "& .MuiTab-root": {
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                color: "text.secondary",
                "&.Mui-selected": { color: "text.primary" },
              },
            }}
          >
            <Tab label="Delivery Information" />
            <Tab label="Returns Policy" />
          </Tabs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        {tab === 0 && (
          <Stack spacing={6}>
            <Reveal>
              <Box sx={{ maxWidth: 700 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                  Delivery Information
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.7 }}
                >
                  We supply MARS valves within the United Kingdom. Lead times
                  depend on whether your series and size is held in UK stock or
                  ordered from the factory; we confirm the lead time and delivery
                  cost with every quote and order.
                </Typography>
              </Box>
            </Reveal>
            <Grid container spacing={3}>
              {deliveryPoints.map((p, i) => (
                <InfoCard key={i} {...p} index={i} />
              ))}
            </Grid>
          </Stack>
        )}

        {tab === 1 && (
          <Stack spacing={6}>
            <Reveal>
              <Box sx={{ maxWidth: 700 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                  Returns Policy
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.7 }}
                >
                  We want you to be happy with your order. If something isn't
                  right, here's how returns work.
                </Typography>
              </Box>
            </Reveal>
            <Grid container spacing={3}>
              {returnPoints.map((p, i) => (
                <InfoCard key={i} {...p} index={i} />
              ))}
            </Grid>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default DeliveryReturnsPage;
