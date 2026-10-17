import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@dust-tt/sparkle";
import {
  Grid,
  H1,
  H2,
  H3,
  H4,
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

interface ExtensionTab {
  label: string;
  heading: string;
  image: {
    src: string;
    alt: string;
  };
  features: {
    title: string;
    description: string;
    dotCSS: string;
    shape: "circle" | "square" | "rectangle" | "triangle" | "hexagon";
  }[];
}

const EXTENSION_TABS: ExtensionTab[] = [
  {
    label: "Dispatch",
    heading: "Mission context, where dispatch works.",
    image: {
      src: "/static/landing/chrome_ext/Ext_Sales.png",
      alt: "Sales teams using Dust Chrome Extension",
    },
    features: [
      {
        title: "Mission briefing",
        description:
          "Bring route conditions, relevant restrictions, and operator procedures into a focused mission review.",
        dotCSS: "text-pink-400",
        shape: "circle",
      },
      {
        title: "Operational evidence",
        description:
          "Inspect the source and effective period behind a condition before acting on an assessment.",
        dotCSS: "text-red-500",
        shape: "rectangle",
      },
      {
        title: "Operator knowledge",
        description:
          "Keep approved manuals and company operating limits within reach during a mission review.",
        dotCSS: "text-yellow-400",
        shape: "triangle",
      },
    ],
  },
  {
    label: "Maintenance",
    heading: "Aircraft context, inside the review.",
    image: {
      src: "/static/landing/chrome_ext/Ext_Engineer.png",
      alt: "Engineering teams using Dust Chrome Extension",
    },
    features: [
      {
        title: "Aircraft readiness",
        description:
          "Review open items and aircraft limitations against the requirements of the planned mission.",
        dotCSS: "text-pink-400",
        shape: "rectangle",
      },
      {
        title: "Procedure research",
        description:
          "Find the relevant operating procedure and its supporting passage for human verification.",
        dotCSS: "text-red-500",
        shape: "circle",
      },
      {
        title: "Cross-team handover",
        description:
          "Share the operational consequence, unresolved condition, and owner of the next action.",
        dotCSS: "text-yellow-500",
        shape: "triangle",
      },
    ],
  },
  {
    label: "Flight Operations",
    heading: "One mission picture for the operation.",
    image: {
      src: "/static/landing/chrome_ext/Ext_CSupport.png",
      alt: "Support teams using Dust Chrome Extension",
    },
    features: [
      {
        title: "Flight watch",
        description:
          "Keep active flights and their changing operational context connected to the OCC review.",
        dotCSS: "text-pink-400",
        shape: "square",
      },
      {
        title: "Impact assessment",
        description:
          "Understand which missions a weather, airport, or airspace change can affect.",
        dotCSS: "text-red-500",
        shape: "rectangle",
      },
      {
        title: "Decision context",
        description:
          "Review the evidence, alternatives, and approvals required for the next operational step.",
        dotCSS: "text-blue-500",
        shape: "circle",
      },
    ],
  },
];

interface InstallationStep {
  number: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

const INSTALLATION_STEPS: InstallationStep[] = [
  {
    number: "1.",
    title: "Review scope",
    description: "Define the mission workflow, source systems, and access requirements for an Aeros rollout.",
    image: {
      src: "/static/landing/chrome_ext/Step1.png",
      alt: "Chrome Web Store installation",
    },
  },
  {
    number: "2.",
    title: "Connect context",
    description: "Map the relevant mission, operator knowledge, and aviation data into the review.",
    image: {
      src: "/static/landing/chrome_ext/Step2.png",
      alt: "Extension configuration interface",
    },
  },
  {
    number: "3.",
    title: "Validate with the team",
    description:
      "Validate outputs and human review responsibilities before expanding operational use.",
    image: {
      src: "/static/landing/chrome_ext/Step3.png",
      alt: "Chrome extension in action",
    },
  },
];

const CHROME_EXTENSION_URL =
  "https://chromewebstore.google.com/detail/dust/fnkfcndbgingjcbdhaofkcnhcjpljhdn";

const CHROME_EXTENSION_VIDEO_URL =
  "https://fast.wistia.net/embed/iframe/ivk2mh7it7";

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
          > Aeros Operational Assistant </H1>
          <P
            size="lg"
            className="pb-6 text-muted-foreground md:max-w-lg md:pb-8"
          > The Aeros roadmap for bringing mission context and operator knowledge into the tools your team already uses. </P>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              variant="primary"
              size="md"
              label="View reference extension"
              icon={() => (
                <img src="/static/landing/chrome_ext/Chrome.svg" alt="Chrome" />
              )}
              href={CHROME_EXTENSION_URL}
              target="_blank"
              className="w-full sm:w-auto"
            />
            <Button
              variant="outline"
              size="md"
              label="Contact sales"
              href="/home/contact"
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="relative col-span-12 mt-8 py-2 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative w-full max-w-xl xl:max-w-2xl">
              <div className="relative z-10 mx-auto flex w-full items-center justify-center">
                <img
                  src="/static/landing/chrome_ext/Ext_Hero.png"
                  alt="Chrome extension preview showing Dust AI assistant in browser"
                  className="h-auto w-full max-w-lg rounded-2xl object-contain lg:max-w-xl xl:max-w-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
}

function WebAppSidebarSection() {
  return (
    <Grid>
      <div className={GRID_SECTION_CLASSES}>
        <H2 className="text-center"> Operational context alongside your {" "}
          <span className="text-brand-electric-blue"> workflow </span>
        </H2>
        <DemoVideoSection
          demoVideo={{
            videoUrl: CHROME_EXTENSION_VIDEO_URL,
            showCaptions: true,
          }}
        />
      </div>
    </Grid>
  );
}

function ChromeExtensionInActionFor() {
  return (
    <div className={SECTION_CLASSES}>
      <div className={CONTAINER_CLASSES}>
        <H2 className="mb-8 text-center"> Designed around operational roles </H2>

        <Tabs defaultValue={EXTENSION_TABS[0].label}>
          <TabsList border>
            {EXTENSION_TABS.map((t) => (
              <TabsTrigger key={t.label} value={t.label} label={t.label} />
            ))}
          </TabsList>

          {EXTENSION_TABS.map((t) => (
            <TabsContent key={t.label} value={t.label}>
              {/* Content: image left, features right */}
              <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-16">
                <div className="flex-1">
                  <div className="relative w-full overflow-hidden rounded-2xl bg-blue-50">
                    <img
                      src={t.image.src}
                      alt={t.image.alt}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <H3 className="mb-6">{t.heading}</H3>
                  <div className="flex flex-col gap-6">
                    {t.features.map((f, i) => (
                      <div key={i}>
                        <P
                          size="sm"
                          dotCSS={f.dotCSS}
                          shape={f.shape}
                          className="text-foreground"
                        >
                          <strong className="font-semibold">{f.title}</strong>
                          <br />
                          <span className="text-muted-foreground">
                            {f.description}
                          </span>
                        </P>
                        {i < t.features.length - 1 && (
                          <hr className="mt-6 border-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function InstallationSection() {
  return (
    <div className="py-16 md:py-20">
      <div className={CONTAINER_CLASSES}>
        <H2 className="mb-12 text-center"> From workflow to rollout </H2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {INSTALLATION_STEPS.map((step, index) => (
            <div key={index} className="flex w-full flex-col gap-4">
              <div className="w-full overflow-hidden rounded-2xl">
                <img
                  src={step.image.src}
                  alt={step.image.alt}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div>
                <H4 className="mb-2 text-left font-semibold">
                  {step.number} {step.title}
                </H4>
                <P size="sm" className="text-left text-muted-foreground">
                  {step.description}
                </P>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="primary"
            size="md"
            label="View reference extension"
            icon={() => (
              <img src="/static/landing/chrome_ext/Chrome.svg" alt="Chrome" />
            )}
            href={CHROME_EXTENSION_URL}
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
}

// oxlint-disable-next-line dust/nextjsPageComponentNaming -- pre-existing
export default function ChromeExtension() {
  const router = useRouter();

  return (
    <>
      <PageMetadata
        title="Aeros Operational Assistant | Mission Context"
        description="Explore the Aeros operational assistant roadmap: mission context, source evidence, operator knowledge, and cross-team review in existing workflows."
        pathname={router.asPath}
        ogImage="https://dust.tt/static/landing/hero_dust.png"
      />

      <div className="container flex w-full flex-col gap-16 px-2 py-2">
        <HeroSection />
        <WebAppSidebarSection />
        <ChromeExtensionInActionFor />
        <InstallationSection />
        <TrustedBy logoSet="landing" />
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <HomeAIOperatorsCTASection />
        </div>
      </div>
    </>
  );
}

ChromeExtension.getLayout = (
  page: ReactElement,
  pageProps: LandingLayoutProps
) => {
  return <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
};
