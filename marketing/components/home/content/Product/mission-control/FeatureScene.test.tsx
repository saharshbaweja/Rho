// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { FeatureScene } from "./FeatureScene";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("keeps an unfinished search area open through the report handover", () => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    }
  );
  vi.stubGlobal("matchMedia", () => ({
    matches: true,
    addEventListener() {},
    removeEventListener() {},
  }));
  render(<FeatureScene feature="Aeros Report" reportContext="search" />);
  expect(screen.getByText("Sectors completed · Waterfront")).toBeTruthy();
  fireEvent.click(
    screen.getByRole("button", { name: "Keep open areas visible" })
  );
  expect(
    screen.getByText("East boundary · Another pass").querySelector("small")
      ?.textContent
  ).toBe("Open");
  fireEvent.click(
    screen.getByRole("button", { name: "Prepare the search handover" })
  );
  expect(
    screen.getByText("East boundary · Another pass").querySelector("small")
      ?.textContent
  ).toBe("Open");
  expect(screen.queryByText("Assets covered · North district")).toBeNull();
});
