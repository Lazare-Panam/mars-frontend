'use client';

import { Box, Typography } from '@mui/material';
import { CARD_BORDER } from '@/Common/product/ProductPageHero';

export default function ProductSpecsTable({ specs }: { specs: Record<string, string> }) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <Box>
      <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: 'text.primary', mb: 1.5 }}>
        Specifications
      </Typography>
      <Box sx={{ border: CARD_BORDER, borderRadius: '14px', overflow: 'hidden', bgcolor: '#fff' }}>
        {Object.entries(specs).map(([label, value], i) => (
          <Box
            key={label}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 3,
              px: 2.5,
              py: 1.4,
              bgcolor: i % 2 ? '#FAFAFB' : '#fff',
              borderTop: i === 0 ? 'none' : '1px solid rgba(58,61,66,0.06)',
            }}
          >
            <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem', flexShrink: 0 }}>{label}</Typography>
            <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.88rem', textAlign: 'right' }}>{value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
