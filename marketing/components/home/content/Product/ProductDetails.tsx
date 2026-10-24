import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import styles from "./ProductDetails.module.css";

const PRODUCTS = [
  {
    name: "Dispatch",
    line: "Turn the job into a coordinated mission.",
    description:
      "Give Aeros an objective, an area or asset list, a deadline and the result you need. The dispatch workspace turns that request into a reviewable mission plan with aircraft assignments and completion criteria.",
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
      "Bring the fleets and providers you already operate into one shared view. Understand aircraft availability, dock status, payload fit and reserves in the context of the next job.",
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
      "When weather shifts, an aircraft becomes unavailable or a job takes priority, understand which assignments are affected. Compare the available responses before committing to a change.",
    input: "Mission events · fleet state · changing conditions",
    actions: [
      "Identify affected missions and dependencies",
      "Compare reassignment, delay and return options",
      "Route the revised plan for operator approval",
    ],
    output: "A recovery proposal with coverage and timing tradeoffs.",
    href: "recover",
  },
  {
    name: "Control",
    line: "Keep operational authority with your team.",
    description:
      "Give dispatchers, remote pilots and field teams a shared operating picture with clear responsibility. Define who can review, approve and act, and keep the decision history with the mission.",
    input: "Roles · approvals · procedures · mission context",
    actions: [
      "Separate recommendations from operational actions",
      "Assign review ownership across teams",
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
        <span>THE AEROS PRODUCT SUITE</span>
        <h2>
          One operating system.
          <br />
          Every part of the mission.
        </h2>
        <p>
          Aeros is dispatch and orchestration software for organizations that
          already have drone fleets. It connects mission demand to the aircraft,
          providers and people that can deliver it—then follows the work through
          to completion.
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
              <Link href={`/home/product#${product.href}`}>
                Explore {product.name.toLowerCase()} <ArrowUpRight size={13} />
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
    "Infrastructure inspection teams, utilities, site operators and drone service providers that already run aircraft or use fleet providers. The starting point is a repeatable workflow with clear operating procedures, known assets and measurable completion criteria.",
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
