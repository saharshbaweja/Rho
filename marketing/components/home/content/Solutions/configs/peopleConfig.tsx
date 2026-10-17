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
  uptitle: "Flight Deck & Crew",
  title: <> Give the flight deck the operational context. </>,
  accentColor: "text-brand-red-rose",
  description: (
    <> Keep pilots and crew aligned with dispatch on changing conditions, mission constraints, and the options under review. </>
  ),
  bulletPoints: [
    "Prepare concise mission updates with weather, airport restrictions, and relevant operating conditions.",
    "Give dispatch and the flight deck a consistent view of the condition and its operational impact.",
    "Organize updates around the affected flight and the action that needs review.",
  ],
  image: "/static/landing/hr/askhr.png",
  seo: {
    title: "Aeros for Flight Deck & Crew | Mission Intelligence",
    description:
      "Keep pilots and crew aligned with dispatch on changing conditions, mission constraints, and the options under review.",
  },
};

export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/hr/hr1.png",
      alt: "HR Visual 1",
      depth: -30,
    },
    {
      src: "/static/landing/hr/hr2.png",
      alt: "HR Visual 2",
      depth: -10,
    },
    {
      src: "/static/landing/hr/hr3.png",
      alt: "HR Visual 3",
      depth: 20,
    },
    {
      src: "/static/landing/hr/hr4.png",
      alt: "HR Visual 4",
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
  sectionTitle: "Flight Deck & Crew, with the mission in view",
  items: [
    {
      icon: MagicWand02,
      title: "Understand the mission",
      description:
        "Keep pilots and crew aligned with dispatch on changing conditions, mission constraints, and the options under review.",
    },
    {
      icon: CheckCircle,
      title: "Evaluate the impact",
      description:
        "Give dispatch and the flight deck a consistent view of the condition and its operational impact.",
    },
    {
      icon: Users01,
      title: "Coordinate the response",
      description:
        "Support crew judgment with evidence while preserving established command and approval responsibilities.",
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
  sectionTitle: "Flight Deck & Crew workflows",
  sectionDescription:
    "The Aeros roadmap for flight deck & crew, from assessment to coordinated action.",
  items: [
    {
      title: "Crew briefing",
      content:
        "Prepare concise mission updates with weather, airport restrictions, and relevant operating conditions.",
      images: ["/static/landing/hr/askhr.png"],
    },
    {
      title: "Shared assessment",
      content:
        "Give dispatch and the flight deck a consistent view of the condition and its operational impact.",
      images: ["/static/landing/hr/interviewnotes.png"],
    },
    {
      title: "Change communication",
      content:
        "Organize updates around the affected flight and the action that needs review.",
      images: ["/static/landing/hr/reviewhelper.png"],
    },
    {
      title: "Human authority",
      content:
        "Support crew judgment with evidence while preserving established command and approval responsibilities.",
      images: ["/static/landing/hr/onboardingbuddy.png"],
    },
  ],
};

export const Quote: QuoteProps = {
  quote:
    "We asked ourselves for years: what if your team had 20% more time? Dust has made it possible, empowering our employees to work smarter, innovate, and push boundaries.",
  name: "Matthieu Birach",
  title: "Dust customer reference · Chief People Officer at Doctolib",
  logo: "/static/landing/logos/color/doctolib.png",
};

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference workflow demonstration",
  videoUrl: "https://fast.wistia.net/embed/iframe/eu73efeak9",
  showCaptions: true,
};

export const Stories: CustomerStory[] = [
  {
    title: "Dust reference: Creating an AI-first culture at Doctolib: the People team's role",
    content:
      "Doctolib's People team laid the foundations for AI transformation, driving 70% weekly usage across 3,000 employees through cultural change.",
    href: "/customers/why-doctolib-made-company-wide-enterprise-ai-a-national-cause",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Doctolib-__-Dust---Part-1.jpg",
  },
  {
    title: "Dust reference: 30% time savings in HR: How Alan's People team scaled with Dust",
    content:
      "Alan's HR team quadrupled AI adoption and saved 30% of time spent on employee queries by deploying custom Dust agents for people operations.",
    href: "/customers/how-lucas-people-analyst-at-alan-introduced-dust-to-his-hr-team",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Alan-__-Dust-1--1-.png",
  },
  {
    title: "Dust reference: Clay accelerates team onboarding with Dust AI agents",
    content:
      "Clay uses Dust AI agents to onboard new GTM engineers faster and reduce bottlenecks, achieving 100% adoption and saving 58 hours monthly across their growing team",
    href: "/customers/clay-scaling-gtme-team",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/06/clay_dust_agents.jpg",
  },
];
