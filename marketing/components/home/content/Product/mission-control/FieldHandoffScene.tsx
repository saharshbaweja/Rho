import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  MapPin,
  Radio,
  ShieldCheck,
  Signal,
  Users,
} from "lucide-react";
import { useState } from "react";
import { MISSION_STORIES } from "./missionStories";
import { SensorViewport } from "./SensorViewport";
import styles from "./FieldHandoffScene.module.css";

/**
 * @cc [owner:saharshbaweja,label:product] field-handoff-preview
 * The portrait handoff MUST stay a 4:5 illustrative preview. Its update control MUST only change local preview state, never share real mission data.
 */
export function FieldHandoffScene({
  scenario = "response",
}: { scenario?: "response" | "search" } = {}) {
  const story = MISSION_STORIES[scenario === "search" ? 2 : 0];
  const [acknowledged, setAcknowledged] = useState(false);
  return (
    <div
      className={styles.scene}
      aria-label="Illustrative desktop-to-field mission handoff"
    >
      <div className={styles.intro}>
        <span>ONE SHARED OPERATING PICTURE</span>
        <h3>
          From mission control.
          <br />
          To the team on scene.
        </h3>
      </div>
      <div className={styles.desktop}>
        <div className={styles.chrome}>
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>aeros / Team workspace</span>
        </div>
        <div className={styles.desktopBody}>
          <div className={styles.label}>MISSION / {story.code}</div>
          <strong>{story.title}</strong>
          <div className={styles.map}>
            <img
              src="/static/landing/drone/alameda-aerial.jpg"
              alt="Illustrative shared mission map"
              loading="lazy"
            />
            <svg viewBox="0 0 300 170" aria-hidden="true">
              <path
                d="M40 140L100 110L130 55L230 40"
                fill="none"
                stroke="#bddbc8"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle cx="130" cy="55" r="9" stroke="#dcf4e1" fill="#25483a" />
              <path d="M126 57L130 50L134 57Z" fill="#dcf4e1" />
            </svg>
            <span>
              <Radio size={9} />
              A-04 · Scene view
            </span>
          </div>
          <div className={styles.team}>
            <Users size={11} />
            <span>Field team 02</span>
            <strong>
              {acknowledged ? "Acknowledged" : "Review requested"}
            </strong>
          </div>
        </div>
      </div>
      <svg
        className={styles.connection}
        viewBox="0 0 300 120"
        aria-hidden="true"
      >
        <path
          d="M0 25H70Q90 25 90 45V75Q90 95 110 95H280"
          fill="none"
          stroke="#a7c7b360"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
        <circle r="3" fill="#bdddc8">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M0 25H70Q90 25 90 45V75Q90 95 110 95H280"
          />
        </circle>
      </svg>
      <div className={styles.phone}>
        <div className={styles.phoneTop}>
          <span>09:41</span>
          <span className={styles.island} />
          <Signal size={10} />
        </div>
        <div className={styles.phoneNav}>
          <ChevronLeft size={12} />
          <strong>Mission brief</strong>
          <span>
            <ShieldCheck size={10} />
          </span>
        </div>
        <div className={styles.phoneFeed}>
          <SensorViewport aircraft="A-04" compact />
        </div>
        <div className={styles.phoneBody}>
          <div className={styles.label}>{story.code} / SCENE CONTEXT</div>
          <h4>{story.title}</h4>
          <p>
            <MapPin size={9} />
            {story.scope}
          </p>
          <div className={styles.message}>
            <span>✳</span>
            <div>
              <strong>
                {acknowledged
                  ? "Field update retained"
                  : "Your aerial context is ready"}
              </strong>
              <p>
                {acknowledged
                  ? "Team 02 has reviewed the scene. Your acknowledgement is attached to the mission."
                  : scenario === "search"
                    ? "A-04 has the priority sector in view. Search coverage and the latest operator notes travel with the mission."
                    : "A-04 has the pier in view. Aircraft status and the latest operator notes travel with the mission."}
              </p>
            </div>
          </div>
          <div className={styles.status}>
            <span>
              <i />
              A-04 on scene
            </span>
            <span>45 m AGL</span>
          </div>
          <button type="button" onClick={() => setAcknowledged(!acknowledged)}>
            {acknowledged ? (
              <>
                <Check size={11} />
                Update acknowledged
              </>
            ) : (
              <>
                Preview field acknowledgement
                <ArrowUpRight size={11} />
              </>
            )}
          </button>
          <small>Illustrative field view · no data is sent</small>
        </div>
        <div className={styles.homeIndicator} />
      </div>
      <div className={styles.caption}>
        <span>CONTEXT STAYS WITH THE MISSION</span>
        <span>DESKTOP ↔ FIELD</span>
      </div>
    </div>
  );
}
