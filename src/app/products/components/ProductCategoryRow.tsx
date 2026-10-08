'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  label: string;
  description: string;
  image: string;
  href: string;
  /** When set, a "View Prices" row is shown linking straight to the variants table. */
  pricesHref?: string;
  /** "row": text left, photo right (default). "card": photo on top in a bordered card. */
  layout?: 'row' | 'card';
}

export default function ProductCategoryRow({
  label,
  description,
  image,
  href,
  pricesHref,
  layout = 'row',
}: Props) {
  const card = layout === 'card';
  return (
    <Box
      sx={
        card
          ? {
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              bgcolor: '#fff',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '6px',
              overflow: 'hidden',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              '&:hover': { borderColor: 'primary.main', boxShadow: '0 12px 32px rgba(0,0,0,0.08)' },
            }
          : {
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, md: 3 },
              alignItems: 'flex-start',
            }
      }
    >
      {/* TEXT (left, or below the photo in a card) */}
      <Box
        sx={
          card
            ? { order: 2, p: 3, pt: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }
            : { flex: '1 1 0', minWidth: 0, order: { xs: 2, sm: 1 } }
        }
      >
        <Typography
          component="h2"
          sx={{
            color: 'primary.main',
            fontWeight: 800,
            fontSize: { xs: '1.15rem', md: '1.35rem' },
            lineHeight: 1.2,
            mb: 1.5,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.7, mb: 3, flex: card ? 1 : undefined }}
        >
          {description}
        </Typography>

        {/* Action rows — styled like Herose's accordion rows, each acts as a link */}
        <ActionRow href={href} label="View Detail" ariaLabel={`View details for ${label}`} />
        {pricesHref && (
          <ActionRow
            href={pricesHref}
            label="View Prices"
            ariaLabel={`View prices for ${label}`}
          />
        )}
      </Box>

      {/* IMAGE (right, or on top in a card) */}
      <Box
        component={Link}
        href={href}
        aria-label={`View ${label}`}
        sx={
          card
            ? {
                order: 1,
                position: 'relative',
                height: { xs: 220, md: 250 },
                display: 'block',
                borderBottom: '1px solid',
                borderColor: 'divider',
                '& img': { transition: 'transform 0.3s ease' },
                '&:hover img': { transform: 'scale(1.05)' },
              }
            : {
                flex: { xs: '1 1 auto', sm: '0 0 42%' },
                order: { xs: 1, sm: 2 },
                width: '100%',
                position: 'relative',
                height: { xs: 220, md: 240 },
                display: 'block',
              }
        }
      >
        <Image
          src={image}
          alt={label}
          fill
          style={{ objectFit: 'contain', padding: card ? 20 : undefined }}
          sizes={card ? '(max-width: 900px) 100vw, 380px' : '(max-width: 768px) 100vw, 21vw'}
        />
      </Box>
    </Box>
  );
}

function ActionRow({
  href,
  label,
  ariaLabel,
}: {
  href: string;
  label: string;
  ariaLabel: string;
}) {
  return (
    <Box
      component={Link}
      href={href}
      aria-label={ariaLabel}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        textDecoration: 'none',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'rgba(0,0,0,0.12)',
        pb: 1.25,
        pt: 0.5,
        mb: 1,
        transition: 'color 0.2s ease',
        '&:hover': { color: 'primary.main' },
        '&:hover .vm-box': { bgcolor: 'primary.dark' },
      }}
    >
      <Box
        className="vm-box"
        sx={{
          width: 22,
          height: 22,
          bgcolor: 'primary.main',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background-color 0.2s ease',
        }}
      >
        <AddIcon sx={{ fontSize: 16 }} />
      </Box>
      <Typography
        sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}
      >
        {label}
      </Typography>
    </Box>
  );
}
