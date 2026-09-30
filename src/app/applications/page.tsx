import { Box, Container, Typography, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import DirectionsBoatFilledOutlinedIcon from "@mui/icons-material/DirectionsBoatFilledOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import Reveal from "@/Common/Reveal";
import ProductLinkList, { buildProductIndex } from "../product-index/ProductLinkList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/applications" },
  title: {
    absolute: "marine valve and oil & gas valves applications- Mars valve",
  },
  description:
    "MARS marine valve and oil & gas valve applications — API 607 fire-safe stainless steel ball valves for demanding marine, oil & gas, chemical and process environments.",
};

type Industry = {
  label: string;
  image: string;
  imageAlt?: string;
  icon: typeof LocalFireDepartmentOutlinedIcon;
  description: string;
  /** Fills the "Discuss your … application" link to /contact. */
  ctaName: string;
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
    ctaName: "oil & gas",
    icon: LocalFireDepartmentOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1726111262949-e22631a8c376?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    description:
      "MARS ball valves are tested to the API 607 4th Edition fire-safe standard, one of the most demanding fire-test protocols in the industry. That rating matters most where it's needed most: upstream production, refining, and processing lines where a valve has to keep sealing even if the line around it is on fire.",
  },
  {
    label: "Chemical Processing",
    ctaName: "chemical processing",
    icon: OpacityOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1726731782158-fcf6822b6ca4?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    description:
      "Chemical plants move corrosive, high-purity, or hazardous media through miles of pipework, often at extreme temperatures and pressures. Stainless steel construction and fire-safe sealing give operators a valve that holds up to aggressive media without becoming the weak point in the line.",
  },
  {
    // Grounded in the MARS sanitary range published on this site (see the
    // CF3M vs CF8M tri-clamp post): 77SN/88SN/83SN/33SN in CF3M, 55SN/50SN
    // economical, tri-clamp or tube OD butt weld ends, ½"–4", 1,000 psi.
    label: "Food, Beverage & Pharma",
    ctaName: "food, beverage or pharma",
    icon: LocalDrinkOutlinedIcon,
    image: "https://pblol2.blob.core.windows.net/hiflux/food-beverage-mars.jpg",
    imageAlt: "Fresh food bowl representing the food and beverage industry",
    description:
      "Dairy, brewing, beverage, cosmetics and pharmaceutical lines need valves that clean easily and never trap product. MARS sanitary ball valves come with tri-clamp or tube OD butt weld ends in ½\" to 4\", with low-carbon CF3M (316L) bodies for welded, high-purity and clean-in-place service, and economical CF8M options for clamp-in food and beverage duty.",
  },
  {
    label: "General Machinery",
    ctaName: "machinery",
    icon: PrecisionManufacturingOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    description:
      "From compressed air and hydraulic circuits to process skids and OEM equipment builds, general industrial machinery depends on valves that are consistent batch to batch — so equipment builders can design around a known, repeatable spec.",
  },
  {
    label: "Power Generation",
    ctaName: "power generation",
    icon: BoltOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    description:
      "Power plants run continuously, often for years between planned outages. Isolation and control valves in steam, cooling, and auxiliary systems need to hold a seal reliably under sustained thermal cycling and pressure.",
  },
  {
    label: "Water Supply",
    ctaName: "water supply",
    icon: WaterDropOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1767274714714-dda4c25c6376?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    description:
      "Municipal and industrial water systems call for valves that resist corrosion over long service lives with minimal maintenance — stainless construction is built for exactly that kind of long-duty, low-intervention use.",
  },
  {
    label: "Marine & Shipbuilding",
    ctaName: "marine",
    icon: DirectionsBoatFilledOutlinedIcon,
    image:
      "https://images.unsplash.com/photo-1670121180530-cfcba4438038?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    description:
      "Onboard piping — fuel, ballast, cooling, and fire main systems — operates in a corrosive marine environment where a valve failure isn't a quick fix. Reliability and corrosion resistance are non-negotiable at sea.",
  },
];

export default async function ApplicationsPage() {
  const index = await buildProductIndex();
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
          <Reveal>
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
              Marine valve solutions for demanding environments
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
          </Reveal>
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
                <Reveal y={32}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: imageFirst ? "row" : "row-reverse",
                    },
                    gap: { xs: 3, md: 6 },
                    alignItems: "center",
                    "&:hover .app-industry-img": { transform: "scale(1.06)" },
                    "&:hover .app-industry-icon": { transform: "scale(1.1) rotate(-6deg)" },
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
                      alt={industry.imageAlt ?? industry.label}
                      fill
                      className="app-industry-img"
                      style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
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
                        className="app-industry-icon"
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          bgcolor: "primary.light",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "transform 0.3s ease",
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
                    <Typography
                      sx={{
                        mt: 2,
                        "& a": { color: "primary.main", fontWeight: 700 },
                      }}
                    >
                      <Link href="/contact">
                        Discuss your {industry.ctaName} application
                      </Link>
                    </Typography>
                  </Box>
                </Box>
                </Reveal>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Full product & variant link index — gives every product/variant page a
          second internal link (besides /product-index) from this page. */}
      <Box sx={{ bgcolor: "background.default", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 800, mb: 1 }}
          >
            Browse Every Valve
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 4 }}>
            Every product and variant in the MARS range — jump straight to any
            configuration.
          </Typography>
          <ProductLinkList index={index} />
        </Container>
      </Box>
    </Box>
  );
}
