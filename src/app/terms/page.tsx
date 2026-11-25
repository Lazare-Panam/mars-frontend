"use client";

// DRAFT legal template — pending review/sign-off before the LinkedIn launch.
// Cross-links to the existing Delivery, Returns and Credit Application pages.
import Link from "next/link";
import LegalDocument, { type LegalSection } from "@/Common/LegalDocument";
import { ADDRESS } from "@/lib/address";

const sections: LegalSection[] = [
  {
    heading: "1. About these terms",
    body: (
      <p>
        These terms and conditions govern your use of this website and the sale
        of products by {ADDRESS.name} (&ldquo;Kronox Valves&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;), the manufacturer of Kronox ball
        valves. By using this site or placing an order you accept
        these terms. Please also read our{" "}
        <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>
    ),
  },
  {
    heading: "2. Using the website",
    body: (
      <p>
        You may use this website for lawful purposes only. You must not misuse it
        by introducing malicious code, attempting unauthorised access, or using
        it in any way that could damage or impair the service.
      </p>
    ),
  },
  {
    heading: "3. Accounts",
    body: (
      <p>
        If you create an account you are responsible for keeping your login
        details confidential and for all activity under your account. Please
        notify us immediately of any unauthorised use.
      </p>
    ),
  },
  {
    heading: "4. Products, pricing and availability",
    body: (
      <p>
        We make every effort to describe products and display prices accurately,
        but errors may occur. All prices are shown in [GBP] and [exclude VAT and
        delivery unless stated]. Product specifications are provided by the
        manufacturer and are subject to change. We reserve the right to correct
        errors and to withdraw products without notice. Where a pricing error is
        obvious, we are not obliged to supply at the incorrect price.
      </p>
    ),
  },
  {
    heading: "5. Quotations, enquiries and orders",
    body: (
      <p>
        An order placed through the site is an offer to buy, which we accept when
        we confirm dispatch. Quotations provided in response to an enquiry are
        valid for [30 days] unless stated otherwise and are subject to stock
        availability at the time of order.
      </p>
    ),
  },
  {
    heading: "6. Payment",
    body: (
      <p>
        Payment is due in full before dispatch unless you hold an approved credit
        account. We accept the payment methods shown at checkout. Title to the
        goods remains with us until payment has been received in full.
      </p>
    ),
  },
  {
    heading: "7. Delivery",
    body: (
      <p>
        Delivery times and charges are set out on our{" "}
        <Link href="/delivery-information">Delivery Information</Link> page.
        Delivery estimates are given in good faith but are not guaranteed. Risk
        in the goods passes to you on delivery.
      </p>
    ),
  },
  {
    heading: "8. Returns",
    body: (
      <p>
        Your rights to return goods are described in our{" "}
        <Link href="/return-policy">Returns Policy</Link>, which forms part of
        these terms. Nothing in these terms affects your statutory rights.
      </p>
    ),
  },
  {
    heading: "9. Credit accounts",
    body: (
      <p>
        Credit accounts are offered at our discretion following a successful
        application and credit check. If you apply via our{" "}
        <Link href="/credit-application">Credit Application</Link>, the
        information you provide must be accurate and complete. Credit terms,
        limits and payment periods will be confirmed in writing.
      </p>
    ),
  },
  {
    heading: "10. Intellectual property",
    body: (
      <p>
        Kronox&reg; is a trademark of Valvenok Ltd. All content on this site
        (text, images and layout) is owned by or licensed to us and may not be
        reproduced without our permission.
      </p>
    ),
  },
  {
    heading: "11. Our liability",
    body: (
      <p>
        We do not exclude or limit liability where it would be unlawful to do so,
        including for death or personal injury caused by negligence. Subject to
        that, we are not liable for indirect or consequential loss, and our total
        liability in connection with any order is limited to the price paid for
        the goods. Product suitability for a given application is your
        responsibility; please contact us if you need technical guidance.
      </p>
    ),
  },
  {
    heading: "12. Governing law",
    body: (
      <p>
        These terms are governed by the laws of England and Wales, and disputes
        are subject to the exclusive jurisdiction of the courts of England and
        Wales.
      </p>
    ),
  },
  {
    heading: "13. Contact us",
    body: (
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:sales@marsvalvenok.com">sales@marsvalvenok.com</a> or
        write to us at {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.postcode}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      overline="Legal"
      title="Terms &"
      highlight="Conditions"
      intro="These terms govern your use of our website and the sale of products to you."
      lastUpdated="2 November 2026"
      sections={sections}
    />
  );
}
