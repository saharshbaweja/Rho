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
  uptitle: "Safety & Compliance",
  title: <> Make every assessment open to review. </>,
  accentColor: "text-brand-electric-blue",
  description: (
    <> Connect applicable rules, operator procedures, source evidence, and decision ownership so teams can review the basis for an operational recommendation. </>
  ),
  bulletPoints: [
    "Bring the applicable operator procedure and operating restriction into the mission assessment.",
    "Inspect the source, effective period, and reasoning behind a flagged condition.",
    "Keep required operational approvals with the authorized people and roles.",
    "Retain the assessment, human review, and selected action as part of the mission history.",
  ],
  image: "/static/landing/legal/legalreviewer.png",
  seo: {
    title: "Aeros for Safety & Compliance | Mission Intelligence",
    description:
      "Connect applicable rules, operator procedures, source evidence, and decision ownership so teams can review the basis for an operational recommendation.",
  },
};

export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/legal/legal1.png",
      alt: "Legal Visual 1",
      depth: -30,
    },
    {
      src: "/static/landing/legal/legal2.png",
      alt: "Legal Visual 2",
      depth: -10,
    },
    {
      src: "/static/landing/legal/legal3.png",
      alt: "Legal Visual 3",
      depth: 20,
    },
    {
      src: "/static/landing/legal/legal4.png",
      alt: "Legal Visual 4",
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
  sectionTitle: "Safety & Compliance, with the mission in view",
  items: [
    {
      icon: MagicWand02,
      title: "Understand the mission",
      description:
        "Connect applicable rules, operator procedures, source evidence, and decision ownership so teams can review the basis for an operational recommendation.",
    },
    {
      icon: CheckCircle,
      title: "Evaluate the impact",
      description:
        "Inspect the source, effective period, and reasoning behind a flagged condition.",
    },
    {
      icon: Users01,
      title: "Coordinate the response",
      description:
        "Retain the assessment, human review, and selected action as part of the mission history.",
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
  sectionTitle: "Safety & Compliance workflows",
  sectionDescription:
    "The Aeros roadmap for safety & compliance, from assessment to coordinated action.",
  items: [
    {
      title: "Rule context",
      content:
        "Bring the applicable operator procedure and operating restriction into the mission assessment.",
      images: ["/static/landing/legal/asklegal.png"],
    },
    {
      title: "Evidence review",
      content:
        "Inspect the source, effective period, and reasoning behind a flagged condition.",
      images: ["/static/landing/legal/legalreviewer.png"],
    },
    {
      title: "Approval ownership",
      content:
        "Keep required operational approvals with the authorized people and roles.",
      images: ["/static/landing/legal/regulatorywatch.png"],
    },

    {
      title: "Decision record",
      content:
        "Retain the assessment, human review, and selected action as part of the mission history.",
      images: ["/static/landing/legal/contractwriter.png"],
    },
  ],
};

export const Quote: QuoteProps = {
  quote:
    "Dust transformed our privacy reviews. It handles compliance checks, suggests improvements, and drafts communications. It both cuts our review time and helps pressure-test our legal interpretations.",
  name: "Thomas Adhumeau",
  title: "Dust customer reference · Chief Privacy Officer at Didomi",
  logo: "/static/landing/logos/color/didomi.png",
};

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference workflow demonstration",
  videoUrl: "https://fast.wistia.net/embed/iframe/zzbhe95pvz",
  showCaptions: true,
};

export const Stories: CustomerStory[] = [
  {
    title: "Dust reference: Wakam cuts legal contract analysis time by 50% with Dust",
    content:
      "How Wakam developed specialized AI agents to automate contract analysis, data extraction, and regulatory monitoring.",
    href: "/customers/how-wakam-cut-legal-contract-analysis-time-by-50-with-dust",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Wakam_Dust.png",
  },
  {
    title:
      "Dust reference: 50% Time Savings in Legal: How Didomi's CPO Transformed Privacy Compliance",
    content:
      "Dust AI agents cut their legal team's workload in half, enabling them to scale operations across multiple countries without additional headcount.",
    href: "/customers/how-thomas-uses-ai-assistants-to-manage-legal-and-data-privacy-at-didomi",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Didomi-__-Dust.jpg",
  },
  {
    title:
      "Dust reference: 50,000 Hours Saved: How Qonto Revolutionized Compliance and Risk Assessment with AI",
    content:
      "Germi, Qonto's AI assistant, analyzes German industry codes and screens prohibited activities, automating compliance checks across European markets.",
    href: "/customers/qonto-dust-ai-partnership",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Qonto-__-Dust.jpg",
  },
];
