import {
  LegacyButton as Button,
  Div3D,
  Hover3D,
  Rocket02,
} from "@dust-tt/sparkle";
import {
  ImgBlock,
  QuoteSection,
} from "@marketing/components/home/ContentBlocks";
import { Grid } from "@marketing/components/home/ContentComponents";
import type { LandingLayoutProps } from "@marketing/components/home/LandingLayout";
import LandingLayout from "@marketing/components/home/LandingLayout";
import { PageMetadata } from "@marketing/components/home/PageMetadata";
import { ExtensibilitySection } from "@marketing/components/home/content/Product/ExtensibilitySection";
import { PlatformIntroSection } from "@marketing/components/home/content/Product/PlatformIntroSection";
import type { DemoVideoProps } from "@marketing/components/home/content/Solutions/DemoVideoSection";
import { DemoVideoSection } from "@marketing/components/home/content/Solutions/DemoVideoSection";
import { TRACKING_AREAS, withTracking } from "@marketing/lib/tracking";
import { classNames } from "@marketing/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

export async function getStaticProps() {
  return {
    props: {
      gtmTrackingId: process.env.NEXT_PUBLIC_GTM_TRACKING_ID ?? null,
    },
  };
}

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference platform demonstration",
  videoUrl:
    "https://fast.wistia.net/embed/iframe/3ej9a2ruip?web_component=true&seo=true",
};

// oxlint-disable-next-line dust/nextjsPageComponentNaming -- pre-existing
export default function DustPlatform() {
  const router = useRouter();

  return (
    <>
      <PageMetadata
        title="Aeros Platform | Operational Data & Workflow Integration"
        description="Plan the aviation data, operator system, and workflow connections that support mission intelligence, evidence, and human review."
        pathname={router.asPath}
      />
      <PlatformIntroSection />
      <Grid>
        <div
          className={classNames(
            "col-span-12 grid grid-cols-1 gap-8",
            "md:grid-cols-3"
          )}
        >
          <ImgBlock
            title={<> Connect aviation and operator data </>}
            content={[
              <> Define the sources behind the mission assessment: aviation feeds, schedules, aircraft, crews, and approved operator knowledge. Validate coverage, access, and data quality for each connection. </>,
            ]}
          >
            <Hover3D
              depth={-20}
              perspective={1000}
              className={classNames("relative")}
            >
              <Div3D depth={-20}>
                <img src="/static/landing/api/MCP1.png" />
              </Div3D>
              <Div3D depth={40} className="absolute top-0">
                <img src="/static/landing/api/MCP2.png" />
              </Div3D>
              <Div3D depth={0} className="absolute top-0">
                <img src="/static/landing/api/MCP3.png" />
              </Div3D>
              <Div3D depth={40} className="absolute top-0">
                <img src="/static/landing/api/MCP4.png" />
              </Div3D>
            </Hover3D>
          </ImgBlock>
          <ImgBlock
            title={<> Respond to operational changes </>}
            content={[
              <> The Aeros roadmap connects source updates to affected mission reviews, so a changed condition can be assessed in context and routed to the responsible team. </>,
            ]}
          >
            <Hover3D
              depth={-20}
              perspective={1000}
              className={classNames("relative")}
            >
              <Div3D depth={-20}>
                <img src="/static/landing/webhooks/Webhooks.png" />
              </Div3D>
              <Div3D depth={0} className="absolute top-0">
                <img src="/static/landing/webhooks/Webhooks3.png" />
              </Div3D>
              <Div3D depth={15} className="absolute top-0">
                <img src="/static/landing/webhooks/Webhooks2.png" />
              </Div3D>
            </Hover3D>
          </ImgBlock>
          <ImgBlock
            title={<> Keep the review in your workflow </>}
            content={[
              <> Scope how assessments, supporting evidence, and open actions fit into the operator's existing systems. Integration availability and deployment requirements are validated during rollout. </>,
            ]}
          >
            <Hover3D
              depth={-20}
              perspective={1000}
              className={classNames("relative")}
            >
              <Div3D depth={-20}>
                <img src="/static/landing/api/api1.png" />
              </Div3D>
              <Div3D depth={20} className="absolute top-0">
                <img src="/static/landing/api/api2.png" />
              </Div3D>
              <Div3D depth={60} className="absolute top-0">
                <img src="/static/landing/api/api3.png" />
              </Div3D>
            </Hover3D>
          </ImgBlock>
        </div>
      </Grid>
      <ExtensibilitySection page="platform" />
      <DemoVideoSection demoVideo={DemoVideo} />
      <QuoteSection
        quote="Dust functions as a 'meta-platform.' Its aggregation approach offers flexibility, allowing us to leverage multiple data sources across tools and avoid being locked into specific tools or vertical ecosystems."
        name="Charles Gorintin"
        title="Dust customer reference · CTO at Alan"
        logo="/static/landing/logos/color/alan.png"
      />
      <div
        className={classNames(
          "col-span-12 flex flex-col items-center pb-24",
          "lg:col-span-12 lg:col-start-1",
          "xl:col-span-10 xl:col-start-2"
        )}
      >
        <div className="mt-4 flex justify-center gap-4">
          <Link href="/home/contact" shallow={true}>
            <Button
              variant="outline"
              size="md"
              label="Request a demo"
              onClick={withTracking(
                TRACKING_AREAS.SOLUTIONS,
                "platform_footer_cta_secondary"
              )}
            />
          </Link>

          <Link href="/home/pricing" shallow={true}>
            <Button
              variant="highlight"
              size="md"
              label="Explore access"
              icon={Rocket02}
              onClick={withTracking(
                TRACKING_AREAS.SOLUTIONS,
                "platform_footer_cta_primary"
              )}
            />
          </Link>
        </div>
      </div>
    </>
  );
}

DustPlatform.getLayout = (
  page: ReactElement,
  pageProps: LandingLayoutProps
) => {
  return <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
};
