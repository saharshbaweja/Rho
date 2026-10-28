import type { LandingLayoutProps } from "@marketing/components/home/LandingLayout";
import LandingLayout from "@marketing/components/home/LandingLayout";
import { PageMetadata } from "@marketing/components/home/PageMetadata";
import { IntroSection } from "@marketing/components/home/content/Product/IntroSection";
import type { NewsItem } from "@marketing/lib/homepage_news";

import { useRouter } from "next/router";
import type { ReactElement } from "react";

interface HomeProps {
  news?: NewsItem[];
}

// Revalidate the homepage every 5 minutes so news and logo-bar edits in
// Contentful propagate without a deploy. First request after staleness gets
// the cached version while a fresh one is generated in the background.
export async function getStaticProps() {
  return {
    props: {
      shape: 0,
      gtmTrackingId: process.env.NEXT_PUBLIC_GTM_TRACKING_ID ?? null,
    },
    revalidate: 300,
  };
}

export function Landing({ news }: HomeProps) {
  const router = useRouter();

  return (
    <>
      <PageMetadata
        title="Aeros | Intelligence for the physical world"
        description="AI dispatch for the drone fleets you already operate. Plan missions, coordinate aircraft, share scene context, and adapt operations across connected providers."
        pathname={router.asPath}
      />
      <IntroSection news={news} />
    </>
  );
}

// oxlint-disable-next-line dust/nextjsPageComponentNaming -- pre-existing
export default function Home({ news }: HomeProps) {
  return <Landing news={news} />;
}

Home.getLayout = (page: ReactElement, pageProps: LandingLayoutProps) => {
  return <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
};
