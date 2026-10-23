import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { OperationsPage } from "@marketing/components/home/OperationsPage";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function Workspace() {
  return (
    <OperationsPage
      {...{
        eyebrow: "Mission workspace",
        title: "One view from mission request to results.",
        description:
          "Connect fleet state, assignments, approvals, exceptions, and outputs in a shared workspace for operators and providers.",
        sections: [
          {
            title: "Describe the job",
            description:
              "Define the objective, asset list, area, and completion window in natural language. Review the scope and required outputs before planning.",
          },
          {
            title: "Dispatch the right fleet",
            description:
              "Check connected aircraft, payloads, battery state, docks, operator availability, weather, and airspace constraints. Validate provider integrations before operational use.",
          },
          {
            title: "Adapt with oversight",
            description:
              "Monitor mission status and identify affected assignments when conditions change. Review reassignment, delay, or return-to-base options with clear approval ownership.",
          },
          {
            title: "Close the loop",
            description:
              "Bring completion status, coverage, flagged observations, and exception history back into your work-order and reporting workflow.",
          },
        ],
      }}
    />
  );
}
Workspace.getLayout = (page: ReactElement, pageProps: LandingLayoutProps) => (
  <LandingLayout pageProps={pageProps}>{page}</LandingLayout>
);
