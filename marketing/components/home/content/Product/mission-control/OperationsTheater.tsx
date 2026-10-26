import {
  ArrowRight,
  Check,
  ChevronRight,
  Crosshair,
  FileText,
  Layers,
  MapPin,
  Pause,
  Play,
  Radio,
  RotateCcw,
  ShieldCheck,
  Wind,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { MissionMap } from "./MissionMap";
import { SensorViewport } from "./SensorViewport";
import { FLEET } from "./scenario";
import { MISSION_STAGES, MISSION_STORIES } from "./missionStories";
import styles from "./OperationsTheater.module.css";

/**
 * @cc [owner:saharshbaweja,label:product] mission-theater-simulation
 * All scenarios, assignments, sensor imagery, and results MUST be presented as scripted previews.
 * Scenario changes MUST reset the stage and playback. Preview controls MUST NOT send operational commands or contact external services.
 */
/**
 * @cc [owner:saharshbaweja,label:react] mission-theater-motion
 * Automatic playback MUST pause while outside the viewport or when the document is hidden, and MUST be disabled for reduced-motion visitors.
 * Stage and scenario changes MUST NOT alter the desktop workspace height.
 */
export function OperationsTheater({
  compact = false,
  initialScenario = 0,
  initialStage = 0,
  autoPlay = true,
}: {
  compact?: boolean;
  initialScenario?: number;
  initialStage?: number;
  autoPlay?: boolean;
} = {}) {
  const host = useRef<HTMLDivElement>(null);
  const instanceId = useId();
  const [draft, setDraft] = useState("");
  const [customPrompt, setCustomPrompt] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [scenario, setScenario] = useState(initialScenario);
  const [progress, setProgress] = useState(initialStage * 20);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState<"map" | "scene">("map");
  const [layer, setLayer] = useState("operations");
  const [zoom, setZoom] = useState(1);
  const [exported, setExported] = useState(false);
  const stage = Math.min(4, Math.floor(progress / 20));
  const story = MISSION_STORIES[scenario];
  const aircraft = FLEET[selected];
  const ended = progress >= 100;
  const running = playing && !ended;
  useEffect(() => {
    const node = host.current;
    if (!node) {
      return;
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(autoPlay && !media.matches);
    const onMotion = () => {
      if (media.matches) {
        setPlaying(false);
      }
    };
    media.addEventListener("change", onMotion);
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((e) => e.isIntersecting)),
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMotion);
    };
  }, [autoPlay]);
  useEffect(() => {
    if (!playing || !visible || ended) {
      return;
    }
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setProgress((p) => Math.min(100, p + 0.5));
      }
    }, 200);
    return () => window.clearInterval(timer);
  }, [playing, visible, ended]);
  function goToStage(next: number) {
    setPlaying(false);
    setProgress(next * 20 + (next === 2 ? 8 : 0));
  }
  function changeScenario(index: number) {
    setExported(false);
    setDraft("");
    setCustomPrompt(null);
    setNotice("");
    setScenario(index);
    setProgress(0);
    setPlaying(false);
    setSelected(0);
    setView("map");
    setZoom(1);
    setLayer("operations");
  }
  function exportRecord() {
    const record = new Blob(
      [
        JSON.stringify(
          {
            simulation: true,
            missionId: story.code,
            mission: story.title,
            request: customPrompt ?? story.prompt,
            scope: story.scope,
            assignments: FLEET.slice(0, story.assigned).map((item) => ({
              aircraft: item.id,
              provider: item.provider,
              payload: item.payload,
            })),
            recovery: story.recovery,
            result: story.result,
            source:
              "Scripted Aeros website preview. Not operational flight data.",
          },
          null,
          2
        ),
      ],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(record);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aeros-${story.code.toLowerCase()}-preview.json`;
    link.click();
    URL.revokeObjectURL(url);
    setExported(true);
  }
  const response = [
    `I’ve located ${story.scope.toLowerCase()}. I’ll check the available aircraft, operating limits, and required approvals.`,
    story.plan,
    "Assignments acknowledged. Aircraft, scene context, and mission updates are now grouped under one operation.",
    story.recovery,
    story.result,
  ][stage];
  return (
    <div
      ref={host}
      role="region"
      aria-label={
        compact ? "Aeros mission preview" : "Interactive mission workspace"
      }
      className={`${styles.theater} ${compact ? styles.compact : ""}`}
    >
      <div
        className={styles.scenarioBar}
        role="group"
        aria-label="Mission scenarios"
      >
        <span>CHOOSE AN OPERATION</span>
        <div>
          {MISSION_STORIES.map((item, i) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={i === scenario}
              onClick={() => changeScenario(i)}
            >
              {item.label}
              <ArrowRight size={12} />
            </button>
          ))}
        </div>
      </div>
      <div className={styles.workspace}>
        <div className={styles.chrome}>
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>AEROS / OPERATIONS WORKSPACE</span>
          <span>PRODUCT PREVIEW</span>
        </div>
        <header className={styles.header}>
          <div className={styles.wordmark}>
            <img src="/static/aeros-logo-white.svg" alt="" />
            <strong>aeros</strong>
            <span>/</span>
            <span>Mission control</span>
          </div>
          <span className={styles.workspaceLabel}>
            <i /> Alameda workspace <ChevronRight size={10} />
            {story.code}
          </span>
          <span className={styles.operator}>OP</span>
        </header>
        <div className={styles.body}>
          <aside className={styles.fleet}>
            <div className={styles.eyebrow}>
              OPERATION <span>{story.code}</span>
            </div>
            <h3>{story.title}</h3>
            <p>
              <MapPin size={11} />
              {story.scope}
            </p>
            <div className={styles.metric}>
              <strong>{story.metric}</strong>
              <span>{story.unit}</span>
            </div>
            <div className={styles.groupTitle}>
              AIRCRAFT <span>03 + 01 reserve</span>
            </div>
            {FLEET.map((item, i) => (
              <button
                className={styles.aircraft}
                key={item.id}
                type="button"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                <span
                  className={styles.aircraftSymbol}
                  style={{ color: item.color }}
                >
                  <svg
                    viewBox="0 0 32 32"
                    width="24"
                    height="24"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 10l12 12M22 10L10 22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <rect
                      x="12"
                      y="12"
                      width="8"
                      height="8"
                      rx="2"
                      fill="currentColor"
                      fillOpacity=".25"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <g fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="8" cy="8" r="5" />
                      <circle cx="24" cy="8" r="5" />
                      <circle cx="8" cy="24" r="5" />
                      <circle cx="24" cy="24" r="5" />
                    </g>
                  </svg>
                </span>
                <span>
                  <strong>
                    {item.id}
                    <small>{item.provider}</small>
                  </strong>
                  <em>
                    {stage < 2 || i >= story.assigned
                      ? "Ready"
                      : stage === 4
                        ? "Complete"
                        : i === selected
                          ? "Active view"
                          : "On mission"}
                  </em>
                </span>
                <span className={styles.battery}>
                  {item.battery - (stage >= 2 && i < story.assigned ? 13 : 0)}
                  <small>%</small>
                </span>
              </button>
            ))}
            <div className={styles.reserve}>
              <span />
              B-16
              <span>{stage === 3 ? "Handover ready" : "Held in reserve"}</span>
            </div>
            <div className={styles.readiness}>
              <div>
                <Wind size={14} />
                <strong>
                  {stage === 3 && story.id === "inspection" ? "18" : "08"}
                  <small>kt NE</small>
                </strong>
                <span>Mission conditions</span>
              </div>
              <p>
                Airspace review <span>Operator checked</span>
              </p>
              <p>
                Dock availability <span>02 ready</span>
              </p>
              <p>
                Source status <span>Preview data</span>
              </p>
            </div>
          </aside>
          <div className={styles.map}>
            <MissionMap
              activeAircraftCount={story.assigned}
              motionDurationMs={200}
              chapter={stage}
              progress={progress}
              selected={selected}
              onSelect={setSelected}
              layer={layer}
              zoom={zoom}
              playing={running && visible}
            />
            {view === "scene" && (
              <div className={styles.sceneView}>
                <SensorViewport
                  aircraft={aircraft.id}
                  moving={running && visible}
                  hasViewSwitcher
                />
              </div>
            )}
            <div
              className={styles.viewControls}
              role="group"
              aria-label="Workspace view"
            >
              <button
                type="button"
                aria-pressed={view === "map"}
                onClick={() => setView("map")}
              >
                <Layers size={12} />
                Operations map
              </button>
              <button
                type="button"
                aria-pressed={view === "scene"}
                onClick={() => setView("scene")}
              >
                <Radio size={12} />
                Scene view
              </button>
            </div>
            {view === "map" && (
              <>
                <div className={styles.north}>N ↑</div>
                <div className={styles.mapTools}>
                  <button
                    type="button"
                    aria-label="Zoom operations map"
                    onClick={() => setZoom((z) => (z >= 1.6 ? 1 : z + 0.2))}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    aria-label="Reset operations map"
                    onClick={() => setZoom(1)}
                  >
                    <Crosshair size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Toggle airspace overlay"
                    aria-pressed={layer === "airspace"}
                    onClick={() =>
                      setLayer(layer === "airspace" ? "operations" : "airspace")
                    }
                  >
                    <ShieldCheck size={13} />
                  </button>
                </div>
                <div className={styles.sensorTile}>
                  <SensorViewport
                    aircraft={aircraft.id}
                    moving={running && visible}
                    compact
                  />
                  <div>
                    <strong>{aircraft.id}</strong>
                    <span>{aircraft.payload}</span>
                    <button type="button" onClick={() => setView("scene")}>
                      Open scene <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
                {stage === 0 && (
                  <div className={styles.objective}>
                    <MapPin size={16} />
                    <div>
                      {story.objective}
                      <span>{story.scope}</span>
                    </div>
                  </div>
                )}
                {stage === 3 && (
                  <div className={styles.alert}>
                    <Wind size={14} />
                    <div>
                      Mission change detected<span>{story.change}</span>
                    </div>
                  </div>
                )}
                {stage === 4 && (
                  <div className={styles.complete}>
                    <Check size={18} />
                    <div>
                      Mission record ready
                      <span>{story.output} + decision history</span>
                    </div>
                  </div>
                )}
              </>
            )}
            <div className={styles.mapAttribution}>
              <span>USGS / NAIP · illustrative mission overlays</span>
              <span>ALAMEDA, CA</span>
            </div>
          </div>
          <aside className={styles.intelligence}>
            <div className={styles.assistantTitle}>
              <span>✳</span>
              <div>
                Aeros Intelligence<small>Mission orchestration</small>
              </div>
              <i />
            </div>
            <div className={styles.conversation}>
              <div className={styles.messageLabel}>
                MISSION REQUEST <span>Operator</span>
              </div>
              <p className={styles.request}>{customPrompt ?? story.prompt}</p>
              <div
                aria-live={running ? "off" : "polite"}
                className={styles.response}
                key={`${story.id}-${stage}`}
              >
                <div className={styles.messageLabel}>
                  <span>✳ AEROS</span>
                  <span>{MISSION_STAGES[stage]}</span>
                </div>
                <p>{response}</p>
              </div>
              <div className={styles.plan}>
                <div>
                  <ShieldCheck size={13} />
                  <strong>
                    {stage === 0
                      ? "Preparing the operation"
                      : stage === 1
                        ? "Plan ready for review"
                        : stage === 2
                          ? "Coordinated execution"
                          : stage === 3
                            ? "Coverage continuity"
                            : "Operation debrief"}
                  </strong>
                </div>
                <ul>
                  {(stage === 4 ? story.stats : story.updates).map(
                    (item, i) => (
                      <li key={item}>
                        {stage === 0 && i === 2 ? (
                          <span className={styles.pending} />
                        ) : (
                          <Check size={11} />
                        )}{" "}
                        {item}
                      </li>
                    )
                  )}
                </ul>
                {stage < 4 ? (
                  <button type="button" onClick={() => goToStage(stage + 1)}>
                    {
                      [
                        "Review mission plan",
                        "Approve preview dispatch",
                        "Explore mission change",
                        "Approve preview handover",
                      ][stage]
                    }
                    <ArrowRight size={12} />
                  </button>
                ) : (
                  <button type="button" onClick={exportRecord}>
                    {exported
                      ? "Sample mission record downloaded"
                      : "Export sample mission record"}{" "}
                    <FileText size={11} />
                  </button>
                )}
              </div>
              {notice && (
                <p className={styles.previewNotice} role="status">
                  {notice}
                </p>
              )}
              <div className={styles.evidence}>
                <FileText size={10} />
                Mission context <span>Fleet state · operating policy</span>
              </div>
            </div>
            <form
              className={styles.composer}
              onSubmit={(event) => {
                event.preventDefault();
                if (!draft.trim()) {
                  return;
                }
                setCustomPrompt(draft.trim());
                setDraft("");
                goToStage(1);
                setNotice(
                  `Showing the scripted ${story.label.toLowerCase()} plan with your mission text. No live AI or aircraft are connected.`
                );
              }}
            >
              <label
                className={styles.srOnly}
                htmlFor={`aeros-task-${instanceId}`}
              >
                Describe a mission for the workspace preview
              </label>
              <input
                id={`aeros-task-${instanceId}`}
                value={draft}
                maxLength={1000}
                placeholder="Describe your next mission…"
                onFocus={() => setPlaying(false)}
                onChange={(event) => setDraft(event.target.value)}
              />
              <button
                type="submit"
                aria-label="Preview mission request"
                disabled={!draft.trim()}
              >
                <ArrowRight size={13} />
              </button>
            </form>
            <div className={styles.authority}>
              <ShieldCheck size={11} />
              AI plans. Your team authorizes.
            </div>
          </aside>
        </div>
        <div className={styles.timeline}>
          <span>
            <i />
            {story.code}
          </span>
          <div>
            {MISSION_STAGES.map((name, i) => (
              <button
                key={name}
                type="button"
                aria-current={i === stage ? "step" : undefined}
                onClick={() => goToStage(i)}
              >
                {i < stage ? <Check size={10} /> : <span>0{i + 1}</span>}
                {name}
              </button>
            ))}
          </div>
          <span>MISSION PREVIEW</span>
        </div>
      </div>
      <div className={styles.transport}>
        <button
          type="button"
          aria-label={
            running ? "Pause mission preview" : "Play mission preview"
          }
          onClick={() => {
            if (progress >= 100) {
              setProgress(0);
            }
            setPlaying(!running);
          }}
        >
          {running ? <Pause size={13} /> : <Play size={13} />}
        </button>
        <label>
          <span className={styles.srOnly}>Mission preview progress</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => {
              setPlaying(false);
              setProgress(Number(e.target.value));
            }}
          />
        </label>
        <span>{String(Math.floor(progress * 0.4)).padStart(2, "0")} / 40s</span>
        <button
          type="button"
          aria-label="Restart mission preview"
          onClick={() => {
            setProgress(0);
            setPlaying(false);
          }}
        >
          <RotateCcw size={12} />
        </button>
      </div>
      <div className={styles.caption}>
        <span>
          Interactive product simulation. No live aircraft, sensors, or AI
          services connected.
        </span>
        <span>EXPLORE THE MISSION ↗</span>
      </div>
    </div>
  );
}
