'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import appInsights from '@/lib/appInsights';

export default function AppInsightsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    appInsights.trackPageView({ uri: pathname });
  }, [pathname]);

  return null;
}