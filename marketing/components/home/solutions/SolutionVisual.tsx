import { FieldHandoffScene } from "@marketing/components/home/content/Product/mission-control/FieldHandoffScene";
import { FeatureScene } from "@marketing/components/home/content/Product/mission-control/FeatureScene";
import { assertNever } from "@marketing/types/shared/utils/assert_never";
import type { SolutionVisual as VisualKind } from "./solutionContent";

export function SolutionVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "response":
      return <FieldHandoffScene scenario="response" />;
    case "search":
      return <FieldHandoffScene scenario="search" />;
    case "dispatch":
      return <FeatureScene feature="Aeros Dispatch" />;
    case "fleet":
      return <FeatureScene feature="Aeros Fleet" />;
    case "readiness":
      return <FeatureScene feature="Aeros Readiness" />;
    case "recovery":
      return <FeatureScene feature="Aeros Recover" />;
    case "search-coverage":
      return <FeatureScene feature="Aeros Report" reportContext="search" />;
    case "report":
      return <FeatureScene feature="Aeros Report" />;
    default:
      return assertNever(kind);
  }
}
