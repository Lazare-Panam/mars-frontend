'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E7390F',
      dark: '#A8270A',
      light: '#F2A78F',
      contrastText: '#fff',
    },
    background: {
      default: '#FAF6F4',
    },
    text: {
      primary: '#000000',
      secondary: '#6B3424',
    },
  },
  typography: {
    fontFamily: 'var(--font-body), sans-serif',
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: false }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}