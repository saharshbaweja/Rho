import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./LandingVideo.module.css";

interface LandingVideoProps {
  src: string;
  poster: string;
  title: string;
  description: string;
  autoPlay?: boolean;
  ambient?: boolean;
}
/**
 * @cc [owner:saharshbaweja,label:product;accessibility] recorded-video-playback
 * Recordings must retain their 16:9 frame. Standard players must offer native controls;
 * ambient films must offer an accessible play/pause button without a visible player frame. Automatic
 * playback must be muted, respect reduced motion, pause offscreen or in a hidden tab,
 * and preserve a visitor's manual pause. Media failure must expose a direct file link.
 */
export function LandingVideo({
  src,
  poster,
  title,
  description,
  autoPlay = false,
  ambient = false,
}: LandingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);
  const automaticPause = useRef(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const pause = () => {
      if (!video.paused) {
        automaticPause.current = true;
        video.pause();
      }
    };
    const syncPlayback = () => {
      if (!visible || document.visibilityState === "hidden") {
        pause();
        return;
      }
      if (autoPlay && !reduced.matches && !manualPause.current) {
        void video.play().catch(() => {
          /* The playback control remains available if autoplay is blocked. */
        });
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        syncPlayback();
      },
      { threshold: 0.2 }
    );
    const onMotion = () => {
      if (reduced.matches) {
        pause();
      } else {
        syncPlayback();
      }
    };
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    reduced.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reduced.removeEventListener("change", onMotion);
      pause();
    };
  }, [autoPlay, src]);
  return (
    <figure className={`${styles.figure} ${ambient ? styles.ambient : ""}`}>
      <div className={styles.frame}>
        <video
          ref={videoRef}
          controls={!ambient}
          muted
          playsInline
          loop={autoPlay}
          preload={autoPlay ? "metadata" : "none"}
          poster={poster}
          aria-label={title}
          onPlay={() => {
            setPlaying(true);
            manualPause.current = false;
            automaticPause.current = false;
          }}
          onPause={() => {
            setPlaying(false);
            if (automaticPause.current) {
              automaticPause.current = false;
            } else {
              manualPause.current = true;
            }
          }}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support embedded video.{" "}
          <a href={src}>Open {title}</a>.
        </video>
        {failed && (
          <a className={styles.fallback} href={src}>
            Open {title} video →
          </a>
        )}
      </div>
      {ambient && !failed && (
        <button
          type="button"
          className={styles.ambientControl}
          data-paused={!playing}
          aria-label={`${playing ? "Pause" : "Play"} ${title}`}
          onClick={() => {
            const video = videoRef.current;
            if (!video) {
              return;
            }
            if (playing) {
              video.pause();
            } else {
              void video.play().catch(() => setPlaying(false));
            }
          }}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      )}
      <figcaption className={ambient ? styles.hiddenCaption : undefined}>
        <span>{title}</span>
        <span>{description}</span>
      </figcaption>
    </figure>
  );
}
