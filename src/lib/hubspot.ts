// Sends form submissions straight to real HubSpot forms through the Forms API, instead of
// relying on HubSpot's collected-forms script to spot them (which names them after MUI classes).
// Docs: https://developers.hubspot.com/docs/api/marketing/forms (v3 "submit data to a form").
//
// Not wired up yet. To switch a form over:
//   1. Create the form in HubSpot with matching field names (e.g. email, firstname, company).
//   2. Paste its form ID into HUBSPOT_FORM_IDS below.
//   3. Call submitToHubSpot() from that form's submit handler, after our own API call succeeds.
//   4. Add data-hs-do-not-collect="true" to that <form> so the collected-forms script doesn't
//      record the same submission a second time.

export const HUBSPOT_PORTAL_ID = "147618935";

// Form IDs (GUIDs) from HubSpot > Marketing > Forms > [form] > the ID in the URL.
// An empty string means the form isn't set up yet; submitToHubSpot() skips it.
export const HUBSPOT_FORM_IDS = {
  contactEnquiry: "", // TODO: "Contact enquiry" form, used by contact-enquiry and homepage-enquiry
  creditApplication: "", // TODO: "Credit application" form
  register: "", // TODO: "Register" form
  getNotified: "", // TODO: "Get notified" (stock alert) form
} as const;

export type HubSpotFormKey = keyof typeof HUBSPOT_FORM_IDS;

// Keys are HubSpot internal property names (Settings > Properties), not our field names.
export type HubSpotFields = Record<string, string | number | boolean | null | undefined>;

const SUBMIT_URL = "https://api.hsforms.com/submissions/v3/integration/submit";

// The hubspotutk cookie ties the submission to the visitor's existing page-view history.
// It only exists once the visitor has accepted cookies, so it's optional.
function getHubSpotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Submits fields to a HubSpot form. Never throws: a HubSpot failure must not break our own
 * form flow, so it resolves to false and logs a warning instead.
 */
export async function submitToHubSpot(form: HubSpotFormKey, fields: HubSpotFields): Promise<boolean> {
  const formId = HUBSPOT_FORM_IDS[form];
  if (!formId || typeof window === "undefined") return false;

  const hutk = getHubSpotUtk();
  const body = {
    fields: Object.entries(fields)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([name, value]) => ({ objectTypeId: "0-1", name, value: String(value) })),
    context: {
      ...(hutk ? { hutk } : {}),
      pageUri: window.location.href,
      pageName: document.title,
    },
  };

  try {
    const res = await fetch(`${SUBMIT_URL}/${HUBSPOT_PORTAL_ID}/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.warn(`HubSpot submit failed for "${form}" (${res.status})`, await res.text());
    return res.ok;
  } catch (err) {
    console.warn(`HubSpot submit failed for "${form}"`, err);
    return false;
  }
}
