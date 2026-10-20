import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import StockBanner from "@/Common/Navbar/StockBanner";
import TopBar from "@/Common/Navbar/TopBar";
import BenefitsStrip from "@/Common/Navbar/BenefitsStrip";
import Navbar from "@/Common/Navbar/Navbar";
import Footer from "@/Common/Footer/Footer";
import QueryProvider from "@/Common/QueryProvider";
import Script from "next/script";
import { Suspense } from "react";
import CookieBanner from "@/Common/CookieBanner";
import AppInsightsProvider from "@/Common/AppInsightsProvider";
import ContactPrompt from "./Landing/ContactPrompt";
import BackToTop from "@/Common/BackToTop";
import QuickEnquiryButton from "@/Common/QuickEnquiryButton";
import ScrollProgress from "@/Common/ScrollProgress";
import NavProgress from "@/Common/NavProgress";
import { SITE_URL } from "@/lib/site";
import { ADDRESS } from "@/lib/address";
/** */
const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GA_MEASUREMENT_ID = "G-8E3P3CPW72";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mars Valvenok | Authorised MARS Valve Distributor UK",
    template: "%s | Mars Valvenok",
  },
  description:
    "Mars Valvenok is an authorised UK distributor of MARS ball, flanged & fire-safe valves. Stainless SS316, API 607 tested, UK stock & delivery.",
  openGraph: {
    type: "website",
    siteName: "Mars Valvenok",
    title: "Mars Valvenok | Authorised MARS Valve Distributor UK",
    description:
      "Mars Valvenok is an authorised UK distributor of MARS ball, flanged & fire-safe valves. Stainless SS316, API 607 tested, UK stock & delivery.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mars Valvenok | Authorised MARS Valve Distributor UK",
    description:
      "Mars Valvenok is an authorised UK distributor of MARS ball, flanged & fire-safe valves. Stainless SS316, API 607 tested, UK stock & delivery.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Mars Valvenok",
                  legalName: "Valvenok Ltd",
                  url: SITE_URL,
                  logo: "https://pblol2.blob.core.windows.net/mars-valves/logo.jpg",
                  description:
                    "Authorised UK distributor of MARS ball valves from Mars Valve Co., Ltd., Taiwan.",
                  email: "sales@marsvalvenok.com",
                  telephone: "+44 7368 137917",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: ADDRESS.street,
                    addressLocality: ADDRESS.locality,
                    postalCode: ADDRESS.postcode,
                    addressCountry: ADDRESS.countryCode,
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Mars Valvenok",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <script
          nitro-exclude="nitro-exclude"
          seraph-accel-crit="1"
          data-cfasync="false"
          type="text/javascript"
          src="https://cdn.seoplatform.io/injector.js?websiteId=28796"
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "y5wcn0cewm");
      `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeRegistry>
          <QueryProvider>
            <ScrollProgress />
            <NavProgress />
            <Suspense fallback={null}>
              <AppInsightsProvider />
            </Suspense>
            <StockBanner />
            <TopBar />
            <Navbar />
            <BenefitsStrip />
            {children}
            <Footer />
            <CookieBanner />
            <ContactPrompt />
            <BackToTop />
            <QuickEnquiryButton />
          </QueryProvider>
          <Script
            id="hs-script-loader"
            src="//js-eu1.hs-scripts.com/147618935.js"
            strategy="afterInteractive"
          />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>

          {/* Google "Preferred sources" button (Subscribe with Google publisher.js). Renders into the
              element carrying the `google-add-preferred-source-btn` attribute — see Common/Footer/Footer.tsx.
              afterInteractive: the footer div is in the SSR HTML, so the script finds it once loaded. */}
          <Script
            src="https://news.google.com/swg/js/v1/publisher.js"
            strategy="afterInteractive"
          />
        </ThemeRegistry>
      </body>
    </html>
  );
}
