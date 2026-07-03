'use client';

import { ProductType } from '@/api/useProductCatalog';
import { Box, Typography, Chip, Card, CardContent } from '@mui/material';
import Image from 'next/image';

interface Props {
  id: string;
  name: string;
  description: string;
  thumbnailImage: string;
  type?: ProductType;
  specs?: Record<string, string>;
  features?: string[];
  onClick: (id: string) => void;
}

export default function ProductCard({ id, name, description, thumbnailImage, specs, features, onClick }: Props) {
  return (
    <Card
      onClick={() => onClick(id)}
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box sx={{ position: 'relative', pt: '65%', bgcolor: '#fff' }}>
        {thumbnailImage ? (
          <Image
            src={thumbnailImage}
            alt={name}
            fill
            style={{ objectFit: 'contain', padding: '32px' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>No image</Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ height: '1px', bgcolor: 'rgba(0,0,0,0.06)' }} />

      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, flex: 1, bgcolor: '#FAF6F4' }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary', mb: 0.75 }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.65 }}>
            {description}
          </Typography>
        </Box>

        {specs && Object.keys(specs).length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {Object.entries(specs).slice(0, 4).map(([label, value]) => (
              <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>{label}</Typography>
                <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.8rem' }}>{value}</Typography>
              </Box>
            ))}
          </Box>
        )}

        {features && features.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 'auto' }}>
            {features.map((f) => (
              <Chip
                key={f}
                label={f}
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  height: 22,
                  bgcolor: 'rgba(231,57,15,0.08)',
                  color: 'primary.main',
                  fontWeight: 600,
                  borderRadius: '2px',
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}