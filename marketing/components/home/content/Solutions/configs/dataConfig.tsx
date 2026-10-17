import { CheckCircle, MagicWand02, Rocket02, Users01 } from "@dust-tt/sparkle";
import type {
  BenefitsProps,
  MetricProps,
} from "@marketing/components/home/content/Solutions/BenefitsSection";
import type {
  CustomerStory,
  QuoteProps,
} from "@marketing/components/home/content/Solutions/CustomerStoriesSection";
import type { DemoVideoProps } from "@marketing/components/home/content/Solutions/DemoVideoSection";
import type { UseCaseProps } from "@marketing/components/home/content/Solutions/UseCasesSection";
import type {
  HeroProps,
  pageSettingsProps,
} from "@marketing/components/home/content/Solutions/configs/utils";

// Config exports
export const pageSettings: pageSettingsProps = {
  uptitle: "Network & Recovery",
  title: <> Resolve disruption with the whole network in view. </>,
  accentColor: "text-brand-red-rose",
  description: (
    <> Compare recovery paths across flights, aircraft rotations, crews, and airports. Make the downstream effect of each option visible before choosing the next move. </>
  ),
  bulletPoints: [
    "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
    "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
    "Review time, fuel, crew, and passenger considerations where the required data is available.",
    "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
  ],
  image: "/static/landing/data-analytics/analyst.png",
  seo: {
    title: "Aeros for Network & Recovery | Mission Intelligence",
    description:
      "Compare recovery paths across flights, aircraft rotations, crews, and airports. Make the downstream effect of each option visible before choosing the next move.",
  },
};

export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/data-analytics/data1.png",
      alt: "Data Visual 1",
      depth: -30,
    },
    {
      src: "/static/landing/data-analytics/data2.png",
      alt: "Data Visual 2",
      depth: -10,
    },
    {
      src: "/static/landing/data-analytics/data3.png",
      alt: "Data Visual 3",
      depth: 20,
    },
    {
      src: "/static/landing/data-analytics/data4.png",
      alt: "Data Visual 4",
      depth: 50,
    },
  ],
  ctaButtons: {
    primary: {
      label: "Explore Aeros",
      href: "/home/pricing",
      icon: Rocket02,
    },
    secondary: {
      label: "Request a demo",
      href: "/home/contact",
    },
  },
};

export const Benefits: BenefitsProps = {
  sectionTitle: "Network & Recovery, with the mission in view",
  items: [
    {
      icon: MagicWand02,
      title: "Understand the mission",
      description:
        "Compare recovery paths across flights, aircraft rotations, crews, and airports. Make the downstream effect of each option visible before choosing the next move.",
    },
    {
      icon: CheckCircle,
      title: "Evaluate the impact",
      description:
        "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
    },
    {
      icon: Users01,
      title: "Coordinate the response",
      description:
        "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
    },
  ],
};

export const Metrics: MetricProps = {
  metrics: [
    {
      value: "Context",
      description: <> The mission, its constraints, and the changes that matter. </>,
    },
    {
      value: "Evidence",
      description: <> The sources, assumptions, and human review behind the response. </>,
    },
  ],
  color: "golden",
};

export const UseCases: UseCaseProps = {
  sectionTitle: "Network & Recovery workflows",
  sectionDescription:
    "The Aeros roadmap for network & recovery, from assessment to coordinated action.",
  items: [
    {
      title: "Network impact",
      content:
        "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
      images: ["/static/landing/data-analytics/analyst.png"],
    },
    {
      title: "Recovery scenarios",
      content:
        "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
      images: ["/static/landing/data-analytics/sqlWriter.png"],
    },
    {
      title: "Operational tradeoffs",
      content:
        "Review time, fuel, crew, and passenger considerations where the required data is available.",
      images: ["/static/landing/data-analytics/dataCatalog.png"],
    },
    {
      title: "Decision handover",
      content:
        "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
      images: ["/static/landing/data-analytics/dataDoc.png"],
    },
  ],
};

export const Quote: QuoteProps = {
  quote:
    "Dust has revolutionized our partner insights, condensing days of manual research into minutes of AI-powered conversation. It's not just about efficiency and time savings—it's about making smarter decisions and doing things we could not do before.",
  name: "Alexandre Morillon",
  title: "Dust customer reference · CEO at Wakam",
  logo: "/static/landing/logos/color/wakam.svg",
};

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference workflow demonstration",
  videoUrl: "https://fast.wistia.net/embed/iframe/9u1uft5pg7",
  showCaptions: true,
};

export const Stories: CustomerStory[] = [
  {
    title: "Dust reference: Wakam enables self-service analytics across 220 users",
    content:
      "Wakam breaks down data silos with specialized AI agents, reducing partner intelligence processing by 90% and democratizing data access company-wide.",
    href: "/customers/wakam-empowers-teams-with-self-service-data-intelligence-while-reducing-processing-time",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Wakam.jpg",
  },
  {
    title: "Dust reference: Alan eliminates data queues and expands data insights with Dust",
    content:
      "Alan's @Metabase agent reduces query development time from hours to minutes, achieving a growing 60% weekly usage in their Operations team.",
    href: "/customers/the-end-of-data-queues-how-alan-scaled-analytics-with-dust-2",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Alan-__-Dust-1.jpg",
  },
  // {
  //   title: "Lifen uses Dust AI agents to boost team productivity", // Soon to be replaced with Clay for RFP?
  //   content:
  //     "Lifen uses Dust AI agents to boost team productivity and save hours of work each week.",
  //   href: "/customers/customer-story-lifen",
  //   src: "https://blog.dust.tt/content/images/size/w2000/2024/11/lifen_dust_customer_story.jpg",
  // },
];
