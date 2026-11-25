'use client';

import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {
  label: string;
  description: string;
  image: string;
  href: string;
}

export default function ProductCategoryCard({ label, description, image, href }: Props) {
  return (
    <Card
      component={Link}
      href={href}
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        borderRadius: '6px',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        },
        '&:hover .product-thumb-img': { transform: 'scale(1.06)' },
      }}
    >
      {/* Image area — white background */}
      <Box sx={{ position: 'relative', pt: '65%', bgcolor: '#fff', overflow: 'hidden' }}>
        <Image
          src={image}
          alt={label}
          fill
          className="product-thumb-img"
          style={{ objectFit: 'contain', padding: '32px', transition: 'transform 0.5s ease' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Box>

      {/* Divider */}
      <Box sx={{ height: '1px', bgcolor: 'rgba(0,0,0,0.06)' }} />

      {/* Content */}
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1.5, bgcolor: '#F5F5F6' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', lineHeight: 1.65 }}>
          {description}
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            mt: 0.5,
            color: 'primary.main',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          View Range <ArrowForwardIcon sx={{ fontSize: 15 }} />
        </Box>
      </CardContent>
    </Card>
  );
}