import type { GetStaticPaths, GetStaticProps } from "next";
import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { OperationsPage } from "@marketing/components/home/OperationsPage";
const industries: Record<string, string> = {
  "b2b-saas": "Enterprise fleets",
  consulting: "Drone service providers",
  "energy-utilities": "Energy & utilities",
  "financial-services": "Drone logistics",
  "industrial-manufacturing": "Industrial sites",
  insurance: "Inspection operators",
  "investment-firms": "Infrastructure operators",
  marketplace: "Multi-site operations",
  media: "Survey teams",
  "retail-ecommerce": "Special missions",
};
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.keys(industries).map((industry) => ({ params: { industry } })),
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const key = params?.industry;
  if (typeof key !== "string" || !industries[key]) {
    return { notFound: true };
  }
  return { props: { industry: industries[key], shape: 0 } };
};
export default function IndustryNextJS({ industry }: { industry: string }) {
  return (
    <OperationsPage
      eyebrow={industry}
      title="Describe the job. Coordinate your fleet."
      description={`Aeros helps ${industry.toLowerCase()} plan, dispatch, monitor, and recover drone missions across existing fleets and providers.`}
      sections={[
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
      ]}
    />
  );
}
IndustryNextJS.getLayout = (
  page: ReactElement,
  pageProps: LandingLayoutProps
) => <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
