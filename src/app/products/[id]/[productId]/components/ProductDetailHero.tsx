'use client';

import { Box, Typography } from '@mui/material';
import PageBreadcrumbs from '@/Common/PageBreadcrumbs';
import type { Crumb } from '@/lib/breadcrumbs';

export default function ProductDetailHero({ name, breadcrumbs }: { name: string; breadcrumbs?: Crumb[] }) {
  return (
    <Box sx={{ bgcolor: '#0a0604', px: { xs: 3, md: 8 }, py: { xs: 4, md: 5 } }}>
      <Box sx={{ maxWidth: '1280px', mx: 'auto' }}>
        {breadcrumbs && <PageBreadcrumbs items={breadcrumbs} tone="onDark" sx={{ mb: 2.5 }} />}
        <Typography
          sx={{
            color: 'primary.light',
            letterSpacing: '0.2em',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          Ball Valves
        </Typography>
        <Typography
          component="h1"
          sx={{ color: '#fff', fontSize: { xs: '1.8rem', md: '2.6rem' }, fontWeight: 800, lineHeight: 1.1 }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
}