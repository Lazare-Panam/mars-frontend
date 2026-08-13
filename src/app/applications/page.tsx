"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import Image from "next/image";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import DirectionsBoatFilledOutlinedIcon from "@mui/icons-material/DirectionsBoatFilledOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";

type Industry = {
  label: string;
  image: string;
  icon: typeof LocalFireDepartmentOutlinedIcon;
  description: string;
};

// Copy grounded in what MARS Valve Co., Ltd (Taiwan) actually publishes about
// itself: ISO 9001 certified manufacturer of stainless steel ball valves,
// known specifically for API 607 4th Edition fire-safe test certification,
// which is called out by the manufacturer as its advantage in Oil & Gas,
// Refining, and Chemical applications. The other sectors (general machinery,
// power generation, water supply, marine) reflect the industries stainless
// ball valves are broadly used in and match the categories already used
// elsewhere on this site (IndustriesSection component) — but haven't been
// independently verified as named MARS Valve reference sectors the way
// Oil & Gas/Chemical have. Worth checking against MARS's own literature
// before treating every sector claim here as gospel.
const INDUSTRIES: Industry[] = [
  {
    label: "Oil & Gas / Refining",
    icon: LocalFireDepartmentOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1726111262949-e22631a8c376?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    description:
      "MARS ball valves are tested to the API 607 4th Edition fire-safe standard, one of the most demanding fire-test protocols in the industry. That rating matters most where it's needed most: upstream production, refining, and processing lines where a valve has to keep sealing even if the line around it is on fire.",
  },
  {
    label: "Chemical Processing",
    icon: OpacityOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1726731782158-fcf6822b6ca4?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    description:
      "Chemical plants move corrosive, high-purity, or hazardous media through miles of pipework, often at extreme temperatures and pressures. Stainless steel construction and fire-safe sealing give operators a valve that holds up to aggressive media without becoming the weak point in the line.",
  },
  {
    label: "General Machinery",
    icon: PrecisionManufacturingOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    description:
      "From compressed air and hydraulic circuits to process skids and OEM equipment builds, general industrial machinery depends on valves that are consistent batch to batch — so equipment builders can design around a known, repeatable spec.",
  },
  {
    label: "Power Generation",
    icon: BoltOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    description:
      "Power plants run continuously, often for years between planned outages. Isolation and control valves in steam, cooling, and auxiliary systems need to hold a seal reliably under sustained thermal cycling and pressure.",
  },
  {
    label: "Water Supply",
    icon: WaterDropOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1767274714714-dda4c25c6376?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    description:
      "Municipal and industrial water systems call for valves that resist corrosion over long service lives with minimal maintenance — stainless construction is built for exactly that kind of long-duty, low-intervention use.",
  },
  {
    label: "Marine & Shipbuilding",
    icon: DirectionsBoatFilledOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1670121180530-cfcba4438038?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    description:
      "Onboard piping — fuel, ballast, cooling, and fire main systems — operates in a corrosive marine environment where a valve failure isn't a quick fix. Reliability and corrosion resistance are non-negotiable at sea.",
  },
];

export default function ApplicationsPage() {
  return (
    <Box component="main" sx={{ bgcolor: "#fff" }}>
      {/* Hero */}
      <Box
        sx={{
          bgcolor: "#0a0604",
          color: "#fff",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="span"
            sx={{
              color: "primary.light",
              letterSpacing: "0.3em",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Applications
          </Typography>
          <Typography
            component="h1"
            sx={{
              mt: 1.5,
              fontSize: { xs: "2.25rem", md: "3.25rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: 760,
            }}
          >
            Where MARS valves go to work
          </Typography>
          <Typography
            sx={{
              mt: 2,
              color: "rgba(255,255,255,0.75)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: 640,
            }}
          >
            MARS Valve Co., Ltd is an ISO 9001 certified manufacturer of
            stainless steel ball valves, tested to the API 607 4th Edition
            fire-safe standard. That combination of build quality and fire-safe
            certification is why MARS valves are specified across demanding
            process and industrial environments worldwide.
          </Typography>
        </Container>
      </Box>

      {/* Industry sections */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 6, md: 8 }}>
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon;
            const imageFirst = i % 2 === 0;
            return (
              <Grid key={industry.label} size={{ xs: 12 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: imageFirst ? "row" : "row-reverse",
                    },
                    gap: { xs: 3, md: 6 },
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: { xs: "100%", md: "50%" },
                      height: { xs: 260, sm: 340, md: 380 },
                      borderRadius: "6px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={industry.image}
                      alt={industry.label}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 900px) 100vw, 50vw"
                    />
                  </Box>

                  <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          bgcolor: "primary.light",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon sx={{ color: "primary.main", fontSize: 22 }} />
                      </Box>
                      <Typography
                        component="h2"
                        sx={{
                          fontSize: { xs: "1.4rem", md: "1.65rem" },
                          fontWeight: 800,
                          color: "text.primary",
                        }}
                      >
                        {industry.label}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: "1rem",
                        lineHeight: 1.75,
                      }}
                    >
                      {industry.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
