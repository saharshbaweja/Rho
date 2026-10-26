import { SolutionPage } from "./SolutionPage";
import { SolutionVisual } from "./SolutionVisual";
import { SOLUTIONS } from "./solutionContent";

export default {
  title: "Aeros/Solutions",
  component: SolutionPage,
  parameters: { layout: "fullscreen" },
};
export const Infrastructure = {
  render: () => (
    <div style={{ background: "#090d10", padding: 24, maxWidth: 1250 }}>
      <SolutionPage solution={SOLUTIONS[0]} />
    </div>
  ),
};
export const Response = {
  render: () => (
    <div style={{ background: "#090d10", padding: 24, maxWidth: 1250 }}>
      <SolutionPage solution={SOLUTIONS[1]} />
    </div>
  ),
};
export const Search = {
  render: () => (
    <div style={{ background: "#090d10", padding: 24, maxWidth: 1250 }}>
      <SolutionPage solution={SOLUTIONS[2]} />
    </div>
  ),
};
export const Providers = {
  render: () => (
    <div style={{ background: "#090d10", padding: 24, maxWidth: 1250 }}>
      <SolutionPage solution={SOLUTIONS[3]} />
    </div>
  ),
};
export const Reporting = {
  render: () => (
    <div style={{ background: "#090d10", padding: 24, maxWidth: 1250 }}>
      <SolutionPage solution={SOLUTIONS[4]} />
    </div>
  ),
};
export const FleetVisual = {
  render: () => (
    <div style={{ width: 520 }}>
      <SolutionVisual kind="fleet" />
    </div>
  ),
};
