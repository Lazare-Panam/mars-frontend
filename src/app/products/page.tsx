import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import ProductRangeSections from './components/ProductRangeSections';
import Reveal from '@/Common/Reveal';
import { KRONOX, LIGHT_BANNER } from "@/theme/brand";

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
          ...LIGHT_BANNER,
          display: 'flex',
          alignItems: 'center',
          py: { xs: 7, md: 10 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1280px',
            width: '100%',
            mx: 'auto',
            px: { xs: 3, md: 8 },
          }}
        >
          <Reveal>
            <Typography
              sx={{
                color: 'primary.main',
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
              sx={{ color: KRONOX.text, fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, lineHeight: 1.1, mb: 1.5 }}
            >
              Industrial ball valves for demanding applications
            </Typography>
            <Typography sx={{ color: KRONOX.steel, fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 520 }}>
              Engineered for extreme conditions. Every valve certified, traceable, and built to last.
            </Typography>
          </Reveal>
        </Box>
      </Box>

      <ProductRangeSections />
    </>
  );
}