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
import FAQSection from "@/app/Landing/FAQSection";
import { JsonLd, breadcrumbList } from "@/lib/jsonLd";
import ProductLinkList, { buildProductIndex } from "../product-index/ProductLinkList";
import { INDUSTRIES, FAQS, URLS, type IndustryId, type Item } from "./industries";
import type { Metadata } from "next";
import { BANNER_GRADIENT } from "@/theme/brand";

export const metadata: Metadata = {
  alternates: { canonical: "/applications" },
  title: {
    absolute: "Ball Valve Applications by Industry | MARS Valves UK",
  },
  description:
    "MARS ball valves for oil & gas, chemical, food & pharma, power, water and marine. Find the right series, material and end connection for your industry.",
};

const ICONS: Record<IndustryId, typeof LocalFireDepartmentOutlinedIcon> = {
  "oil-gas": LocalFireDepartmentOutlinedIcon,
  chemical: OpacityOutlinedIcon,
  "food-pharma": LocalDrinkOutlinedIcon,
  power: BoltOutlinedIcon,
  water: WaterDropOutlinedIcon,
  marine: DirectionsBoatFilledOutlinedIcon,
  machinery: PrecisionManufacturingOutlinedIcon,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const crumbs = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "Applications", path: "/applications" },
]);

const linkSx = { "& a": { color: "primary.main", fontWeight: 600 } };

const h2Sx = {
  fontSize: { xs: "1.5rem", md: "2rem" },
  fontWeight: 800,
  color: "text.primary",
};

const h3Sx = {
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "primary.main",
  mt: 2.5,
  mb: 0.75,
} as const;

function ItemText({ item }: { item: Item }) {
  if (typeof item === "string") return <>{item}</>;
  return (
    <>
      {item.before}
      <Link href={item.href}>{item.link}</Link>
      {item.after}
    </>
  );
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <Box
      component="ul"
      sx={{ m: 0, pl: 2.5, color: "text.secondary", fontSize: "0.95rem", lineHeight: 1.8, ...linkSx }}
    >
      {items.map((item, i) => (
        <li key={i}>
          <ItemText item={item} />
        </li>
      ))}
    </Box>
  );
}

export default async function ApplicationsPage() {
  const index = await buildProductIndex();
  return (
    <Box component="main" sx={{ bgcolor: "#fff" }}>
      <JsonLd data={crumbs} />
      <JsonLd data={faqSchema} />

      {/* 1. Intro */}
      <Box id="intro" sx={{ background: BANNER_GRADIENT, color: "#fff", py: { xs: 8, md: 12 } }}>
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
              MARS ball valve applications by industry
            </Typography>
            <Typography
              sx={{ mt: 2, color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 680 }}
            >
              MARS valves are manufactured by Mars Valve Co., Ltd. in Taiwan, an
              ISO 9001 certified manufacturer. The range covers stainless steel
              ball valves in two-piece, three-piece, flanged, multi-port,
              sanitary and metal-seated designs, with selected series
              fire-tested to API 607.
            </Typography>
            <Typography
              sx={{ mt: 2, color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 680 }}
            >
              Mars Valvenok supplies the range in the UK as an authorised
              distributor. Choose your industry below to see which series,
              materials and end connections fit your duty.
            </Typography>
          </Reveal>
        </Container>
      </Box>

      {/* 2. Industry quick-finder */}
      <Box id="quick-finder" sx={{ bgcolor: "background.default", py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Box
            component="nav"
            aria-label="Jump to an industry"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
              gap: 2,
            }}
          >
            {INDUSTRIES.map((industry) => {
              const Icon = ICONS[industry.id];
              return (
                <Box
                  key={industry.id}
                  component="a"
                  href={`#${industry.id}`}
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    p: 2.5,
                    bgcolor: "#fff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "4px",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Icon sx={{ color: "primary.main", fontSize: 26, flexShrink: 0, mt: 0.25 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.98rem" }}>
                      {industry.label}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.5, mt: 0.25 }}>
                      {industry.hook}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* 3–10. Industry sections */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 8, md: 10 }}>
          {INDUSTRIES.map((industry, i) => {
            const Icon = ICONS[industry.id];
            const imageFirst = i % 2 === 0;
            return (
              <Grid
                key={industry.id}
                id={industry.id}
                component="section"
                size={{ xs: 12 }}
                sx={{ scrollMarginTop: 96 }}
              >
                <Reveal y={32}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: imageFirst ? "row" : "row-reverse" },
                      gap: { xs: 3, md: 6 },
                      alignItems: "center",
                      "&:hover .app-industry-img": { transform: "scale(1.06)" },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: { xs: "100%", md: "45%" },
                        height: { xs: 240, sm: 320, md: 420 },
                        borderRadius: "6px",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={industry.image}
                        alt={industry.imageAlt}
                        fill
                        className="app-industry-img"
                        style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                        sizes="(max-width: 900px) 100vw, 45vw"
                      />
                    </Box>

                    <Box sx={{ width: { xs: "100%", md: "55%" } }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
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
                        <Typography component="h2" sx={{ ...h2Sx, fontSize: { xs: "1.4rem", md: "1.65rem" } }}>
                          {industry.heading}
                        </Typography>
                      </Box>
                      <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.75 }}>
                        {industry.intro}
                      </Typography>

                      <Typography component="h3" sx={h3Sx}>
                        Typical duties
                      </Typography>
                      <ItemList items={industry.duties} />

                      {industry.specify && (
                        <>
                          <Typography component="h3" sx={h3Sx}>
                            What to specify
                          </Typography>
                          <ItemList items={industry.specify} />
                        </>
                      )}

                      <Typography component="h3" sx={h3Sx}>
                        Recommended MARS valves
                      </Typography>
                      <ItemList items={industry.recommended} />

                      {industry.readNext && (
                        <Typography sx={{ mt: 2, color: "text.secondary", fontSize: "0.95rem", ...linkSx }}>
                          Read next:{" "}
                          <Link href={industry.readNext.href}>{industry.readNext.link}</Link>
                        </Typography>
                      )}

                      <Box
                        sx={{
                          mt: 3,
                          p: 2,
                          bgcolor: "background.default",
                          borderLeft: "3px solid",
                          borderColor: "primary.main",
                          fontSize: "0.95rem",
                          color: "text.primary",
                          ...linkSx,
                        }}
                      >
                        {industry.cta.lead && <>{industry.cta.lead} </>}
                        <Link href="/contact">{industry.cta.link}</Link>
                      </Box>
                    </Box>
                  </Box>
                </Reveal>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* 11. Not sure which valve? */}
      <Box id="help" sx={{ background: BANNER_GRADIENT, color: "#fff", py: { xs: 7, md: 9 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Typography component="h2" sx={{ ...h2Sx, color: "#fff", mb: 2 }}>
              Not sure which valve your application needs?
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.75)", mb: 1.5 }}>
              Send us five details and we&apos;ll recommend the right MARS series:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.9 }}>
              <li>Media</li>
              <li>Pressure and temperature</li>
              <li>Size and end connection</li>
              <li>Manual or actuated</li>
              <li>Certificates you need</li>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 4,
                // Styled from here: a Server Component can't hand Link to Box's
                // `component` prop.
                "& .help-primary": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  fontWeight: 700,
                  px: 3,
                  py: 1.5,
                  borderRadius: "2px",
                  textDecoration: "none",
                  "&:hover": { bgcolor: "primary.dark" },
                },
              }}
            >
              <Link href="/contact" className="help-primary">
                Discuss your application
              </Link>
              <Box
                component="a"
                href={URLS.catalogue}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "#fff",
                  fontWeight: 700,
                  px: 3,
                  py: 1.5,
                  borderRadius: "2px",
                  textDecoration: "none",
                  "&:hover": { borderColor: "#fff" },
                }}
              >
                Download the e-catalogue
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* 12. FAQ — same accordion as the homepage */}
      <FAQSection id="faq" heading="What engineers ask before specifying a valve." faqs={FAQS} />

      {/* 13. Browse every valve — gives every product/variant page a second
          internal link (besides /product-index) from this page. */}
      <Box id="browse" sx={{ bgcolor: "background.default", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography component="h2" sx={{ ...h2Sx, mb: 1 }}>
            Browse Every Valve
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 4 }}>
            Every MARS product and variant, grouped by valve type.
          </Typography>
          <ProductLinkList index={index} />
        </Container>
      </Box>
    </Box>
  );
}
