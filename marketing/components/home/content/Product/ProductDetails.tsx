import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import styles from "./ProductDetails.module.css";

const PRODUCTS = [
  {
    name: "Dispatch",
    line: "Turn the job into a coordinated mission.",
    description:
      "Start with a sentence, a location, or a connected job. Aeros interprets the objective, identifies the operating area, and prepares aircraft assignments with the constraints and approvals attached.",
    input: "Natural language · GIS assets · work orders",
    actions: [
      "Break a job into missions and coverage areas",
      "Match aircraft, payloads and operating windows",
      "Review the plan before authorizing dispatch",
    ],
    output: "An approved plan with accountable assignments.",
    href: "dispatch",
  },
  {
    name: "Fleet",
    line: "Know what you can send—and what you should keep.",
    description:
      "See aircraft, docks, readiness, and available scene feeds in the context of the operation. Select an aircraft to inspect its assignment and status without losing sight of the rest of the fleet.",
    input: "Connected provider status · aircraft · docks",
    actions: [
      "See availability across connected providers",
      "Compare battery, payload and maintenance state",
      "Hold reserve capacity for changing priorities",
    ],
    output: "A clear view of available and committed capacity.",
    href: "fleet",
  },
  {
    name: "Readiness",
    line: "Check the conditions behind every assignment.",
    description:
      "A mission is more than a route. Bring weather, airspace information, site access, aircraft limits and your operating procedures into the planning decision, with unresolved inputs visible to the operator.",
    input: "Weather · airspace · sites · operator policies",
    actions: [
      "Check conditions against mission requirements",
      "Surface stale, missing or conflicting inputs",
      "Keep each conclusion connected to its source",
    ],
    output: "A readiness review with constraints and open questions.",
    href: "readiness",
  },
  {
    name: "Recover",
    line: "Keep the mission moving when the plan changes.",
    description:
      "A return reserve, a weather change, or a new priority should not lose the mission context. Compare a relief aircraft, a revised route, or a delayed assignment before approving the next move.",
    input: "Mission events · fleet state · changing conditions",
    actions: [
      "Identify affected missions and dependencies",
      "Coordinate relief aircraft and coverage handovers",
      "Route the revised plan for operator approval",
    ],
    output: "A recovery proposal with coverage and timing tradeoffs.",
    href: "recover",
  },
  {
    name: "Control",
    line: "Keep operational authority with your team.",
    description:
      "Keep the control room and field team aligned around the same scene and mission brief. Assign review ownership, carry observations through handovers, and retain a record of who authorized each change.",
    input: "Roles · approvals · procedures · mission context",
    actions: [
      "Separate recommendations from operational actions",
      "Carry scene context into field-team handoffs",
      "Follow the record of approvals and changes",
    ],
    output: "An accountable mission history and clear handoffs.",
    href: "control",
  },
  {
    name: "Report",
    line: "Finish the job beyond the flight.",
    description:
      "Bring coverage, observations and exceptions back into the workflow that requested the mission. Help teams see what was completed, what needs review and what still needs to happen.",
    input: "Coverage · provider results · findings · exceptions",
    actions: [
      "Track completed, outstanding and flagged assets",
      "Attach results to the original job",
      "Return outputs to connected reporting workflows",
    ],
    output: "A mission record ready for review and follow-up.",
    href: "report",
  },
];

export function ProductDetails({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className={styles.section} id="products">
      <div className={styles.heading}>
        <span>ONE PLATFORM · SIX CONNECTED CAPABILITIES</span>
        <h2>
          From tasking to debrief.
          <br />
          One mission workspace.
        </h2>
        <p>
          One place to turn a request into coordinated aircraft, shared scene
          context, and a completed operation. Aeros works across your existing
          fleets and providers, with operational authority staying with your
          team.
        </p>
      </div>
      <div className={styles.products}>
        {PRODUCTS.map((product, i) => (
          <article id={product.href} key={product.name}>
            <div className={styles.productTitle}>
              <span>0{i + 1}</span>
              <h3>Aeros {product.name}</h3>
              <ArrowUpRight size={19} />
            </div>
            <h4>{product.line}</h4>
            <p>{product.description}</p>
            <ul>
              {product.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
            {detailed && (
              <dl>
                <dt>BRINGS TOGETHER</dt>
                <dd>{product.input}</dd>
                <dt>WHAT YOU GET</dt>
                <dd>{product.output}</dd>
              </dl>
            )}
            {!detailed && (
              <Link href="/home/contact">
                Discuss {product.name.toLowerCase()} <ArrowUpRight size={13} />
              </Link>
            )}
          </article>
        ))}
      </div>
      <p className={styles.note}>
        Aeros works through validated connections to your flight software and
        fleet providers. Available actions depend on the provider interfaces,
        operating procedures and permissions configured for your deployment.
      </p>
    </section>
  );
}

const QUESTIONS = [
  [
    "What does Aeros actually do?",
    "Aeros coordinates the operational work around your drone fleet: it interprets the job, creates a mission plan, checks readiness, assigns available capacity, monitors execution and proposes responses when conditions change. Results return to the original job so the operating team can close the loop.",
  ],
  [
    "Who is it built for?",
    "Public safety and response teams, search coordinators, infrastructure operators, and drone service providers with existing fleets. Start with a defined mission, connected flight systems, and the operating procedures your team already follows.",
  ],
  [
    "Do we need to replace our drones or flight software?",
    "The integration approach is designed around your existing aircraft, docks and provider software. Each connection is validated for the status it exposes and the actions it permits. During onboarding, we agree on the supported workflow and integration scope with your operating team.",
  ],
  [
    "What happens after someone types a request?",
    "Aeros identifies the objective, area, assets, timing and expected outputs, then checks those against the connected fleet and operational constraints. The result is a structured plan with proposed assignments. An authorized operator reviews the plan before operational action.",
  ],
  [
    "How does operator oversight work?",
    "Your operating rules determine who can review and authorize an action. Recommendations, unresolved assumptions and the inputs used to create them stay visible. Changes to the plan follow the configured review process, and the mission retains the decision history.",
  ],
  [
    "How do weather, airspace and live data fit in?",
    "Connected sources supply context for readiness and change detection. Aeros relates those inputs to the mission and surfaces missing or stale information. The operator remains responsible for the applicable permissions, authorizations and go/no-go decision.",
  ],
  [
    "What does implementation involve?",
    "Start with one site or repeatable mission. Connect the relevant fleet and job systems, define assets and operating rules, validate the plan and approval flow, then evaluate the workflow with your team before expanding to additional sites or providers.",
  ],
  [
    "Is the website demonstration connected to real drones?",
    "The website uses real USGS aerial imagery with illustrative routes, aircraft, telemetry and AI responses. It is a scripted product preview. The controls demonstrate the intended workflow without sending commands to a live fleet.",
  ],
];
export function ProductQuestions() {
  return (
    <section className={styles.questions}>
      <div>
        <span>UNDERSTAND THE PLATFORM</span>
        <h2>
          From the first request
          <br />
          to the last result.
        </h2>
        <p>A few practical answers about how Aeros fits into your operation.</p>
        <Link href="/home/contact">
          Talk through your workflow <ArrowUpRight size={15} />
        </Link>
      </div>
      <div>
        {QUESTIONS.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <ChevronDown size={16} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
