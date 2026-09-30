import type { Metadata } from 'next';
import { Box, Typography, Grid } from '@mui/material';
import ProductCategoryRow from './components/ProductCategoryRow';
import CollapsibleSection from './components/CollapsibleSection';
import { CATEGORIES, SERIES } from './data/categories';
import Reveal from '@/Common/Reveal';
import { fitBrandTitle } from '@/lib/seoTitle';

export const metadata: Metadata = {
  title: fitBrandTitle('MARS Industrial Ball Valves — Full Range'),
  description:
    'One-piece, two-piece, three-piece, flanged, multi-port, and metal-seated ball valves engineered for industrial fluid control.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 280, md: 420 },
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          bgcolor: '#0a0604',
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
          alt="Industrial valves"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,6,4,0.2) 0%, rgba(10,6,4,0.9) 100%)',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1280px',
            width: '100%',
            mx: 'auto',
            px: { xs: 3, md: 8 },
            pb: { xs: 5, md: 7 },
          }}
        >
          <Reveal>
            <Typography
              sx={{
                color: 'primary.light',
                letterSpacing: '0.2em',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                mb: 1.5,
              }}
            >
              Our Range
            </Typography>
            <Typography
              component="h1"
              sx={{ color: '#fff', fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, lineHeight: 1.1, mb: 1.5 }}
            >
              Industrial ball valves for extreme, certified performance
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: 500 }}>
              Engineered for extreme conditions. Every valve certified, traceable, and built to last.
            </Typography>
          </Reveal>
        </Box>
      </Box>

      {/* Intro copy */}
      <Box sx={{ bgcolor: 'background.default', pt: { xs: 6, md: 9 }, px: { xs: 3, md: 8 } }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <Reveal>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.8 }}>
              Engineered for extreme conditions, our industrial ball valves are designed to
              perform reliably in demanding applications. Every valve is certified, traceable,
              and built to last, giving you confidence in safety, compliance, and long-term
              operation. API 607 fire-safe certified ball valves, gate valves, and process valves
              engineered and certified to one standard, every time — whether used as a primary
              shut-off, valve check solution, or as part of a wider process control system.
            </Typography>
          </Reveal>
        </Box>
      </Box>

      {/* By Series — collapsible; white bg to contrast the tinted sections around it */}
      <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 } }}>
        <Box sx={{ maxWidth: '1280px', mx: 'auto' }}>
          <CollapsibleSection title="By Series">
            <Grid container rowSpacing={{ xs: 6, md: 9 }} columnSpacing={{ xs: 4, md: 8 }}>
              {SERIES.map((s, i) => (
                <Grid size={{ xs: 12, md: 6 }} key={s.id}>
                  <Reveal delay={Math.min(i * 60, 400)}>
                    <ProductCategoryRow {...s} />
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </CollapsibleSection>
        </Box>
      </Box>

      {/* Mars Ball Valves — 2-up grid, each cell: text left + image right */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 } }}>
        <Box sx={{ maxWidth: '1280px', mx: 'auto' }}>
          <Reveal>
            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.6rem', md: '2rem' },
                letterSpacing: '-0.02em',
                mb: { xs: 4, md: 6 },
              }}
            >
              Mars Ball Valves
            </Typography>
          </Reveal>
          <Grid container rowSpacing={{ xs: 6, md: 9 }} columnSpacing={{ xs: 4, md: 8 }}>
            {CATEGORIES.map((cat, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={cat.id}>
                <Reveal delay={Math.min(i * 60, 400)}>
                  <ProductCategoryRow {...cat} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}