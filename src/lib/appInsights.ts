import { ApplicationInsights } from "@microsoft/applicationinsights-web";
const connectionString =
  "InstrumentationKey=3d506a04-74f8-49b0-b8f5-e773fc4d1f70;IngestionEndpoint=https://ukwest-0.in.applicationinsights.azure.com/;LiveEndpoint=https://ukwest.livediagnostics.monitor.azure.com/;ApplicationId=90d87cff-ec04-45db-b7bd-b18d95b8307e";
const appInsights = new ApplicationInsights({
  config: {
    connectionString: connectionString,
    enableAutoRouteTracking: true,
    enableCorsCorrelation: true,
    disableFetchTracking: false,
    disableAjaxTracking: false,
    isCookieUseDisabled: true, // off by default until consent
  },
});

if (typeof window !== "undefined") {
  appInsights.loadAppInsights();
}

export default appInsights;
