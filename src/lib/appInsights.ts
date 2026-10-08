import { ApplicationInsights } from "@microsoft/applicationinsights-web";
const connectionString =
  "InstrumentationKey=3d506a04-74f8-49b0-b8f5-e773fc4d1f70;IngestionEndpoint=https://ukwest-0.in.applicationinsights.azure.com/;LiveEndpoint=https://ukwest.livediagnostics.monitor.azure.com/;ApplicationId=90d87cff-ec04-45db-b7bd-b18d95b8307e";
// Only the live site reports to App Insights. Local development (localhost:3000) and preview
// builds still load the SDK, so trackEvent/trackPageView calls work, but send nothing.
const LIVE_HOSTS = ["www.marsvalvenok.com", "marsvalvenok.com"];
const isLiveSite =
  typeof window !== "undefined" && LIVE_HOSTS.includes(window.location.hostname);

// Browser calls (fetch/XHR) are recorded as dependencies only when they go to our own API.
// Everything else (LinkedIn, Google Analytics, Clarity, HubSpot, Next.js page data) is noise
// that counts toward the App Insights data allowance.
const TRACKED_DEPENDENCY_HOSTS = ["mars-api.mangobeach-29eb5614.ukwest.azurecontainerapps.io"];

const appInsights = new ApplicationInsights({
  config: {
    connectionString,
    disableTelemetry: !isLiveSite,
    // Page views come from route tracking only (AppInsightsProvider no longer tracks them too).
    enableAutoRouteTracking: true,
    enableCorsCorrelation: true,
    // Correlation headers only go to our API, never to third-party hosts.
    correlationHeaderDomains: TRACKED_DEPENDENCY_HOSTS,
    disableFetchTracking: false,
    disableAjaxTracking: false,
    isCookieUseDisabled: true, // off by default until consent
  },
});

if (typeof window !== "undefined") {
  appInsights.loadAppInsights();
  appInsights.addTelemetryInitializer((item) => {
    if (item.baseType !== "RemoteDependencyData") return true;
    const target = String(item.baseData?.target ?? "");
    return TRACKED_DEPENDENCY_HOSTS.some((host) => target.includes(host));
  });
}

export default appInsights;
