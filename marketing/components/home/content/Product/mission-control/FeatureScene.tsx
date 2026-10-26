import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Pause,
  Play,
  Radio,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
    request: "A-04 needs to return. Keep coverage at the waterfront.",
    steps: [
      "Detect the reserve limit",
      "Prepare the relief aircraft",
      "Confirm the handover",
    ],
    detail: [
      "A-04 is approaching return reserve. Remaining coverage, observations and aircraft state stay attached to the mission.",
      "B-16 matches the payload and readiness requirements. Compare the overlap window before swapping aircraft.",
      "The operator confirms the plan. B-16 takes the remaining coverage while A-04 returns to its launch site.",
    ],
    metric: ["1 relief aircraft", "Context retained", "Operator review"],
    color: "peach",
  },
  readiness: {
    label: "AEROS READINESS",
    title: "A clear window to operate.",
    request: "Check the next launch window against our operating limits.",
    steps: [
      "Assemble the conditions",
      "Evaluate the operating window",
      "Surface the open constraints",
    ],
    detail: [
      "Weather, airspace notices, aircraft limits and launch-site status are aligned to the same mission window.",
      "The proposed launch stays within the configured wind limit. Later gusts narrow the available window.",
      "The operator reviews source freshness and unresolved constraints before authorizing the mission.",
    ],
    metric: ["08 kt NE", "10 km visibility", "Operator review"],
    color: "blue",
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

const SEARCH_REPORT = {
  label: "AEROS REPORT",
  title: "Keep the next search team informed.",
  request: "Show the completed sectors and the area that needs another pass.",
  steps: [
    "Review sector coverage",
    "Keep open areas visible",
    "Prepare the search handover",
  ],
  detail: [
    "The north and access sectors are complete in this example. The eastern sector remains open; completed coverage is not a finding of absence.",
    "The field team has requested another pass along the eastern boundary. The location and reason stay attached to the search.",
    "The next team receives completed sectors, outstanding areas, observations, and operator decisions in the same mission record.",
  ],
  metric: ["2 / 3 sectors", "1 area open", "Context retained"],
  color: "green",
};
const REPORT_RECORDS = {
  inspection: {
    matrix: "Coverage across six missions",
    count: "120 / 120",
    scope: "Assets covered · North district",
    rows: [
      "Coverage reconciled",
      "7 observations for review",
      "Report ready to export",
    ],
  },
  search: {
    matrix: "Illustrative search coverage with open areas",
    count: "02 / 03",
    scope: "Sectors completed · Waterfront",
    rows: [
      "North sector · Completed",
      "East boundary · Another pass",
      "Search handover prepared",
    ],
  },
};

/**
 * @cc [owner:saharshbaweja,label:react;product] stable-feature-story
 * Story playback MUST preserve the portrait panel dimensions and MUST remain an explicitly illustrative workflow.
 */
export function FeatureScene({
  film = "mission-story",
  feature,
  reportContext = "inspection",
}: {
  film?: FilmKind;
  feature?: string;
  reportContext?: "inspection" | "search";
}) {
  const sceneKind = feature?.includes("Report")
    ? "report"
    : feature && /Control|Coordinate|Evidence/.test(feature)
      ? "control"
      : feature?.includes("Dispatch") || feature?.includes("Plan")
        ? "mission-story"
        : feature?.includes("Readiness")
          ? "readiness"
          : feature?.includes("Fleet")
            ? "fleet-readiness"
            : feature?.includes("Alert") || feature?.includes("Recover")
              ? "mission-recovery"
              : film;
  const story =
    sceneKind === "report" && reportContext === "search"
      ? SEARCH_REPORT
      : STORIES[sceneKind];
  const reportRecord = REPORT_RECORDS[reportContext];
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const node = host.current;
    if (!node) {
      return;
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!media.matches);
    const onMotion = () => {
      if (media.matches) {
        setPlaying(false);
      }
    };
    media.addEventListener("change", onMotion);
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((e) => e.isIntersecting)),
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMotion);
    };
  }, []);
  useEffect(() => {
    if (!playing || !visible) {
      return;
    }
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setStep((s) => (s + 1) % 3);
      }
    }, 4500);
    return () => window.clearInterval(timer);
  }, [playing, visible]);
  return (
    <div
      className={`${styles.scene} ${styles[story.color]}`}
      ref={host}
      aria-label={story.title}
      data-playing={playing && visible}
      data-scene={sceneKind}
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
        {sceneKind === "mission-recovery" ? (
          <div className={styles.recoveryBoard}>
            <span>COVERAGE CONTINUITY</span>
            <h4>Handover without losing context.</h4>
            <div className={styles.swapAircraft}>
              <div>
                <span>ON STATION</span>
                <strong>A-04</strong>
                <small>
                  {step === 2 ? "Returning to dock" : "Return reserve reached"}
                </small>
                <i style={{ width: "28%" }} />
              </div>
              <ArrowUpRight size={22} />
              <div>
                <span>RELIEF AIRCRAFT</span>
                <strong>B-16</strong>
                <small>
                  {step === 0
                    ? "Ready at Dock E-02"
                    : step === 1
                      ? "Approaching the sector"
                      : "Coverage transferred"}
                </small>
                <i style={{ width: "92%" }} />
              </div>
            </div>
            <div className={styles.handoverTrack}>
              <span>17:42</span>
              <i />
              <span>
                {step === 2 ? "HANDOVER CONFIRMED" : "OVERLAP WINDOW"}
              </span>
              <i />
              <span>17:46</span>
            </div>
            <div className={styles.handoverCheck}>
              <Check size={11} />
              {step === 0
                ? "Mission context attached"
                : step === 1
                  ? "Incoming aircraft matched"
                  : "Operator decision retained"}
            </div>
          </div>
        ) : sceneKind === "report" || sceneKind === "control" ? (
          <div className={styles.recordBoard}>
            {sceneKind === "report" && (
              <div
                className={styles.coverageMatrix}
                aria-label={reportRecord.matrix}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <i
                    key={i}
                    data-observation={
                      reportContext === "search" ? i >= 40 : i % 9 === 0
                    }
                  />
                ))}
              </div>
            )}
            <div>
              <span>
                {sceneKind === "report" ? "MISSION SUMMARY" : "OPERATOR REVIEW"}
              </span>
              <strong>
                {sceneKind === "report"
                  ? reportRecord.count
                  : "Ready for review"}
              </strong>
              <p>
                {sceneKind === "report"
                  ? reportRecord.scope
                  : "Revised mission plan · ND-0120"}
              </p>
            </div>
            {(sceneKind === "report"
              ? reportRecord.rows
              : [
                  "Dispatcher · Plan prepared",
                  "Remote pilot · Review requested",
                  "Mission record · Decision retained",
                ]
            ).map((item, i) => {
              const needsPass =
                sceneKind === "report" && reportContext === "search" && i === 1;
              return (
                <div key={item} className={styles.recordRow}>
                  <span>
                    {!needsPass && i <= step ? <Check size={12} /> : "○"}
                  </span>
                  {item}
                  <small>
                    {needsPass ? "Open" : i <= step ? "Complete" : "Pending"}
                  </small>
                </div>
              );
            })}
          </div>
        ) : sceneKind === "readiness" ? (
          <div className={styles.readinessBoard}>
            <div>
              <span>OPERATING WINDOW</span>
              <strong>05:40 — 06:22</strong>
              <small>Wind forecast · illustrative conditions</small>
            </div>
            <svg
              viewBox="0 0 420 120"
              role="img"
              aria-label="Wind rises later in the mission window"
            >
              <path d="M0 30H420M0 65H420M0 100H420" stroke="#ffffff12" />
              <path d="M0 40H420" stroke="#d3a56d" strokeDasharray="4 4" />
              <path
                d="M0 90L45 85L90 91L135 75L180 79L225 64L270 60L315 40L360 47L420 22"
                fill="none"
                stroke="#9acbd3"
                strokeWidth="2"
              />
              <rect
                x={20 + step * 65}
                y="10"
                width="130"
                height="100"
                fill="#95c9c712"
                stroke="#95c9c740"
              />
              <text x="310" y="32" fill="#d3a56d" fontSize="8">
                OPERATING LIMIT
              </text>
            </svg>
            <div className={styles.readinessChecks}>
              <span>
                Weather <b>Reviewed</b>
              </span>
              <span>
                Airspace <b>Review required</b>
              </span>
              <span>
                Launch site <b>Ready</b>
              </span>
            </div>
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
                className={styles.routeLine}
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
              <RotateCcw size={15} />
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
