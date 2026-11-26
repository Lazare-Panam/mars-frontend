"use client";

import { useMemo, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { blogs } from "./data/blog";
import SeoButtons from "./components/SEOButtons";
import Reveal from "@/Common/Reveal";
import { KRONOX, LIGHT_BANNER } from "@/theme/brand";

type Blog = (typeof blogs)[number];

// Rough reading time from the article body (200 words a minute).
function readMins(b: Blog): number {
  const words = [b.excerpt, ...b.sections.map((s) => `${s.heading ?? ""} ${s.body ?? ""}`)]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

const byNewest = (a: Blog, b: Blog) => Date.parse(b.date) - Date.parse(a.date);

function Meta({ blog }: { blog: Blog }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: KRONOX.steel, fontSize: "0.8rem", flexWrap: "wrap" }}>
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6 }}>
        <CalendarTodayOutlinedIcon sx={{ fontSize: 15 }} />
        {blog.date}
      </Box>
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6 }}>
        <ScheduleIcon sx={{ fontSize: 16 }} />
        {readMins(blog)} min read
      </Box>
    </Box>
  );
}

function CategoryTag({ label }: { label: string }) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        alignSelf: "flex-start",
        bgcolor: "primary.main",
        color: "#fff",
        fontSize: "0.7rem",
        fontWeight: 800,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        px: 1.5,
        py: 0.5,
        clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
      }}
    >
      {label}
    </Box>
  );
}

export default function NewsPage() {
  const sorted = useMemo(() => [...blogs].sort(byNewest), []);
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    sorted.forEach((b) => counts.set(b.category, (counts.get(b.category) ?? 0) + 1));
    return [...counts.entries()];
  }, [sorted]);
  const [cat, setCat] = useState<string>("All");

  const featured = sorted[0];
  const list = cat === "All" ? sorted.slice(1) : sorted.filter((b) => b.category === cat);

  if (!featured) {
    return (
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography>No posts yet.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      {/* Hero */}
      <Box sx={{ ...LIGHT_BANNER, py: { xs: 7, md: 9 } }}>
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Reveal>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 28, height: 14, bgcolor: "primary.main", clipPath: "polygon(45% 0, 100% 0, 55% 100%, 0 100%)" }} />
              <Typography component="span" sx={{ color: "primary.main", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.2em" }}>
                KRONOX NEWSROOM
              </Typography>
            </Box>
            <Typography
              component="h1"
              className="no-capitalize"
              sx={{ fontWeight: 800, color: KRONOX.text, lineHeight: 1.08, letterSpacing: "-0.02em", fontSize: { xs: "2.4rem", md: "3.6rem" }, maxWidth: 680 }}
            >
              News &amp; technical{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                guides
              </Box>
            </Typography>
            <Typography className="no-capitalize" sx={{ color: KRONOX.steel, mt: 2, maxWidth: 560, lineHeight: 1.75, fontSize: "1.05rem" }}>
              Stock updates, company news and practical guides to choosing, specifying and buying industrial ball valves.
            </Typography>
            <Box sx={{ display: "flex", gap: { xs: 3, md: 5 }, mt: 4 }}>
              {[
                [String(blogs.length), "Articles"],
                [String(categories.length), "Topics"],
                [featured.date, "Latest update"],
              ].map(([v, l]) => (
                <Box key={l} sx={{ borderLeft: `3px solid ${KRONOX.red}`, pl: 1.5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.4rem" }, color: KRONOX.text, lineHeight: 1.1 }}>{v}</Typography>
                  <Typography sx={{ color: KRONOX.steel, fontSize: "0.8rem" }}>{l}</Typography>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {/* Featured */}
        {cat === "All" && (
          <Reveal>
            <Box
              component={Link}
              href={`/news/${featured.slug}`}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
                mb: { xs: 6, md: 8 },
                textDecoration: "none",
                bgcolor: "#fff",
                border: `1px solid ${KRONOX.line}`,
                borderRadius: "6px",
                overflow: "hidden",
                boxShadow: "0 18px 50px rgba(58,61,66,0.08)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                "&:hover": { transform: "translateY(-4px)", borderColor: "rgba(224,57,62,0.5)", boxShadow: "0 26px 60px rgba(58,61,66,0.14)" },
                "&:hover .feat-img": { transform: "scale(1.03)" },
                "&:hover .feat-cta": { gap: 1.5 },
              }}
            >
              <Box sx={{ position: "relative", overflow: "hidden", bgcolor: "#FBEBEC", minHeight: { xs: 280, md: 460 } }}>
                <Box
                  component="img"
                  className="feat-img"
                  src={featured.heroImage}
                  alt={featured.title}
                  sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", transition: "transform 0.6s ease" }}
                />
                <Box sx={{ position: "absolute", top: 20, left: 20, bgcolor: KRONOX.text, color: "#fff", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.14em", px: 1.5, py: 0.75 }}>
                  LATEST
                </Box>
              </Box>
              <Box sx={{ p: { xs: 3, md: 5 }, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, borderLeft: { md: `4px solid ${KRONOX.red}` } }}>
                <CategoryTag label={featured.category} />
                <Typography component="h2" sx={{ fontWeight: 800, color: KRONOX.text, lineHeight: 1.15, fontSize: { xs: "1.6rem", md: "2.1rem" } }}>
                  {featured.title}
                </Typography>
                <Typography className="no-capitalize" sx={{ color: KRONOX.steel, lineHeight: 1.75 }}>
                  {featured.excerpt}
                </Typography>
                <Meta blog={featured} />
                <Box
                  className="feat-cta"
                  sx={{ display: "inline-flex", alignItems: "center", gap: 1, alignSelf: "flex-start", mt: 1, bgcolor: "primary.main", color: "#fff", fontWeight: 800, px: 3, py: 1.4, borderRadius: "3px", transition: "gap 0.2s ease" }}
                >
                  Read article <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Box>
              </Box>
            </Box>
          </Reveal>
        )}

        {/* Heading + topic filters */}
        <Box sx={{ display: "flex", alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 4 }}>
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.7rem" }, color: KRONOX.text }}>
            {cat === "All" ? "More articles" : cat}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {[["All", blogs.length] as [string, number], ...categories].map(([c, n]) => {
              const on = c === cat;
              return (
                <Box
                  key={c}
                  component="button"
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCat(c)}
                  sx={{
                    cursor: "pointer",
                    font: "inherit",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    px: 1.75,
                    py: 0.75,
                    borderRadius: "999px",
                    border: `1px solid ${on ? KRONOX.red : KRONOX.line}`,
                    bgcolor: on ? "primary.main" : "#fff",
                    color: on ? "#fff" : KRONOX.text,
                    transition: "all 0.15s ease",
                    "&:hover": { borderColor: KRONOX.red, color: on ? "#fff" : KRONOX.red },
                  }}
                >
                  {c}
                  <Box component="span" sx={{ ml: 0.75, opacity: 0.7, fontWeight: 600 }}>
                    {n}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {list.map((blog, i) => (
            <Reveal key={`${cat}-${blog.slug}`} delay={Math.min(i * 70, 350)}>
              <Box
                component={Link}
                href={`/news/${blog.slug}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  textDecoration: "none",
                  bgcolor: "#fff",
                  border: `1px solid ${KRONOX.line}`,
                  borderRadius: "6px",
                  overflow: "hidden",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                  "&:hover": { transform: "translateY(-5px)", borderColor: "rgba(224,57,62,0.5)", boxShadow: "0 20px 44px rgba(58,61,66,0.12)" },
                  "&:hover .card-img": { transform: "scale(1.05)" },
                  "&:hover .card-title": { color: "primary.main" },
                  "&:hover .card-cta": { gap: 1.25 },
                }}
              >
                <Box sx={{ position: "relative", overflow: "hidden", aspectRatio: "16 / 9", bgcolor: "#FBEBEC" }}>
                  <Box
                    component="img"
                    className="card-img"
                    src={blog.heroImage}
                    alt={blog.title}
                    loading="lazy"
                    sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", transition: "transform 0.5s ease" }}
                  />
                </Box>
                <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1.5, flexGrow: 1 }}>
                  <CategoryTag label={blog.category} />
                  <Meta blog={blog} />
                  <Typography
                    className="card-title"
                    component="h3"
                    sx={{ fontWeight: 800, fontSize: "1.08rem", lineHeight: 1.3, color: KRONOX.text, transition: "color 0.2s ease" }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    className="no-capitalize"
                    sx={{
                      color: KRONOX.steel,
                      fontSize: "0.88rem",
                      lineHeight: 1.65,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.excerpt}
                  </Typography>
                  <Box
                    className="card-cta"
                    sx={{ mt: "auto", pt: 1.5, borderTop: `1px solid ${KRONOX.line}`, display: "inline-flex", alignItems: "center", gap: 0.75, color: "primary.main", fontWeight: 800, fontSize: "0.85rem", transition: "gap 0.2s ease" }}
                  >
                    Read article <ArrowForwardIcon sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>

        {/* Help band */}
        <Box
          sx={{
            mt: { xs: 7, md: 9 },
            p: { xs: 3.5, md: 5 },
            position: "relative",
            overflow: "hidden",
            borderRadius: "6px",
            color: "#fff",
            background: "linear-gradient(135deg, #E0393E 0%, #C42E33 100%)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box aria-hidden sx={{ position: "absolute", top: 0, right: 120, width: 140, height: "100%", bgcolor: "rgba(255,255,255,0.1)", clipPath: "polygon(60% 0, 100% 0, 40% 100%, 0 100%)" }} />
          <Box sx={{ position: "relative" }}>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.8rem" } }}>Need help choosing a valve?</Typography>
            <Typography className="no-capitalize" sx={{ opacity: 0.92, mt: 0.75 }}>
              Send your size, pressure and media and we&apos;ll reply with the right Kronox series and a price.
            </Typography>
          </Box>
          <Box
            component={Link}
            href="/contact#enquiry"
            sx={{ position: "relative", flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 1, bgcolor: "#fff", color: "primary.main", fontWeight: 800, px: 3, py: 1.5, borderRadius: "3px", textDecoration: "none", transition: "transform 0.2s ease", "&:hover": { transform: "translateY(-2px)" } }}
          >
            Ask our team <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </Box>
        </Box>
      </Container>
      <SeoButtons />
    </Box>
  );
}
