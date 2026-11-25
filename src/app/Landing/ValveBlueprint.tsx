import { Box } from "@mui/material";

/**
 * Animated engineering drawing of a 3-piece Kronox ball valve, used as the
 * home hero visual (replaces the old MARS-branded video).
 *
 * The outline draws itself on load, then the valve cycles open → shut → open:
 * the ball and its bore turn 90°, the red lever swings (foreshortened with
 * scaleX), and the dashed flow line through the pipe fades out while shut.
 * Pure SVG + CSS, light only; respects prefers-reduced-motion.
 */

const STEEL = "#6E7175";
const STEEL_LIGHT = "#A3A6AB";
const RED = "#E0393E";
const TEXT = "#3A3D42";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

// One 10s cycle: open (0–34%), turning (34–46%), shut (46–80%), turning (80–92%).
const CYCLE = "10s";

export default function ValveBlueprint() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 760,
        mx: "auto",
        "& svg": { display: "block", width: "100%", height: "auto", overflow: "visible" },
        "& .draw": {
          strokeDasharray: 1,
          strokeDashoffset: 0,
          animation: "kxDraw 1.8s cubic-bezier(.6,.05,.3,1) both",
        },
        "& .draw.d2": { animationDelay: "0.35s" },
        "& .draw.d3": { animationDelay: "0.7s" },
        "& .fade-in": { animation: "kxFade 0.8s ease 1.4s both" },
        "& .ball": {
          transformBox: "view-box",
          transformOrigin: "320px 270px",
          animation: `kxBall ${CYCLE} ease-in-out 2s infinite`,
        },
        "& .lever": {
          transformBox: "view-box",
          transformOrigin: "320px 114px",
          animation: `kxLever ${CYCLE} ease-in-out 2s infinite`,
        },
        "& .flow": {
          strokeDasharray: "14 10",
          animation: `kxFlow 0.9s linear infinite, kxFlowOn ${CYCLE} ease-in-out 2s infinite`,
        },
        "& .state-open": { animation: `kxFlowOn ${CYCLE} ease-in-out 2s infinite` },
        "& .state-shut": { animation: `kxShutOn ${CYCLE} ease-in-out 2s infinite` },
        "@keyframes kxDraw": { from: { strokeDashoffset: 1 }, to: { strokeDashoffset: 0 } },
        "@keyframes kxFade": { from: { opacity: 0 }, to: { opacity: 1 } },
        "@keyframes kxBall": {
          "0%, 34%": { transform: "rotate(0deg)" },
          "46%, 80%": { transform: "rotate(90deg)" },
          "92%, 100%": { transform: "rotate(0deg)" },
        },
        "@keyframes kxLever": {
          "0%, 34%": { transform: "scaleX(1)" },
          "46%, 80%": { transform: "scaleX(0.13)" },
          "92%, 100%": { transform: "scaleX(1)" },
        },
        "@keyframes kxFlow": { from: { strokeDashoffset: 24 }, to: { strokeDashoffset: 0 } },
        "@keyframes kxFlowOn": {
          "0%, 34%": { opacity: 1 },
          "40%, 86%": { opacity: 0 },
          "92%, 100%": { opacity: 1 },
        },
        "@keyframes kxShutOn": {
          "0%, 38%": { opacity: 0 },
          "46%, 80%": { opacity: 1 },
          "88%, 100%": { opacity: 0 },
        },
        "@media (prefers-reduced-motion: reduce)": {
          "& *": { animation: "none !important" },
        },
      }}
    >
      <svg viewBox="0 0 640 472" role="img" aria-label="Technical drawing of a Kronox 3-piece ball valve, cycling between open and shut">
        <defs>
          <clipPath id="kx-ball-clip">
            <circle cx="320" cy="270" r="62" />
          </clipPath>
          <marker id="kx-tick" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="9" markerHeight="9" orient="auto">
            <path d="M2 8 L8 2" stroke={STEEL} strokeWidth="1.4" />
          </marker>
          <marker id="kx-dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
            <circle cx="5" cy="5" r="3.2" fill={RED} />
          </marker>
        </defs>

        {/* ── flow through the bore (behind everything) ── */}
        <line className="flow" x1="30" y1="270" x2="610" y2="270" stroke={RED} strokeWidth="5" strokeLinecap="round" />

        {/* ── pipes / end connections ── */}
        <g fill="none" stroke={STEEL} strokeWidth="2.4">
          <path className="draw" pathLength={1} d="M30 240 H150 M30 300 H150 M490 240 H610 M490 300 H610" />
          <path className="draw d2" pathLength={1} d="M30 250 H150 M30 290 H150 M490 250 H610 M490 290 H610" stroke={STEEL_LIGHT} strokeWidth="1.2" strokeDasharray="6 5" />
        </g>

        {/* ── end caps ── */}
        <g fill="#FFFFFF" stroke={STEEL} strokeWidth="2.6">
          <rect className="draw" pathLength={1} x="150" y="200" width="40" height="140" rx="3" />
          <rect className="draw" pathLength={1} x="450" y="200" width="40" height="140" rx="3" />
        </g>

        {/* ── tie bolts + nuts ── */}
        <g stroke={STEEL} strokeWidth="2">
          <path className="draw d2" pathLength={1} d="M140 190 H500 M140 350 H500" fill="none" />
          <g fill={STEEL} className="fade-in">
            <rect x="132" y="183" width="12" height="14" />
            <rect x="496" y="183" width="12" height="14" />
            <rect x="132" y="343" width="12" height="14" />
            <rect x="496" y="343" width="12" height="14" />
          </g>
        </g>

        {/* ── centre body (chamfered like the logo letterforms) ── */}
        <path
          className="draw"
          pathLength={1}
          d="M215 180 H425 L450 205 V335 L425 360 H215 L190 335 V205 Z"
          fill="#FFFFFF"
          stroke={TEXT}
          strokeWidth="3"
        />
        {/* section hatching on the body walls */}
        <g className="fade-in" stroke={STEEL_LIGHT} strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`t${i}`} x1={204 + i * 26} y1={196} x2={216 + i * 26} y2={184} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`b${i}`} x1={204 + i * 26} y1={356} x2={216 + i * 26} y2={344} />
          ))}
        </g>

        {/* ── PTFE seats (red) ── */}
        <g className="fade-in" fill={RED}>
          <polygon points="248,234 258,240 258,300 248,306" />
          <polygon points="392,234 382,240 382,300 392,306" />
        </g>

        {/* ── ball + bore: turns 90° to shut ── */}
        <g className="ball">
          <circle cx="320" cy="270" r="62" fill="#F3F3F4" stroke={TEXT} strokeWidth="2.6" />
          <g clipPath="url(#kx-ball-clip)">
            <rect x="250" y="250" width="140" height="40" fill="#FFFFFF" stroke={STEEL} strokeWidth="1.6" />
            <line x1="250" y1="270" x2="390" y2="270" stroke={STEEL_LIGHT} strokeWidth="1" strokeDasharray="8 4 2 4" />
          </g>
        </g>

        {/* ── stem + ISO 5211 mounting pad ── */}
        <g stroke={TEXT} strokeWidth="2.4" fill="#FFFFFF">
          <rect className="draw d2" pathLength={1} x="276" y="160" width="88" height="20" />
          <rect className="draw d2" pathLength={1} x="308" y="118" width="24" height="90" />
        </g>

        {/* ── red lever: swings to shut (foreshortened) ── */}
        <g className="lever">
          <rect x="314" y="103" width="236" height="22" rx="11" fill={RED} />
          <rect x="318" y="108" width="208" height="4" rx="2" fill="rgba(255,255,255,0.45)" />
        </g>
        <rect x="306" y="100" width="28" height="28" rx="3" fill={STEEL} />

        {/* ── centre lines ── */}
        <g className="fade-in" stroke={RED} strokeWidth="0.9" strokeDasharray="14 4 3 4">
          <line x1="12" y1="270" x2="628" y2="270" opacity="0.55" />
          <line x1="320" y1="70" x2="320" y2="378" opacity="0.55" />
        </g>

        {/* ── dimension: overall length ── */}
        <g className="fade-in" stroke={STEEL} strokeWidth="1.2" fill="none">
          <path d="M30 306 V420 M610 306 V420" strokeDasharray="3 3" />
          <line x1="30" y1="410" x2="610" y2="410" markerStart="url(#kx-tick)" markerEnd="url(#kx-tick)" />
        </g>
        <g className="fade-in" fontFamily={MONO} fontSize="12" fill={TEXT} textAnchor="middle">
          <rect x="262" y="400" width="116" height="20" fill="#F5F5F6" />
          <text x="320" y="414" fontWeight="700">L = 230 mm</text>
        </g>

        {/* ── callouts ── */}
        <g className="fade-in" stroke={STEEL} strokeWidth="1.1" fill="none">
          <polyline points="278,170 200,92 40,92" markerStart="url(#kx-dot)" />
          <polyline points="386,252 500,166 610,166" markerStart="url(#kx-dot)" />
          <polyline points="438,352 506,392 610,392" markerStart="url(#kx-dot)" />
          <polyline points="96,262 70,176 30,176" markerStart="url(#kx-dot)" />
          <polyline points="200,345 140,384 30,384" markerStart="url(#kx-dot)" />
        </g>
        <g className="fade-in" fontFamily={MONO} fontSize="11.5" fontWeight="700" fill={TEXT} letterSpacing="0.06em">
          <text x="40" y="86">ISO 5211 MOUNTING PAD</text>
          <text x="610" y="160" textAnchor="end">PTFE · RPTFE SEATS</text>
          <text x="610" y="386" textAnchor="end">CF8M · 316 BODY</text>
          <text x="30" y="170">FULL PORT · DN50</text>
          <text x="30" y="378">API 607 FIRE-SAFE</text>
        </g>

        {/* ── live state tag ── */}
        <g fontFamily={MONO} fontSize="12" fontWeight="800" letterSpacing="0.14em">
          <g className="state-open">
            <rect x="452" y="40" width="160" height="28" rx="2" fill={RED} />
            <circle cx="470" cy="54" r="4.5" fill="#FFFFFF" />
            <text x="482" y="58.5" fill="#FFFFFF">FLOW · OPEN</text>
          </g>
          <g className="state-shut">
            <rect x="452" y="40" width="160" height="28" rx="2" fill="#FFFFFF" stroke={STEEL} strokeWidth="1.5" />
            <circle cx="470" cy="54" r="4.5" fill={STEEL} />
            <text x="482" y="58.5" fill={TEXT}>SHUT-OFF</text>
          </g>
        </g>

        {/* ── drawing title block ── */}
        <g className="fade-in" fontFamily={MONO} fontSize="10.5" fill={TEXT}>
          <rect x="300" y="436" width="310" height="32" fill="#FFFFFF" stroke={STEEL} strokeWidth="1.2" />
          <rect x="300" y="436" width="96" height="32" fill={RED} />
          <text x="348" y="456" textAnchor="middle" fill="#FFFFFF" fontWeight="800" letterSpacing="0.12em">KRONOX</text>
          <line x1="496" y1="436" x2="496" y2="468" stroke={STEEL} strokeWidth="1" />
          <line x1="556" y1="436" x2="556" y2="468" stroke={STEEL} strokeWidth="1" />
          <text x="404" y="456" fontWeight="700">DWG KX-3PC-050</text>
          <text x="504" y="456">1 : 2</text>
          <text x="564" y="456">REV C</text>
        </g>
      </svg>
    </Box>
  );
}
