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
    title: "Aeros Monitor",
    description:
      "Follow missions, airport conditions, route weather, and airspace changes in one operational context.",
    placeholder: "",
  },
  {
    id: "collaboration",
    title: "Aeros Assess",
    description:
      "Interpret weather, NOTAMs, airport information, aircraft limitations, and operator procedures against each mission.",
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
      "Compare routes, departure windows, and alternates against the operating constraints and data available.",
    placeholder: "",
  },
  {
    id: "cost",
    title: "Aeros Recover",
    description:
      "Evaluate delay, diversion, aircraft substitution, and crew recovery options with later legs in view.",
    placeholder: "",
  },
  {
    id: "sovereignty",
    title: "Aeros Optimize",
    description:
      "Explore route, altitude, and timing tradeoffs with fuel, time, weather, and operational priorities considered together.",
    placeholder: "",
  },
];

const GOVERN_FEATURES: SecurityFeature[] = [
  {
    id: "security",
    title: "Aeros Coordinate",
    description:
      "Bring dispatch, pilots, crew scheduling, and maintenance into a shared mission review with clear action ownership.",
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
        title="Aeros Product | Mission Intelligence for Flight Operations"
        description="Explore the Aeros product roadmap: mission monitoring, operational assessment, contextual alerts, planning, recovery, optimization, and human decision control."
        pathname={router.asPath}
      />
      {/* Single section child: keeps the LandingLayout container gap from
          stacking between every block (same structure as the homepage). */}
      <section className="w-full">
        <div className="flex flex-col">
          <ProductIntroSection />
          <ProductVideoSection />
          <CapabilitySection />
          <SecurityFeaturesSection
            showHeader={false}
            reverse
            features={CAPABILITY_FEATURES}
            imageSrc="/static/landing/product/aeros-mission-assessment.svg"
            imageAlt="Aeros mission assessment connecting weather, aircraft limitations, and crew impact"
            accordionTitle="Monitor the mission. Understand the change."
          />
          <SecurityFeaturesSection
            showHeader={false}
            features={MODEL_FEATURES}
            imageSrc="/static/landing/product/aeros-recovery-options.svg"
            imageAlt="Aeros recovery review comparing departure, alternate, and routing options"
            accordionTitle="Compare the options. See the tradeoffs."
          />
          <SecurityFeaturesSection
            showHeader={false}
            reverse
            features={GOVERN_FEATURES}
            imageSrc="/static/landing/product/aeros-decision-control.svg"
            imageAlt="Aeros decision record with source evidence, team checks, and dispatcher approval"
            accordionTitle="Coordinate the response. Keep people in control."
          />
          <InteractiveFeaturesSection />
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
