import { Box } from "@mui/material";
import { KRONOX } from "@/theme/brand";

/**
 * Two crossing "tapes" of real Kronox specs, scrolling in opposite directions:
 * a red tape on top (big white type) and a steel tape behind it. The tilt
 * echoes the angled cuts in the logo. Light page behind, no dark colours.
 */

const RED_ITEMS = [
  "6000 PSI max",
  "API 607 fire-safe",
  "CF8M · 316 stainless",
  "⅛″ – 12″",
  "UK stock",
  "ISO 5211 direct mount",
];

const STEEL_ITEMS = [
  "2-piece",
  "3-piece",
  "Flanged",
  "Multi-port",
  "Sanitary",
  "Metal seated",
  "V-port",
  "Cryogenic",
];

function Slash({ color }: { color: string }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        display: "inline-block",
        width: "0.9em",
        height: "0.62em",
        mx: "0.7em",
        bgcolor: color,
        clipPath: "polygon(55% 0, 100% 0, 45% 100%, 0 100%)",
        flexShrink: 0,
      }}
    />
  );
}

function Tape({
  items,
  bg,
  color,
  slash,
  angle,
  reverse,
  duration,
  fontSize,
  z,
}: {
  items: string[];
  bg: string;
  color: string;
  slash: string;
  angle: number;
  reverse?: boolean;
  duration: string;
  fontSize: object;
  z: number;
}) {
  // Content repeated twice so the -50% loop is seamless.
  const run = [...items, ...items, ...items];
  return (
    <Box
      sx={{
        position: "absolute",
        left: "-5%",
        right: "-5%",
        top: "50%",
        zIndex: z,
        transform: `translateY(-50%) rotate(${angle}deg)`,
        bgcolor: bg,
        py: { xs: 1.25, md: 1.75 },
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(58,61,66,0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: `${reverse ? "kxTickR" : "kxTick"} ${duration} linear infinite`,
          "@keyframes kxTick": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
          "@keyframes kxTickR": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        {[0, 1].map((copy) => (
          <Box key={copy} aria-hidden={copy === 1} sx={{ display: "flex", alignItems: "center" }}>
            {run.map((t, i) => (
              <Box
                key={`${copy}-${i}`}
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  color,
                  fontWeight: 900,
                  fontSize,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                {t}
                <Slash color={slash} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function SpecTicker() {
  return (
    <Box
      component="section"
      aria-label="Kronox range at a glance"
      sx={{
        position: "relative",
        height: { xs: 130, md: 190 },
        overflow: "hidden",
        bgcolor: KRONOX.white,
      }}
    >
      <Tape
        items={STEEL_ITEMS}
        bg={KRONOX.steel}
        color="rgba(255,255,255,0.92)"
        slash={KRONOX.red}
        angle={2.2}
        reverse
        duration="48s"
        fontSize={{ xs: "0.95rem", md: "1.25rem" }}
        z={1}
      />
      <Tape
        items={RED_ITEMS}
        bg={KRONOX.red}
        color="#FFFFFF"
        slash="#FFFFFF"
        angle={-2.4}
        duration="40s"
        fontSize={{ xs: "1.4rem", md: "2.3rem" }}
        z={2}
      />
    </Box>
  );
}
