// Single source of truth for shared external asset URLs.

// Scanned image of our MARS® letter of authorisation ("trust certificate"),
// linked/shown from the homepage, about and mars-brand pages.
//
// NOTE: the blob filename is misspelled ("Trust-Certfilicate.jpeg"). The file
// lives in Azure Blob Storage, not this repo, so it must be renamed there first
// (to e.g. "Trust-Certificate.jpeg"). Once that's done, update this one line and
// every reference follows.
export const LETTER_OF_AUTHORISATION_URL =
  "https://pblol2.blob.core.windows.net/mars-valves/home/Trust-Certfilicate.jpeg";
