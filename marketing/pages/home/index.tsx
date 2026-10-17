import type { LandingLayoutProps } from "@marketing/components/home/LandingLayout";
import LandingLayout from "@marketing/components/home/LandingLayout";
import { PageMetadata } from "@marketing/components/home/PageMetadata";
import { IntroSection } from "@marketing/components/home/content/Product/IntroSection";
import type { NewsItem } from "@marketing/lib/homepage_news";
import { fetchHomepageNews } from "@marketing/lib/homepage_news";
import { fetchLogoLists } from "@marketing/lib/logo_bars_server";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

interface HomeProps {
  news?: NewsItem[];
}

// Revalidate the homepage every 5 minutes so news and logo-bar edits in
// Contentful propagate without a deploy. First request after staleness gets
// the cached version while a fresh one is generated in the background.
export async function getStaticProps() {
  const [news, logoLists] = await Promise.all([
    fetchHomepageNews(),
    fetchLogoLists(),
  ]);
  return {
    props: {
      shape: 0,
      gtmTrackingId: process.env.NEXT_PUBLIC_GTM_TRACKING_ID ?? null,
      news,
      logoLists,
    },
    revalidate: 300,
  };
}

export function Landing({ news }: HomeProps) {
  const router = useRouter();

  return (
    <>
      <PageMetadata
        title="Aeros | Mission Intelligence for Flight Operations"
        description="Aeros brings mission monitoring, operational assessment, contextual alerts, planning, and recovery into one connected picture for flight operations teams."
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
