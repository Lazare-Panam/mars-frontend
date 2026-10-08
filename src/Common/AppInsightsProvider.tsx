'use client';

// Importing the module starts the App Insights SDK in the browser. Page views are tracked by
// the SDK's route tracking (enableAutoRouteTracking in src/lib/appInsights.ts); tracking them
// here as well counted every page view twice.
import '@/lib/appInsights';

export default function AppInsightsProvider() {
  return null;
}
