'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import RegisterForm from './RegisterForm';
import Reveal from '@/Common/Reveal';

export default function RegisterPage() {
  return (
    <Box sx={{ backgroundColor: 'background.default', py: { xs: 6, md: 12 }, display: 'flex', justifyContent: 'center' }}>
      <Reveal>
        <RegisterForm />
      </Reveal>
    </Box>
  );
}