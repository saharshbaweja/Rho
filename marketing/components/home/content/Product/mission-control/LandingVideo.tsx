import { useEffect, useRef, useState } from "react";
import styles from "./LandingVideo.module.css";

interface LandingVideoProps {
  src: string;
  poster: string;
  title: string;
  description: string;
  autoPlay?: boolean;
}
/**
 * @cc [owner:saharshbaweja,label:product;accessibility] recorded-video-playback
 * Recordings must retain their full 16:9 frame and native playback controls. Automatic
 * playback must be muted, respect reduced motion, pause offscreen or in a hidden tab,
 * and preserve a visitor's manual pause. Media failure must expose a direct file link.
 */
export function LandingVideo({
  src,
  poster,
  title,
  description,
  autoPlay = false,
}: LandingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);
  const automaticPause = useRef(false);
  const [failed, setFailed] = useState(false);
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
          /* Native controls remain available if autoplay is blocked. */
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
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <video
          ref={videoRef}
          controls
          muted
          playsInline
          loop={autoPlay}
          preload={autoPlay ? "metadata" : "none"}
          poster={poster}
          aria-label={title}
          onPlay={() => {
            manualPause.current = false;
            automaticPause.current = false;
          }}
          onPause={() => {
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
      <figcaption>
        <span>{title}</span>
        <span>{description}</span>
      </figcaption>
    </figure>
  );
}
