import { OperationsTheater } from "./OperationsTheater";
import { SensorViewport } from "./SensorViewport";
import { FieldHandoffScene } from "./FieldHandoffScene";
import { FeatureScene } from "./FeatureScene";
export default {
  title: "Aeros/Mission experience",
  component: OperationsTheater,
  parameters: { layout: "fullscreen" },
};
export const MissionWorkspace = {
  render: () => (
    <div style={{ padding: 32, background: "#0c1317", maxWidth: 1280 }}>
      <OperationsTheater />
    </div>
  ),
};
export const SensorView = {
  render: () => (
    <div style={{ width: 600, height: 360 }}>
      <SensorViewport />
    </div>
  ),
};
export const FieldHandoff = {
  render: () => (
    <div style={{ width: 520 }}>
      <FieldHandoffScene />
    </div>
  ),
};
export const Recovery = {
  render: () => (
    <div style={{ width: 520 }}>
      <FeatureScene film="mission-recovery" />
    </div>
  ),
};
export const Fleet = {
  render: () => (
    <div style={{ width: 520 }}>
      <FeatureScene film="fleet-readiness" />
    </div>
  ),
};
export const Readiness = {
  render: () => (
    <div style={{ width: 520 }}>
      <FeatureScene feature="Aeros Readiness" />
    </div>
  ),
};
export const Report = {
  render: () => (
    <div style={{ width: 520 }}>
      <FeatureScene feature="Aeros Report" />
    </div>
  ),
};
