'use client';

import { useState } from 'react';
import { Box, Typography, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function CollapsibleSection({ title, defaultOpen = true, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <Box
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          cursor: 'pointer',
          mb: { xs: 4, md: 6 },
          userSelect: 'none',
          '&:focus-visible': {
            outline: (t) => `2px solid ${t.palette.primary.main}`,
            outlineOffset: 4,
          },
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.6rem', md: '2rem' },
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </Typography>
        <IconButton
          aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
          size="small"
          sx={{ color: 'text.primary' }}
        >
          <ExpandMoreIcon
            sx={{
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
        </IconButton>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
}
