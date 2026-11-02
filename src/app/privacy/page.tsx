"use client";

// DRAFT legal template — pending review/sign-off before the LinkedIn launch.
// Facts in [brackets] must be confirmed (ICO registration number, retention
// periods). Company details, collection points and third-party processors are
// drawn from the live site (registration, cart, enquiry forms, credit
// application; GA, Microsoft Clarity, Azure App Insights, HubSpot, Cloudflare).
import Link from "next/link";
import LegalDocument, { type LegalSection } from "@/Common/LegalDocument";
import { ADDRESS } from "@/lib/address";

const sections: LegalSection[] = [
  {
    heading: "1. Who we are",
    body: (
      <>
        <p>
          This website is operated by {ADDRESS.name} (&ldquo;Mars Valvenok&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;), an authorised UK distributor of
          MARS&reg; ball valves. We are the data controller responsible for your
          personal data.
        </p>
        <p>
          Registered address: {ADDRESS.street}, {ADDRESS.locality},{" "}
          {ADDRESS.postcode}, {ADDRESS.country}. You can contact us about this
          policy at <a href="mailto:sales@marsvalvenok.com">sales@marsvalvenok.com</a>.
          [ICO registration number to be confirmed.]
        </p>
      </>
    ),
  },
  {
    heading: "2. The information we collect",
    body: (
      <>
        <p>We collect personal data when you interact with our site, including:</p>
        <ul>
          <li>
            <strong>Account registration:</strong> name, email address, password
            and company details when you create an account.
          </li>
          <li>
            <strong>Orders and basket:</strong> the products you add to your
            basket or order, billing/delivery addresses and contact details.
          </li>
          <li>
            <strong>Enquiry and quote forms:</strong> your name, email, phone and
            message. These forms are protected by Cloudflare Turnstile, which
            processes limited technical data to confirm you are not a bot.
          </li>
          <li>
            <strong>Credit account applications:</strong> business and financial
            information (including trade references and bank details) that you
            submit when applying for a credit account.
          </li>
          <li>
            <strong>Technical and usage data:</strong> IP address, device and
            browser type, and pages visited, collected automatically through
            cookies and analytics (see our{" "}
            <Link href="/cookie-policy">Cookie Policy</Link>).
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. How and why we use your data",
    body: (
      <>
        <p>We use your personal data on the following lawful bases:</p>
        <ul>
          <li>
            <strong>To perform a contract</strong> — processing orders, managing
            your account, arranging delivery and handling returns.
          </li>
          <li>
            <strong>Legitimate interests</strong> — responding to enquiries,
            improving our website and products, and preventing fraud and abuse.
          </li>
          <li>
            <strong>Legal obligation</strong> — meeting accounting, tax and other
            regulatory requirements, and assessing credit applications.
          </li>
          <li>
            <strong>Consent</strong> — non-essential analytics cookies and any
            marketing communications, which you can withdraw at any time.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "4. Who we share it with",
    body: (
      <>
        <p>
          We do not sell your personal data. We share it only with service
          providers who process it on our behalf, including:
        </p>
        <ul>
          <li>Payment providers to take payment securely;</li>
          <li>Couriers and logistics partners to deliver your order;</li>
          <li>
            HubSpot (CRM) to manage enquiries and customer communications;
          </li>
          <li>
            Analytics providers — Google Analytics, Microsoft Clarity and
            Microsoft Azure Application Insights — to understand site usage;
          </li>
          <li>Cloudflare, for bot protection on our forms;</li>
          <li>
            Credit reference and fraud-prevention agencies where you apply for a
            credit account;
          </li>
          <li>
            Professional advisers and authorities where required by law.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "5. International transfers",
    body: (
      <p>
        Some of our providers are based outside the UK. Where personal data is
        transferred internationally, we rely on UK adequacy regulations or
        appropriate safeguards such as the UK International Data Transfer
        Agreement to keep your data protected.
      </p>
    ),
  },
  {
    heading: "6. How long we keep it",
    body: (
      <p>
        We keep personal data only for as long as necessary for the purposes
        above and to meet our legal obligations. Order and accounting records are
        generally retained for [6 years] in line with UK tax law; enquiry and
        account data is held for [retention period to be confirmed] and then
        deleted or anonymised.
      </p>
    ),
  },
  {
    heading: "7. Your rights",
    body: (
      <>
        <p>Under UK GDPR you have the right to:</p>
        <ul>
          <li>access a copy of the personal data we hold about you;</li>
          <li>have inaccurate data corrected, or incomplete data completed;</li>
          <li>request erasure of your data in certain circumstances;</li>
          <li>restrict or object to processing, and to data portability;</li>
          <li>withdraw consent where we rely on it.</li>
        </ul>
        <p>
          To exercise any of these rights, contact{" "}
          <a href="mailto:sales@marsvalvenok.com">sales@marsvalvenok.com</a>. You
          also have the right to complain to the Information Commissioner&rsquo;s
          Office (ICO) at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "8. Security",
    body: (
      <p>
        We use appropriate technical and organisational measures to protect your
        data, including encryption in transit (HTTPS) and restricted access to
        personal data. No transmission over the internet is completely secure,
        but we take all reasonable steps to safeguard your information.
      </p>
    ),
  },
  {
    heading: "9. Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. Any changes will be posted
        on this page with a revised &ldquo;last updated&rdquo; date.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      overline="Legal"
      title="Privacy"
      highlight="Policy"
      intro="This policy explains what personal data we collect, how we use it, and the rights you have over it."
      lastUpdated="2 November 2026"
      sections={sections}
    />
  );
}
