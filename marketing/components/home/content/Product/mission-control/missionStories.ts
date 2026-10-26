export const MISSION_STORIES = [
  {
    id: "response",
    assigned: 2,
    label: "Rapid response",
    code: "OPS-0142",
    title: "Waterfront response",
    prompt:
      "Check the alarm at Pier 3. Send the nearest ready aircraft, share the scene with the field team, and keep a second drone available.",
    scope: "Pier 3 · waterfront",
    objective: "Assess the scene",
    output: "Scene assessment",
    metric: "02",
    unit: "aircraft assigned",
    plan: "A-04 covers the pier. A-08 holds the access corridor. B-12 stays available for the next task.",
    updates: [
      "Alarm location matched",
      "Thermal + RGB payload available",
      "Field-team handoff prepared",
    ],
    change:
      "A-04 is approaching its return reserve. Coverage at the pier still needs to continue.",
    recovery:
      "Bring A-08 over the pier before A-04 returns. Keep the scene and mission context attached to the same operation.",
    result:
      "Scene assessment assembled. Observations, aircraft handover, and operator decisions are retained in one mission record.",
    stats: [
      "2 coordinated aircraft",
      "1 shared scene",
      "Complete decision trail",
    ],
  },
  {
    id: "inspection",
    assigned: 3,
    label: "Infrastructure",
    code: "ND-0120",
    title: "North district inspection",
    prompt:
      "Inspect the 120 waterfront assets before sunrise. Flag anything that needs a closer look and hold one aircraft in reserve.",
    scope: "North district · 120 assets",
    objective: "Inspect the asset register",
    output: "Coverage report",
    metric: "120",
    unit: "assets in scope",
    plan: "Split the district into six missions. A-04 and A-08 take thermal passes; B-12 captures the remaining visual coverage.",
    updates: [
      "120 assets located",
      "Payload requirements matched",
      "6 mission areas prepared",
    ],
    change:
      "Wind is rising in Sector 02. Two assignments are affected by the updated operating window.",
    recovery:
      "Transfer the remaining sector to the reserve aircraft and revise the approach. Review the eight-minute completion tradeoff.",
    result:
      "All 120 assets reconciled. Seven observations are ready for review with their location, source, and mission history.",
    stats: ["120 assets covered", "7 observations", "6 missions reconciled"],
  },
  {
    id: "search",
    assigned: 3,
    label: "Area search",
    code: "SAR-0028",
    title: "Waterfront area search",
    prompt:
      "Search the waterfront access area. Divide coverage between the available aircraft, prioritize thermal, and keep the ground team updated.",
    scope: "Waterfront · 3 search sectors",
    objective: "Coordinate area coverage",
    output: "Search summary",
    metric: "03",
    unit: "sectors coordinated",
    plan: "A-04 sweeps the north sector with thermal. A-08 covers the access routes. B-12 maps the eastern boundary.",
    updates: [
      "Search boundary attached",
      "Thermal aircraft prioritized",
      "Ground-team review channel ready",
    ],
    change:
      "The field team has updated the priority area. The remaining search pattern needs to shift east.",
    recovery:
      "Reprioritize the eastern boundary and transfer the remaining sweep to A-08. Preserve completed coverage and flag gaps.",
    result:
      "Search coverage and operator observations are assembled for handoff. Unchecked areas stay visible for the next team.",
    stats: [
      "3 coordinated sectors",
      "Coverage gaps retained",
      "Field-team handoff",
    ],
  },
];
export const MISSION_STAGES = [
  "Task",
  "Plan",
  "Coordinate",
  "Adapt",
  "Debrief",
];
