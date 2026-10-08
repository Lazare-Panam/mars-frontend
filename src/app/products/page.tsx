import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import ProductRangeSections from './components/ProductRangeSections';
import Reveal from '@/Common/Reveal';
import { BANNER_DARK } from "@/theme/brand";

export const metadata: Metadata = {
  title: { absolute: 'Valve Check Solutions with Industrial Ball Valves' },
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
          bgcolor: BANNER_DARK,
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
            background: 'linear-gradient(180deg, rgba(74,18,6,0.2) 0%, rgba(74,18,6,0.9) 100%)',
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
              Industrial ball valves for demanding applications
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: 500 }}>
              Engineered for extreme conditions. Every valve certified, traceable, and built to last.
            </Typography>
          </Reveal>
        </Box>
      </Box>

      <ProductRangeSections />
    </>
  );
}