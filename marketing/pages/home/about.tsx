import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { OperationsPage } from "@marketing/components/home/OperationsPage";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function AboutNextJS() {
  return (
    <OperationsPage
      {...{
        eyebrow: "About Aeros",
        title: "Mission autonomy for the fleet you already operate.",
        description:
          "Aeros is vendor-neutral dispatch and orchestration software for organizations that already operate drone fleets. We connect mission intent to the aircraft, scene context, and people needed to carry it through—from response and area search to infrastructure inspection.",
        sections: [
          {
            title: "Start with the outcome",
            description:
              "Operators should be able to describe the job in plain language and review a mission plan grounded in fleet state and operating constraints.",
          },
          {
            title: "Work with the fleet you have",
            description:
              "Keep existing aircraft and flight software. Connect supported provider interfaces and validate each integration against your real workflows.",
          },
          {
            title: "Build for the unexpected",
            description:
              "Readiness changes. Weather moves. Aircraft become unavailable. Recovery is part of the mission, with clear proposals and operator ownership.",
          },
          {
            title: "Keep people accountable",
            description:
              "Mission authority stays with the operating organization. Aeros makes the plan, evidence, exceptions, and approval history visible to the people responsible.",
          },
        ],
      }}
    />
  );
}
AboutNextJS.getLayout = (page: ReactElement, pageProps: LandingLayoutProps) => (
  <LandingLayout pageProps={pageProps}>{page}</LandingLayout>
);
