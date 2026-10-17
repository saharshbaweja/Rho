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
  uptitle: "Operations Leadership",
  title: <> Turn operational reviews into shared learning. </>,
  accentColor: "text-brand-hunter-green",
  description: (
    <> Bring recurring disruptions, decision context, and cross-team actions into focus so leaders can improve how the operation responds. </>
  ),
  bulletPoints: [
    "Review the missions requiring attention and the constraints driving the current plan.",
    "Understand the alternatives considered, the evidence available, and the selected response.",
    "Keep open actions and decision responsibilities clear across dispatch, crew, and maintenance.",
    "Use mission reviews to identify data gaps, recurring constraints, and procedures that need attention.",
  ],
  image: "/static/landing/productivity/contentoptimizer.png",
  seo: {
    title: "Aeros for Operations Leadership | Mission Intelligence",
    description:
      "Bring recurring disruptions, decision context, and cross-team actions into focus so leaders can improve how the operation responds.",
  },
};

export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/productivity/productivity1.png",
      alt: "Productivity Visual 1",
      depth: -30,
    },
    {
      src: "/static/landing/productivity/productivity2.png",
      alt: "Productivity Visual 2",
      depth: -10,
    },
    {
      src: "/static/landing/productivity/productivity3.png",
      alt: "Productivity Visual 3",
      depth: 20,
    },
    {
      src: "/static/landing/productivity/productivity4.png",
      alt: "Productivity Visual 4",
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
  sectionTitle: "Operations Leadership, with the mission in view",
  items: [
    {
      icon: MagicWand02,
      title: "Understand the mission",
      description:
        "Bring recurring disruptions, decision context, and cross-team actions into focus so leaders can improve how the operation responds.",
    },
    {
      icon: CheckCircle,
      title: "Evaluate the impact",
      description:
        "Understand the alternatives considered, the evidence available, and the selected response.",
    },
    {
      icon: Users01,
      title: "Coordinate the response",
      description:
        "Use mission reviews to identify data gaps, recurring constraints, and procedures that need attention.",
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
  sectionTitle: "Operations Leadership workflows",
  sectionDescription:
    "The Aeros roadmap for operations leadership, from assessment to coordinated action.",
  items: [
    {
      title: "Operational overview",
      content:
        "Review the missions requiring attention and the constraints driving the current plan.",
      images: ["/static/landing/productivity/leadershipmeetingrecap.png"],
    },
    {
      title: "Decision review",
      content:
        "Understand the alternatives considered, the evidence available, and the selected response.",
      images: ["/static/landing/productivity/blogdigest.png"],
    },
    {
      title: "Cross-team ownership",
      content:
        "Keep open actions and decision responsibilities clear across dispatch, crew, and maintenance.",
      images: ["/static/landing/productivity/contentoptimizer.png"],
    },
    {
      title: "Process improvement",
      content:
        "Use mission reviews to identify data gaps, recurring constraints, and procedures that need attention.",
      images: ["/static/landing/productivity/discoverycoach.png"],
    },
  ],
};

export const Quote: QuoteProps = {
  quote:
    "The Dust platform is more than just a tool for post-ideation; it's a catalyst for innovation, stimulating idea generation as employees engage with it.",
  name: "Boris Lipiainen",
  title: "Dust customer reference · Chief Product and Technology Officer at Kyriba",
  logo: "/static/landing/logos/color/kyriba.png",
};

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference workflow demonstration",
  videoUrl: "https://fast.wistia.net/embed/iframe/rnyvpdxfrk",
  showCaptions: true,
};

export const Stories: CustomerStory[] = [
  {
    title: "Dust reference: Kyriba's adoption of Dust across all functions",
    content:
      "43% of Kyriba employees save more than 3 hours weekly leveraging Dust for RFPs.",
    href: "/customers/kyriba-accelerating-innovation-with-dust",
    src: "https://blog.dust.tt/content/images/size/w2000/2024/10/kyriba_dust.jpg",
  },
  {
    title:
      "Dust reference: PayFit Accelerates Content Creation and Knowledge Sharing with Dust",
    content:
      "PayFit leverages Dust AI assistants to improve their internal processes across the board.",
    href: "/customers/dust-ai-payfit-efficiency",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/01/dust_payfit.png",
  },
  {
    title: "Dust reference: November Five's journey to minimizing routine tasks with Dust",
    content:
      "Discover how November Five accelerates work with Dust, turning 3-hour tasks into 30 minutes.",
    href: "/customers/november-five-ai-transformation-dust",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/01/dust_november_five.png",
  },
];
