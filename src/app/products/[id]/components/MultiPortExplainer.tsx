import { Box, Container, Grid, Typography } from "@mui/material";

// L-Port vs T-Port explainer, rendered only on the Multi-Port category page
// (/products/multi-port-ball-valves). Server-rendered static content so the
// copy the <title> promises ("L-Port & T-Port") actually appears on the page
// and is visible to crawlers. Plain MUI (no client hooks) by design.

const PORTS = [
  {
    tag: "L-Port",
    heading: "L-Port — divert or select",
    body: "The ball is drilled in a 90° L shape, linking the common (bottom) port to one of the two side ports at a time. Rotate 90° to switch flow from one line to the other, or to an off position. Use an L-port when you need to divert flow or select between two lines — it cannot connect all three ports at once.",
  },
  {
    tag: "T-Port",
    heading: "T-Port — mix, split or divert",
    body: "The ball is drilled in a 180° T shape, so the common port can connect to either side port individually or to both at the same time. That makes a T-port suited to mixing two inlets, splitting one feed to two outlets, or diverting — a more flexible flow pattern than an L-port.",
  },
];

export default function MultiPortExplainer() {
  return (
    <Box sx={{ bgcolor: "#fff", borderTop: "1px solid", borderColor: "divider" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Typography
          component="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.5rem", md: "2rem" },
            letterSpacing: "-0.02em",
            mb: 1.5,
          }}
        >
          L-Port vs T-Port ball valves
        </Typography>
        <Typography sx={{ color: "text.secondary", maxWidth: 760, lineHeight: 1.7, mb: { xs: 4, md: 5 } }}>
          Multi-port (3-way and 4-way) ball valves use a drilled ball to route
          flow between three or more ports. The bore pattern — L or T — decides
          which connections the ball can link as it turns.
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {PORTS.map((p) => (
            <Grid size={{ xs: 12, md: 6 }} key={p.tag}>
              <Box
                sx={{
                  height: "100%",
                  p: { xs: 3, md: 4 },
                  bgcolor: "background.default",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "6px",
                }}
              >
                <Typography
                  sx={{
                    display: "inline-block",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "primary.main",
                    mb: 1.5,
                  }}
                >
                  {p.tag}
                </Typography>
                <Typography component="h3" sx={{ fontWeight: 800, fontSize: "1.15rem", mb: 1.5 }}>
                  {p.heading}
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
                  {p.body}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", mt: { xs: 3, md: 4 }, maxWidth: 760, lineHeight: 1.7 }}>
          Not every ball position gives bubble-tight shut-off, and port
          configurations vary by series. Tell us your switching sequence (which
          ports must connect, and when) and we&apos;ll confirm the right L-port or
          T-port valve for the job.
        </Typography>
      </Container>
    </Box>
  );
}
