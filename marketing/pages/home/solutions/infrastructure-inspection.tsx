import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { SolutionPage } from "@marketing/components/home/solutions/SolutionPage";
import { SOLUTIONS } from "@marketing/components/home/solutions/solutionContent";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function InfrastructureInspectionNextJS() {
  return <SolutionPage solution={SOLUTIONS[0]} />;
}
InfrastructureInspectionNextJS.getLayout = (
  page: ReactElement,
  pageProps: LandingLayoutProps
) => <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
