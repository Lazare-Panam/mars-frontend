import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import ContactForm from "./ContactForm";
import Reveal from "@/Common/Reveal";
import { JsonLd } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";
import { ADDRESS } from "@/lib/address";

const EMAIL = "sales@marsvalvenok.com";
const PHONE = "+44 7368 137917";
const CATALOGUE_URL =
  "https://pblol2.blob.core.windows.net/mars-valves/catalogs/mars-e-catalog.pdf";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: {
    absolute: "Contact Mars Valvenok — MARS Ball Valve Quotes & Technical Help",
  },
  description:
    "Ask for a MARS ball valve quote, datasheet or certificate. Send your size, pressure, end connection and media, and our UK team will reply.",
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Mars Valvenok",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "Mars Valvenok",
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
  "Pressure and temperature",
  "End connection (NPT, BSP, BSPT, socket weld, butt weld, flanged, tri-clamp)",
  "Body and seat material, if known (CF8M, CF3M; PTFE, RPTFE, PEEK)",
  "Media and application",
  "Quantity and delivery location",
  "Certificates you need (e.g. API 607, material certificates)",
];

const h2Sx = {
  fontSize: { xs: "1.4rem", md: "1.65rem" },
  fontWeight: 800,
  color: "text.primary",
  mb: 2,
};

const listSx = {
  m: 0,
  pl: 2.5,
  color: "text.secondary",
  lineHeight: 1.9,
  "& a": { color: "primary.main", fontWeight: 600 },
};

export default function ContactPage() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default", py: { xs: 6, md: 10 } }}>
      <JsonLd data={contactPageSchema} />
      <Container maxWidth="md">
        <Reveal>
          <Box id="intro" sx={{ mb: { xs: 5, md: 6 } }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                color: "text.primary",
                mb: 2,
              }}
            >
              Contact us for MARS ball valve quotes and technical help
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "1.05rem", lineHeight: 1.75 }}>
              Send us your requirements and we&apos;ll come back with the right
              MARS series, datasheets, certificates for that series, and a
              price. Mars Valvenok is an authorised UK distributor of Mars Valve
              Co., Ltd., Taiwan.
            </Typography>
          </Box>
        </Reveal>

        <Reveal>
          <Box id="what-to-include" sx={{ mb: { xs: 5, md: 6 } }}>
            <Typography component="h2" sx={h2Sx}>
              What to include in your enquiry
            </Typography>
            <Box component="ul" sx={listSx}>
              {WHAT_TO_INCLUDE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Box>
          </Box>
        </Reveal>

        <Box id="enquiry" sx={{ mb: { xs: 5, md: 6 }, scrollMarginTop: 96 }}>
          <Reveal>
            <ContactForm />
          </Reveal>
        </Box>

        <Reveal>
          <Box id="details" sx={{ mb: { xs: 5, md: 6 } }}>
            <Typography component="h2" sx={h2Sx}>
              Other ways to reach us
            </Typography>
            <Box component="ul" sx={listSx}>
              <li>
                Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                Phone: <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
              </li>
              <li>
                Address: {ADDRESS.name}, {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.postcode}, {ADDRESS.country}
              </li>
            </Box>
          </Box>
        </Reveal>

        <Reveal>
          <Box id="related">
            <Typography component="h2" sx={h2Sx}>
              Before you enquire
            </Typography>
            <Box component="ul" sx={listSx}>
              <li>
                <a href={CATALOGUE_URL} target="_blank" rel="noopener noreferrer">
                  Download the MARS e-catalogue
                </a>
              </li>
              <li>
                <Link href="/products">Browse ball valves by type</Link>
              </li>
              <li>
                <Link href="/delivery-information">Delivery information</Link>
              </li>
            </Box>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
