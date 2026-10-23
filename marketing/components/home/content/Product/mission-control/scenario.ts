export const CHAPTERS = [
  {
    label: "Describe",
    title: "An objective becomes a mission.",
    caption: "A plain-language request, grounded in your actual operation.",
  },
  {
    label: "Plan",
    title: "Every constraint. One executable plan.",
    caption:
      "Fleet readiness, payload, operating windows, and airspace in context.",
  },
  {
    label: "Dispatch",
    title: "The right aircraft. Already coordinated.",
    caption: "Approved assignments flow to your connected fleet providers.",
  },
  {
    label: "Adapt",
    title: "When the situation changes, the plan keeps up.",
    caption: "Understand the impact. Review recovery. Keep the mission moving.",
  },
  {
    label: "Report",
    title: "From mission complete to work complete.",
    caption: "Coverage, findings, and an accountable record of every decision.",
  },
];
export const TOUR_DURATION_MS = 35000;
export const FLEET = [
  {
    id: "A-04",
    provider: "Fleet Alpha",
    payload: "Thermal + RGB",
    battery: 96,
    color: "#89d8ee",
    route: "M180 405L225 320L300 330L315 230L395 210L420 115",
    x: 315,
    y: 230,
  },
  {
    id: "A-08",
    provider: "Fleet Alpha",
    payload: "Thermal + RGB",
    battery: 84,
    color: "#c5d89c",
    route: "M180 405L315 425L385 355L460 370L535 310L570 235",
    x: 460,
    y: 370,
  },
  {
    id: "B-12",
    provider: "Fleet Bravo",
    payload: "High-res RGB",
    battery: 92,
    color: "#c0b2ed",
    route: "M650 380L645 285L715 250L685 165L760 120",
    x: 685,
    y: 165,
  },
];
export const EXAMPLE_REQUEST =
  "Inspect the 120 streetlights in the north district before sunrise. Flag outages and keep one aircraft on standby.";
