// Visible <h1>s for the /series pages, built from the series "design" line and
// the model specs so every series and part number gets a descriptive heading
// ("MARS Series 77 Three-Piece Ball Valve") instead of a bare code
// ("Series 77", "V77-...").

type Spec = { filter: string; value: string };

const THREAD_ENDS = ["BSP", "BSPT", "BSPP", "NPT", "Threaded"];

// "Series 77SN" -> "MARS 77SN"; "Series 77" -> "MARS Series 77".
function brandLabel(seriesName: string): string {
  const code = seriesName.replace(/^series\s+/i, "").trim();
  return /SN$/i.test(code) ? `MARS ${code}` : `MARS ${seriesName}`;
}

function designParts(design: string | null | undefined): string[] {
  return (design ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function has(parts: string[], re: RegExp): boolean {
  return parts.some((p) => re.test(p));
}

// Valve body construction, e.g. "Three-Piece", "Three-Way and Four-Way".
function construction(parts: string[], numericWays: boolean): string | null {
  const text = parts.join(" ");
  const three = /\b(three|3)[-/\s]*way|three\/four-way/i.test(text);
  const four = /\b(four|4)-way|three\/four-way/i.test(text);
  const five = /\b(five|5)-way/i.test(text);
  const word = (n: string, w: string) => (numericWays ? `${n}-Way` : `${w}-Way`);
  if (three && four) return numericWays ? "3/4-Way" : "Three-Way and Four-Way";
  if (three) return word("3", "Three");
  if (four) return word("4", "Four");
  if (five) return word("5", "Five");
  if (/\b(one|1)[\s-]*piece/i.test(text)) return "One-Piece";
  if (/\b(two|2)[\s-]*piece/i.test(text)) return "Two-Piece";
  if (/\b(three|3)[\s-]*piece/i.test(text)) return "Three-Piece";
  if (/uni-?body/i.test(text)) return "Uni-Body";
  return null;
}

// Type words that belong in the headline, in reading order.
function qualifiers(parts: string[]): string[] {
  return [
    has(parts, /fire-safe/i) && "Fire-Safe",
    has(parts, /high pressure/i) && "High-Pressure",
    has(parts, /steam jacketed/i) && "Steam-Jacketed",
    has(parts, /sanitary/i) && "Sanitary",
    has(parts, /bottom entry/i) && "Bottom Entry",
    has(parts, /wafer/i) && "Wafer",
    has(parts, /flanged/i) && "Flanged",
  ].filter((q): q is string => Boolean(q));
}

function hasLTPorts(parts: string[]): boolean {
  return has(parts, /L\/T Port/i);
}

/** "A", "A or B", "A, B or C". */
function orList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;
}

/** The end connections a series is actually sold with, e.g. "BSP or NPT Threaded, Socket Weld or Butt Weld Ends". */
function endsPhrase(ends: string[]): string | null {
  if (!ends.length) return null;
  const threads = ends.filter((e) => THREAD_ENDS.includes(e) && e !== "Threaded");
  const genericThread = ends.includes("Threaded");
  const others = ends.filter((e) => !THREAD_ENDS.includes(e));
  const items: string[] = [];
  if (threads.length) items.push(`${orList(threads)} Threaded`);
  else if (genericThread) items.push("Threaded");
  items.push(...others);
  return `${orList(items)} Ends`;
}

function seriesBase(seriesName: string, design: string | null | undefined, plural: boolean) {
  const parts = designParts(design);
  const words = [construction(parts, false), ...qualifiers(parts)].filter(Boolean);
  const valve = plural ? "Ball Valves" : "Ball Valve";
  return { parts, head: [brandLabel(seriesName), ...words, valve].join(" ") };
}

/** Series page heading, e.g. "MARS Series 33 Three-Way Ball Valve, L-Port and T-Port". */
export function seriesHeading(seriesName: string, design: string | null | undefined): string {
  const { parts, head } = seriesBase(seriesName, design, false);
  return hasLTPorts(parts) ? `${head}, L-Port and T-Port` : head;
}

/**
 * Series page subheading: the design details left out of the heading, with
 * the end connections taken from the models on sale (so "Female x Female"
 * isn't claimed for a series that also comes with weld ends).
 */
export function seriesSubheading(design: string | null | undefined, endConnections: string[]): string {
  const parts = designParts(design);
  const inHeading =
    /piece|-way|way\b|uni-?body|fire-safe|high pressure|steam jacketed|sanitary|bottom entry|wafer|flanged|ball valve|L\/T Port/i;
  const isEnds = /female|male|threaded ends|threaded$/i;
  const ends = endsPhrase(endConnections);
  const rest = parts
    .filter((p) => !inHeading.test(p) && !(ends && isEnds.test(p)))
    .map((p) => p.replace(/\bFull \/ Reduced\b/i, "Full or Reduced"));
  return [...rest, ends].filter(Boolean).join(", ");
}

/** "All models" page heading, e.g. "MARS Series 77 Three-Piece Ball Valves: All Models and Prices". */
export function seriesModelsHeading(seriesName: string, design: string | null | undefined): string {
  const { parts, head } = seriesBase(seriesName, design, true);
  const lt = hasLTPorts(parts) ? head.replace(/ Ball Valves$/, " L-Port and T-Port Ball Valves") : head;
  return `${lt}: All Models and Prices`;
}

// '1 1/2"' -> '1-1/2"', '1/4"~1/2"' -> '1/4"–1/2"'.
function formatSize(size: string): string {
  return size.replace(/(\d) (\d+\/\d+)/g, "$1-$2").replace("~", "–");
}

function specLabel(filter: string, value: string): string | null {
  const v = value.trim();
  switch (filter) {
    case "Handle":
      if (/^W\/O/i.test(v)) return "without Handle";
      if (/^W /i.test(v)) return "with Handle";
      return v;
    case "Lock":
      return /^W\/O/i.test(v) ? "Standard Handle" : "with Locking Handle";
    case "Seat":
    case "Seat Material": {
      const seat = v.replace(/^Std\b/i, "Standard");
      return /seat$/i.test(seat) ? seat : `${seat} Seat`;
    }
    case "Body Material":
      return `${v} Body`;
    case "Version":
      return /fire-safe/i.test(v) ? "Fire-Safe" : null;
    case "End Cap":
      return /^standard$/i.test(v) ? null : v;
    case "End Connection":
    case "Flange Rating":
      return v;
    default:
      return null;
  }
}

// Specs that go after the comma, in this order. Size, port and way are in
// the headline; operating pressure is in the spec table.
const DETAIL_ORDER = ["End Connection", "Flange Rating", "Body Material", "Seat", "Seat Material", "End Cap", "Version", "Lock", "Handle"];

/**
 * Model (part number) page heading, e.g.
 * 'MARS Series 33 1-1/2" 3-Way T-Port Ball Valve, Butt Weld, Bare Shaft'.
 */
export function variantHeading(seriesName: string, design: string | null | undefined, specs: Spec[]): string {
  const parts = designParts(design);
  const spec = (f: string) => specs.find((s) => s.filter === f)?.value;

  const way = spec("Way") ?? construction(parts, true);
  const isMultiWay = !!way && /way/i.test(way);
  // "L port" -> "L-Port"; the Port spec is either a flow pattern or the bore.
  const pattern =
    spec("Ball Configuration")?.replace(/^(\w+)\s*port$/i, (_, p: string) => `${p.toUpperCase()}-Port`) ??
    spec("Port")?.match(/^[A-Z]+-Port$/)?.[0];
  const boreSpec = spec("Port")?.match(/^(Full|Reduced) Port$/)?.[0];
  // Single-bore series: say Full / Reduced Port when the design is unambiguous.
  const designBore = isMultiWay || has(parts, /full\s*(\/|&)\s*reduced/i)
    ? null
    : has(parts, /full (port|bore)/i)
      ? "Full Port"
      : has(parts, /reduced (port|bore)/i)
        ? "Reduced Port"
        : null;
  const bore = pattern ? null : (boreSpec ?? designBore);
  const extraBore = pattern ? boreSpec : undefined;

  const size = spec("Size");
  const typeWords = qualifiers(parts).filter((q) => q !== "Fire-Safe" || !spec("Version"));
  const head = [brandLabel(seriesName), size && formatSize(size), way, pattern ?? bore, ...typeWords, "Ball Valve"]
    .filter(Boolean)
    .join(" ");

  const details = [
    extraBore,
    ...DETAIL_ORDER.map((f) => {
      const v = spec(f);
      return v ? specLabel(f, v) : null;
    }),
  ].filter((d): d is string => !!d && !typeWords.includes(d));

  return details.length ? `${head}, ${details.join(", ")}` : head;
}
