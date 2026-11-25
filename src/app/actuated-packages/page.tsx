import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Grid, Typography } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import CheckIcon from "@mui/icons-material/Check";
import Reveal from "@/Common/Reveal";
import PageBreadcrumbs from "@/Common/PageBreadcrumbs";
import { JsonLd, breadcrumbList } from "@/lib/jsonLd";
import { BANNER_GRADIENT } from "@/theme/brand";
import { SERIES as SERIES_DATA } from "@/app/products/data/categories";
import ProductCategoryRow from "@/app/products/components/ProductCategoryRow";

// Copy from the Mars Valve UK marketing plan (Oct 2026). Packages are made to
// order on request (none held ready-made); factory lead time for valves not in
// UK stock is 4–5 weeks. Not stated until confirmed: actuator brands, UK
// testing, and a BOM upload on the quote form.

const TITLE = "Actuated Ball Valve Packages UK | Kronox Valves";
const DESCRIPTION =
  "Kronox actuated ball valve packages made to order: direct-mount valves matched with pneumatic or electric actuators, with certificates and datasheets.";

export const metadata: Metadata = {
  alternates: { canonical: "/actuated-packages" },
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/actuated-packages" },
};

const QUOTE_HREF = "/contact#enquiry";

// Shown with the same rows as /products, from the shared series data.
const DIRECT_MOUNT_IDS = ["series-22", "series-77", "series-88"];
const SERIES = SERIES_DATA.filter((s) => DIRECT_MOUNT_IDS.includes(s.id));

const REASONS = [
  {
    icon: Inventory2OutlinedIcon,
    title: "Fewer parts to source",
    text: "One supplier, one order, one set of paperwork.",
  },
  {
    icon: BuildOutlinedIcon,
    title: "Faster installation",
    text: "Direct mounting removes the bracket and coupling.",
  },
  {
    icon: TuneOutlinedIcon,
    title: "Choice of actuation",
    text: "Pneumatic or electric, matched to valve torque and duty.",
  },
  {
    icon: LocalFireDepartmentOutlinedIcon,
    title: "Fire-safe options",
    text: "API 607 series are available as packages for hazardous duty. Tell us your application and we will confirm the series and send the certificate.",
  },
];

const NEEDS = [
  "Valve size and series",
  "Pressure rating",
  "Media and temperature",
  "Actuator type (double acting or spring return)",
  "Supply voltage or air pressure",
  "Any limit switch or solenoid requirements",
];

const crumbs = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "Actuated Packages", path: "/actuated-packages" },
]);

function QuoteButton({ light = false }: { light?: boolean }) {
  return (
    <Link href={QUOTE_HREF} style={{ textDecoration: "none", display: "inline-block" }}>
      <Box
        component="span"
        sx={{
          display: "inline-block",
          px: 4,
          py: 1.75,
          fontWeight: 700,
          fontSize: "1rem",
          bgcolor: light ? "#fff" : "primary.main",
          color: light ? "primary.main" : "#fff",
          transition: "background-color 0.15s ease",
          "&:hover": { bgcolor: light ? "rgba(255,255,255,0.9)" : "primary.dark" },
        }}
      >
        Request a Package Quote
      </Box>
    </Link>
  );
}

export default function ActuatedPackagesPage() {
  return (
    <Box component="main" sx={{ bgcolor: "#fff" }}>
      <JsonLd data={crumbs} />

      {/* Hero */}
      <Box sx={{ background: BANNER_GRADIENT, color: "#fff", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <PageBreadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Actuated Packages" }]}
              tone="onDark"
              sx={{ mb: 3 }}
            />
            <Typography
              component="h1"
              sx={{ fontSize: { xs: "2.25rem", md: "3.25rem" }, fontWeight: 800, lineHeight: 1.15, maxWidth: 820 }}
            >
              Kronox actuated ball valve packages, made to order
            </Typography>
            <Typography
              sx={{ mt: 2.5, mb: 4, color: "rgba(255,255,255,0.82)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 700 }}
            >
              Series 22, 77 and 88 have an ISO 5211 direct-mount pad, so the
              actuator bolts straight on with no bracket or coupling. Tell us
              what you need and we&apos;ll put together a matched valve and
              actuator package for your order, with the documentation your site
              needs.
            </Typography>
            <QuoteButton light />
          </Reveal>
        </Container>
      </Box>

      {/* Why choose a package */}
      <Box sx={{ py: { xs: 8, md: 11 } }}>
        <Container maxWidth="lg">
          <Typography component="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, fontWeight: 800, mb: 5 }}>
            Why choose a package
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
              gap: 2.5,
            }}
          >
            {REASONS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 80}>
                <Box sx={{ height: "100%", p: 3, border: "1px solid", borderColor: "divider", borderRadius: "6px" }}>
                  <Icon sx={{ color: "primary.main", fontSize: 30, mb: 1.5 }} />
                  <Typography sx={{ fontWeight: 700, mb: 0.75 }}>{title}</Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.6 }}>{text}</Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Direct-mount series */}
      <Box sx={{ py: { xs: 8, md: 11 }, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Typography component="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, fontWeight: 800, mb: 1.5 }}>
            Direct-mount series
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: { xs: 4, md: 6 }, maxWidth: 640, lineHeight: 1.7 }}>
            These series take an actuator straight onto the ISO 5211 pad. View
            each series for sizes, materials, end connections and prices.
          </Typography>
          {/* Grid items are flex so the three cards share one height. */}
          <Grid container spacing={3}>
            {SERIES.map((s, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={s.id} sx={{ display: "flex", "& > *": { flex: 1 } }}>
                <Reveal delay={i * 60}>
                  <ProductCategoryRow {...s} layout="card" />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* What we need + lead time */}
      <Box sx={{ py: { xs: 8, md: 11 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" }, gap: { xs: 5, md: 8 } }}>
            <Box>
              <Typography component="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, fontWeight: 800, mb: 3 }}>
                What we need from you
              </Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", display: "grid", gap: 1.25 }}>
                {NEEDS.map((n) => (
                  <Box component="li" key={n} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                    <CheckIcon sx={{ color: "primary.main", fontSize: 20, mt: "2px" }} />
                    <Typography>{n}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: "background.default", borderRadius: "6px", alignSelf: "start" }}>
              <Typography component="h2" sx={{ fontSize: "1.35rem", fontWeight: 800, mb: 1.5 }}>
                Lead time
              </Typography>
              <Typography sx={{ color: "text.secondary", lineHeight: 1.7, mb: 3 }}>
                Packages are made to order, not held ready-made. Valves not in
                UK stock have a factory lead time of 4–5 weeks. Send us your
                specification or bill of materials and we&apos;ll confirm the
                full lead time with your quote.
              </Typography>
              <QuoteButton />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
