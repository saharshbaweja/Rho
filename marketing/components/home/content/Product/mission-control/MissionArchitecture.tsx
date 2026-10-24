import {
  ArrowRight,
  Check,
  FileText,
  Layers,
  MapPin,
  Network,
  Shield,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import styles from "./MissionArchitecture.module.css";
const STEPS = [
  {
    name: "Mission input",
    detail:
      "A request, work order, or asset list defines the objective, operating area, and required outcome.",
  },
  {
    name: "Planning & readiness",
    detail:
      "Aeros brings fleet state, payload fit, site readiness, weather, and airspace constraints into the mission plan.",
  },
  {
    name: "Coordinated execution",
    detail:
      "Approved assignments pass through validated provider interfaces. Aeros monitors progress and proposes recovery when conditions change.",
  },
  {
    name: "Results & reporting",
    detail:
      "Coverage, findings, exceptions, and operator decisions return to your work-order and reporting workflow.",
  },
];
export function MissionArchitecture() {
  const [step, setStep] = useState(1);
  return (
    <div className={styles.architecture}>
      <div className={styles.topline}>
        <span>AEROS / SYSTEM OVERVIEW</span>
        <span>YOUR FLEET. YOUR OPERATION.</span>
      </div>
      <div className={styles.diagram}>
        <div className={styles.inputs}>
          <div className={styles.groupLabel}>MISSION DEMAND</div>
          {[
            {
              icon: Sparkles,
              title: "Natural language",
              subtitle: "Describe the outcome",
            },
            {
              icon: MapPin,
              title: "GIS & work orders",
              subtitle: "Assets, areas, priorities",
            },
          ].map((item) => (
            <div className={styles.node} key={item.title}>
              <item.icon size={18} strokeWidth={1.3} />
              <span>
                {item.title}
                <small>{item.subtitle}</small>
              </span>
              <ArrowRight size={12} />
            </div>
          ))}
        </div>
        <div className={styles.link}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.core}>
          <div className={styles.coreBrand}>
            <span>✳</span>
            <strong>aeros</strong>
            <span className={styles.coreTag}>ORCHESTRATION</span>
          </div>
          <p>Intent → mission plan → coordinated action</p>
          <div className={styles.coreSteps}>
            {[
              "Understand the objective",
              "Check fleet & constraints",
              "Assign and dispatch",
              "Monitor, recover, report",
            ].map((text, i) => (
              <div key={text} data-active={step === i}>
                <span>
                  {i < step ? (
                    <Check size={10} />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                {text}
                <i />
              </div>
            ))}
          </div>
          <div className={styles.oversight}>
            <Shield size={13} />
            <span>Operator authority</span>
            <strong>Always retained</strong>
          </div>
        </div>
        <div className={styles.link}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.providers}>
          <div className={styles.groupLabel}>EXISTING FLIGHT STACK</div>
          {[
            {
              icon: Layers,
              title: "Fleet providers",
              subtitle: "Aircraft, docks, payloads",
            },
            {
              icon: Network,
              title: "Mission execution",
              subtitle: "Validated provider interfaces",
            },
          ].map((item) => (
            <div className={styles.node} key={item.title}>
              <item.icon size={18} strokeWidth={1.3} />
              <span>
                {item.title}
                <small>{item.subtitle}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.resultLoop}>
        <span />
        <FileText size={13} />
        <strong>RESULTS BACK TO YOUR WORKFLOW</strong>
        <span />
        <span>Coverage · findings · decision history</span>
      </div>
      <div className={styles.tabs} aria-label="Explore Aeros architecture">
        {STEPS.map((item, i) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={step === i}
            onClick={() => setStep(i)}
          >
            <span>0{i + 1}</span>
            {item.name}
          </button>
        ))}
      </div>
      <p className={styles.detail} aria-live="polite">
        {STEPS[step].detail}
      </p>
    </div>
  );
}
