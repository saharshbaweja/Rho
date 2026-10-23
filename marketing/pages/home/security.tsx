import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { OperationsPage } from "@marketing/components/home/OperationsPage";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function Security() {
  return (
    <OperationsPage
      {...{
        eyebrow: "Operator oversight",
        title: "Automation with clear authority.",
        description:
          "Connect mission intent to operational execution through explicit operating rules, readiness checks, and operator review. Deployment controls and integrations are scoped with your organization.",
        image: "/static/landing/drone/recovery.svg",
        sections: [
          {
            title: "Review before execution",
            description:
              "Operators review the mission scope, aircraft assignments, constraints, and unresolved inputs before dispatch. Recovery proposals require the appropriate operational approval.",
          },
          {
            title: "Make uncertainty visible",
            description:
              "Unavailable weather, airspace, fleet, or permission data must be visible during readiness review. A generated plan does not substitute for flight authorization.",
          },
          {
            title: "Trace the decision",
            description:
              "Keep the request, relevant fleet state, proposed changes, approvals, and completion status together so teams can understand what happened.",
          },
          {
            title: "Scope the deployment",
            description:
              "Discuss provider permissions, access controls, data handling, retention, and operational boundaries during implementation. Validate required controls before connecting live aircraft.",
          },
        ],
      }}
    />
  );
}
Security.getLayout = (page: ReactElement, pageProps: LandingLayoutProps) => (
  <LandingLayout pageProps={pageProps}>{page}</LandingLayout>
);
