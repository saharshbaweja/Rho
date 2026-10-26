import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { OperationsPage } from "@marketing/components/home/OperationsPage";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function SearchRescueNextJS() {
  return (
    <OperationsPage
      eyebrow="Search & rescue"
      title="One search. Every sector accounted for."
      description="Coordinate aircraft, search areas, and field updates in one mission workspace. Prioritize available thermal payloads, keep completed coverage visible, and carry open questions into the next handoff."
      sections={[
        {
          title: "Task the area",
          description:
            "Describe the search objective, boundary, priority zones, and required outputs. Bring the scope together with your available aircraft and operating procedures.",
        },
        {
          title: "Coordinate the sectors",
          description:
            "Split the search between connected aircraft and providers. Keep payload fit, battery reserves, launch sites, and operator responsibility attached to the plan.",
        },
        {
          title: "Bring the field into the picture",
          description:
            "Keep available scene views, operator observations, and field-team updates tied to the same operation. Flag areas that need another look without losing completed coverage.",
        },
        {
          title: "Hand over the whole context",
          description:
            "When priorities shift or aircraft need relief, retain the search boundary, completed sectors, outstanding areas, and decision record. Your operating team authorizes each change.",
        },
      ]}
    />
  );
}
SearchRescueNextJS.getLayout = (
  page: ReactElement,
  pageProps: LandingLayoutProps
) => <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
