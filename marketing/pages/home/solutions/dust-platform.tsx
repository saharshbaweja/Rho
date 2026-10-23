import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { OperationsPage } from "@marketing/components/home/OperationsPage";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function Solution() {
  return (
    <OperationsPage
      {...{
        eyebrow: "Fleet service providers",
        title: "Many customers. One dispatch picture.",
        description:
          "Coordinate missions across customer sites and providers while retaining aircraft ownership, operational authority, and accountable approvals.",
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
Solution.getLayout = (page: ReactElement, pageProps: LandingLayoutProps) => (
  <LandingLayout pageProps={pageProps}>{page}</LandingLayout>
);
