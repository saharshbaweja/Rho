import {
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  CloudSun,
  Crosshair,
  Download,
  FileText,
  Layers,
  MapPin,
  Maximize2,
  Minus,
  Pause,
  Play,
  Plus,
  Radio,
  RotateCcw,
  Shield,
  Wind,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { CHAPTERS, EXAMPLE_REQUEST, FLEET, TOUR_DURATION_MS } from "./scenario";
import { MissionMap } from "./MissionMap";
import styles from "./MissionControl.module.css";

const RESPONSES = [
  "I’ll scope the inspection, check your available fleet, and build a plan for your review.",
  "120 assets mapped. Three aircraft match the payload and readiness requirements. I’ve split the district into six missions.",
  "Dispatch approved. Assignments have been sent to both connected providers. I’m tracking coverage and mission status.",
  "Wind has increased in Sector 02. Two assignments are affected. I can reroute A-08 and transfer the remaining work to B-16.",
  "Inspection complete. All 120 assets are covered. Seven observations need review. Your coverage report and decision history are ready.",
];

/**
 * @cc [owner:saharshbaweja,label:product] presentation-is-simulated
 * The guided tour MUST be labeled as simulated. Playback and command entry MUST NOT call aircraft, weather, airspace, or LLM services.
 */
export function MissionControl({
  compact = false,
  autoPlay = true,
  initialChapter = 0,
  expanded = false,
}: {
  compact?: boolean;
  autoPlay?: boolean;
  initialChapter?: number;
  expanded?: boolean;
}) {
  const instanceId = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [progress, setProgress] = useState(initialChapter * 20 + 1);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [layer, setLayer] = useState("operations");
  const [zoom, setZoom] = useState(1);
  const [prompt, setPrompt] = useState(EXAMPLE_REQUEST);
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("");
  const chapter = Math.min(4, Math.floor(progress / 20));
  const current = CHAPTERS[chapter];
  const drone = FLEET[selected];
  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (autoPlay && !reduced.matches) {
      setPlaying(true);
    }
    const onMotionChange = () => {
      if (reduced.matches) {
        setPlaying(false);
      }
    };
    reduced.addEventListener("change", onMotionChange);
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.15 }
    );
    observer.observe(host);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", onMotionChange);
    };
  }, [autoPlay]);
  useEffect(() => {
    if (!playing || !visible) {
      return;
    }
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") {
        return;
      }
      setProgress((value) => Math.min(100, value + 10000 / TOUR_DURATION_MS));
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing, visible]);
  const running = playing && progress < 100;
  function selectChapter(value: number) {
    setProgress(value * 20 + 1);
    setNotice("");
  }
  function downloadReport() {
    const report = new Blob(
      [
        JSON.stringify(
          {
            simulation: true,
            mission: prompt,
            coverage: "120 / 120 assets",
            observations: 7,
            providers: 2,
            recovery:
              "Sector 02 reassigned to B-16 following simulated operator approval",
            output: "Illustrative report only",
          },
          null,
          2
        ),
      ],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(report);
    const link = document.createElement("a");
    link.href = url;
    link.download = "aeros-mission-preview.json";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Sample mission report downloaded.");
  }
  return (
    <div
      ref={hostRef}
      className={`${styles.host} ${compact ? styles.compact : ""} ${expanded ? styles.expanded : ""}`}
    >
      <div className={styles.console} data-chapter={chapter}>
        <div className={styles.macChrome}>
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>Aeros · Mission Control</span>
          <span>North district workspace</span>
        </div>
        <header className={styles.topbar}>
          <div className={styles.brand}>
            <img
              className={styles.brandmark}
              src="/static/aeros-logo-white.svg"
              alt=""
            />
            <strong>aeros</strong>
            <span className={styles.divider} />
            <span>Operations</span>
            <ChevronDown size={11} />
          </div>
          <div className={styles.workspace}>
            <span className={styles.statusDot} />
            North district
            <span className={styles.workspaceMeta}>/ 06 missions</span>
          </div>
          <div className={styles.topActions}>
            <span className={styles.simulation}>PRODUCT SIMULATION</span>
            <span className={styles.avatar}>OP</span>
          </div>
        </header>
        <div className={styles.body}>
          <aside className={styles.rail} aria-label="Preview views">
            {[
              { icon: Layers, label: "Fleet overview", value: 0 },
              { icon: Radio, label: "Mission execution", value: 2 },
              { icon: Shield, label: "Recovery workflow", value: 3 },
              { icon: FileText, label: "Mission results", value: 4 },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                aria-label={item.label}
                title={item.label}
                className={chapter === item.value ? styles.railActive : ""}
                onClick={() => {
                  setPlaying(false);
                  selectChapter(item.value);
                }}
              >
                <item.icon size={16} strokeWidth={1.5} />
              </button>
            ))}
            <span className={styles.railBottom}>
              <span className={styles.statusDot} />
            </span>
          </aside>
          <aside className={styles.fleetPanel}>
            <div className={styles.panelHeading}>
              <span>CONNECTED FLEET</span>
              <span className={styles.count}>04</span>
            </div>
            <div className={styles.fleetSummary}>
              <strong>{chapter >= 2 ? "03" : "04"}</strong>
              <span>
                {chapter >= 2 ? "aircraft assigned" : "aircraft available"}
                <small>Across 2 providers</small>
              </span>
            </div>
            <div className={styles.fleetGroup}>
              FLEET ALPHA <span>02</span>
            </div>
            {FLEET.map((item, i) => (
              <button
                type="button"
                className={`${styles.fleetItem} ${selected === i ? styles.fleetSelected : ""}`}
                key={item.id}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                <span
                  className={styles.aircraftIcon}
                  style={{ color: item.color }}
                >
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path
                      d="M9 9l14 14M23 9L9 23M9 9H4V4h5v5Zm14 0h5V4h-5v5ZM9 23H4v5h5v-5Zm14 0h5v5h-5v-5Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path d="M12 12h8v8h-8z" fill="currentColor" opacity=".5" />
                  </svg>
                </span>
                <span>
                  <strong>{item.id}</strong>
                  <small>
                    {chapter >= 2 && chapter < 4
                      ? "On mission"
                      : chapter === 4
                        ? "Complete"
                        : "Ready to deploy"}
                  </small>
                </span>
                <span className={styles.fleetBattery}>
                  {item.battery - (chapter >= 2 ? 17 : 0)}
                  <small>%</small>
                </span>
              </button>
            ))}
            <div className={styles.fleetGroup}>
              RESERVE CAPACITY <span>01</span>
            </div>
            <div className={styles.reserve}>
              <span className={styles.reserveDot} />
              <span>
                B-16{" "}
                <small>
                  {chapter === 3 ? "Recovery candidate" : "Standby · 98%"}
                </small>
              </span>
              <Check size={12} />
            </div>
            <div className={styles.conditions}>
              <div>
                <CloudSun size={18} strokeWidth={1.2} />
                <strong>
                  18°<small>Operating conditions</small>
                </strong>
              </div>
              <p>
                <Wind size={12} />
                {chapter === 3 ? "18 kt NE" : "08 kt NE"}{" "}
                <span>Visibility 10 km</span>
              </p>
              <div className={styles.conditionLine}>
                <span>Airspace review</span>
                <span className={styles.positive}>Clear</span>
              </div>
              <div className={styles.conditionLine}>
                <span>Launch sites</span>
                <span>02 ready</span>
              </div>
            </div>
          </aside>
          <div className={styles.mapPanel}>
            <MissionMap
              chapter={chapter}
              progress={progress}
              selected={selected}
              onSelect={setSelected}
              layer={layer}
              zoom={zoom}
              playing={running}
            />
            <div className={styles.mapTop}>
              <span className={styles.mapBreadcrumb}>
                NORTH DISTRICT <span>/</span> INSPECTION
              </span>
              <span className={styles.mapNorth}>N ↑</span>
            </div>
            <div className={styles.mapLayers} aria-label="Map layers">
              {["operations", "airspace", "weather"].map((value) => (
                <button
                  type="button"
                  key={value}
                  aria-pressed={layer === value}
                  onClick={() => setLayer(value)}
                >
                  {value === "operations" ? (
                    <Layers size={11} />
                  ) : value === "airspace" ? (
                    <Shield size={11} />
                  ) : (
                    <Wind size={11} />
                  )}
                  <span>{value}</span>
                </button>
              ))}
            </div>
            <div className={styles.mapTools}>
              <button
                type="button"
                aria-label="Zoom in"
                disabled={zoom >= 1.6}
                onClick={() => setZoom((value) => Math.min(1.6, value + 0.2))}
              >
                <Plus size={14} />
              </button>
              <button
                type="button"
                aria-label="Zoom out"
                disabled={zoom <= 0.8}
                onClick={() => setZoom((value) => Math.max(0.8, value - 0.2))}
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                aria-label="Reset map view"
                onClick={() => setZoom(1)}
              >
                <Crosshair size={14} />
              </button>
            </div>
            {chapter === 0 && (
              <div className={styles.objectiveMarker}>
                <span className={styles.targetRing} />
                <MapPin size={16} />
                <span>
                  North district<strong>120 inspection assets</strong>
                </span>
              </div>
            )}
            {chapter >= 1 && (
              <div className={styles.aircraftDetail} key={drone.id}>
                <div>
                  <span className={styles.statusDot} />
                  <strong>{drone.id}</strong>
                  <span>{drone.provider}</span>
                  <ArrowUpRight size={12} />
                </div>
                <dl>
                  <div>
                    <dt>ALTITUDE</dt>
                    <dd>
                      {chapter >= 2 ? "32.4" : "0.0"}
                      <small> m</small>
                    </dd>
                  </div>
                  <div>
                    <dt>GROUND SPEED</dt>
                    <dd>
                      {chapter >= 2 ? "8.2" : "0.0"}
                      <small> m/s</small>
                    </dd>
                  </div>
                  <div>
                    <dt>BATTERY</dt>
                    <dd>
                      {drone.battery - (chapter >= 2 ? 17 : 0)}
                      <small> %</small>
                    </dd>
                  </div>
                </dl>
                <div className={styles.signal}>
                  <span>LINK QUALITY</span>
                  <div>
                    {Array.from({ length: 20 }, (_, i) => (
                      <i key={i} style={{ height: 4 + ((i * 7) % 15) }} />
                    ))}
                  </div>
                  <strong>98%</strong>
                </div>
              </div>
            )}
            {chapter === 3 && (
              <div className={styles.mapAlert}>
                <span className={styles.amberDot} />
                <span>
                  Wind shift in Sector 02
                  <strong>2 assignments affected · recovery available</strong>
                </span>
              </div>
            )}
            {chapter === 4 && (
              <div className={styles.completeBadge}>
                <Check size={18} />
                <span>
                  120 / 120<strong>Assets covered</strong>
                </span>
                <span className={styles.completeFindings}>
                  07<small>To review</small>
                </span>
              </div>
            )}
            <div className={styles.mapFoot}>
              <span>USGS / NAIP · DEMONSTRATION OVERLAYS</span>
              <span>ALAMEDA, CA</span>
            </div>
          </div>
          <aside className={styles.intelligence}>
            <div className={styles.assistantHeading}>
              <span className={styles.assistantSymbol}>✳</span>
              <span>
                Aeros Intelligence<small>Mission orchestration</small>
              </span>
              <span className={styles.assistantPresence} />
            </div>
            <div className={styles.conversation}>
              <div className={styles.messageMeta}>
                <span>YOU</span>
                <span>17:42</span>
              </div>
              <div className={styles.userMessage}>
                {chapter === 0 && running
                  ? prompt.slice(
                      0,
                      Math.max(1, Math.floor((progress / 13) * prompt.length))
                    )
                  : prompt}
                <span
                  className={
                    chapter === 0 && running
                      ? styles.typingCaret
                      : styles.hidden
                  }
                />
              </div>
              <div className={styles.assistantMessage} key={chapter}>
                <div className={styles.messageMeta}>
                  <span>
                    <span className={styles.assistantSymbol}>✳</span> AEROS
                  </span>
                  <span>{chapter === 0 ? "Planning…" : "Just now"}</span>
                </div>
                <p>{RESPONSES[chapter]}</p>
                {chapter === 0 && (
                  <div className={styles.reasoning}>
                    <span className={styles.reasoningLine} />
                    <span>Understanding mission scope</span>
                    <span className={styles.reasoningDots}>•••</span>
                  </div>
                )}
                {chapter === 1 && (
                  <div className={styles.planCard}>
                    <div>
                      <strong>North district inspection</strong>
                      <span>READY FOR REVIEW</span>
                    </div>
                    <dl>
                      <div>
                        <dt>Assets</dt>
                        <dd>120</dd>
                      </div>
                      <div>
                        <dt>Aircraft</dt>
                        <dd>03</dd>
                      </div>
                      <div>
                        <dt>Window</dt>
                        <dd>42 min</dd>
                      </div>
                    </dl>
                    <ul>
                      {[
                        "Thermal + RGB payload matched",
                        "Battery and dock readiness verified",
                        "Weather and airspace reviewed",
                      ].map((text) => (
                        <li key={text}>
                          <Check size={11} />
                          {text}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        setPlaying(false);
                        selectChapter(2);
                      }}
                    >
                      Approve simulated dispatch <ArrowUpRight size={12} />
                    </button>
                  </div>
                )}
                {chapter === 2 && (
                  <div className={styles.executionCard}>
                    <div>
                      <span className={styles.statusDot} />3 aircraft executing
                      <span>17:43:08</span>
                    </div>
                    <div className={styles.coverageTrack}>
                      <i
                        style={{
                          width: `${Math.min(84, 25 + (progress - 40) * 3)}%`,
                        }}
                      />
                    </div>
                    <p>
                      Coverage{" "}
                      <strong>
                        {Math.round(30 + (progress - 40) * 3)} / 120 assets
                      </strong>
                    </p>
                    <div className={styles.eventLine}>
                      <Check size={11} />
                      <span>Operator approval recorded</span>
                    </div>
                    <div className={styles.eventLine}>
                      <Check size={11} />
                      <span>Provider assignments acknowledged</span>
                    </div>
                  </div>
                )}
                {chapter === 3 && (
                  <div className={styles.recoveryCard}>
                    <div>
                      <span className={styles.amberDot} />
                      <strong>Recovery proposal</strong>
                      <span>01</span>
                    </div>
                    <p>
                      Reassign remaining assets to B-16. Preserve the mission
                      boundary.
                    </p>
                    <dl>
                      <div>
                        <dt>Coverage</dt>
                        <dd>Maintained</dd>
                      </div>
                      <div>
                        <dt>Completion</dt>
                        <dd>+8 min</dd>
                      </div>
                    </dl>
                    <button
                      type="button"
                      onClick={() => {
                        setPlaying(false);
                        selectChapter(4);
                      }}
                    >
                      Approve simulated recovery <ArrowUpRight size={12} />
                    </button>
                  </div>
                )}
                {chapter === 4 && (
                  <div className={styles.reportCard}>
                    <FileText size={24} strokeWidth={1.3} />
                    <strong>North district · inspection report</strong>
                    <span>Coverage, findings & decision history</span>
                    <div>
                      <span>120 / 120 covered</span>
                      <span>7 observations</span>
                    </div>
                    <button type="button" onClick={downloadReport}>
                      Download sample report <Download size={12} />
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.contextChips}>
                <span>
                  <Shield size={10} />
                  Operating policy
                </span>
                <span>
                  <Layers size={10} />2 fleet providers
                </span>
              </div>
            </div>
            <form
              className={styles.commandComposer}
              onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim()) {
                  return;
                }
                setPrompt(draft.trim());
                setDraft("");
                setPlaying(false);
                selectChapter(1);
                setNotice(
                  "Showing the scripted inspection plan with your mission text. No live AI or aircraft are connected."
                );
              }}
            >
              <label
                className={styles.srOnly}
                htmlFor={`mission-command-${instanceId}`}
              >
                Describe a mission for the preview
              </label>
              <input
                id={`mission-command-${instanceId}`}
                value={draft}
                onFocus={() => setPlaying(false)}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Describe your next mission…"
                maxLength={1000}
              />
              <button
                type="submit"
                aria-label="Preview mission plan"
                disabled={!draft.trim()}
              >
                <ArrowUp size={15} />
              </button>
            </form>
            <div className={styles.assistantFoot}>
              AI plans. Operators authorize.
            </div>
          </aside>
        </div>
        <div className={styles.missionStrip}>
          <div className={styles.stripLabel}>
            <span className={styles.statusDot} />
            <strong>ND-0120</strong>
            <span>North district inspection</span>
          </div>
          <div className={styles.stripStages}>
            {CHAPTERS.map((item, i) => (
              <span
                className={i <= chapter ? styles.stripDone : ""}
                key={item.label}
              >
                {i < chapter ? <Check size={9} /> : <i />}
                {item.label}
              </span>
            ))}
          </div>
          <span className={styles.stripTime}>
            {chapter === 4
              ? "00:42:18"
              : "00:0" +
                Math.min(9, Math.floor(progress / 10)) +
                ":" +
                String(Math.floor(progress * 1.7) % 60).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className={styles.transport}>
        <button
          className={styles.playButton}
          type="button"
          aria-label={
            running
              ? "Pause product tour"
              : progress >= 100
                ? "Replay product tour"
                : "Play product tour"
          }
          onClick={() => {
            if (progress >= 100) {
              setProgress(1);
            }
            setPlaying(!running);
          }}
        >
          {running ? (
            <Pause size={13} fill="currentColor" />
          ) : (
            <Play size={13} fill="currentColor" />
          )}
        </button>
        <div className={styles.chapterTabs} aria-label="Product tour chapters">
          {CHAPTERS.map((item, i) => (
            <button
              type="button"
              key={item.label}
              aria-current={chapter === i ? "step" : undefined}
              onClick={() => {
                setPlaying(false);
                selectChapter(i);
              }}
            >
              <span>0{i + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className={styles.transportEnd}>
          <span>
            {String(Math.floor(progress * 0.35)).padStart(2, "0")} / 35s
          </span>
          <button
            type="button"
            aria-label="Restart tour"
            onClick={() => {
              setProgress(1);
              setPlaying(true);
            }}
          >
            <RotateCcw size={13} />
          </button>
          {!expanded && (
            <button
              type="button"
              aria-label="Expand mission control"
              onClick={() => {
                setPlaying(false);
                dialogRef.current?.showModal();
              }}
            >
              <Maximize2 size={13} />
            </button>
          )}
        </div>
        <label
          className={styles.srOnly}
          htmlFor={`tour-progress-${instanceId}`}
        >
          Product tour progress
        </label>
        <input
          id={`tour-progress-${instanceId}`}
          className={styles.scrubber}
          aria-valuetext={current.label}
          type="range"
          min="0"
          max="100"
          step=".1"
          value={progress}
          onChange={(e) => {
            setPlaying(false);
            setProgress(Number(e.target.value));
          }}
          style={{
            background: `linear-gradient(to right, #64a9c4 ${progress}%, #dfe7ea ${progress}%)`,
          }}
        />
      </div>
      <div className={styles.tourCaption}>
        <span>
          <i />
          Scripted product preview · no live aircraft connected
        </span>
        <span>INTERACTIVE / EXPLORE THE WORKFLOW</span>
      </div>
      {notice && (
        <p className={styles.notice} role="status">
          {notice}
        </p>
      )}
      {!expanded && (
        <dialog
          ref={dialogRef}
          className={styles.dialog}
          aria-label="Expanded Aeros mission control"
        >
          <button
            className={styles.dialogClose}
            type="button"
            aria-label="Close expanded mission control"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={18} />
          </button>
          <MissionControl
            key={chapter}
            initialChapter={chapter}
            autoPlay={false}
            expanded
          />
        </dialog>
      )}
    </div>
  );
}
