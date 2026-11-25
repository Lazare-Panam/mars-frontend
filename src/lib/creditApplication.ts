// Everything about the credit application that isn't UI: the shape of the
// data, how each field is labelled, which fields are required, validation,
// and how the answers are written into the enquiry email.

// `as const` makes this a fixed tuple of literal strings instead of string[],
// so TypeScript knows the only possible values are "GBP", "EUR" and "USD".
export const CURRENCIES = ["GBP", "EUR", "USD"] as const;

// "The type of any element of CURRENCIES" -> "GBP" | "EUR" | "USD".
export type Currency = (typeof CURRENCIES)[number];

// One property per form field. Number fields are kept as strings because
// that's what an <input> gives you; they're checked in validateApplication.
export interface CreditApplication {
  // Company details
  companyName: string;
  registrationNumber: string;
  vatNumber: string;
  addressLine1: string;
  addressLine2: string;
  website: string;
  industry: string;
  yearsInBusiness: string;
  employees: string;
  // Primary contact
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  // Credit request
  currency: Currency;
  creditLimit: string;
  paymentTerms: string;
  monthlyOrderValue: string;
  primaryProducts: string;
  // Declaration & signature
  signatoryName: string;
  signatoryPosition: string;
  signature: string;
  date: string;
}

// The union of every property name: "companyName" | "registrationNumber" | ...
export type CreditField = keyof CreditApplication;

export const EMPTY_APPLICATION: CreditApplication = {
  companyName: "",
  registrationNumber: "",
  vatNumber: "",
  addressLine1: "",
  addressLine2: "",
  website: "",
  industry: "",
  yearsInBusiness: "",
  employees: "",
  contactName: "",
  jobTitle: "",
  email: "",
  phone: "",
  currency: "GBP",
  creditLimit: "",
  paymentTerms: "",
  monthlyOrderValue: "",
  primaryProducts: "",
  signatoryName: "",
  signatoryPosition: "",
  signature: "",
  date: "",
};

export interface FieldConfig {
  label: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "url" | "number" | "date";
  /** Takes the whole row instead of half of it. */
  fullWidth?: boolean;
  /** An amount of money: the label gets the chosen currency, e.g. "(GBP)". */
  money?: boolean;
  /** Character limit; defaults to DEFAULT_MAX_LENGTH. */
  maxLength?: number;
  /** Number fields only: the smallest value allowed (defaults to 0). */
  min?: number;
  /** Number fields only: whole numbers only, no decimals. */
  integer?: boolean;
  /** Grey example text shown inside the box until the user types. */
  placeholder?: string;
}

// Keeps the whole application under the enquiry API's 4,000-character limit.
export const DEFAULT_MAX_LENGTH = 100;

// Record<CreditField, FieldConfig> means "an object with exactly one entry for
// every field". Forget a field, or misspell one, and TypeScript errors.
export const FIELDS: Record<CreditField, FieldConfig> = {
  companyName: { label: "Company / Trading Name", required: true, fullWidth: true },
  registrationNumber: { label: "Company Registration Number", required: true },
  vatNumber: { label: "VAT Number" },
  addressLine1: { label: "Registered Address (Line 1)", required: true },
  addressLine2: { label: "Address Line 2, City, Postcode" },
  website: { label: "Website", type: "url" },
  industry: { label: "Industry / Sector", required: true },
  yearsInBusiness: { label: "Years in Business", required: true, type: "number", min: 0, integer: true },
  employees: { label: "Number of Employees", type: "number", min: 1, integer: true },
  contactName: { label: "Full Name", required: true },
  jobTitle: { label: "Job Title", required: true },
  email: { label: "Email Address", required: true, type: "email" },
  phone: { label: "Phone Number", required: true, type: "tel" },
  currency: { label: "Currency", required: true },
  creditLimit: { label: "Credit Limit Requested", required: true, type: "number", money: true, min: 1 },
  paymentTerms: { label: "Preferred Payment Terms", required: true },
  monthlyOrderValue: { label: "Estimated Monthly Order Value", required: true, type: "number", money: true, min: 1 },
  primaryProducts: {
    label: "Primary Products to Purchase",
    fullWidth: true,
    maxLength: 500,
    placeholder: "e.g. Two-piece ball valves, sanitary tri-clamp valves",
  },
  signatoryName: { label: "Authorised Signatory (Full Name)", required: true },
  signatoryPosition: { label: "Position / Title", required: true },
  signature: { label: "Signature (Type Full Name)", required: true },
  date: { label: "Date", required: true, type: "date" },
};

export interface FormSection {
  title: string;
  fields: CreditField[];
  /** Optional box of statements shown above the fields. */
  declaration?: { heading: string; points: string[] };
}

// The order the form is drawn in, and the order the email lists the answers.
export const SECTIONS: FormSection[] = [
  {
    title: "Company Details",
    fields: [
      "companyName",
      "registrationNumber",
      "vatNumber",
      "addressLine1",
      "addressLine2",
      "website",
      "industry",
      "yearsInBusiness",
      "employees",
    ],
  },
  {
    title: "Primary Contact",
    fields: ["contactName", "jobTitle", "email", "phone"],
  },
  {
    title: "Credit Request",
    fields: ["currency", "creditLimit", "paymentTerms", "monthlyOrderValue", "primaryProducts"],
  },
  {
    title: "Declaration & Signature",
    declaration: {
      heading: "By signing below, I confirm that:",
      points: [
        "The information provided is accurate and complete to the best of my knowledge.",
        "I authorise Kronox Valves to carry out credit checks and contact any references provided for verification.",
        "I understand Kronox Valves reserves the right to approve, decline or amend the credit facility.",
      ],
    },
    fields: ["signatoryName", "signatoryPosition", "signature", "date"],
  },
];

/** The label shown for a field, with the currency added to money fields. */
export function labelFor(field: CreditField, currency: Currency): string {
  const config = FIELDS[field];
  return config.money ? `${config.label} (${currency})` : config.label;
}

// Partial<...> makes every key optional: only fields with a problem appear.
export type CreditErrors = Partial<Record<CreditField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Object.keys() is typed as string[], so we tell TypeScript these strings are
// really CreditField names with `as CreditField[]`.
const ALL_FIELDS = Object.keys(FIELDS) as CreditField[];
const REQUIRED_FIELDS = ALL_FIELDS.filter((field) => FIELDS[field].required);
const NUMBER_FIELDS = ALL_FIELDS.filter((field) => FIELDS[field].type === "number");

export function validateApplication(app: CreditApplication): CreditErrors {
  const errors: CreditErrors = {};

  for (const field of REQUIRED_FIELDS) {
    if (!app[field].trim()) errors[field] = "This field is required";
  }

  if (app.email && !EMAIL_PATTERN.test(app.email)) {
    errors.email = "Enter a valid email address";
  }

  // Number fields: no negatives, nothing below the field's minimum, and whole
  // numbers where the field asks for them. Empty ones are skipped here; the
  // required check above already covers those.
  for (const field of NUMBER_FIELDS) {
    const raw = app[field].trim();
    if (!raw) continue;

    const value = Number(raw);
    const { min = 0, integer } = FIELDS[field];

    if (Number.isNaN(value) || value < min) {
      errors[field] = min > 0 ? `Enter a number of at least ${min}` : "Enter a number of 0 or more";
    } else if (integer && !Number.isInteger(value)) {
      errors[field] = "Enter a whole number";
    }
  }

  // The typed signature has to be the signatory's name, like signing for real.
  const signature = app.signature.trim().toLowerCase();
  const signatory = app.signatoryName.trim().toLowerCase();
  if (signature && signatory && signature !== signatory) {
    errors.signature = "Type the authorised signatory's full name exactly";
  }

  return errors;
}

/**
 * Writes the answers as plain text, section by section. There's no credit
 * endpoint in the API yet, so this text is sent as the message of a normal
 * enquiry (POST /api/User/enquiry, which allows up to 4,000 characters).
 */
export function formatCreditMessage(app: CreditApplication): string {
  const lines: string[] = ["CREDIT LINE APPLICATION", ""];

  for (const section of SECTIONS) {
    lines.push(section.title.toUpperCase());
    for (const field of section.fields) {
      const value = app[field].trim() || "-";
      lines.push(`${labelFor(field, app.currency)}: ${value}`);
    }
    lines.push("");
  }

  lines.push("The applicant accepted the declaration and signed by typing their full name.");
  return lines.join("\n");
}
