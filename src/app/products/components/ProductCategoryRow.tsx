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
}

export default function ProductCategoryRow({
  label,
  description,
  image,
  href,
  pricesHref,
}: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, md: 3 },
        alignItems: 'flex-start',
      }}
    >
      {/* TEXT (left) */}
      <Box sx={{ flex: '1 1 0', minWidth: 0, order: { xs: 2, sm: 1 } }}>
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
          sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.7, mb: 3 }}
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

      {/* IMAGE (right) */}
      <Box
        component={Link}
        href={href}
        aria-label={`View ${label}`}
        sx={{
          flex: { xs: '1 1 auto', sm: '0 0 42%' },
          order: { xs: 1, sm: 2 },
          width: '100%',
          position: 'relative',
          height: { xs: 220, md: 240 },
          display: 'block',
        }}
      >
        <Image
          src={image}
          alt={label}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, 21vw"
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
