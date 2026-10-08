'use client';

import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { CARD_BORDER } from '@/Common/product/ProductPageHero';

export default function ProductFeatureChips({ features }: { features: string[] }) {
  if (!features?.length) return null;

  return (
    <Box>
      <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: 'text.primary', mb: 1.5 }}>
        Features
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {features.map((f) => (
          <Box
            key={f}
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.75,
              borderRadius: '999px',
              border: CARD_BORDER,
              bgcolor: '#fff',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            <CheckIcon sx={{ fontSize: 15, color: 'primary.main' }} />
            {f}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
