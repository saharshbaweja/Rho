import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { OperationsPage } from "@marketing/components/home/OperationsPage";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function IntegrationsNextJS() {
  return (
    <OperationsPage
      {...{
        eyebrow: "Fleet integrations",
        title: "Your existing stack. A shared dispatch layer.",
        description:
          "Connect mission demand to the systems that already operate your drones. Aircraft control remains within your existing flight stack and authorized operating organization.",
        sections: [
          {
            title: "Aircraft and dock providers",
            description:
              "Map available provider APIs for fleet state, readiness, mission submission, telemetry, and recovery. Support depends on vendor capabilities, access, and validated adapter behavior.",
          },
          {
            title: "Work orders and GIS",
            description:
              "Bring asset locations, mission areas, priorities, and deadlines into the dispatch workflow. Agree the import and result formats with your operating team.",
          },
          {
            title: "Weather and airspace",
            description:
              "Connect relevant data sources and evaluate freshness, coverage, and restrictions. Surface missing data for operator review rather than assuming clearance.",
          },
          {
            title: "Results and reporting",
            description:
              "Return mission status, coverage, observation references, and exception history to the systems where work is tracked. Scope each output during integration.",
          },
        ],
      }}
    />
  );
}
IntegrationsNextJS.getLayout = (
  page: ReactElement,
  pageProps: LandingLayoutProps
) => <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
