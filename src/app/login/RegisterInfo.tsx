"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const benefits = [
  { text: "Access to member pricing", icon: LocalOfferOutlinedIcon },
  { text: "Faster order delivery", icon: LocalShippingOutlinedIcon },
  { text: "Eligible for exclusive discounts", icon: PercentOutlinedIcon },
  { text: "API 607 certified products, verified", icon: VerifiedOutlinedIcon },
];

export default function RegisterInfo() {
  const router = useRouter();

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        maxWidth: 480,
        py: { xs: 4, md: 0 },
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ color: "primary.main", fontWeight: 800, mb: 1 }}
      >
        New Here?
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
        Create an account to get started with Mars Valves.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 5 }}>
        {benefits.map(({ text, icon: Icon }) => (
          <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "primary.light",
                flexShrink: 0,
              }}
            >
              <Icon sx={{ color: "primary.main", fontSize: 20 }} />
            </Box>
            <Typography variant="body1" sx={{ color: "text.primary", fontWeight: 500 }}>
              {text}
            </Typography>
          </Box>
        ))}
      </Box>

      <Button
        component={NextLink}
        href="/register"
        variant="contained"
        color="primary"
        size="large"
        sx={{ borderRadius: 0, px: 6, py: 1.75, fontWeight: 700, boxShadow: "none" }}
      >
        Register
      </Button>
    </Box>
  );
}