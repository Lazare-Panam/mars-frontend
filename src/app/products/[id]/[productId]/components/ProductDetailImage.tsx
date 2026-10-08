'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { CARD_BORDER, PANEL_BG } from '@/Common/product/ProductPageHero';

interface Props {
  image: string;
  name: string;
}

export default function ProductDetailImage({ image, name }: Props) {
  return (
    <Box
      sx={{
        position: 'relative',
        pt: '100%',
        background: PANEL_BG,
        borderRadius: '18px',
        border: CARD_BORDER,
        overflow: 'hidden',
        '& img': { transition: 'transform 0.4s ease' },
        '&:hover img': { transform: 'scale(1.04)' },
      }}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: 'contain', padding: '48px', mixBlendMode: 'multiply' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>No image available</Typography>
        </Box>
      )}
    </Box>
  );
}
