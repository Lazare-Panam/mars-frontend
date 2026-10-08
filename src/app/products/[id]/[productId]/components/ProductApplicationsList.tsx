'use client';

import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ProductApplicationsList({ applications }: { applications: string[] }) {
  if (!applications?.length) return null;

  return (
    <Box>
      <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: 'text.primary', mb: 1.5 }}>
        Applications
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {applications.map((app) => (
          <Box key={app} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <ArrowForwardIcon sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.92rem', color: 'text.secondary' }}>{app}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
