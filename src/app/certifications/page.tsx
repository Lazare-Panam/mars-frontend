import type { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import Reveal from "@/Common/Reveal";
import PageBreadcrumbs from "@/Common/PageBreadcrumbs";
import { JsonLd, breadcrumbList } from "@/lib/jsonLd";
import { KRONOX, LIGHT_BANNER } from "@/theme/brand";
import { fitBrandTitle } from "@/lib/seoTitle";
import { CERT_GROUPS, FIRE_SAFE_SERIES } from "@/lib/certificates";
import AccreditationBar from "@/Common/AccreditationBar";
import CtaBand from "@/Common/CtaBand";

const TITLE = "Kronox Valve Certificates: API 607, SIL 3, ATEX & PED";
const DESCRIPTION =
  "Download Kronox valve certificates: API 607 fire safe, SIL 3 (exida), CE/PED, ATEX, ISO 9001, FDA and REACH. JOSCAR-registered manufacturer.";

export const metadata: Metadata = {
  alternates: { canonical: "/certifications" },
  title: fitBrandTitle(TITLE),
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/certifications" },
};


const crumbs = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "Certifications", path: "/certifications" },
]);

const externalLink = { target: "_blank", rel: "noopener noreferrer" } as const;

function DownloadButton({ label, href }: { label: string; href: string }) {
  return (
    <Box
      component="a"
      href={href}
      {...externalLink}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        px: 1.75,
        py: 1.1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "6px",
        bgcolor: "#fff",
        color: "text.primary",
        textDecoration: "none",
        fontSize: "0.88rem",
        fontWeight: 600,
        transition: "border-color 0.15s ease, background-color 0.15s ease",
        "&:hover": { borderColor: "primary.main", bgcolor: "rgba(224,57,62,0.04)", color: "primary.main" },
      }}
    >
      <PictureAsPdfOutlinedIcon sx={{ fontSize: 20, color: "primary.main", flexShrink: 0 }} />
      {label}
    </Box>
  );
}

export default function CertificationsPage() {
  return (
    <Box component="main" sx={{ bgcolor: "#fff" }}>
      <JsonLd data={crumbs} />

      {/* Hero */}
      <Box sx={{ ...LIGHT_BANNER, py: { xs: 8, md: 11 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <PageBreadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Certifications" }]}
             
              sx={{ mb: 3 }}
            />
            <Typography
              component="h1"
              sx={{ fontSize: { xs: "2.25rem", md: "3.25rem" }, fontWeight: 800, lineHeight: 1.15, maxWidth: 820 }}
            >
              Kronox valve certifications and approvals
            </Typography>
            <Typography sx={{ mt: 2.5, color: KRONOX.steel, fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 720 }}>
              The certificates and approvals held by Kronox Valves, the
              manufacturer of these ball valves. We supply the certificates for
              the series you order. Download them here or ask for them with your
              quote.
            </Typography>
            {/* Jump links */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 4 }}>
              {[{ id: "distributor", title: "Distributor" }, ...CERT_GROUPS].map((g) => (
                <Box
                  key={g.id}
                  component="a"
                  href={`#${g.id}`}
                  sx={{
                    px: 1.75,
                    py: 0.6,
                    borderRadius: "999px",
                    border: "1px solid rgba(110,113,117,0.28)",
                    color: KRONOX.text,
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    transition: "background-color 0.15s ease",
                    "&:hover": { bgcolor: "rgba(224,57,62,0.08)", borderColor: "#E0393E" },
                  }}
                >
                  {g.title}
                </Box>
              ))}
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* Our own: authorisation + JOSCAR */}
      <Box id="distributor" sx={{ py: { xs: 7, md: 9 }, scrollMarginTop: 96 }}>
        <Container maxWidth="lg">
          <Typography component="h2" sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, mb: 4, textAlign: "center" }}>
            Kronox Valves as your manufacturer
          </Typography>
          <AccreditationBar />
          <Typography sx={{ textAlign: "center", color: "text.secondary", fontSize: "0.9rem", mt: 2, maxWidth: 640, mx: "auto", lineHeight: 1.7 }}>
            The manufacturer of genuine Kronox ball valves, holding UK stock with
            full documentation, and registered on JOSCAR for approved-vendor
            lists.
          </Typography>
        </Container>
      </Box>

      {/* Manufacturer certificates */}
      {CERT_GROUPS.map((g, gi) => (
        <Box
          key={g.id}
          id={g.id}
          sx={{ py: { xs: 7, md: 9 }, bgcolor: gi % 2 === 0 ? "background.default" : "#fff", scrollMarginTop: 96 }}
        >
          <Container maxWidth="lg">
            <Reveal>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 7 } }}>
                <Box>
                  <Typography
                    sx={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "primary.main", mb: 1 }}
                  >
                    {g.issuer}
                  </Typography>
                  <Typography component="h2" sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, lineHeight: 1.2, mb: 1 }}>
                    {g.title}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}>{g.standard}</Typography>
                  <Typography sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2 }}>{g.summary}</Typography>
                  {g.validity && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.75,
                        px: 1.25,
                        py: 0.5,
                        borderRadius: "999px",
                        bgcolor: "rgba(224,57,62,0.08)",
                        color: "primary.dark",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      <EventOutlinedIcon sx={{ fontSize: 16 }} />
                      {g.validity}
                    </Box>
                  )}

                  {g.id === "fire-safe" && (
                    <Box
                      component="table"
                      sx={{
                        mt: 3,
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.85rem",
                        "& th, & td": { textAlign: "left", py: 1, px: 1.25, borderBottom: "1px solid", borderColor: "divider" },
                        "& th": { fontWeight: 700, bgcolor: "rgba(0,0,0,0.03)" },
                      }}
                    >
                      <thead>
                        <tr>
                          <th>Series</th>
                          <th>Standard</th>
                          <th>Sizes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {FIRE_SAFE_SERIES.map((r) => (
                          <tr key={r.series}>
                            <td style={{ fontWeight: 600 }}>{r.series}</td>
                            <td>{r.edition}</td>
                            <td>{r.sizes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Box>
                  )}

                </Box>

                {g.files.length > 0 && (
                  <Box>
                    <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Download</Typography>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: g.files.length > 3 ? "1fr 1fr" : "1fr" }, gap: 1.25 }}>
                      {g.files.map((f) => (
                        <DownloadButton key={f.href} {...f} />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Reveal>
          </Container>
        </Box>
      ))}

      <Box sx={{ bgcolor: "#F5F5F6" }}>
        <CtaBand
          title="Need certificates with your order?"
          text="Tell us the series, size and material and we'll send the datasheet and the matching certificates with your quote."
          primary={{ label: "Request a Quote", href: "/contact#enquiry" }}
          secondary={{ label: "Browse Products", href: "/products" }}
        />
      </Box>
    </Box>
  );
}
