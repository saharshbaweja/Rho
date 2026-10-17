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
  uptitle: "Systems & Data",
  title: <> Connect the systems behind the operation. </>,
  accentColor: "text-brand-orange-golden",
  description: (
    <> Plan the data connections that bring schedules, aircraft, crews, aviation sources, and operator knowledge into a consistent mission context. </>
  ),
  bulletPoints: [
    "Scope weather, NOTAM, airport, and airspace feeds by coverage, freshness, and access requirements.",
    "Map schedule, crew, aircraft, and maintenance inputs to the missions they describe.",
    "Make missing, stale, and conflicting inputs visible before a recommendation is reviewed.",
    "Define ownership, permissions, and rollout scope for each operational connection.",
  ],
  image: "/static/landing/it/itHelpdesk.png",
  seo: {
    title: "Aeros for Systems & Data | Mission Intelligence",
    description:
      "Plan the data connections that bring schedules, aircraft, crews, aviation sources, and operator knowledge into a consistent mission context.",
  },
};

export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/it/it1.png",
      alt: "IT Visual 1",
      depth: -30,
    },
    {
      src: "/static/landing/it/it2.png",
      alt: "IT Visual 2",
      depth: -10,
    },
    {
      src: "/static/landing/it/it3.png",
      alt: "IT Visual 3",
      depth: 20,
    },
    {
      src: "/static/landing/it/it4.png",
      alt: "IT Visual 4",
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
  sectionTitle: "Systems & Data, with the mission in view",
  items: [
    {
      icon: MagicWand02,
      title: "Understand the mission",
      description:
        "Plan the data connections that bring schedules, aircraft, crews, aviation sources, and operator knowledge into a consistent mission context.",
    },
    {
      icon: CheckCircle,
      title: "Evaluate the impact",
      description:
        "Map schedule, crew, aircraft, and maintenance inputs to the missions they describe.",
    },
    {
      icon: Users01,
      title: "Coordinate the response",
      description:
        "Define ownership, permissions, and rollout scope for each operational connection.",
    },
  ],
};

export const Metrics: MetricProps = {
  metrics: [
    {
      value: "Context",
      description: (
        <> The mission, its constraints, and the <br /> changes that matter. </>
      ),
    },
    {
      value: "Evidence",
      description: (
        <>
          {" "} The sources, assumptions, and human <br /> review behind the response. </>
      ),
    },
  ],
  color: "golden",
};

export const UseCases: UseCaseProps = {
  sectionTitle: "Systems & Data workflows",
  sectionDescription:
    "The Aeros roadmap for systems & data, from assessment to coordinated action.",
  items: [
    {
      title: "Aviation sources",
      content:
        "Scope weather, NOTAM, airport, and airspace feeds by coverage, freshness, and access requirements.",
      images: ["/static/landing/it/itHelpdesk.png"],
    },
    {
      title: "Operational systems",
      content:
        "Map schedule, crew, aircraft, and maintenance inputs to the missions they describe.",
      images: ["/static/landing/it/itOps.png"],
    },
    {
      title: "Data quality",
      content:
        "Make missing, stale, and conflicting inputs visible before a recommendation is reviewed.",
      images: ["/static/landing/it/procureHelp.png"],
    },
    {
      title: "Integration governance",
      content:
        "Define ownership, permissions, and rollout scope for each operational connection.",
      images: ["/static/landing/it/itInsights.png"],
    },
  ],
};

export const Quote: QuoteProps = {
  quote:
    "One of the things that impressed me about Dust is that all the use cases around internal and external support for teams who need to maintain processes are impressive. Being able to call an agent that parses all the knowledge is a huge pain reliever.",
  name: "Raphael Brousse ",
  title: "Dust customer reference · VP Operations at Lifen",
  logo: "/static/landing/logos/color/lifen.png",
};

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference workflow demonstration",
  videoUrl: "https://fast.wistia.net/embed/iframe/4a4bjtxdpf",
  showCaptions: true,
};

export const Stories: CustomerStory[] = [
  {
    title: "Dust reference: Lifen Saves Two Hours per Week per Employee with Dust", // Soon to be replaced with Clay for RFP?
    content:
      "Lifen uses Dust AI agents to boost team productivity and save hours of work each week.",
    href: "/customers/customer-story-lifen",
    src: "https://blog.dust.tt/content/images/size/w2000/2024/11/lifen_dust_customer_story.jpg",
  },
  {
    title: "Dust reference: 20%+ productivity gains in Sales: Insights from Alan and Payfit",
    content:
      "Dust agents significantly lowered their acquisition costs, allowing them to hire more salespeople.",
    href: "/customers/generative-ai-insights-alan-payfit-leaders",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/01/Founder.jpg",
  },
  {
    title: "Dust reference: Kyriba's RFP Agent for improving pre-sales efficiency",
    content:
      "43% of Kyriba employees save more than 3 hours weekly leveraging Dust for RFPs.",
    href: "/customers/kyriba-accelerating-innovation-with-dust",
    src: "https://blog.dust.tt/content/images/size/w2000/2024/10/kyriba_dust.jpg",
  },
];
