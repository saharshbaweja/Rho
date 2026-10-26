import { Crosshair, Layers, Radio } from "lucide-react";
import { useState } from "react";
import styles from "./SensorViewport.module.css";

/**
 * @cc [owner:saharshbaweja,label:product] sensor-is-illustrative
 * Sensor imagery and thermal coloring MUST remain labeled as simulated; controls MUST NOT call a live sensor service.
 */
export function SensorViewport({
  aircraft = "A-04",
  moving = false,
  compact = false,
  hasViewSwitcher = false,
}: {
  aircraft?: string;
  moving?: boolean;
  compact?: boolean;
  hasViewSwitcher?: boolean;
}) {
  const [thermal, setThermal] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  return (
    <div
      className={`${styles.sensor} ${compact ? styles.compact : ""}`}
      data-thermal={thermal}
      data-moving={moving}
      data-zoom={zoomed}
      data-toolbar-offset={hasViewSwitcher}
    >
      <div className={styles.imagery}>
        <img
          src="/static/landing/drone/alameda-aerial.jpg"
          alt="USGS aerial imagery used in an illustrative aircraft sensor view"
          loading="lazy"
        />
        <div className={styles.heat} />
      </div>
      <div className={styles.shade} />
      <div className={styles.top}>
        <span>
          <Radio size={10} /> {aircraft} / {thermal ? "THERMAL" : "EO"}
        </span>
        <span>SIMULATED FEED</span>
      </div>
      <div className={styles.horizon} aria-hidden="true">
        <i />
        <span>000</span>
        <i />
        <span>030</span>
        <i />
        <span>060</span>
        <i />
      </div>
      <div className={styles.reticle} aria-hidden="true">
        <Crosshair size={38} strokeWidth={0.65} />
        <span>MISSION AREA</span>
      </div>
      <div className={styles.altitude} aria-hidden="true">
        <span>ALT</span>
        <strong>45.2</strong>
        <small>m AGL</small>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          aria-label="Toggle illustrative thermal view"
          aria-pressed={thermal}
          onClick={() => setThermal(!thermal)}
        >
          <Layers size={11} />
          {thermal ? "THERMAL" : "EO / IR"}
        </button>
        <button
          type="button"
          aria-label="Toggle sensor zoom"
          aria-pressed={zoomed}
          onClick={() => setZoomed(!zoomed)}
        >
          {zoomed ? "4×" : "2×"}
        </button>
      </div>
      <div className={styles.bottom}>
        <span>37.78° N · 122.31° W</span>
        <span>USGS / NAIP</span>
      </div>
    </div>
  );
}
