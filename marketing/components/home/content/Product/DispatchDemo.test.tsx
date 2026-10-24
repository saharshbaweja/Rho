// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { DispatchDemo } from "./DispatchDemo";
afterEach(cleanup);
describe("DispatchDemo operator workflow", () => {
  it("requires dispatch and recovery approval before showing results", () => {
    render(<DispatchDemo />);
    expect(screen.queryByText("Approve simulated dispatch →")).toBeNull();
    fireEvent.click(screen.getByText("Generate example plan →"));
    expect(screen.getByText("Ready for operator review")).toBeTruthy();
    fireEvent.click(screen.getByText("Approve simulated dispatch →"));
    fireEvent.click(screen.getByText("Simulate aircraft exception →"));
    expect(screen.getByText("Exception detected")).toBeTruthy();
    expect(screen.queryByText("View sample results →")).toBeNull();
    fireEvent.click(screen.getByText("Approve recovery →"));
    fireEvent.click(screen.getByText("View sample results →"));
    expect(screen.getByText("Mission complete")).toBeTruthy();
    expect(screen.getByText("Download sample report")).toBeTruthy();
  });
  it("invalidates the plan when the request or scenario changes", () => {
    render(<DispatchDemo compact />);
    fireEvent.click(screen.getByText("Generate example plan →"));
    fireEvent.click(screen.getByText("Approve simulated dispatch →"));
    fireEvent.change(screen.getByLabelText("What should your fleet do?"), {
      target: { value: "Survey a different area tomorrow" },
    });
    expect(screen.queryByText("Simulate aircraft exception →")).toBeNull();
    fireEvent.click(screen.getByText("Generate example plan →"));
    fireEvent.click(screen.getByText("Site patrol"));
    expect(screen.queryByText("Approve simulated dispatch →")).toBeNull();
  });
  it("rejects an empty request and labels the simulation", () => {
    render(<DispatchDemo />);
    fireEvent.change(screen.getByLabelText("What should your fleet do?"), {
      target: { value: " " },
    });
    fireEvent.click(screen.getByText("Generate example plan →"));
    expect(screen.getByRole("alert").textContent).toContain("12 characters");
    expect(screen.getByText("Simulated demo")).toBeTruthy();
  });
});
