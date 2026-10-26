// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { OperationsTheater } from "./OperationsTheater";
import { FieldHandoffScene } from "./FieldHandoffScene";
beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
      unobserve() {}
    }
  );
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});
describe("mission experience", () => {
  it("coordinates a preview mission through handover and debrief without operational requests", () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    render(<OperationsTheater />);
    fireEvent.click(
      screen.getByRole("button", { name: "Review mission plan" })
    );
    expect(screen.getByText("Plan ready for review")).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Approve preview dispatch" })
    );
    expect(screen.getByText("Coordinated execution")).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Explore mission change" })
    );
    expect(screen.getByText("Coverage continuity")).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Approve preview handover" })
    );
    expect(screen.getByText("Operation debrief")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Export sample mission record" })
    ).toBeTruthy();
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("resets stage, playback and scene view when changing scenario", () => {
    render(<OperationsTheater />);
    fireEvent.click(
      screen.getByRole("button", { name: "Review mission plan" })
    );
    fireEvent.click(screen.getByRole("button", { name: "Scene view" }));
    fireEvent.click(screen.getByRole("button", { name: "Infrastructure" }));
    expect(screen.getByText("North district inspection")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Review mission plan" })
    ).toBeTruthy();
    expect(
      screen
        .getByRole("button", { name: "Operations map" })
        .getAttribute("aria-pressed")
    ).toBe("true");
    expect(
      screen.getByRole("button", { name: "Play mission preview" })
    ).toBeTruthy();
  });
  it("uses local illustrative sensor controls and honors reduced motion", () => {
    render(<OperationsTheater />);
    expect(
      screen.getByRole("button", { name: "Play mission preview" })
    ).toBeTruthy();
    const thermal = screen.getByRole("button", {
      name: "Toggle illustrative thermal view",
    });
    fireEvent.click(thermal);
    expect(thermal.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("SIMULATED FEED")).toBeTruthy();
  });
  it("acknowledges a field handoff locally without sending data", () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    render(<FieldHandoffScene />);
    fireEvent.click(
      screen.getByRole("button", { name: "Preview field acknowledgement" })
    );
    expect(screen.getByText("Acknowledged")).toBeTruthy();
    expect(screen.getByText("Field update retained")).toBeTruthy();
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("exports a labeled sample record with the active scenario and aircraft assignments", async () => {
    const records: Blob[] = [];
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn((record: Blob) => {
        records.push(record);
        return "blob:aeros-preview";
      }),
      revokeObjectURL: vi.fn(),
    });
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    render(<OperationsTheater />);
    fireEvent.click(screen.getByRole("button", { name: /05 Debrief/ }));
    fireEvent.click(
      screen.getByRole("button", { name: "Export sample mission record" })
    );
    const content = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        typeof reader.result === "string"
          ? resolve(reader.result)
          : reject(new Error("Expected text record"));
      reader.onerror = () => reject(reader.error);
      reader.readAsText(records[0]);
    });
    const record = JSON.parse(content);
    expect(record.simulation).toBe(true);
    expect(record.missionId).toBe("OPS-0142");
    expect(record.assignments).toHaveLength(2);
    expect(click).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("button", { name: "Sample mission record downloaded" })
    ).toBeTruthy();
  });
  it("pauses automatic playback outside the viewport", () => {
    vi.useFakeTimers();
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
    );
    let updateVisibility: (visible: boolean) => void = () => {};
    vi.stubGlobal(
      "IntersectionObserver",
      class implements IntersectionObserver {
        root = null;
        rootMargin = "0px";
        scrollMargin = "0px";
        thresholds = [0.25];
        constructor(callback: IntersectionObserverCallback) {
          updateVisibility = (visible) =>
            callback(
              [
                {
                  target: document.body,
                  time: 0,
                  rootBounds: null,
                  boundingClientRect: new DOMRect(),
                  intersectionRect: new DOMRect(),
                  intersectionRatio: visible ? 1 : 0,
                  isIntersecting: visible,
                },
              ],
              this
            );
        }
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      }
    );
    render(<OperationsTheater />);
    const slider = screen.getByRole("slider", {
      name: "Mission preview progress",
    });
    act(() => vi.advanceTimersByTime(4000));
    expect(slider.getAttribute("value")).toBe("0");
    act(() => updateVisibility(true));
    act(() => vi.advanceTimersByTime(8000));
    expect(slider.getAttribute("value")).toBe("20");
    act(() => updateVisibility(false));
    act(() => vi.advanceTimersByTime(4000));
    expect(slider.getAttribute("value")).toBe("20");
  });
  it("keeps typed requests local and explains the bounded scripted plan", () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    render(<OperationsTheater />);
    fireEvent.change(
      screen.getByLabelText("Describe a mission for the workspace preview"),
      {
        target: {
          value: "Inspect the western dock and keep a reserve aircraft ready.",
        },
      }
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Preview mission request" })
    );
    expect(
      screen.getByText(
        "Inspect the western dock and keep a reserve aircraft ready."
      )
    ).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain(
      "scripted rapid response plan"
    );
    expect(fetcher).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Area search" }));
    expect(
      screen.queryByText(
        "Inspect the western dock and keep a reserve aircraft ready."
      )
    ).toBeNull();
  });
});
