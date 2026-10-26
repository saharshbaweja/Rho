import { Maximize2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./FeatureFilm.module.css";
export type FilmKind = "mission-story" | "fleet-readiness" | "mission-recovery";
const TITLES: Record<FilmKind, string> = {
  "mission-story": "From mission request to completed work",
  "fleet-readiness": "Fleet readiness and coordinated dispatch",
  "mission-recovery": "Exception handling and operator-led recovery",
};
export function FeatureFilm({
  film = "mission-story",
  className = "",
}: {
  film?: FilmKind;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manualPauseRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [unavailable, setUnavailable] = useState(false);
  const title = TITLES[film];
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (Number.isFinite(video.duration)) {
      setDuration(video.duration);
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some((entry) => entry.isIntersecting) &&
          !reduced.matches &&
          !manualPauseRef.current
        ) {
          void video.play().catch(() => setPlaying(false));
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    const onChange = () => {
      if (reduced.matches) {
        video.pause();
      }
    };
    reduced.addEventListener("change", onChange);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", onChange);
    };
  }, [film]);
  return (
    <div className={`${styles.film} ${className}`} aria-label={title}>
      <video
        ref={videoRef}
        key={film}
        muted
        loop
        playsInline
        preload="metadata"
        poster={`/static/landing/drone/films/${film}.jpg`}
        aria-label={title}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onError={() => setUnavailable(true)}
      >
        <source
          src={`/static/landing/drone/films/${film}.mp4`}
          type="video/mp4"
        />
        <track
          kind="captions"
          src={`/static/landing/drone/films/${film}.vtt`}
          srcLang="en"
          label="English"
        />
      </video>
      <div className={styles.controls}>
        <button
          type="button"
          aria-label={playing ? `Pause ${title}` : `Play ${title}`}
          onClick={() => {
            const video = videoRef.current;
            if (!video) {
              return;
            }
            if (playing) {
              manualPauseRef.current = true;
              video.pause();
            } else {
              manualPauseRef.current = false;
              void video.play().catch(() => setUnavailable(true));
            }
          }}
        >
          {playing ? <Pause size={11} /> : <Play size={11} />}
        </button>
        <span>{title}</span>
        <span className={styles.time}>
          {String(Math.floor(time)).padStart(2, "0")} /{" "}
          {String(Math.floor(duration)).padStart(2, "0")}s
        </span>
        <button
          type="button"
          aria-label={`Expand ${title}`}
          onClick={() => {
            void videoRef.current?.requestFullscreen().catch(() => {});
          }}
        >
          <Maximize2 size={12} />
        </button>
        <input
          aria-label={`Playback position for ${title}`}
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={time}
          onChange={(event) => {
            const video = videoRef.current;
            if (video) {
              video.currentTime = Number(event.target.value);
              manualPauseRef.current = true;
              video.pause();
            }
          }}
        />
      </div>
      {unavailable && (
        <a className={styles.fallback} href="/home#mission-control">
          Explore the interactive mission demo →
        </a>
      )}
    </div>
  );
}
