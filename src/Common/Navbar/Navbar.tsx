'use client';

import { useState } from 'react';
import { Box, Typography, InputBase, useScrollTrigger } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MegaMenuPanel from './MegaMenuPanel';
import { LEFT_NAV, RIGHT_NAV, type NavItem } from './navData';

function NavLink({ item, openLabel, setOpenLabel }: {
  item: NavItem;
  openLabel: string | null;
  setOpenLabel: (label: string | null) => void;
}) {
  const isOpen = openLabel === item.label;

  return (
    <Box
      onMouseEnter={() => item.megaMenu && setOpenLabel(item.label)}
      sx={{ position: 'relative' }}
    >
      <Typography
        component={Link}
        href={item.href}
        sx={{
          fontWeight: 700,
          fontSize: '0.9rem',
          color: isOpen ? 'primary.main' : 'text.primary',
          textDecoration: 'none',
          display: 'inline-block',
          py: 1,
          '&:hover': { color: 'primary.main' },
        }}
      >
        {item.label}
      </Typography>

      {item.megaMenu && isOpen && <MegaMenuPanel columns={item.megaMenu} />}
    </Box>
  );
}

export default function Navbar() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 30 });

  return (
    <Box
      component="header"
      onMouseLeave={() => setOpenLabel(null)}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        bgcolor: scrolled ? 'rgba(255,255,255,0.98)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? 'none' : '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {/* utility row */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.06)' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 3,
            maxWidth: '1280px',
            mx: 'auto',
            px: { xs: 3, md: 8 },
            py: 1,
          }}
        >
          <Box
            component={Link}
            href="#"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              textDecoration: 'none',
              fontSize: '0.8rem',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: '0.8rem' }}>Product Inquiry</Typography>
          </Box>
        </Box>
      </Box>

      {/* main row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1280px',
          mx: 'auto',
          px: { xs: 3, md: 8 },
          py: 2,
        }}
      >
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          {LEFT_NAV.map((item) => (
            <NavLink key={item.label} item={item} openLabel={openLabel} setOpenLabel={setOpenLabel} />
          ))}
        </Box>

        <Box
          component={Link}
          href="/"
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', flexShrink: 0 }}
        >
          <Box sx={{ position: 'relative', width: 44, height: 44 }}>
            <Image
              src="https://pblol2.blob.core.windows.net/mars-valves/logo.jpg"
              alt="MARS Valves UK logo"
              fill
              style={{ objectFit: 'contain' }}
              sizes="44px"
            />
          </Box>
          <Typography
            sx={{
              fontFamily: 'serif',
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.3rem' },
              color: 'text.primary',
              whiteSpace: 'nowrap',
            }}
          >
            MARS VALVES UK
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          {RIGHT_NAV.map((item) => (
            <NavLink key={item.label} item={item} openLabel={openLabel} setOpenLabel={setOpenLabel} />
          ))}
        </Box>
      </Box>

      {/* always-visible search row */}
      <Box sx={{ bgcolor: '#FAF6F4', borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.06)', py: 1 }}>
        <Box
          sx={{
            maxWidth: '1280px',
            mx: 'auto',
            px: { xs: 3, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: '#fff',
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
              px: 2,
              py: 0.75,
              maxWidth: 420,
              '&:focus-within': { borderColor: 'primary.main' },
              transition: 'border-color 0.15s ease',
            }}
          >
            <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <InputBase
              placeholder="Search valves, fittings, certificates…"
              sx={{ fontSize: '0.85rem', width: '100%', '& input': { p: 0 } }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}