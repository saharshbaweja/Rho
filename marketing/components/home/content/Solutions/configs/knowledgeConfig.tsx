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
  uptitle: "Operational Knowledge",
  title: <> Put operator knowledge inside the decision. </>,
  accentColor: "text-brand-hunter-green",
  description: (
    <> Bring manuals, airport information, local procedures, and company operating limits into mission reviews with clear source references. </>
  ),
  bulletPoints: [
    "Find relevant passages in approved manuals and procedures without losing the source context.",
    "Read published airport information alongside temporary restrictions and mission timing.",
    "Keep company-specific restrictions and approved operating policies in the assessment.",
    "Show where a conclusion came from, when it applies, and which inputs still need verification.",
  ],
  image: "/static/landing/knowledge/askacme.png",
  seo: {
    title: "Aeros for Operational Knowledge | Mission Intelligence",
    description:
      "Bring manuals, airport information, local procedures, and company operating limits into mission reviews with clear source references.",
  },
};

export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/knowledge/knowledge1.png",
      alt: "Knowledge Visual 1",
      depth: -30,
    },
    {
      src: "/static/landing/knowledge/knowledge2.png",
      alt: "Knowledge Visual 2",
      depth: -10,
    },
    {
      src: "/static/landing/knowledge/knowledge3.png",
      alt: "Knowledge Visual 3",
      depth: 20,
    },
    {
      src: "/static/landing/knowledge/knowledge4.png",
      alt: "Knowledge Visual 4",
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
  sectionTitle: "Operational Knowledge, with the mission in view",
  items: [
    {
      icon: MagicWand02,
      title: "Understand the mission",
      description:
        "Bring manuals, airport information, local procedures, and company operating limits into mission reviews with clear source references.",
    },
    {
      icon: CheckCircle,
      title: "Evaluate the impact",
      description:
        "Read published airport information alongside temporary restrictions and mission timing.",
    },
    {
      icon: Users01,
      title: "Coordinate the response",
      description:
        "Show where a conclusion came from, when it applies, and which inputs still need verification.",
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
  sectionTitle: "Operational Knowledge workflows",
  sectionDescription:
    "The Aeros roadmap for operational knowledge, from assessment to coordinated action.",
  items: [
    {
      title: "Procedure research",
      content:
        "Find relevant passages in approved manuals and procedures without losing the source context.",
      images: ["/static/landing/knowledge/askacme.png"],
    },
    {
      title: "Airport context",
      content:
        "Read published airport information alongside temporary restrictions and mission timing.",
      images: ["/static/landing/knowledge/productexpert.png"],
    },
    {
      title: "Operator limits",
      content:
        "Keep company-specific restrictions and approved operating policies in the assessment.",
      images: ["/static/landing/knowledge/projectstatus.png"],
    },
    {
      title: "Source traceability",
      content:
        "Show where a conclusion came from, when it applies, and which inputs still need verification.",
      images: ["/static/landing/knowledge/aidigest.png"],
    },
  ],
};

export const Quote: QuoteProps = {
  quote:
    "It became evident that Dust could serve as a knowledgeable buddy for all staff, enhancing productivity whether you're newly onboarded or a veteran team member.",
  name: "Boris Lipiainen",
  title: "Dust customer reference · Chief Product and Technology Officer at Kyriba",
  logo: "/static/landing/logos/color/kyriba.png",
};

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference workflow demonstration",
  videoUrl: "https://fast.wistia.net/embed/iframe/qtnvwgyt0o",
  showCaptions: true,
};

export const Stories: CustomerStory[] = [
  {
    title: "Dust reference: Clay creates scalable knowledge hub with Dust AI agents",
    content:
      "Clay uses Dust AI agents to solve team scaling challenges with instant knowledge access for rapid growth.",
    href: "/customers/clay-scaling-gtme-team",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/06/clay_dust_agents.jpg",
  },
  {
    title: "Dust reference: Kyriba's adoption of Dust across all functions",
    content:
      "43% of Kyriba employees save more than 3 hours weekly leveraging Dust for RFPs.",
    href: "/customers/kyriba-accelerating-innovation-with-dust",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Kyriba-__-Dust.png",
  },
  {
    title:
      "Dust reference: PayFit Accelerates Content Creation and Knowledge Sharing with Dust",
    content:
      "PayFit leverages Dust AI assistants to improve their internal processes across the board.",
    href: "/customers/dust-ai-payfit-efficiency",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Payfit-__-Dust.png",
  },
  {
    title: "Dust reference: November Five's journey to minimizing routine tasks with Dust",
    content:
      "Discover how November Five accelerates work with Dust, turning 3-hour tasks into 30 minutes.",
    href: "/customers/november-five-ai-transformation-dust",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Pennylane-__-Dust-1.jpg",
  },
];
