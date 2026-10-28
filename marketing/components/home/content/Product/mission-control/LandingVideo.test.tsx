// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { LandingVideo } from "./LandingVideo";

let reportVisibility: ((visible: boolean) => void) | undefined;
let reducedMotion = false;
let mediaPlaying = false;
beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        reportVisibility = (visible) => callback([{ isIntersecting: visible }]);
      }
      observe() {}
      disconnect() {}
    }
  );
  vi.stubGlobal("matchMedia", () => ({
    matches: reducedMotion,
    addEventListener() {},
    removeEventListener() {},
  }));
  vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockImplementation(
    () => !mediaPlaying
  );
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (
    this: HTMLMediaElement
  ) {
    mediaPlaying = true;
    fireEvent.play(this);
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (
    this: HTMLMediaElement
  ) {
    mediaPlaying = false;
    fireEvent.pause(this);
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  reducedMotion = false;
  mediaPlaying = false;
  reportVisibility = undefined;
});
const props = {
  src: "/film.mp4",
  poster: "/film.jpg",
  title: "Aeros film",
  description: "Recorded mission walkthrough",
};
it("plays the hero only in view and preserves a visitor pause across visibility changes", () => {
  render(<LandingVideo {...props} autoPlay />);
  act(() => reportVisibility?.(true));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  act(() => reportVisibility?.(false));
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
  act(() => reportVisibility?.(true));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  const video = screen.getByLabelText("Aeros film");
  fireEvent.pause(video);
  act(() => reportVisibility?.(false));
  act(() => reportVisibility?.(true));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
});
it("leaves reduced-motion playback to the visitor", () => {
  reducedMotion = true;
  render(<LandingVideo {...props} autoPlay />);
  act(() => reportVisibility?.(true));
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  expect(
    screen.getByLabelText("Aeros film").getAttribute("controls")
  ).not.toBeNull();
});
it("does not autoplay or loop the main demo", () => {
  render(<LandingVideo {...props} />);
  act(() => reportVisibility?.(true));
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  expect(screen.getByLabelText("Aeros film").getAttribute("loop")).toBeNull();
  expect(screen.getByLabelText("Aeros film").getAttribute("preload")).toBe(
    "none"
  );
});
it("offers the original video link when embedded playback fails", () => {
  render(<LandingVideo {...props} />);
  fireEvent.error(screen.getByLabelText("Aeros film"));
  expect(
    screen
      .getByRole("link", { name: "Open Aeros film video →" })
      .getAttribute("href")
  ).toBe("/film.mp4");
});
