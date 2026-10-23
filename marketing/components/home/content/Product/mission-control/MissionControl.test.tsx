// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MissionControl } from "./MissionControl";
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
});
describe("mission-control product preview", () => {
  it("walks from plan review through dispatch and recovery to the report", () => {
    render(<MissionControl autoPlay={false} expanded />);
    fireEvent.click(screen.getByRole("button", { name: "02 Plan" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Approve simulated dispatch" })
    );
    expect(screen.getByText("3 aircraft executing")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "04 Adapt" }));
    expect(screen.getByText("Recovery proposal")).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Approve simulated recovery" })
    );
    expect(
      screen.getByRole("button", { name: "Download sample report" })
    ).toBeTruthy();
  });
  it("lets operators change fleet selection and map layers", () => {
    render(<MissionControl autoPlay={false} expanded />);
    fireEvent.click(screen.getByRole("button", { name: "02 Plan" }));
    const aircraft = screen.getByRole("button", {
      name: /B-12 Ready to deploy/,
    });
    fireEvent.click(aircraft);
    expect(aircraft.getAttribute("aria-pressed")).toBe("true");
    const weather = screen.getByRole("button", {
      name: /weather/i,
    });
    fireEvent.click(weather);
    expect(weather.getAttribute("aria-pressed")).toBe("true");
  });
  it("labels the simulation and honors reduced motion without autoplay", () => {
    render(<MissionControl expanded />);
    expect(screen.getByText("PRODUCT SIMULATION")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Play product tour" })
    ).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: "Pause product tour" })
    ).toBeNull();
  });
  it("takes mission text into the scripted review without calling a service", () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    render(<MissionControl autoPlay={false} expanded />);
    fireEvent.change(
      screen.getByLabelText("Describe a mission for the preview"),
      { target: { value: "Inspect all north district streetlights" } }
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Preview mission plan" })
    );
    expect(
      screen.getByText("Inspect all north district streetlights")
    ).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain(
      "No live AI or aircraft"
    );
    expect(fetcher).not.toHaveBeenCalled();
  });
});
