"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/Common/Reveal";
import { LETTER_OF_AUTHORISATION_URL } from "@/lib/links";

const bodyText = {
  color: "text.secondary",
  fontSize: "1rem",
  lineHeight: 1.75,
  mb: 2.5,
} as const;

const heading = {
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "text.primary",
  mt: 4,
  mb: 1.5,
} as const;

export default function MarsSection() {
  return (
    <Box component="section" id="who-we-are" sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 5, md: 8 },
          alignItems: "flex-start",
        }}
      >
        {/* left: copy */}
        <Reveal>
          <Box sx={{ flex: 1 }}>
            <Typography component="h2" sx={{ ...heading, mt: 0 }}>
              Who we are
            </Typography>

            <Typography sx={bodyText}>
              Mars Valvenok is an{" "}
              <Box
                component="span"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                authorised UK distributor of MARS industrial valves
              </Box>
              , appointed by the manufacturer,{" "}
              <Box
                component="span"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                Mars Valve Co., Ltd. of Taichung, Taiwan
              </Box>
              . We are part of Valvenok Ltd.
            </Typography>

            <Typography sx={bodyText}>
              We supply genuine MARS valves with the manufacturer&apos;s
              documentation, pricing online for standard items, and technical
              help choosing the right series, material and end connection.
            </Typography>

            <Typography component="h3" sx={heading}>
              Why buy from us?
            </Typography>

            <Typography sx={bodyText}>
              Single valves or full project orders. Prices shown online for
              standard items, datasheets and certificates on request, and a
              team that answers with specifications, not just a price.
            </Typography>
          </Box>
        </Reveal>

        {/* right: static image */}
        <Reveal delay={150} y={32}>
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                pt: "75%",
                borderRadius: "6px",
                overflow: "hidden",
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                bgcolor: "#fff",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.16)",
                },
              }}
            >
              <Link
                href={LETTER_OF_AUTHORISATION_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={LETTER_OF_AUTHORISATION_URL}
                  alt="Letter of authorisation from Mars Valve Co., Ltd. naming Valvenok as an authorised UK distributor"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
