import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Pause,
  Play,
  Radio,
  ShieldCheck,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { FilmKind } from "./FeatureFilm";
import styles from "./FeatureScene.module.css";

const STORIES = {
  "mission-story": {
    label: "AEROS DISPATCH",
    title: "A sentence becomes a flight plan.",
    request:
      "Inspect the north district. Prioritize the waterfront and finish before 07:00.",
    steps: [
      "Understand the objective",
      "Build the mission plan",
      "Ready for operator review",
    ],
    detail: [
      "120 assets located in the connected asset register. The completion window and priority area are attached to the job.",
      "Six missions assigned across two providers. Payload fit, site access and reserves are checked before dispatch.",
      "Review the routes, aircraft assignments and unresolved constraints. You authorize the operational action.",
    ],
    metric: ["120 assets", "3 aircraft", "42 min window"],
    color: "blue",
  },
  "fleet-readiness": {
    label: "AEROS FLEET",
    title: "The right aircraft. Ready for the job.",
    request: "Which aircraft can take the thermal inspection at Dock North?",
    steps: [
      "Read the connected fleet",
      "Check mission requirements",
      "Recommend the best fit",
    ],
    detail: [
      "Aircraft, docks and payloads are visible in one operating picture. Each status includes its source and last update.",
      "Battery reserve, thermal payload, launch-site availability and operating limits are evaluated together.",
      "A-04 is ready with the required payload. A-08 remains available for coverage, with B-16 held in reserve.",
    ],
    metric: ["4 aircraft", "2 providers", "1 reserve"],
    color: "green",
  },
  "mission-recovery": {
    label: "AEROS RECOVER",
    title: "Conditions change. The plan adapts.",
    request: "Wind is rising in Sector 02. Keep the inspection on schedule.",
    steps: [
      "Detect the change",
      "Compare recovery options",
      "Approve the revised plan",
    ],
    detail: [
      "A wind change affects two assignments. Aeros connects the condition to the aircraft, routes and remaining work.",
      "Compare reassignment, a revised route and a delayed launch. See the effect on coverage, timing and reserves.",
      "Transfer remaining assets to B-16 and reroute A-08. The operator reviews the change before execution.",
    ],
    metric: ["2 affected", "+8 min", "Coverage retained"],
    color: "peach",
  },
  report: {
    label: "AEROS REPORT",
    title: "The flight ends. The work closes.",
    request: "Show me what was completed and the assets that need follow-up.",
    steps: [
      "Reconcile the coverage",
      "Review the observations",
      "Return results to the job",
    ],
    detail: [
      "All planned assets are matched to the mission record. Completed work, gaps and exceptions remain visible.",
      "Seven observations are flagged for operator review. Each finding stays connected to its asset and originating mission.",
      "The coverage summary, reviewed findings and decision history are ready for your reporting workflow.",
    ],
    metric: ["120 / 120 assets", "7 observations", "6 missions"],
    color: "blue",
  },
  control: {
    label: "AEROS CONTROL",
    title: "Every action has an owner.",
    request:
      "Send the revised inspection plan to the remote pilot for approval.",
    steps: [
      "Prepare the review",
      "Route to the right operator",
      "Record the decision",
    ],
    detail: [
      "The proposed changes, affected assignments and supporting evidence are assembled into one review.",
      "The designated operator sees the plan and open constraints. Operational authority follows your configured rules.",
      "The approval, owner and resulting assignments stay attached to the mission for handoffs and later review.",
    ],
    metric: ["Named owner", "Explicit approval", "Decision history"],
    color: "green",
  },
};

/**
 * @cc [owner:saharshbaweja,label:react;product] stable-feature-story
 * Story playback MUST preserve the portrait panel dimensions and MUST remain an explicitly illustrative workflow.
 */
export function FeatureScene({
  film = "mission-story",
  feature,
}: {
  film?: FilmKind;
  feature?: string;
}) {
  const sceneKind = feature?.includes("Report")
    ? "report"
    : feature && /Control|Coordinate|Evidence/.test(feature)
      ? "control"
      : feature?.includes("Dispatch") || feature?.includes("Plan")
        ? "mission-story"
        : feature?.includes("Readiness") || feature?.includes("Fleet")
          ? "fleet-readiness"
          : feature?.includes("Alert") || feature?.includes("Recover")
            ? "mission-recovery"
            : film;
  const story = STORIES[sceneKind];
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) {
      return;
    }
    const timer = window.setInterval(() => setStep((s) => (s + 1) % 3), 4500);
    return () => window.clearInterval(timer);
  }, [playing]);
  return (
    <div
      className={`${styles.scene} ${styles[story.color]}`}
      aria-label={story.title}
    >
      <div className={styles.intro}>
        <span>{story.label}</span>
        <h3>{story.title}</h3>
      </div>
      <div className={styles.window}>
        <div className={styles.chrome}>
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>
            aeros /{" "}
            {sceneKind === "fleet-readiness" ? "Fleet" : "Mission control"}
          </span>
          <Radio size={11} />
        </div>
        {sceneKind === "report" || sceneKind === "control" ? (
          <div className={styles.recordBoard}>
            <div>
              <span>
                {sceneKind === "report" ? "MISSION SUMMARY" : "OPERATOR REVIEW"}
              </span>
              <strong>
                {sceneKind === "report" ? "120 / 120" : "Ready for review"}
              </strong>
              <p>
                {sceneKind === "report"
                  ? "Assets covered · North district"
                  : "Revised mission plan · ND-0120"}
              </p>
            </div>
            {(sceneKind === "report"
              ? [
                  "Coverage reconciled",
                  "7 observations for review",
                  "Report ready to export",
                ]
              : [
                  "Dispatcher · Plan prepared",
                  "Remote pilot · Review requested",
                  "Mission record · Decision retained",
                ]
            ).map((item, i) => (
              <div key={item} className={styles.recordRow}>
                <span>{i <= step ? <Check size={12} /> : "○"}</span>
                {item}
                <small>{i <= step ? "Complete" : "Pending"}</small>
              </div>
            ))}
          </div>
        ) : sceneKind === "fleet-readiness" ? (
          <div className={styles.fleetBoard}>
            <div>
              <strong>Fleet readiness</strong>
              <span>4 aircraft · 2 providers</span>
            </div>
            <div className={styles.tableHead}>
              <span>AIRCRAFT</span>
              <span>PAYLOAD</span>
              <span>BATTERY</span>
              <span>STATE</span>
            </div>
            {[
              {
                id: "A-04",
                payload: "Thermal / RGB",
                battery: 96,
                state: "Ready",
              },
              { id: "A-08", payload: "RGB", battery: 84, state: "Ready" },
              {
                id: "B-12",
                payload: "Thermal / RGB",
                battery: 92,
                state: "Assigned",
              },
              {
                id: "B-16",
                payload: "Thermal / RGB",
                battery: 98,
                state: "Reserve",
              },
            ].map((aircraft, i) => (
              <div
                key={aircraft.id}
                className={`${styles.tableRow} ${i === step ? styles.highlightRow : ""}`}
              >
                <strong>
                  {aircraft.id}
                  <small>{i < 2 ? "Fleet Alpha" : "Fleet Bravo"}</small>
                </strong>
                <span>{aircraft.payload}</span>
                <span>
                  <b style={{ width: `${aircraft.battery}%` }} />
                  {aircraft.battery}%
                </span>
                <span>{aircraft.state}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.map}>
            <img
              src="/static/landing/drone/alameda-aerial.jpg"
              alt="USGS aerial imagery of Alameda Point"
              loading="lazy"
            />
            <div className={styles.mapLabel}>
              ALAMEDA POINT <span>Workspace / North</span>
            </div>
            <svg viewBox="0 0 500 240" aria-hidden="true">
              <path
                d="M75 180L125 110L235 105L260 172L350 150L410 85"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeDasharray={step === 0 ? "5 5" : undefined}
              />
              <path
                d="M85 190L115 75L260 80L290 205Z"
                fill="#67a4ff20"
                stroke="#8bbdff"
                strokeDasharray="4 4"
              />
              <circle
                cx={step === 0 ? 125 : step === 1 ? 260 : 410}
                cy={step === 0 ? 110 : step === 1 ? 172 : 85}
                r="9"
                fill="#457df5"
                stroke="white"
                strokeWidth="3"
              />
            </svg>
            {sceneKind === "mission-recovery" && (
              <div className={styles.weatherEvent}>
                <Wind size={12} /> Wind change · Sector 02{" "}
                <strong>18 kt NE</strong>
              </div>
            )}
            <span className={styles.mapSource}>
              USGS / NAIP · illustrative mission
            </span>
            <div className={styles.telemetry}>
              <span>
                A-04 <i />
              </span>
              <strong>{step === 2 ? "Ready" : "Review"}</strong>
              <small>96% battery · Thermal + RGB</small>
            </div>
          </div>
        )}
        <div className={styles.fleet}>
          <span>
            <i /> A-04 <small>Ready</small>
          </span>
          <span>
            <i /> A-08 <small>Ready</small>
          </span>
          <span>
            <i /> B-16 <small>Reserve</small>
          </span>
        </div>
      </div>
      <div className={styles.brief}>
        <div className={styles.briefHeader}>
          <span className={styles.assistant}>✳</span>
          <strong>{feature || "Aeros Intelligence"}</strong>
          <span>Mission brief</span>
        </div>
        <p className={styles.request}>{story.request}</p>
        <div className={styles.response} key={step}>
          <span>
            {sceneKind === "mission-recovery" ? (
              <Wind size={15} />
            ) : (
              <ShieldCheck size={15} />
            )}
          </span>
          <div>
            <strong>{story.steps[step]}</strong>
            <p>{story.detail[step]}</p>
          </div>
        </div>
        <div className={styles.metrics}>
          {story.metric.map((m) => (
            <span key={m}>
              <Check size={11} />
              {m}
            </span>
          ))}
        </div>
        <button
          onClick={() => {
            setPlaying(false);
            setStep((step + 1) % 3);
          }}
        >
          {step === 2 ? "Replay workflow" : "Continue the preview"}
          <ArrowUpRight size={14} />
        </button>
      </div>
      <div className={styles.controls}>
        <button
          aria-label={playing ? "Pause feature story" : "Play feature story"}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
        </button>
        <div>
          {story.steps.map((label, i) => (
            <button
              key={label}
              aria-label={label}
              aria-pressed={i === step}
              onClick={() => {
                setStep(i);
                setPlaying(false);
              }}
            >
              <span />
            </button>
          ))}
        </div>
        <span>0{step + 1} / 03</span>
        <ChevronRight size={13} />
      </div>
    </div>
  );
}
