import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
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
  metadataBase: new URL("https://www.marsvalvenok.com/"),
  title: {
    default: "Mars Valves | Industrial Valve Manufacturer",
    template: "%s | Mars Valves",
  },
  description:
    "Mars Valves manufactures industrial ball valves, flanged valves, and fire-safe valves engineered for performance, safety.",
  openGraph: {
    type: "website",
    siteName: "Mars Valves",
    title: "Mars Valves | Industrial Valve Manufacturer",
    description:
      "Mars Valves manufactures industrial ball valves, flanged valves, and fire-safe valves engineered for performance, safety.",
    url: "https://www.marsvalvenok.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mars Valves | Industrial Valve Manufacturer",
    description:
      "Mars Valves manufactures industrial ball valves, flanged valves, and fire-safe valves engineered for performance, safety.",
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
          data-cfasync="false"
          type="text/javascript"
          src="https://cdn.seoplatform.io/injector.js?websiteId=28583"
        />
        <script
  
          nitro-exclude="nitro-exclude"
          seraph-accel-crit="1"
          data-cfasync="false"
          type="text/javascript"
          src="https://cdn.seoplatform.io/injector.js?websiteId=27896"
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
            <Suspense fallback={null}>
              <AppInsightsProvider />
            </Suspense>
            <Navbar />
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
        </ThemeRegistry>
      </body>
    </html>
  );
}
