'use client';

import { Box, Typography, Stack, Button } from '@mui/material';

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '90vh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: '#0a0604',
      }}
    >
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        src="https://pblol2.blob.core.windows.net/mars-valves/home/mars_valve-hero.mp4"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* dark gradient so text stays legible over footage */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(180deg, rgba(10,6,4,0.85) 0%, rgba(10,6,4,0.45) 45%, rgba(10,6,4,0.92) 100%)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1280px',
          mx: 'auto',
          px: { xs: 3, md: 8 },
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: 720 }}>
          <Typography
            component="span"
            sx={{
              color: 'primary.light',
              letterSpacing: '0.3em',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Engineered for Extreme Conditions
          </Typography>

          <Typography
            component="h1"
            sx={{
              color: '#fff',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Valves built to survive
            <br />
            <Box component="span" sx={{ color: 'primary.main' }}>
              where nothing else can.
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: { xs: '1rem', md: '1.15rem' },
              maxWidth: 560,
            }}
          >
            API 607, ATEX, and SIL 3 certified actuated and process valves for oil &amp; gas,
            chemical, and hazardous-area applications — trusted across the harshest environments
            on Earth.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Button
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5, fontWeight: 700, textTransform: 'none', fontSize: '1rem', borderRadius: '2px' }}
            >
              Explore the Range
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '1rem',
                borderRadius: '2px',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.4)',
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.05)' },
              }}
            >
              Request a Quote
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}