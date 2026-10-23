import { useEffect, useRef, useState } from "react";
import { MissionControl } from "./MissionControl";
import styles from "./DesktopPreview.module.css";

/**
 * @cc [owner:saharshbaweja,label:react;product] stable-desktop-canvas
 * The embedded application MUST retain a 1200px desktop layout. Chapter changes MUST NOT alter its outer dimensions.
 */
export function DesktopPreview({
  initialChapter = 1,
}: {
  initialChapter?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={styles.viewport}>
      <div
        className={styles.canvas}
        style={{ transform: `scale(${width / 1200})` }}
      >
        <MissionControl autoPlay={false} initialChapter={initialChapter} />
      </div>
    </div>
  );
}
