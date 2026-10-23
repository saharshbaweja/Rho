import {
  ProductDetails,
  ProductQuestions,
} from "@marketing/components/home/content/Product/ProductDetails";
import type { LandingLayoutProps } from "@marketing/components/home/LandingLayout";
import LandingLayout from "@marketing/components/home/LandingLayout";
import { PageMetadata } from "@marketing/components/home/PageMetadata";
import { CapabilitySection } from "@marketing/components/home/content/Product/CapabilitySection";
import { InteractiveFeaturesSection } from "@marketing/components/home/content/Product/InteractiveFeaturesSection";
import { ProductIntroSection } from "@marketing/components/home/content/Product/ProductIntroSection";
import { ProductVideoSection } from "@marketing/components/home/content/Product/ProductVideoSection";
import { SecurityFeaturesSection } from "@marketing/components/home/content/Product/SecurityFeaturesSection";
import type { SecurityFeature } from "@marketing/components/home/content/Product/SecurityFeaturesSection";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

const CAPABILITY_FEATURES: SecurityFeature[] = [
  {
    id: "org-intelligence",
    title: "Aeros Dispatch",
    description:
      "Turn natural-language objectives into mission plans, assign available drones, and coordinate execution through connected fleet providers.",
    placeholder: "",
  },
  {
    id: "collaboration",
    title: "Aeros Readiness",
    description:
      "Interpret weather, airspace notices, launch-site information, aircraft limitations, and operator procedures against each mission.",
    placeholder: "",
  },
  {
    id: "activation",
    title: "Aeros Alert",
    description:
      "Focus attention on changes that affect the mission, with the relevant condition, timing, and evidence attached.",
    placeholder: "",
  },
];

const MODEL_FEATURES: SecurityFeature[] = [
  {
    id: "flexibility",
    title: "Aeros Plan",
    description:
      "Compare routes, mission windows, and alternate sites against the operating constraints and data available.",
    placeholder: "",
  },
  {
    id: "cost",
    title: "Aeros Recover",
    description:
      "Evaluate delay, return-to-base, aircraft reassignment, and provider recovery options with dependent missions in view.",
    placeholder: "",
  },
  {
    id: "sovereignty",
    title: "Aeros Report",
    description:
      "Return mission coverage, flagged assets, exceptions, and completion status to your work-order and reporting workflows.",
    placeholder: "",
  },
];

const GOVERN_FEATURES: SecurityFeature[] = [
  {
    id: "security",
    title: "Aeros Coordinate",
    description:
      "Bring dispatch, remote pilots, operator scheduling, and maintenance into a shared mission review with clear action ownership.",
    placeholder: "",
  },
  {
    id: "observability",
    title: "Aeros Evidence",
    description:
      "Keep conclusions connected to source material, effective periods, operator rules, and unresolved assumptions.",
    placeholder: "",
  },
  {
    id: "cost-control",
    title: "Aeros Control",
    description:
      "Keep operational authority, access, approvals, and decision history with the people responsible for the mission.",
    placeholder: "",
  },
];

export async function getStaticProps() {
  return {
    props: {
      shape: 0,
      gtmTrackingId: process.env.NEXT_PUBLIC_GTM_TRACKING_ID ?? null,
    },
  };
}

export function Landing() {
  const router = useRouter();

  return (
    <>
      <PageMetadata
        title="Aeros Product | Drone Dispatch & Orchestration"
        description="Explore natural-language drone dispatch, fleet readiness, mission orchestration, exception recovery, operator oversight, and results reporting."
        pathname={router.asPath}
      />
      {/* Single section child: keeps the LandingLayout container gap from
          stacking between every block (same structure as the homepage). */}
      <section className="w-full">
        <div className="flex flex-col">
          <ProductIntroSection />
          <ProductVideoSection />
          <CapabilitySection />
          <ProductDetails detailed />
          <SecurityFeaturesSection
            showHeader={false}
            reverse
            features={CAPABILITY_FEATURES}
            film="fleet-readiness"
            imageAlt="Aeros mission readiness connecting weather, aircraft, payload, and operator constraints"
            accordionTitle="Monitor the mission. Understand the change."
          />
          <SecurityFeaturesSection
            showHeader={false}
            features={MODEL_FEATURES}
            film="mission-recovery"
            imageAlt="Aeros recovery review comparing reassignment, delay, and return-to-base options"
            accordionTitle="Compare the options. See the tradeoffs."
          />
          <SecurityFeaturesSection
            showHeader={false}
            reverse
            features={GOVERN_FEATURES}
            film="mission-story"
            imageAlt="Aeros decision record with source evidence, team checks, and dispatcher approval"
            accordionTitle="Coordinate the response. Keep people in control."
          />
          <InteractiveFeaturesSection />
          <ProductQuestions />
        </div>
      </section>
    </>
  );
}

// oxlint-disable-next-line dust/nextjsPageComponentNaming -- pre-existing
export default function Home() {
  return <Landing />;
}

Home.getLayout = (page: ReactElement, pageProps: LandingLayoutProps) => {
  return <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
};
