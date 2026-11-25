import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import ContactForm from "./ContactForm";
import Reveal from "@/Common/Reveal";
import { JsonLd } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";
import { ADDRESS } from "@/lib/address";
import { BANNER_GRADIENT } from "@/theme/brand";
import ProductPageHero from "@/Common/product/ProductPageHero";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const EMAIL = "sales@marsvalvenok.com";
const PHONE = "+44 7368 137917";
const CATALOGUE_URL =
  "https://pblol2.blob.core.windows.net/mars-valves/catalogs/mars-e-catalog.pdf";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: {
    absolute: "Contact Kronox Valves — Kronox Ball Valve Quotes & Technical Help",
  },
  description:
    "Ask for a Kronox ball valve quote, datasheet or certificate. Send your size, pressure, end connection and media, and our UK team will reply.",
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Kronox Valves",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "Kronox Valves",
    url: SITE_URL,
    email: EMAIL,
    telephone: PHONE,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: EMAIL,
      telephone: PHONE,
      areaServed: "GB",
      availableLanguage: "English",
    },
  },
};

const WHAT_TO_INCLUDE = [
  "Valve type and size (e.g. 3-piece, 1″)",
  "Working pressure and temperature",
  "End connection (NPT, BSP, socket weld, butt weld, flanged, tri-clamp)",
  "Body and seat material, if known (CF8M, CF3M; PTFE, RPTFE)",
  "Media, application and quantity",
  "Certificates you need (e.g. API 607, material certificates)",
];

const CONTACT_ROWS = [
  { icon: MailOutlinedIcon, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: PhoneOutlinedIcon, label: "Phone", value: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
  { icon: LocationOnOutlinedIcon, label: "Office", value: `${ADDRESS.street}, ${ADDRESS.locality} ${ADDRESS.postcode}` },
  { icon: PublicOutlinedIcon, label: "We supply", value: "Customers across the United Kingdom" },
];

const RESOURCES = [
  { icon: PictureAsPdfOutlinedIcon, title: "Kronox e-catalogue", text: "Every series, part numbers, ratings and dimensions in one PDF.", cta: "Download PDF", href: CATALOGUE_URL, external: true },
  { icon: GridViewOutlinedIcon, title: "Browse by series", text: "One-piece, two-piece, three-piece, flanged, sanitary and fire safe ranges.", cta: "Browse products", href: "/products" },
  { icon: VerifiedOutlinedIcon, title: "Certifications", text: "API 607, SIL 3, CE/PED, ATEX and ISO 9001 certificates to download.", cta: "View certificates", href: "/certifications" },
  { icon: LocalShippingOutlinedIcon, title: "Delivery & lead times", text: "UK stock, factory lead times and how delivery works.", cta: "Read more", href: "/delivery-information" },
];

const cardSx = {
  bgcolor: "#fff",
  borderRadius: "20px",
  border: "1px solid rgba(43,27,20,0.08)",
  boxShadow: "0 10px 40px rgba(43,27,20,0.05)",
};

export default function ContactPage() {
  return (
    <Box component="main" sx={{ bgcolor: "#F7F4F2", pb: { xs: 8, md: 12 } }}>
      <JsonLd data={contactPageSchema} />

      <ProductPageHero
        eyebrow="Contact"
        title="Kronox ball valve quotes and technical help"
        subtitle="Send us your requirements and we'll come back with the right Kronox series, datasheets, certificates and a price. UK stock and fast delivery."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Container maxWidth={false} sx={{ maxWidth: 1200, px: { xs: 2, md: 6 }, mt: { xs: 4, md: 6 }, display: "grid", gap: { xs: 3, md: 4 } }}>
        {/* What to include */}
        <Reveal>
          <Box id="what-to-include" sx={{ ...cardSx, p: { xs: 3, md: 4.5 } }}>
            <Typography component="h2" sx={{ fontSize: { xs: "1.4rem", md: "1.6rem" }, fontWeight: 800, mb: 0.5 }}>
              What to include in your enquiry
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3 }}>
              The more of these you can share, the faster we can quote.
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 1.5 }}>
              {WHAT_TO_INCLUDE.map((item) => (
                <Box key={item} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", p: 2, borderRadius: "12px", bgcolor: "#F8F5F3" }}>
                  <CheckCircleIcon sx={{ color: "primary.main", fontSize: 22, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: "0.92rem", lineHeight: 1.5, color: "text.primary" }}>{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>

        {/* Info panel + form */}
        <Box id="enquiry" sx={{ ...cardSx, overflow: "hidden", display: "grid", gridTemplateColumns: { xs: "1fr", md: "380px 1fr" }, scrollMarginTop: 96 }}>
          <Box
            id="details"
            sx={{
              position: "relative",
              overflow: "hidden",
              background: BANNER_GRADIENT,
              color: "#fff",
              p: { xs: 3.5, md: 4.5 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* decorative rings */}
            <Box aria-hidden sx={{ position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.08)" }} />
            <Box aria-hidden sx={{ position: "absolute", bottom: -90, right: -40, width: 220, height: 220, borderRadius: "50%", border: "28px solid rgba(255,255,255,0.06)" }} />

            <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", mb: 1.5, position: "relative" }}>
              Talk to our team
            </Typography>
            <Typography sx={{ fontSize: { xs: "1.5rem", md: "1.7rem" }, fontWeight: 800, lineHeight: 1.2, mb: 1.5, position: "relative" }}>
              Valve specialists for Kronox ball valves
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.7, mb: 4, position: "relative" }}>
              We&apos;ll come back with the right series, part numbers,
              certificates and a price.
            </Typography>

            <Box sx={{ display: "grid", gap: 2.5, position: "relative" }}>
              {CONTACT_ROWS.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.14)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>{label}</Typography>
                      <Typography className="no-capitalize" sx={{ fontWeight: 600, lineHeight: 1.4 }}>{value}</Typography>
                    </Box>
                  </>
                );
                return href ? (
                  <Box key={label} component="a" href={href} sx={{ display: "flex", gap: 1.75, alignItems: "center", color: "#fff", textDecoration: "none", "&:hover p:last-of-type": { textDecoration: "underline" } }}>
                    {inner}
                  </Box>
                ) : (
                  <Box key={label} sx={{ display: "flex", gap: 1.75, alignItems: "center" }}>{inner}</Box>
                );
              })}
            </Box>

            <Typography sx={{ mt: { xs: 4, md: "auto" }, pt: 4, borderTop: "1px solid rgba(255,255,255,0.2)", fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.8)", position: "relative" }}>
              Genuine Kronox valves, full documentation, UK stock and UK-based
              support.
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <ContactForm />
          </Box>
        </Box>

        {/* Before you enquire */}
        <Reveal>
          <Box id="related" sx={{ ...cardSx, p: { xs: 3, md: 4.5 } }}>
            <Typography component="h2" sx={{ fontSize: { xs: "1.4rem", md: "1.6rem" }, fontWeight: 800, mb: 0.5 }}>
              Before you enquire
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3 }}>
              Most questions are answered in the catalogue and these pages.
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 2 }}>
              {RESOURCES.map(({ icon: Icon, title, text, cta, href, external }) => {
                const tile = (
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      p: 2.75,
                      borderRadius: "16px",
                      border: "1px solid rgba(43,27,20,0.09)",
                      color: "text.primary",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                      "&:hover": { borderColor: "primary.main", boxShadow: "0 12px 30px rgba(43,27,20,0.08)", transform: "translateY(-3px)" },
                      "&:hover .res-cta": { gap: 1 },
                    }}
                  >
                    <Box sx={{ width: 42, height: 42, borderRadius: "12px", bgcolor: "rgba(231,57,15,0.1)", display: "grid", placeItems: "center", mb: 2 }}>
                      <Icon sx={{ color: "primary.main", fontSize: 22 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 800, mb: 0.75 }}>{title}</Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: "0.88rem", lineHeight: 1.6, mb: 2, flex: 1 }}>{text}</Typography>
                    <Box className="res-cta" sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "primary.main", fontWeight: 700, fontSize: "0.9rem", transition: "gap 0.2s ease" }}>
                      {cta} <ArrowForwardIcon sx={{ fontSize: 17 }} />
                    </Box>
                  </Box>
                );
                return external ? (
                  <a key={title} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    {tile}
                  </a>
                ) : (
                  <Link key={title} href={href} style={{ textDecoration: "none" }}>
                    {tile}
                  </Link>
                );
              })}
            </Box>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
