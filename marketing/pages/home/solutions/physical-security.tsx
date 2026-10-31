import type { ReactElement } from "react";
import LandingLayout, { type LandingLayoutProps } from "@marketing/components/home/LandingLayout";
import { PhysicalSecurityExperience } from "@marketing/components/home/solutions/PhysicalSecurityExperience";

export function getStaticProps() {
  return { props: { shape: 0 } };
}

export default function PhysicalSecurityNextJS() {
  return <PhysicalSecurityExperience />;
}

PhysicalSecurityNextJS.getLayout = (
  page: ReactElement,
  pageProps: LandingLayoutProps
) => <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
