'use client';

import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import FeaturedCard from './FeaturedCard';
import { FEATURED_VALVES } from './featuredValveData';

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export default function FeaturedProducts() {
  // duplicate the array so the loop is seamless
  const track = [...FEATURED_VALVES, ...FEATURED_VALVES];

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: '1280px', mx: 'auto', px: { xs: 3, md: 8 }, mb: 5 }}>
        <Typography
          component="span"
          sx={{
            color: 'primary.main',
            letterSpacing: '0.3em',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          Featured Range
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            fontWeight: 800,
            color: 'text.primary',
            mt: 1,
          }}
        >
          Built for every line, every condition.
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          maskImage:
            'linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            width: 'max-content',
            px: 3,
            py: 2,
            animation: `${scroll} 35s linear infinite`,
            '&:hover': { animationPlayState: 'paused' },
          }}
        >
          {track.map((valve, i) => (
            <FeaturedCard key={`${valve.code}-${i}`} valve={valve} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}