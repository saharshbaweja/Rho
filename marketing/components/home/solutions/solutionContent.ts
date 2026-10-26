export type SolutionVisual =
  | "dispatch"
  | "fleet"
  | "readiness"
  | "recovery"
  | "report"
  | "search-coverage"
  | "response"
  | "search";
export interface SolutionContent {
  slug: string;
  label: string;
  audience: string;
  title: string;
  description: string;
  heroVisual: SolutionVisual;
  detailVisual: SolutionVisual;
  summary: { title: string; description: string }[];
  example: { title: string; description: string; scenario: number };
  workflow: {
    title: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  setup: { input: string; checks: string; output: string };
  faqs: { question: string; answer: string }[];
}

/**
 * @cc [owner:saharshbaweja,label:product] solution-claims-and-examples
 * Solution copy must identify example missions as previews and must not claim universal
 * hardware compatibility, regulatory approval, customer results, or live demo execution.
 */
export const SOLUTIONS: SolutionContent[] = [
  {
    slug: "infrastructure-inspection",
    label: "Infrastructure inspection",
    audience: "For utilities, asset owners, and inspection operators",
    title: "From an asset list to a coordinated inspection.",
    description:
      "Tell Aeros what needs inspecting, where it is, and when the work must be done. Build missions around your existing aircraft, review the plan, and keep every asset tied to its inspection record.",
    heroVisual: "dispatch",
    detailVisual: "readiness",
    summary: [
      {
        title: "Plan around the assets",
        description:
          "Bring locations, inspection priorities, payload requirements, and completion windows into the same job.",
      },
      {
        title: "Use the fleet you have",
        description:
          "Match connected aircraft and providers to each area using payload fit, battery state, launch sites, and operator availability.",
      },
      {
        title: "Know what remains",
        description:
          "Track completed passes, observations needing review, and work that must be reassigned or flown again.",
      },
    ],
    example: {
      title: "See an inspection take shape.",
      description:
        "In this illustrative mission, 120 waterfront assets become six assignments. Explore the plan, a changing wind window, and the final coverage record. The numbers describe this example only.",
      scenario: 1,
    },
    workflow: {
      title: "Keep the inspection moving when the plan changes.",
      description:
        "A wind change or unavailable aircraft should leave a clear list of affected work. Aeros brings the remaining assets and possible next steps back to the operator.",
      steps: [
        {
          title: "Define the inspection",
          description:
            "Choose the asset register or work order, required imagery, priority sites, and deadline. Review the interpreted scope before creating assignments.",
        },
        {
          title: "Review the launch window",
          description:
            "Check weather and airspace information alongside aircraft limits, battery reserves, dock state, and required approvals. Missing or stale information stays visible.",
        },
        {
          title: "Coordinate the work",
          description:
            "Assign supported aircraft to separate areas. Follow progress against the original asset list and review a revised plan when conditions affect an assignment.",
        },
        {
          title: "Return an asset-linked record",
          description:
            "Bring together completed coverage, flagged observations, open work, and operator decisions. Agree the file formats and work-order connection during setup.",
        },
      ],
    },
    setup: {
      input:
        "Asset locations, inspection criteria, connected fleet and dock data, and your operating limits.",
      checks:
        "Payload suitability, launch-site availability, current conditions, return reserves, and approval ownership.",
      output:
        "Mission status, coverage by asset, observations for review, incomplete work, and an exportable decision history.",
    },
    faqs: [
      {
        question: "Does Aeros replace inspection analysis software?",
        answer:
          "Aeros coordinates the work and keeps its results attached to the mission. Specialist defect analysis, photogrammetry, and asset-management tools can remain part of your workflow. Required connections and output formats are scoped with your team.",
      },
      {
        question: "Can we use different aircraft for different assets?",
        answer:
          "That is the purpose of a vendor-neutral dispatch layer. Aircraft and providers must have a supported integration; the mission plan also needs to account for payloads, flight limits, launch sites, and operating responsibility.",
      },
      {
        question: "What happens when an inspection is interrupted?",
        answer:
          "Keep the completed work, affected assets, and reason for interruption together. The operator can review a delay, revised assignment, or return plan instead of rebuilding the job from the beginning.",
      },
    ],
  },
  {
    slug: "rapid-response",
    label: "Rapid response",
    audience: "For public safety and site response teams",
    title: "Turn a location into a coordinated response.",
    description:
      "Give Aeros the incident location and the aerial support you need. Review the available aircraft, coordinate the response, and keep the operator and field team working from the same mission context.",
    heroVisual: "response",
    detailVisual: "recovery",
    summary: [
      {
        title: "Task in plain language",
        description:
          "Describe the location, what needs to be observed, and the aircraft or payload requirements. Review the interpreted task before dispatch.",
      },
      {
        title: "Keep the scene connected",
        description:
          "Bring available imagery, aircraft status, operator notes, and field updates together under one incident.",
      },
      {
        title: "Prepare the next aircraft",
        description:
          "When a battery reaches return reserve, compare a relief assignment while preserving the scene and mission record.",
      },
    ],
    example: {
      title: "Follow a waterfront response.",
      description:
        "An alarm at Pier 3 becomes a reviewed mission with two aircraft assignments. Explore the scene view, a battery handover, and the incident summary in this scripted preview.",
      scenario: 0,
    },
    workflow: {
      title: "Keep coverage and responsibility clear.",
      description:
        "Aeros coordinates the mission above your existing flight systems. Your operating team reviews the plan, authorizes changes, and remains responsible for flight decisions.",
      steps: [
        {
          title: "Locate the request",
          description:
            "Attach an incident location, observation objective, priority, and field contact. Confirm the address or map location before planning.",
        },
        {
          title: "Check the response options",
          description:
            "Compare supported aircraft by readiness, payload, launch site, and available operator. Surface weather, airspace, or policy constraints before approval.",
        },
        {
          title: "Share the mission context",
          description:
            "Keep available scene imagery and the latest operator observations attached to the incident. Field acknowledgements belong to the same record.",
        },
        {
          title: "Coordinate relief and return",
          description:
            "Review replacement coverage before an aircraft returns. Preserve the timeline of assignments, handovers, and operator decisions for the debrief.",
        },
      ],
    },
    setup: {
      input:
        "Incident locations, approved launch sites, supported fleet connections, field contacts, and response procedures.",
      checks:
        "Aircraft and payload readiness, operator availability, conditions, airspace information, and configured flight limits.",
      output:
        "A shared incident timeline, available scene context, aircraft handover history, and a mission summary.",
    },
    faqs: [
      {
        question: "Is this a complete Drone as First Responder system?",
        answer:
          "Aeros is the dispatch and coordination layer for an existing operation. Aircraft, docks, connectivity, flight-control software, trained operators, and any required authorizations must be in place. We scope those dependencies before connecting a workflow.",
      },
      {
        question:
          "Does a natural-language request launch an aircraft immediately?",
        answer:
          "The request becomes a structured plan for operator review. The preview demonstrates that approval step. Operational execution depends on the connected flight system, permissions, and your approved procedures.",
      },
      {
        question: "Can field teams see the same incident?",
        answer:
          "The intended workflow keeps available imagery, observations, and acknowledgements attached to one incident. Video access and sharing depend on the provider connection and your access rules. The website shows a local demonstration.",
      },
    ],
  },
  {
    slug: "search-rescue",
    label: "Search & rescue",
    audience: "For search coordinators and emergency response teams",
    title: "One search. Every sector accounted for.",
    description:
      "Describe the search area, divide the work between available aircraft, and keep the ground team informed. Aeros brings the search boundary, completed coverage, and areas needing another pass into one mission workspace.",
    heroVisual: "search",
    detailVisual: "search-coverage",
    summary: [
      {
        title: "Plan the search area",
        description:
          "Attach the boundary, priority zones, access routes, and observation requirements before assigning aircraft.",
      },
      {
        title: "Match the payload to the task",
        description:
          "Prioritize supported thermal or visual payloads and check aircraft readiness and operator responsibility.",
      },
      {
        title: "Retain coverage through handoffs",
        description:
          "Keep completed sectors, field observations, and open questions visible as priorities or aircraft change.",
      },
    ],
    example: {
      title: "Explore a three-sector search.",
      description:
        "This illustrative search divides a waterfront area between three aircraft. See how a field update changes the priority area without losing the original coverage record.",
      scenario: 2,
    },
    workflow: {
      title: "Carry the whole search into the next decision.",
      description:
        "A search can cross shifts, aircraft, and teams. Keep the boundary, completed work, and remaining questions attached to the operation throughout those changes.",
      steps: [
        {
          title: "Set the boundary",
          description:
            "Define the search area and priority locations. Include the observation objective, time window, access constraints, and ground-team coordination needs.",
        },
        {
          title: "Assign the sectors",
          description:
            "Match supported aircraft and payloads to each area. Review the proposed routes, battery reserves, and operator assignments before execution.",
        },
        {
          title: "Review observations together",
          description:
            "Keep available scene imagery and field reports tied to their location. Mark areas for another look; a completed flight does not establish that a person or object is absent.",
        },
        {
          title: "Update the remaining work",
          description:
            "When the priority area changes, review revised assignments and retain completed coverage. Export the search timeline and outstanding areas for the next team.",
        },
      ],
    },
    setup: {
      input:
        "Search boundaries, priority areas, supported aircraft and payloads, team contacts, and search procedures.",
      checks:
        "Payload availability, visibility and weather, operating limits, operator responsibility, and launch-site access.",
      output:
        "Sector coverage, location-linked observations, areas requiring another pass, and a handover summary.",
    },
    faqs: [
      {
        question: "Does Aeros automatically find missing people?",
        answer:
          "The workflow shown here coordinates aircraft and search coverage. It does not claim automatic person detection or identification. Trained teams review imagery and observations and decide what requires further attention.",
      },
      {
        question: "Can we prioritize thermal aircraft?",
        answer:
          "Payload requirements can guide the plan when the relevant aircraft and data are connected. Thermal imagery depends on the installed sensor, environmental conditions, and provider support. The thermal view on this website is simulated.",
      },
      {
        question: "What stays available during an aircraft handover?",
        answer:
          "The search boundary, completed sectors, outstanding areas, observations, and operator decisions should stay with the mission. The next assignment is reviewed against that remaining work.",
      },
    ],
  },
  {
    slug: "fleet-service-providers",
    label: "Fleet service providers",
    audience: "For drone service providers and multi-site operators",
    title: "Many sites. One place to dispatch the work.",
    description:
      "Turn incoming jobs into reviewed aircraft assignments. Aeros gives dispatchers a shared view of supported fleets, customer sites, schedules, and unfinished work while keeping each provider’s operating responsibility clear.",
    heroVisual: "fleet",
    detailVisual: "recovery",
    summary: [
      {
        title: "Make each job actionable",
        description:
          "Capture the site, objective, required payload, deadline, customer reference, and expected deliverables before planning.",
      },
      {
        title: "Assign across connected providers",
        description:
          "Compare available aircraft and launch sites without treating different vendors as interchangeable or assuming every integration supports the same actions.",
      },
      {
        title: "Account for every handoff",
        description:
          "Keep assignment ownership, approval history, changes, and completion status attached to the customer job.",
      },
    ],
    example: {
      title: "See a multi-aircraft job move through dispatch.",
      description:
        "The inspection preview shows how an asset list becomes several aircraft assignments and a coverage record. Use it to explore the shared workflow; provider connections are scoped separately.",
      scenario: 1,
    },
    workflow: {
      title: "Reassign the work without losing the job.",
      description:
        "An aircraft can become unavailable while a customer deadline stays the same. Keep the original scope, completed work, and proposed replacement together for review.",
      steps: [
        {
          title: "Bring in the job",
          description:
            "Start with a dispatcher request or a connected work-order source. Attach site access, operating window, payload requirements, and delivery expectations.",
        },
        {
          title: "Check the available fleet",
          description:
            "Review current aircraft and dock status with source timestamps. Match each assignment to the provider, operator, and supported flight system that will execute it.",
        },
        {
          title: "Review conflicts and exceptions",
          description:
            "Surface unavailable aircraft, changed conditions, and overlapping demands. Compare a revised schedule, another supported provider, or a delay before approving a change.",
        },
        {
          title: "Close the customer job",
          description:
            "Reconcile completion against the original scope. Include missing work, delivered outputs, and the decisions behind changes in the final record.",
        },
      ],
    },
    setup: {
      input:
        "Customer job references, sites, service requirements, supported fleet connections, schedules, and provider responsibilities.",
      checks:
        "Aircraft and payload readiness, launch-site access, assignment conflicts, conditions, and approval ownership.",
      output:
        "Job status, accountable assignments, exception history, delivered outputs, and remaining work.",
    },
    faqs: [
      {
        question: "Does vendor-neutral mean every drone is supported?",
        answer:
          "No. It means the dispatch workflow is designed to sit above different flight systems. Each provider requires an integration with a defined set of supported data and actions. Compatibility is validated for your aircraft, docks, and mission types.",
      },
      {
        question: "Does Aeros take over the provider’s flight controls?",
        answer:
          "Aeros coordinates jobs, plans, and mission status. Flight execution remains with the connected flight system and authorized operating team. The exact division of responsibility is part of deployment setup.",
      },
      {
        question: "Can we connect our job-management system?",
        answer:
          "Work-order, GIS, and reporting connections are scoped around the APIs and access your systems provide. Agree what comes in, which actions require approval, and what returns to the job record before rollout.",
      },
    ],
  },
  {
    slug: "survey-reporting",
    label: "Survey & reporting",
    audience: "For survey teams, site managers, and asset owners",
    title: "From a survey brief to a complete mission record.",
    description:
      "Define the area, capture requirements, and deliverables once. Aeros coordinates the collection work, tracks gaps, and keeps flight activity and review notes attached to the final handover.",
    heroVisual: "report",
    detailVisual: "dispatch",
    summary: [
      {
        title: "Define the collection brief",
        description:
          "Bring the boundary, required sensor, capture window, site constraints, and intended deliverables into a reviewed task.",
      },
      {
        title: "Track collection coverage",
        description:
          "Follow planned areas against completed work and record gaps or observations that need another pass.",
      },
      {
        title: "Prepare a useful handover",
        description:
          "Keep mission status, source references, review notes, and unfinished work together for the team processing the data.",
      },
    ],
    example: {
      title: "Follow the work into the report.",
      description:
        "Explore the infrastructure example, then select Debrief to inspect its sample result. This demonstrates mission tracking and handover; it does not generate a survey-grade map.",
      scenario: 1,
    },
    workflow: {
      title: "Make the deliverables part of the plan.",
      description:
        "The mission is only useful if the collection matches the brief. Keep required outputs and review criteria visible from tasking through final delivery.",
      steps: [
        {
          title: "Agree the scope",
          description:
            "Set the boundary, sensor requirements, capture window, expected outputs, and review criteria. Survey accuracy requirements belong in the brief and the collection process.",
        },
        {
          title: "Review the collection plan",
          description:
            "Match supported aircraft and payloads to the area. Review routes, operating conditions, battery reserves, and responsibility before authorizing work.",
        },
        {
          title: "Resolve collection gaps",
          description:
            "Track completed areas and record missing or questionable collection. Review another pass, a revised assignment, or a rescheduled window with the operator.",
        },
        {
          title: "Hand over the record",
          description:
            "Deliver a mission summary with coverage, source references, review notes, and outstanding tasks. Keep specialist processing and quality assurance in your chosen tools.",
        },
      ],
    },
    setup: {
      input:
        "Area boundaries, capture requirements, supported fleet and sensor connections, deliverable formats, and review criteria.",
      checks:
        "Aircraft and payload fit, site access, capture window, conditions, reserves, and required operator approvals.",
      output:
        "Collection status, coverage gaps, source references, review notes, and a mission handover record.",
    },
    faqs: [
      {
        question: "Does Aeros create orthomosaics or survey-grade models?",
        answer:
          "Aeros coordinates collection and the mission record. Photogrammetry, point-cloud processing, georeferencing, and survey quality assurance remain with specialist tools and qualified teams. Required file and processing connections are scoped during setup.",
      },
      {
        question: "Can I ask for a survey in natural language?",
        answer:
          "You can describe the objective, area, time window, and outputs. Those instructions need to become a structured plan with explicit capture requirements and operator review; a sentence alone does not establish survey accuracy.",
      },
      {
        question: "What can I download from the website demo?",
        answer:
          "The debrief offers a sample JSON mission record marked as a simulation. It illustrates assignments, decisions, and results. It contains no live flight data or production survey deliverables.",
      },
    ],
  },
];
