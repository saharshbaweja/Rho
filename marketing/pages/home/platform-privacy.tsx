import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { OperationsPage } from "@marketing/components/home/OperationsPage";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function DataHandlingNextJS() {
  return (
    <OperationsPage
      {...{
        eyebrow: "Website data handling",
        title: "What you share with Aeros.",
        description:
          "The demo on this website uses simulated scenario data. It does not connect to live fleets or send mission prompts to an AI service.",
        sections: [
          {
            title: "Demo-request details",
            description:
              "The contact form collects your name, work email, organization, fleet description, and mission requirements to respond to your request. By default, the form prepares an email addressed to contact@aeros.com. You review and send it in your email app.",
          },
          {
            title: "Configured delivery",
            description:
              "If the site operator enables webhook delivery, requests are sent to the configured endpoint. If delivery is unavailable, the form reports an error and does not claim receipt.",
          },
          {
            title: "Website preferences",
            description:
              "Cookie preferences can be reviewed using Cookie Settings in the footer. Optional analytics depend on the deployment configuration and your selected preferences.",
          },
          {
            title: "Operational information",
            description:
              "Do not submit credentials, restricted flight-control information, or sensitive mission data through this public website. Discuss deployment-specific data handling with the team before connecting operational systems.",
          },
        ],
      }}
    />
  );
}
DataHandlingNextJS.getLayout = (
  page: ReactElement,
  pageProps: LandingLayoutProps
) => <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
