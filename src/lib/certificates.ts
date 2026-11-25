// Manufacturer certificates for Kronox valves (issued to Mars Valve Co., Ltd.),
// hosted on our blob storage. Chosen for UK buyers: AGA (Australia) and CRN
// (Canada) are left out. Dates are from the certificates themselves.

const BASE = "https://pblol2.blob.core.windows.net/mars-valves/certificates/";
const file = (name: string) => BASE + encodeURIComponent(name);

export type CertFile = { label: string; href: string };
export type CertGroup = {
  id: string;
  title: string;
  standard: string;
  issuer: string;
  summary: string;
  validity?: string;
  files: CertFile[];
};

export const FIRE_SAFE_SERIES = [
  { series: "Series 28 / 28M", edition: "API 607 7th Ed. · ISO 10497 3rd Ed.", sizes: '1/4" – 4"' },
  { series: "Series 83", edition: "API 607 7th Ed. · ISO 10497 3rd Ed.", sizes: '1/4" – 4"' },
  { series: "Series 88", edition: "API 607 7th Ed. · ISO 10497 3rd Ed.", sizes: '1/4" – 4"' },
  { series: "Series 90", edition: "API 607 7th Ed. · ISO 10497 3rd Ed.", sizes: '1/2" – 12"' },
  { series: "Series 90D", edition: "API 607 7th Ed. · ISO 10497 3rd Ed.", sizes: '1/2" – 12"' },
  { series: "Series 91D", edition: "API 607 7th Ed. · ISO 10497 3rd Ed.", sizes: '1/2" – 6"' },
  { series: "Series 96D", edition: "API 607 6th Ed.", sizes: '1/2" – 4"' },
];

export const CERT_GROUPS: CertGroup[] = [
  {
    id: "fire-safe",
    title: "Fire safe",
    standard: "API 607 7th Edition · ISO 10497 3rd Edition",
    issuer: "Fire-type tested",
    summary:
      "Soft-seated quarter-turn valves that keep sealing during and after fire exposure. Specified for oil & gas, petrochemical and chemical plants handling flammable fluids. Certificates are per series and body material (CF8M stainless or WCB carbon steel).",
    files: [
      { label: "Series 83 · CF8M", href: file("V83, CF8M.pdf") },
      { label: "Series 83 · WCB", href: file("V83, WCB.pdf") },
      { label: "Series 88 · CF8M", href: file("V88, CF8M.pdf") },
      { label: "Series 88 · WCB", href: file("V88, WCB.pdf") },
      { label: "Series 90 · CF8M", href: file("V90, CF8M.pdf") },
      { label: "Series 90 · WCB", href: file("V90, WCB.pdf") },
      { label: "Series 90D · CF8M", href: file("V90D, CF8M.pdf") },
      { label: "Series 90D · WCB", href: file("V90D, WCB.pdf") },
      { label: "Series 91D · CF8M", href: file("V91D, CF8M.pdf") },
      { label: "Series 91D · WCB", href: file("V91D, WCB.pdf") },
    ],
  },
  {
    id: "sil-3",
    title: "SIL 3 capable",
    standard: "IEC 61508:2010 Parts 1–2 · Systematic Capability SC 3",
    issuer: "exida",
    summary:
      "For safety instrumented functions (emergency shutdown, isolation). The SIL of the complete function must still be verified for each application, per the manufacturer's safety manual.",
    validity: "Surveillance audit due 1 October 2027",
    files: [
      { label: "2-way: Series 22, 77, 83, 88, 90, 90D, 91D and more", href: file("SIL3 Certificate.pdf") },
      { label: "3-way: Series 33, 39 & 39M", href: file("SIL3 Certificate (1).pdf") },
      { label: "3-way: Series 30M", href: file("SIL3 Certificate (2).pdf") },
    ],
  },
  {
    id: "ped",
    title: "CE · Pressure Equipment Directive",
    standard: "PED 2014/68/EU, Annex III Module D1",
    issuer: "LRQA, Notified Body 0343",
    summary: "EU certificate of conformity for the manufacture of industrial valves under the Pressure Equipment Directive.",
    validity: "Valid to 23 January 2027",
    files: [{ label: "EU certificate of conformity (PED)", href: file("CE.jpg") }],
  },
  {
    id: "atex",
    title: "ATEX",
    standard: "Directive 2014/34/EU (potentially explosive atmospheres)",
    issuer: "Technical file held by LRQA, Notified Body 0343",
    summary: 'Covers DIN ball valves DN8–DN300 (PN10–PN250) and ANSI ball valves 1/4"–12" (Class 150–1500).',
    validity: "Technical file receipt valid to 2 June 2035",
    files: [{ label: "ATEX technical file receipt", href: file("ATEX.pdf") }],
  },
  {
    id: "iso-9001",
    title: "ISO 9001 quality management",
    standard: "ISO 9001:2015",
    issuer: "LRQA (UKAS accredited)",
    summary: "Kronox Valves quality management system for the design, manufacture and servicing of industrial valves and components.",
    validity: "Valid to 23 January 2027",
    files: [{ label: "ISO 9001 certificate", href: file("ISO 9001  .pdf") }],
  },
  {
    id: "food-pharma",
    title: "Food & pharmaceutical contact",
    standard: "FDA 21 CFR 177.1550 · EU 1935/2004",
    issuer: "Manufacturer declarations",
    summary:
      "PTFE, RPTFE and CPTFE seat materials comply with FDA 21 CFR 177.1550. Selected FKM seals comply with EU 1935/2004, EU 10/2011 and EC 2023/2006 for food contact.",
    files: [
      { label: "FDA 21 CFR compliance", href: file("FDA   Title 21 CFR Food & Pharmaceutical Compliance.pdf") },
      { label: "EU 1935/2004 compliance", href: file("EU 1935 _ 2004.pdf") },
    ],
  },
  {
    id: "environmental",
    title: "REACH & RoHS",
    standard: "REACH · RoHS",
    issuer: "Manufacturer declarations",
    summary: "Restricted-substance declarations, often requested on supplier and procurement questionnaires.",
    files: [
      { label: "REACH declaration", href: file("REACH.pdf") },
      { label: "RoHS declaration", href: file("RoHS.pdf") },
    ],
  },
];
