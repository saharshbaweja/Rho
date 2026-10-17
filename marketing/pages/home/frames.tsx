import {
  LegacyButton as Button,
  CheckCircle,
  Icon,
  Lock01,
  Planet,
} from "@dust-tt/sparkle";
import {
  Grid,
  H1,
  H2,
  H3,
  P,
} from "@marketing/components/home/ContentComponents";
import type { LandingLayoutProps } from "@marketing/components/home/LandingLayout";
import LandingLayout from "@marketing/components/home/LandingLayout";
import { PageMetadata } from "@marketing/components/home/PageMetadata";
import TrustedBy from "@marketing/components/home/TrustedBy";
import { HomeAIOperatorsCTASection } from "@marketing/components/home/content/Product/HomeAIOperatorsCTASection";
import { DemoVideoSection } from "@marketing/components/home/content/Solutions/DemoVideoSection";
import { CONTENTFUL_REVALIDATE_SECONDS } from "@marketing/lib/contentful/client";
import { fetchLogoLists } from "@marketing/lib/logo_bars_server";
import { TRACKING_AREAS, withTracking } from "@marketing/lib/tracking";
import { classNames } from "@marketing/lib/utils";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

const SECTION_CLASSES = "py-12 md:py-16";
const CONTAINER_CLASSES = "container mx-auto px-6";
const GRID_SECTION_CLASSES = classNames(
  "flex flex-col gap-16",
  "col-span-12",
  "lg:col-span-12 lg:col-start-1",
  "xl:col-span-12 xl:col-start-1",
  "2xl:col-start-1"
);

const DEMO_VIDEO = {
  sectionTitle: "See how it works",
  // TODO: Replace video URL with Marketing one.
  videoUrl: "https://fast.wistia.net/embed/iframe/4prx3jilqq",
  showCaptions: true,
};

export async function getStaticProps() {
  return {
    props: {
      gtmTrackingId: process.env.NEXT_PUBLIC_GTM_TRACKING_ID ?? null,
      logoLists: await fetchLogoLists(),
    },
    // The logo bar is editor-managed in Contentful, so the page has to
    // revalidate for a GTM change to go live without a deploy.
    revalidate: CONTENTFUL_REVALIDATE_SECONDS,
  };
}

function HeroSection() {
  return (
    <div className="container flex w-full flex-col px-6 pt-8 md:px-4 md:pt-16">
      <Grid className="items-center gap-x-4 lg:gap-x-8">
        <div className="col-span-12 flex flex-col justify-center py-4 text-left lg:col-span-6 lg:col-start-1">
          <H1
            mono
            className="mb-4 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl xl:text-7xl"
          > A shared workspace for every mission </H1>
          <P
            size="lg"
            className="pb-6 text-muted-foreground md:max-w-lg md:pb-8"
          > The Aeros Mission Workspace brings an assessment, its evidence, open conditions, and team actions into one shared operational review. </P>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              variant="primary"
              size="md"
              label="Get started"
              href="/home/pricing"
              className="w-full sm:w-auto"
              onClick={withTracking(TRACKING_AREAS.FRAMES, "hero_get_started")}
            />
            <Button
              variant="outline"
              size="md"
              label="Get a demo"
              href="/home/contact"
              className="w-full sm:w-auto"
              onClick={withTracking(TRACKING_AREAS.FRAMES, "hero_get_demo")}
            />
          </div>
        </div>

        <div className="relative col-span-12 mt-8 py-2 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <iframe
              src="https://fast.wistia.net/embed/iframe/dye6ti8zv7?autoplay=true&muted=true"
              title="Frames Release"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 -top-[10%] h-[120%] w-full rounded-2xl"
              style={{
                border: "none",
                outline: "none",
              }}
            />
          </div>
        </div>
      </Grid>
    </div>
  );
}

function ContentInAction() {
  return (
    <div className={SECTION_CLASSES}>
      <div className={CONTAINER_CLASSES}>
        <div className="mb-12">
          <H2> Mission coordination in practice </H2>
          <P size="lg" className="mt-4 text-muted-foreground"> A mission review should make the condition, impact, options, and ownership clear. The workspace roadmap keeps that context connected as the operation changes. </P>
        </div>

        <div className="space-y-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="order-1 flex items-center justify-center lg:order-1">
              <div className="w-full">
                <div className="relative w-full overflow-hidden rounded-lg bg-blue-50">
                  <img
                    src="/static/landing/frames/SalesROI.svg"
                    alt="Data visualizations for client presentations"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="order-2 flex flex-col justify-center lg:order-2">
              <H3 className="mb-6"> Dispatch review </H3>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-tr-full bg-red-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Prepare the current mission assessment with route, weather, airport, and aircraft context. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-bl-full bg-yellow-400"></div>
                  <div>
                    <P size="sm" className="font-medium"> Review operator-specific procedures and the restrictions that apply to the planned flight. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-br-full bg-green-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Carry open conditions and supporting evidence into the next review or shift handover. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 bg-blue-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Compare the operational implications of each proposed response before human approval. </P>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="primary"
                  size="md"
                  label="View reference example"
                  href="https://dust.tt/share/frame/4ce02864-6181-451b-812d-b862f0370736"
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 flex flex-col justify-center lg:order-1">
              <H3 className="mb-6"> Crew and scheduling </H3>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 bg-pink-400"></div>
                  <div>
                    <P size="sm" className="font-medium"> Connect proposed mission changes to crew availability, qualifications, and duty margins. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-br-full bg-red-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Keep company procedures and planning assumptions consistent across the review. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-tl-full bg-blue-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Share the revised operating window and the actions that require crew coordination. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-tr-full bg-green-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Trace the consequences of a delay or recovery plan through later legs. </P>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="primary"
                  size="md"
                  label="View reference example"
                  href="https://dust.tt/share/frame/1d641570-96d0-4491-a0ec-9c9426ab1009"
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </div>
            <div className="order-1 flex items-center justify-center lg:order-2">
              <div className="w-full">
                <div className="relative w-full overflow-hidden rounded-lg bg-pink-50">
                  <img
                    src="/static/landing/frames/MarketingCampaign.svg"
                    alt="Campaign performance charts and A/B testing results"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="order-1 flex items-center justify-center lg:order-1">
              <div className="w-full">
                <div className="relative w-full overflow-hidden rounded-lg bg-green-50">
                  <img
                    src="/static/landing/frames/UserEngagement.svg"
                    alt="Usage analytics and health score dashboards"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="order-2 flex flex-col justify-center lg:order-2">
              <H3 className="mb-6"> Maintenance coordination </H3>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-br-full bg-pink-400"></div>
                  <div>
                    <P size="sm" className="font-medium"> Bring aircraft readiness, open items, and station support into the mission assessment. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 bg-red-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Keep relevant MEL conditions and required maintenance actions visible to the team. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-tr-full bg-yellow-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Share the aircraft availability picture and the owner of each unresolved condition. </P>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="primary"
                  size="md"
                  label="View reference example"
                  href="https://dust.tt/share/frame/a8ac6c1e-93e9-473b-92af-dd1e55216ec6"
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 flex flex-col justify-center lg:order-1">
              <H3 className="mb-6"> Operations leadership </H3>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 bg-purple-400"></div>
                  <div>
                    <P size="sm" className="font-medium"> Review the missions requiring attention and the constraints shaping the operating plan. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-br-full bg-orange-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Keep the evidence and assumptions behind a proposed recovery plan easy to inspect. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-tl-full bg-teal-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Give teams a consistent handover of decisions, conditions, and next actions. </P>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex-shrink-0 rounded-tr-full bg-blue-500"></div>
                  <div>
                    <P size="sm" className="font-medium"> Use mission reviews to identify recurring constraints and operational data gaps. </P>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="primary"
                  size="md"
                  label="View reference example"
                  href="https://dust.tt/share/frame/a3819cae-2716-472d-b71d-aa6f960a7079"
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </div>
            <div className="order-1 flex items-center justify-center lg:order-2">
              <div className="w-full">
                <div className="relative w-full overflow-hidden rounded-lg bg-purple-50">
                  <img
                    src="/static/landing/frames/ProductTeam.svg"
                    alt="Feature adoption charts and data exploration tools"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoSection() {
  return (
    <Grid>
      <div className={GRID_SECTION_CLASSES}>
        <DemoVideoSection demoVideo={DEMO_VIDEO} />
      </div>
    </Grid>
  );
}

function AllTheBellsAndWhistlesSection() {
  return (
    <div className={SECTION_CLASSES}>
      <div className={CONTAINER_CLASSES}>
        <div className="mb-12">
          <H2> Built for operational review </H2>
        </div>

        <div className="flex w-full flex-col justify-between gap-6 md:flex-row">
          <div className="flex flex-1 flex-col rounded-2xl bg-gray-50 p-6">
            <Icon visual={Lock01} className="mb-4 h-8 w-8 text-gray-600" />
            <h4 className="text-lg font-semibold"> Clear roles and responsibilities </h4>
            <P size="sm" className="mt-1 text-muted-foreground"> The Aeros roadmap keeps the responsible team, required approvals, and supporting information together in the mission review. </P>
          </div>
          <div className="flex flex-1 flex-col rounded-2xl bg-gray-50 p-6">
            <Icon visual={Planet} className="mb-4 h-8 w-8 text-gray-600" />
            <h4 className="text-lg font-semibold"> Connected mission context </h4>
            <P size="sm" className="mt-1 text-muted-foreground"> Bring schedules, aviation sources, aircraft state, and operator procedures into the assessment as integrations are validated. </P>
          </div>
          <div className="flex flex-1 flex-col rounded-2xl bg-gray-50 p-6">
            <Icon visual={CheckCircle} className="mb-4 h-8 w-8 text-gray-600" />
            <h4 className="text-lg font-semibold"> Operator-specific procedures </h4>
            <P size="sm" className="mt-1 text-muted-foreground"> Reflect the operator's operating limits, approved procedures, and review responsibilities in how mission options are assessed. </P>
          </div>
        </div>
      </div>
    </div>
  );
}

function SharingAndAccessSection() {
  return (
    <div className="py-16 md:py-20">
      <div className={CONTAINER_CLASSES}>
        <div className="mb-12">
          <H2> Share the assessment </H2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="order-1 flex items-center justify-center lg:order-1">
            <div className="w-full">
              <div className="relative w-full overflow-hidden rounded-lg bg-violet-100">
                <img
                  src="/static/landing/frames/Security-share.svg"
                  alt="Security and sharing interface showing access controls and sharing options"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="order-2 flex flex-col justify-center lg:order-2">
            <H3 className="mb-6"> Human review and ownership </H3>
            <P size="lg" className="text-muted-foreground"> Keep open actions and decision responsibilities visible to the authorized mission team. </P>
          </div>
        </div>
      </div>
    </div>
  );
}

// oxlint-disable-next-line dust/nextjsPageComponentNaming -- pre-existing
export default function Frames() {
  const router = useRouter();

  return (
    <>
      <PageMetadata
        title="Aeros Mission Workspace | Shared Operational Review"
        description="Explore a shared mission workspace for dispatch, crew, maintenance, and operations leadership, with evidence and human review at the center."
        pathname={router.asPath}
        ogImage="https://dust.tt/static/landing/hero_dust.png"
      />

      <div className="container flex w-full flex-col gap-16 px-2 py-2">
        <HeroSection />
        <ContentInAction />
        <AllTheBellsAndWhistlesSection />
        <SharingAndAccessSection />
        <VideoSection />
        <TrustedBy logoSet="landing" />
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <HomeAIOperatorsCTASection />
        </div>
      </div>
    </>
  );
}

Frames.getLayout = (page: ReactElement, pageProps: LandingLayoutProps) => {
  return <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
};
