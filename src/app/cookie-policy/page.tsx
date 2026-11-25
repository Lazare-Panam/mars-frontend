"use client";

// DRAFT legal template — pending review/sign-off before the LinkedIn launch.
// The services listed are those actually loaded by the site (see app/layout.tsx
// and Common/CookieBanner.tsx): consent cookie, Google Analytics, Microsoft
// Clarity, Azure Application Insights, HubSpot, Cloudflare Turnstile.
import Link from "next/link";
import LegalDocument, { type LegalSection } from "@/Common/LegalDocument";

const sections: LegalSection[] = [
  {
    heading: "1. What are cookies?",
    body: (
      <p>
        Cookies are small text files stored on your device when you visit a
        website. They help the site work, remember your choices, and let us
        understand how the site is used. This policy should be read alongside our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    heading: "2. Strictly necessary cookies",
    body: (
      <>
        <p>
          These are required for the site to function and cannot be switched off.
          They include:
        </p>
        <ul>
          <li>
            <strong>mars-cookie-consent</strong> — remembers your cookie
            preferences so we don&rsquo;t ask again (stored for up to 12 months).
          </li>
          <li>
            <strong>Session / basket</strong> — keep you logged in and remember
            the items in your basket.
          </li>
          <li>
            <strong>Cloudflare Turnstile</strong> — protects our enquiry and
            application forms from bots.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. Analytics and performance cookies",
    body: (
      <>
        <p>
          With your consent, these help us measure and improve how the site
          performs. We use:
        </p>
        <ul>
          <li>
            <strong>Google Analytics</strong> — measures traffic and how visitors
            use the site.
          </li>
          <li>
            <strong>Microsoft Clarity</strong> — aggregated heatmaps and session
            insights to improve usability.
          </li>
          <li>
            <strong>Microsoft Azure Application Insights</strong> — monitors
            performance and errors.
          </li>
          <li>
            <strong>HubSpot</strong> — helps us understand enquiries and manage
            customer communications.
          </li>
        </ul>
        <p>
          Analytics cookies are only set after you accept them in the cookie
          banner. If you decline, we disable them.
        </p>
      </>
    ),
  },
  {
    heading: "4. Managing your cookies",
    body: (
      <p>
        You can accept or decline non-essential cookies using the banner shown
        when you first visit. You can also control cookies through your browser
        settings and delete cookies already stored. Blocking some cookies may
        affect how parts of the site work.
      </p>
    ),
  },
  {
    heading: "5. Changes and contact",
    body: (
      <p>
        We may update this policy as the services we use change. For any
        questions, email{" "}
        <a href="mailto:sales@kronoxvalve.com">sales@kronoxvalve.com</a>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      overline="Legal"
      title="Cookie"
      highlight="Policy"
      intro="This policy explains how we use cookies and similar technologies, and how you can manage them."
      lastUpdated="2 November 2026"
      sections={sections}
    />
  );
}
