import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { OperationsPage } from "@marketing/components/home/OperationsPage";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function SupportNextJS() {
  return (
    <OperationsPage
      {...{
        eyebrow: "Aeros support",
        title: "Keep your operation moving.",
        description:
          "Discuss your deployment, connected fleet interfaces, mission workflows, and operator handover with the Aeros team.",
        sections: [
          {
            title: "Integration questions",
            description:
              "Share the provider, interface version, workflow, and expected behavior. Leave out credentials and flight-control secrets.",
          },
          {
            title: "Mission workflow review",
            description:
              "Walk through readiness, assignments, approval ownership, exception handling, and reporting requirements before live operation.",
          },
        ],
      }}
    />
  );
}
SupportNextJS.getLayout = (
  page: ReactElement,
  pageProps: LandingLayoutProps
) => <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
