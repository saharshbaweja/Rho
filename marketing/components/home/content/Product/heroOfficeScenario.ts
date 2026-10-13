// Scenario data for the home-page isometric office hero. The scene engine
// in heroOfficeScene.ts is scenario-agnostic — to change the dialogue, edit
// the beats here. To swap scenarios entirely, build new Scenario values
// and update the homeScenarios array.
//
// Beat copy supports three placeholders that the engine resolves at runtime
// against the cast picked for the current run:
//   {ref}      → first name of the picked teammate (e.g. "Stanislas")
//   @{ref}     → "@" + first name              (e.g. "@Stanislas")
//   {ToolName} → inline tool chip via the chat-card parser (Slack, HubSpot…)
// `ref` matches one of the cast slot keys ("lisa", "jordan", …). Literal
// mentions like "@LeadQual" are not cast refs and pass through as-is. Tool
// chips are rendered as styled inline pills — only the ToolName must match
// the regex `[^}]+` (so multi-word brands like "Google Workspace" work).

import type { RoomKey } from "@marketing/components/home/content/Product/heroOfficeFloor";

export type { RoomKey };

export interface AgentDef {
  /** SVG element id, e.g. "a1". Beats reference agents by this id. */
  id: string;
  startRoom: RoomKey;
  /** Floating chip label (e.g. "@LeadQual"). Also rendered as the chat-card name. */
  label: string;
  /** Subtitle shown below the name in the agent's chat card. */
  cardRole: string;
  /** Inline SVG markup (24x24 viewBox) for the floor avatar's glyph. The
   *  agent builder injects this inside a stroked group on the blue disc.
   *  Pick a mark that reflects what the agent does in its scenario. */
  iconSvg: string;
  /** Optional pre-rendered image (PNG/SVG) used INSTEAD of the disc + iconSvg.
   *  When set, the floor avatar and chat-card avatar render this image as
   *  the entire mark — useful for full-color illustrated agents. */
  iconImage?: string;
}

// 24x24 viewBox glyphs used as the floor avatar mark for each agent. Stroke
// + linecap/linejoin are inherited from the parent <g>, so each path can be
// stroke-only (white). Solid dots can override with fill="#FFFFFF" stroke="none".
const ICON_TARGET = `
  <circle cx="12" cy="12" r="9"/>
  <circle cx="12" cy="12" r="5"/>
  <circle cx="12" cy="12" r="1.6" fill="#FFFFFF" stroke="none"/>
`;
const ICON_GIT_BRANCH = `
  <line x1="6" y1="3" x2="6" y2="15"/>
  <circle cx="18" cy="6" r="3"/>
  <circle cx="6" cy="18" r="3"/>
  <path d="M18 9a9 9 0 0 1-9 9"/>
`;
const ICON_WRENCH = `
  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
`;
const ICON_ZAP = `
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
`;
const ICON_CLIPBOARD_CHECK = `
  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
  <rect x="9" y="3" width="6" height="3" rx="1"/>
  <polyline points="9 13 11 15 15 11"/>
`;
const ICON_ROCKET = `
  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
  <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
`;
const ICON_PEN = `
  <path d="M12 20h9"/>
  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/>
`;
const ICON_SPARKLE = `
  <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z"/>
  <circle cx="19" cy="19" r="0.9" fill="#FFFFFF" stroke="none"/>
  <circle cx="5" cy="19" r="0.9" fill="#FFFFFF" stroke="none"/>
`;

export interface CastSlot {
  ref: string;
  startRoom: RoomKey;
  role: string;
}

export interface Reaction {
  from: string;
  emoji: string;
  at: number;
}

export type Beat =
  | {
      type: "person";
      ref: string;
      msg: string;
      holdMs?: number;
      maxChars?: number;
      reactions?: Reaction[];
    }
  | {
      type: "agent";
      agentId: string;
      msg: string;
      holdMs?: number;
      maxChars?: number;
      reactions?: Reaction[];
    }
  | {
      type: "walkTo";
      agentId: string;
      ref: string;
      offsetX?: number;
      offsetY?: number;
    }
  | { type: "walkHome"; agentId: string }
  | { type: "pause"; ms: number };

export interface Scenario {
  agents: AgentDef[];
  cast: CastSlot[];
  beats: Beat[];
  loopGapMs?: number;
}

// ---------------------------------------------------------------------------
// Scenario 1: Sales Qualification — Lisa (RevOps), Marco/Yuki (AEs), LeadQual
// ---------------------------------------------------------------------------

const salesScenario: Scenario = {
  agents: [
    {
      id: "a1",
      startRoom: "office-t",
      label: "@MissionReview",
      cardRole: "Aeros · Dispatch",
      iconSvg: ICON_TARGET,
      iconImage: "/static/landing/home/agent-leadqual.png",
    },
  ],
  cast: [
    { ref: "lisa", startRoom: "office-d", role: "Operations Lead" },
    { ref: "marco", startRoom: "office-t", role: "Flight Coordinator" },
    { ref: "yuki", startRoom: "office-c", role: "Chief Pilot" },
  ],
  beats: [
    {
      type: "person",
      ref: "lisa",
      msg: "KASE TAF just amended. @MissionReview is re-checking AO-2418 against weather, alternates, crew, and operator procedures.",
      holdMs: 5400,
      reactions: [
        { from: "marco", emoji: "👍", at: 3600 },
        { from: "yuki", emoji: "🚀", at: 4400 },
        { from: "marco", emoji: "👀", at: 5100 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "marco",
      msg: "@{lisa} are we still inside company planning limits?",
      holdMs: 3200,
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "lisa",
      msg: "Yes. The flight is still viable, but the alternate plan needs another look.",
      holdMs: 3800,
      reactions: [{ from: "marco", emoji: "✅", at: 2800 }],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "marco",
      msg: "@MissionReview review KPDK to KASE with the latest TAF and runway NOTAM.",
      holdMs: 3800,
    },
    { type: "pause", ms: 300 },
    { type: "walkTo", agentId: "a1", ref: "marco", offsetX: 60, offsetY: -10 },
    {
      type: "agent",
      agentId: "a1",
      msg: "AO-2418 is conditionally viable. KASE ceiling trends below the planning threshold after 21Z. KDEN remains a valid alternate; adding it increases release fuel by about 420 lb. Crew legality and MEL status remain clear. Operator procedure requires destination authorization review before release.",
      holdMs: 7200,
      maxChars: 46,
      reactions: [
        { from: "marco", emoji: "🔥", at: 5200 },
        { from: "yuki", emoji: "🎯", at: 6000 },
        { from: "lisa", emoji: "🔥", at: 6700 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "marco",
      msg: "Compare that with a 45-minute delay.",
      holdMs: 3200,
    },
    { type: "pause", ms: 300 },
    {
      type: "agent",
      agentId: "a1",
      msg: "Delay improves the weather window with no major fuel penalty, but reduces crew duty margin. Both paths remain viable.",
      holdMs: 4000,
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "yuki",
      msg: "@{marco} I can take the KASE authorization review while you recalc the alternate fuel.",
      holdMs: 4400,
      reactions: [
        { from: "marco", emoji: "❤️", at: 3000 },
        { from: "lisa", emoji: "❤️", at: 3700 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "marco",
      msg: "@{yuki} perfect. I'll send the updated option set to the crew.",
      holdMs: 3800,
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "lisa",
      msg: "Aeros does the synthesis. The operations team makes the call.",
      holdMs: 4400,
      reactions: [
        { from: "marco", emoji: "💯", at: 2800 },
        { from: "yuki", emoji: "💯", at: 3400 },
        { from: "marco", emoji: "🤝", at: 4000 },
      ],
    },
    { type: "pause", ms: 800 },
    { type: "walkHome", agentId: "a1" },
    { type: "pause", ms: 600 },
  ],
  loopGapMs: 2500,
};

// ---------------------------------------------------------------------------
// Scenario 2: Customer Support — Jordan (Support Ops), Sam/Priya/Alex (CS),
// TicketRouter, ProductExpert
// ---------------------------------------------------------------------------

const supportScenario: Scenario = {
  agents: [
    {
      id: "a2",
      startRoom: "office-bl",
      label: "@MELReview",
      cardRole: "Aeros · Maintenance",
      iconSvg: ICON_GIT_BRANCH,
      iconImage: "/static/landing/home/agent-ticketrouter.png",
    },
    {
      id: "a3",
      startRoom: "office-d",
      label: "@MxContext",
      cardRole: "Aeros · Operations",
      iconSvg: ICON_WRENCH,
      iconImage: "/static/landing/home/agent-productexpert.png",
    },
  ],
  cast: [
    { ref: "jordan", startRoom: "office-bl", role: "Maintenance Control" },
    { ref: "sam", startRoom: "office-t", role: "Flight Coordinator" },
    { ref: "priya", startRoom: "office-c", role: "Chief Pilot" },
    { ref: "alex", startRoom: "office-d", role: "Operations Manager" },
  ],
  beats: [
    {
      type: "person",
      ref: "jordan",
      msg: "Heads up: @MELReview now checks deferred items against the active mission before they reach dispatch.",
      holdMs: 5400,
      reactions: [
        { from: "sam", emoji: "🎉", at: 3500 },
        { from: "priya", emoji: "🙏", at: 4200 },
        { from: "alex", emoji: "🎉", at: 4900 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "sam",
      msg: "@{jordan} can it tell us whether the indication on N905CR changes the Aspen mission?",
      holdMs: 4600,
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "jordan",
      msg: "That's the point—mission impact, not just maintenance status.",
      holdMs: 2400,
      reactions: [{ from: "sam", emoji: "💜", at: 1800 }],
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "sam",
      msg: "@MELReview review MEL 32-01 for AO-2418.",
      holdMs: 4400,
    },
    { type: "pause", ms: 300 },
    { type: "walkTo", agentId: "a2", ref: "sam", offsetX: 60, offsetY: -10 },
    {
      type: "agent",
      agentId: "a2",
      msg: "MEL 32-01 remains dispatchable for this mission. No route restriction is triggered, but the crew briefing must include the deferred indication and the release should retain the maintenance reference.",
      holdMs: 4000,
    },
    { type: "pause", ms: 300 },
    { type: "walkTo", agentId: "a3", ref: "sam", offsetX: -60, offsetY: -10 },
    {
      type: "agent",
      agentId: "a3",
      msg: "What if we swap to N712LX instead?",
      holdMs: 8000,
      maxChars: 50,
      reactions: [
        { from: "sam", emoji: "👀", at: 5500 },
        { from: "priya", emoji: "🙌", at: 6200 },
        { from: "alex", emoji: "🙌", at: 6900 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "sam",
      msg: "@MxContext shows N712LX available after 15:10Z, which would introduce a 40-minute delay and a crew reassignment check.",
      holdMs: 4000,
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "priya",
      msg: "Keep N905CR as primary. Put the tail swap in the recovery options.",
      holdMs: 4000,
      reactions: [{ from: "sam", emoji: "😅", at: 2800 }],
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "alex",
      msg: "Done. Current aircraft stays recommended; alternate tail is available as a recovery path.",
      holdMs: 4000,
      reactions: [{ from: "jordan", emoji: "💯", at: 3000 }],
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "jordan",
      msg: "That's exactly what I need—maintenance status translated into an operational decision.",
      holdMs: 5000,
      reactions: [
        { from: "sam", emoji: "🚀", at: 3200 },
        { from: "priya", emoji: "🚀", at: 3700 },
        { from: "alex", emoji: "🚀", at: 4200 },
      ],
    },
    { type: "pause", ms: 800 },
    { type: "walkHome", agentId: "a2" },
    { type: "walkHome", agentId: "a3" },
    { type: "pause", ms: 600 },
  ],
  loopGapMs: 2500,
};

// ---------------------------------------------------------------------------
// Scenario 3: Engineering / Incident Response — Aisha (Platform Ops),
// Derek/Ren/Maya (Engineers), Incident
// ---------------------------------------------------------------------------

const engineeringScenario: Scenario = {
  agents: [
    {
      id: "a4",
      startRoom: "office-t",
      label: "@OpsWatch",
      cardRole: "Aeros · IROPS",
      iconSvg: ICON_ZAP,
      iconImage: "/static/landing/home/agent-incident.png",
    },
  ],
  cast: [
    { ref: "aisha", startRoom: "office-t", role: "Flight Operations" },
    { ref: "derek", startRoom: "office-d", role: "Dispatcher" },
    { ref: "ren", startRoom: "office-d", role: "Scheduling Lead" },
    { ref: "maya", startRoom: "office-d", role: "Safety" },
  ],
  beats: [
    {
      type: "person",
      ref: "aisha",
      msg: "Runway 15/33 at KASE just picked up a closure NOTAM. @OpsWatch is checking every affected mission.",
      holdMs: 4400,
    },
    { type: "pause", ms: 300 },
    { type: "walkTo", agentId: "a4", ref: "aisha", offsetX: 60, offsetY: -10 },
    {
      type: "agent",
      agentId: "a4",
      msg: "@{aisha} does AO-2418 still have a usable arrival path?",
      holdMs: 7200,
      maxChars: 50,
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "derek",
      msg: "I'm pulling the latest airport and weather constraints now.",
      holdMs: 4400,
    },
    { type: "pause", ms: 300 },
    { type: "walkTo", agentId: "a4", ref: "derek", offsetX: 60, offsetY: -10 },
    {
      type: "agent",
      agentId: "a4",
      msg: "@OpsWatch evaluate the closure against AO-2418.",
      holdMs: 6400,
      maxChars: 50,
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "derek",
      msg: "The planned runway is unavailable during the current arrival window. Runway 02 remains available, but wind is near the operator crosswind limit.",
      holdMs: 2400,
      reactions: [
        { from: "aisha", emoji: "✅", at: 1400 },
        { from: "ren", emoji: "✅", at: 2000 },
      ],
    },
    { type: "pause", ms: 200 },
    {
      type: "agent",
      agentId: "a4",
      msg: "Show the least disruptive options.",
      holdMs: 6400,
      maxChars: 50,
    },
    { type: "pause", ms: 400 },
    { type: "person", ref: "aisha", msg: "Option 1: delay 35 minutes for the closure window. Option 2: depart on time with KEGE as recovery. Option 3: hold KDEN as the alternate and re-check KASE before top of descent.", holdMs: 2400 },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "ren",
      msg: "@{derek} crew legality if we take the 35-minute delay?",
      holdMs: 4400,
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "derek",
      msg: "Still legal, with 1h18m duty margin at projected arrival.",
      holdMs: 4600,
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "maya",
      msg: "Put the delay and KEGE recovery side by side for review.",
      holdMs: 5200,
      reactions: [
        { from: "aisha", emoji: "💪", at: 3600 },
        { from: "ren", emoji: "💪", at: 4200 },
        { from: "derek", emoji: "💪", at: 4800 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "aisha",
      msg: "Done. Timing, fuel, crew impact, and supporting sources are attached to both options.",
      holdMs: 5200,
    },
    { type: "pause", ms: 300 },
    {
      type: "agent",
      agentId: "a4",
      msg: "This is the handoff I want: one change, clear downstream impact, viable choices.",
      holdMs: 3800,
      reactions: [
        { from: "aisha", emoji: "👍", at: 2400 },
        { from: "derek", emoji: "👍", at: 2800 },
        { from: "ren", emoji: "👍", at: 3200 },
        { from: "maya", emoji: "👍", at: 3500 },
      ],
    },
    { type: "pause", ms: 800 },
    { type: "walkHome", agentId: "a4" },
    { type: "pause", ms: 600 },
  ],
  loopGapMs: 2500,
};

// ---------------------------------------------------------------------------
// Scenario 4A: Knowledge — Onboarding (Nora, Clara, Kai, Tom + OnboardGuide)
// ---------------------------------------------------------------------------

const onboardingScenario: Scenario = {
  agents: [
    {
      id: "a5",
      startRoom: "office-c",
      label: "@OpsGuide",
      cardRole: "Aeros · Knowledge",
      iconSvg: ICON_CLIPBOARD_CHECK,
      iconImage: "/static/landing/home/agent-onboardguide.png",
    },
  ],
  cast: [
    { ref: "nora", startRoom: "office-c", role: "Director of Operations" },
    { ref: "clara", startRoom: "office-d", role: "Dispatch Manager" },
    { ref: "kai", startRoom: "office-d", role: "Flight Coordinator" },
    { ref: "tom", startRoom: "office-t", role: "Chief Pilot" },
  ],
  beats: [
    {
      type: "person",
      ref: "nora",
      msg: "Welcome aboard. @OpsGuide is connected to our operating manuals and procedures so you can ask mission-specific questions.",
      holdMs: 5800,
      reactions: [
        { from: "clara", emoji: "🎉", at: 3600 },
        { from: "tom", emoji: "🎉", at: 4200 },
        { from: "kai", emoji: "👋", at: 4800 },
        { from: "clara", emoji: "👋", at: 5400 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "clara",
      msg: "@{nora} where do I find the KASE special-airport requirements?",
      holdMs: 4800,
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "kai",
      msg: "Ask it in the context of the flight you're working.",
      holdMs: 3600,
    },
    { type: "pause", ms: 300 },
    { type: "walkTo", agentId: "a5", ref: "kai", offsetX: 60, offsetY: -10 },
    {
      type: "agent",
      agentId: "a5",
      msg: "@OpsGuide what has to be reviewed before we release a Part 135 mission into KASE?",
      holdMs: 8000,
      maxChars: 50,
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "kai",
      msg: "For this operator, KASE requires the special-airport review, current destination weather check, applicable runway limitations, and documented crew acknowledgement before release.",
      holdMs: 4200,
    },
    { type: "pause", ms: 300 },
    {
      type: "agent",
      agentId: "a5",
      msg: "Can you show me where each requirement comes from?",
      holdMs: 6800,
      maxChars: 50,
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "nora",
      msg: "Yes. I linked the relevant operator procedure and source section beside every requirement.",
      holdMs: 3800,
      reactions: [{ from: "kai", emoji: "✅", at: 2800 }],
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "tom",
      msg: "@{kai} use that on AO-2418 and tell me what's unresolved.",
      holdMs: 4800,
      reactions: [
        { from: "kai", emoji: "❤️", at: 3200 },
        { from: "clara", emoji: "❤️", at: 3800 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "kai",
      msg: "AO-2418 still needs destination authorization review and alternate-plan confirmation. Crew legality, MEL eligibility, and crosswind check are clear.",
      holdMs: 4200,
      reactions: [
        { from: "nora", emoji: "🥹", at: 2800 },
        { from: "clara", emoji: "💜", at: 3300 },
        { from: "tom", emoji: "💜", at: 3800 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "clara",
      msg: "That makes onboarding much easier than hunting through five PDFs.",
      holdMs: 4200,
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "nora",
      msg: "Exactly. The manual stays the source of truth; Aeros makes the right section usable in the moment.",
      holdMs: 3800,
      reactions: [
        { from: "clara", emoji: "🔥", at: 2400 },
        { from: "kai", emoji: "🔥", at: 2800 },
        { from: "tom", emoji: "🔥", at: 3200 },
      ],
    },
    { type: "pause", ms: 800 },
    { type: "walkHome", agentId: "a5" },
    { type: "pause", ms: 600 },
  ],
  loopGapMs: 2500,
};

// ---------------------------------------------------------------------------
// Scenario 4B: Knowledge — Org navigation (Kai, Clara, Tom, Nora + Dust)
// ---------------------------------------------------------------------------

const orgNavScenario: Scenario = {
  agents: [
    {
      id: "a8",
      startRoom: "office-c",
      label: "@Aeros",
      cardRole: "Aeros · Operations",
      iconSvg: ICON_SPARKLE,
      iconImage: "/static/landing/home/agent-dust.png",
    },
  ],
  cast: [
    { ref: "kai", startRoom: "office-d", role: "Flight Coordinator" },
    { ref: "clara", startRoom: "office-d", role: "Dispatch Manager" },
    { ref: "tom", startRoom: "office-t", role: "Chief Pilot" },
    { ref: "nora", startRoom: "office-c", role: "Director of Operations" },
  ],
  beats: [
    {
      type: "person",
      ref: "clara",
      msg: "@Aeros who owns the final review when destination authorization is unresolved?",
      holdMs: 5000,
      reactions: [
        { from: "kai", emoji: "👋", at: 3200 },
        { from: "tom", emoji: "👋", at: 3800 },
        { from: "nora", emoji: "👋", at: 4400 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "kai",
      msg: "For this workflow, Dispatch prepares the mission review and the designated operations approver clears the authorization before release.",
      holdMs: 4400,
    },
    { type: "pause", ms: 300 },
    { type: "walkTo", agentId: "a8", ref: "kai", offsetX: 60, offsetY: -10 },
    {
      type: "agent",
      agentId: "a8",
      msg: "@{kai} send me the current AO-2418 decision trace.",
      holdMs: 8400,
      maxChars: 50,
      reactions: [
        { from: "kai", emoji: "🎯", at: 6200 },
        { from: "tom", emoji: "👆", at: 6800 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "kai",
      msg: "Sharing it now—weather review, alternate strategy, crew legality, MEL status, and source links are all included.",
      holdMs: 4200,
    },
    { type: "pause", ms: 300 },
    {
      type: "agent",
      agentId: "a8",
      msg: "Can you also flag which items still need a human decision?",
      holdMs: 5200,
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "tom",
      msg: "Two items: KASE authorization and final alternate selection. Everything else currently passes the configured checks.",
      holdMs: 3600,
      reactions: [{ from: "kai", emoji: "✅", at: 2600 }],
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "clara",
      msg: "@{clara} I'll take authorization. Can you own the alternate decision with the crew?",
      holdMs: 4200,
      reactions: [
        { from: "kai", emoji: "😄", at: 2800 },
        { from: "tom", emoji: "😄", at: 3300 },
        { from: "nora", emoji: "😄", at: 3800 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "nora",
      msg: "Yep. Aeros keeps the context together; we keep ownership of the decision.",
      holdMs: 3800,
      reactions: [
        { from: "clara", emoji: "🔥", at: 2400 },
        { from: "kai", emoji: "🔥", at: 2900 },
        { from: "tom", emoji: "🔥", at: 3400 },
      ],
    },
    { type: "pause", ms: 800 },
    { type: "walkHome", agentId: "a8" },
    { type: "pause", ms: 600 },
  ],
  loopGapMs: 2500,
};

// ---------------------------------------------------------------------------
// Scenario 5: Marketing — Théo (Marketing Ops), Eva (Content), Marco (AE),
// Sophie (SDR), LaunchOps, ContentWriter
// ---------------------------------------------------------------------------

const marketingScenario: Scenario = {
  agents: [
    {
      id: "a6",
      startRoom: "office-c",
      label: "@TripBrief",
      cardRole: "Aeros · Briefing",
      iconSvg: ICON_ROCKET,
      iconImage: "/static/landing/home/agent-launchops.png",
    },
    {
      id: "a7",
      startRoom: "office-c",
      label: "@OpsBrief",
      cardRole: "Aeros · Operations",
      iconSvg: ICON_PEN,
      iconImage: "/static/landing/home/agent-contentwriter.png",
    },
  ],
  cast: [
    { ref: "theo", startRoom: "office-c", role: "Flight Operations" },
    { ref: "eva", startRoom: "office-c", role: "Dispatch" },
    { ref: "marco", startRoom: "office-t", role: "Client Services" },
    { ref: "sophie", startRoom: "office-t", role: "Scheduler" },
  ],
  beats: [
    {
      type: "person",
      ref: "theo",
      msg: "AO-2429 changed again. @TripBrief is rebuilding the operational brief from the approved mission state.",
      holdMs: 4800,
    },
    { type: "pause", ms: 300 },
    { type: "walkTo", agentId: "a6", ref: "theo", offsetX: 60, offsetY: -10 },
    {
      type: "agent",
      agentId: "a6",
      msg: "@{theo} make sure the crew sees the new MYNN weather and customs timing.",
      holdMs: 8400,
      maxChars: 50,
      reactions: [
        { from: "theo", emoji: "👍", at: 5500 },
        { from: "eva", emoji: "👍", at: 6200 },
      ],
    },
    { type: "pause", ms: 400 },
    { type: "walkTo", agentId: "a7", ref: "theo", offsetX: -60, offsetY: -10 },
    {
      type: "agent",
      agentId: "a7",
      msg: 'One-pager ready. Key stats: **40h/week saved, 3 agents built by CS team, cross-team adoption** (CS + Sales). Talk track includes objection handling for "we already use ChatGPT." Posted to the Sales Enablement project.',
      holdMs: 6400,
      maxChars: 50,
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "eva",
      msg: "And client services needs the arrival impact without all the dispatch detail.",
      holdMs: 2800,
    },
    { type: "pause", ms: 200 },
    {
      type: "agent",
      agentId: "a6",
      msg: "@TripBrief generate the crew brief from the latest approved option.",
      holdMs: 7200,
      maxChars: 50,
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "eva",
      msg: "Crew brief updated: route, weather change, NOTAMs, fuel impact, aircraft status, required acknowledgements, and source references are included.",
      holdMs: 3200,
    },
    { type: "pause", ms: 200 },
    {
      type: "agent",
      agentId: "a6",
      msg: '"From 45 minutes to 2. That\'s how fast a CS team now gets verified technical answers — not by hiring, but by building 3 AI agents connected to their own codebase and customer data."',
      holdMs: 5400,
      reactions: [
        { from: "eva", emoji: "🔥", at: 3800 },
        { from: "theo", emoji: "🔥", at: 4200 },
        { from: "marco", emoji: "🔥", at: 4600 },
      ],
    },
    { type: "pause", ms: 400 },
    { type: "person", ref: "eva", msg: "@OpsBrief give client services the operational impact in plain language.", holdMs: 2400 },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "marco",
      msg: "Arrival remains on schedule. No passenger action is required. Customs timing has been re-confirmed and the crew has one new weather item to review.",
      holdMs: 4200,
      reactions: [
        { from: "eva", emoji: "👀", at: 2800 },
        { from: "theo", emoji: "👀", at: 3300 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "theo",
      msg: '@{marco} already in the Sales Enablement project — @ContentWriter added a talk track for the "we already use ChatGPT" objection.',
      holdMs: 5000,
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "marco",
      msg: "@{eva} that's clean. I'll send the client update.",
      holdMs: 2800,
    },
    { type: "pause", ms: 300 },
    {
      type: "person",
      ref: "sophie",
      msg: "@{marco} crew brief is ready too—no need to rebuild it manually.",
      holdMs: 4400,
      reactions: [
        { from: "marco", emoji: "🎯", at: 2800 },
        { from: "eva", emoji: "🎯", at: 3200 },
        { from: "theo", emoji: "🔥", at: 3600 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "eva",
      msg: "Both briefs now point back to the same approved mission state.",
      holdMs: 4000,
      reactions: [
        { from: "sophie", emoji: "😂", at: 2800 },
        { from: "marco", emoji: "😂", at: 3200 },
      ],
    },
    { type: "pause", ms: 400 },
    {
      type: "person",
      ref: "theo",
      msg: "One decision, different audiences, no conflicting version of the operation.",
      holdMs: 4200,
      reactions: [
        { from: "eva", emoji: "💯", at: 2800 },
        { from: "marco", emoji: "💯", at: 3200 },
        { from: "sophie", emoji: "💯", at: 3600 },
      ],
    },
    { type: "pause", ms: 800 },
    { type: "walkHome", agentId: "a6" },
    { type: "walkHome", agentId: "a7" },
    { type: "pause", ms: 600 },
  ],
  loopGapMs: 2500,
};

/** Ordered list of scenarios. The engine picks a random starting index on
 *  page load, then plays the rest sequentially in array order, looping
 *  forever. */
export const homeScenarios: Scenario[] = [
  salesScenario,
  supportScenario,
  engineeringScenario,
  onboardingScenario,
  orgNavScenario,
  marketingScenario,
];

// Kept for any external imports (the original single-scenario export name).
export { salesScenario as qualBotScenario };
