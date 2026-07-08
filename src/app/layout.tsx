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

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MARS",
  description: "MARS",
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
      <body className="min-h-full flex flex-col">
        <ThemeRegistry>
          <QueryProvider>
            <Suspense fallback={null}>
              <AppInsightsProvider />
            </Suspense>
            <Navbar />
            {children}
            <Footer />
            <CookieBanner />
          </QueryProvider>
          <Script
            id="hs-script-loader"
            src="//js-eu1.hs-scripts.com/147618935.js"
            strategy="afterInteractive"
          />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-8E3P3CPW72"
            strategy="afterInteractive"
          />
          <Script id="google-analytics-2" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8E3P3CPW72');
            `}
          </Script>
        </ThemeRegistry>
      </body>
    </html>
  );
}