"use client";

import { Box, Typography } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import Reveal from "@/Common/Reveal";

// Says what we offer without comparing against anyone else. (This replaced an
// "authorised vs unauthorised seller" table, which read as a dig at other
// sellers.)
const POINTS = [
  {
    icon: VerifiedOutlinedIcon,
    title: "Authorised by the manufacturer",
    text: "Letter of authorisation from Mars Valve Co., Ltd. available to view.",
  },
  {
    icon: DescriptionOutlinedIcon,
    title: "Traceable documentation",
    text: "Manufacturer certificates and datasheets for the series you order.",
  },
  {
    icon: ScienceOutlinedIcon,
    title: "Material confirmation",
    text: "CF8M (316) or CF3M (316L), as specified on your order.",
  },
  {
    icon: ShieldOutlinedIcon,
    title: "Warranty",
    text: "Mars Valve Co. manufacturer warranty, honoured through us.",
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: "Technical support",
    text: "Help choosing series, seat material, end connection and actuation.",
  },
  {
    icon: WorkspacePremiumOutlinedIcon,
    title: "JOSCAR-registered supplier",
    text: "Registered on JOSCAR for approved-vendor lists.",
  },
];

export default function DistributorComparison() {
  return (
    <Box component="section" id="authorised" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
      <Reveal>
        <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 }, mb: { xs: 5, md: 7 }, textAlign: "center" }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "primary.main",
                textTransform: "uppercase",
              }}
            >
              Why Order From Us
            </Typography>
            <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
          </Box>
          <Typography
            component="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 800, color: "text.primary", mb: 2 }}
          >
            What you get when you order from Mars Valvenok
          </Typography>
          <Typography sx={{ color: "text.secondary", maxWidth: 600, mx: "auto", lineHeight: 1.7 }}>
            On hazardous or fire-safe duty, the documentation matters as much
            as the valve.
          </Typography>
        </Box>
      </Reveal>

      <Box
        component="ul"
        sx={{
          maxWidth: 1180,
          mx: "auto",
          px: { xs: 3, md: 8 },
          my: 0,
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" },
          gap: 2.5,
        }}
      >
        {POINTS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 80}>
            <Box
              component="li"
              sx={{
                height: "100%",
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "6px",
                bgcolor: "rgba(231,57,15,0.02)",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
                "&:hover": { borderColor: "primary.main", bgcolor: "rgba(231,57,15,0.05)" },
              }}
            >
              <Icon sx={{ color: "primary.main", fontSize: 28, mb: 1.5 }} />
              <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "text.primary", mb: 0.75 }}>
                {title}
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.6 }}>
                {text}
              </Typography>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}
