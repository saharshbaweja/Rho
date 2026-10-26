import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { SolutionPage } from "@marketing/components/home/solutions/SolutionPage";
import { SOLUTIONS } from "@marketing/components/home/solutions/solutionContent";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function SearchRescueNextJS() {
  return <SolutionPage solution={SOLUTIONS[2]} />;
}
SearchRescueNextJS.getLayout = (
  page: ReactElement,
  pageProps: LandingLayoutProps
) => <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
