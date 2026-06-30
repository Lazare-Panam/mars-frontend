"use client";

import { Box, Typography, Chip, Stack, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FeaturedValve } from "./featuredValveData";

export default function FeaturedCard({ valve }: { valve: FeaturedValve }) {
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        width: { xs: 260, sm: 300 },
        bgcolor: "#fff",
        border: "1px solid",
        borderColor: "rgba(0,0,0,0.08)",
        borderRadius: "4px",
        overflow: "hidden",
        transition: "border-color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-4px)",
        },
        "&:hover .mars-card-divider": {
          borderColor: "primary.main",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 180,
          bgcolor: "#fff",
        }}
      >
        <Image
          src={valve.image}
          alt={valve.title}
          fill
          style={{ objectFit: "contain", padding: "12px" }}
          sizes="300px"
        />
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: "primary.main",
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            px: 1,
            py: 0.4,
            borderRadius: "2px",
          }}
        >
          {valve.code}
        </Box>
      </Box>

      <Box
        className="mars-card-divider"
        sx={{
          p: 2.5,
          borderTop: "1px solid",
          borderColor: "rgba(0,0,0,0.08)",
          transition: "border-color 0.2s ease",
        }}
      >
        <Typography
          sx={{
            color: "primary.dark",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            mb: 0.5,
          }}
        >
          {valve.subtitle}
        </Typography>

        <Typography
          component="h3"
          sx={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
          }}
        >
          {valve.title}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "text.secondary",
            mb: 1.5,
            lineHeight: 1.5,
          }}
        >
          {valve.description}
        </Typography>

        <Stack
          direction="row"
          spacing={0.75}
          useFlexGap
          sx={{ flexWrap: "wrap", mb: 2 }}
        >
          {valve.specs.map((spec) => (
            <Chip
              key={spec}
              label={spec}
              size="small"
              sx={{
                bgcolor: "primary.light",
                color: "primary.dark",
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 22,
              }}
            />
          ))}
        </Stack>

        <Button
          component={Link}
          href={valve.href}
          size="small"
          sx={{
            color: "primary.main",
            fontWeight: 700,
            textTransform: "none",
            p: 0,
            minWidth: 0,
            cursor: "inherit",
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
        >
          View Series →
        </Button>
      </Box>
    </Box>
  );
}
