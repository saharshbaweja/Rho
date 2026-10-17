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
  ROIProps,
} from "@marketing/components/home/content/Solutions/configs/utils";

// Config exports
export const pageSettings: pageSettingsProps = {
  uptitle: "Maintenance Control",
  title: <> Understand what aircraft status means for the flight. </>,
  accentColor: "text-brand-electric-blue",
  description: (
    <> Connect aircraft readiness, deferred defects, station support, and maintenance windows to the missions and rotations they affect. </>
  ),
  bulletPoints: [
    "Review aircraft status, open items, and mission requirements in one operational context.",
    "Connect MEL conditions and deferred items to route requirements and available station equipment.",
    "Show how aircraft availability and maintenance timing affect the operating schedule.",
    "Assess aircraft substitution and repositioning options before the team commits to a recovery plan.",
  ],
  image: "/static/landing/engineering/incidentHandling.png",
  seo: {
    title: "Aeros for Maintenance Control | Mission Intelligence",
    description:
      "Connect aircraft readiness, deferred defects, station support, and maintenance windows to the missions and rotations they affect.",
  },
};

export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/engineering/eng1.png",
      alt: "Engineering Visual 1",
      depth: -30,
    },
    {
      src: "/static/landing/engineering/eng2.png",
      alt: "Engineering Visual 2",
      depth: -10,
    },
    {
      src: "/static/landing/engineering/eng3.png",
      alt: "Engineering Visual 3",
      depth: 20,
    },
    {
      src: "/static/landing/engineering/eng4.png",
      alt: "Engineering Visual 4",
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
  sectionTitle: "Maintenance Control, with the mission in view",
  items: [
    {
      icon: MagicWand02,
      title: "Understand the mission",
      description:
        "Connect aircraft readiness, deferred defects, station support, and maintenance windows to the missions and rotations they affect.",
    },
    {
      icon: CheckCircle,
      title: "Evaluate the impact",
      description:
        "Connect MEL conditions and deferred items to route requirements and available station equipment.",
    },

    {
      icon: Users01,
      title: "Coordinate the response",
      description: "Assess aircraft substitution and repositioning options before the team commits to a recovery plan.",
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
  sectionTitle: "Maintenance Control workflows",
  sectionDescription:
    "The Aeros roadmap for maintenance control, from assessment to coordinated action.",
  items: [
    {
      title: "Aircraft readiness",
      content:
        "Review aircraft status, open items, and mission requirements in one operational context.",
      images: ["/static/landing/engineering/debuggingAgent.png"],
    },
    {
      title: "Deferred defect impact",
      content:
        "Connect MEL conditions and deferred items to route requirements and available station equipment.",
      images: ["/static/landing/engineering/incidentHandling.png"],
    },
    {
      title: "Maintenance windows",
      content:
        "Show how aircraft availability and maintenance timing affect the operating schedule.",
      images: ["/static/landing/engineering/autoreview.png"],
    },
    {
      title: "Aircraft recovery",
      content:
        "Assess aircraft substitution and repositioning options before the team commits to a recovery plan.",
      images: ["/static/landing/engineering/teamUpdates.png"],
    },
  ],
};

export const ROI: ROIProps = {
  number: "Review",
  subtitle: "Illustrative reference asset; not an Aeros performance result.",
  logo: "/static/landing/logos/gray/alan.png",
};

export const Quote: QuoteProps = {
  quote:
    "It's really become a reflex now to ask a Dust agent. With just two keystrokes, it instantly surfaces exactly the context I need - whether from code, documentation, or overlooked team discussions.",
  name: "Vincent Delagabbe",
  title: "Dust customer reference · Software Engineer at Alan",
  logo: "/static/landing/logos/color/alan.png",
};

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference workflow demonstration",
  videoUrl: "https://fast.wistia.net/embed/iframe/6z5rtwsuvo",
  showCaptions: true,
};

export const Stories: CustomerStory[] = [
  {
    title: "Dust reference: Alan's engineering team speeds up projects 20% with Dust",
    content:
      "Alan uses Dust to improve efficiency in the context of an expanding codebase and documentation.",
    href: "/customers/integrating-ai-workflows-alan",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Alan-__-Dust-1--1--1.png",
  },
  // {
  //   title: "November Five's journey to minimizing routine tasks with Dust",
  //   content:
  //     "Discover how November Five accelerates work with Dust, turning 3-hour tasks into 30 minutes.",
  //   href: "/customers/november-five-ai-transformation-dust",
  //   src: "https://blog.dust.tt/content/images/size/w2000/2025/01/dust_november_five.png",
  // },
  // {
  //   title: "Lifen uses Dust AI agents to boost team productivity", // Soon to be replaced with Clay for RFP?
  //   content:
  //     "Lifen uses Dust AI agents to boost team productivity and save hours of work each week.",
  //   href: "/customers/customer-story-lifen",
  //   src: "https://blog.dust.tt/content/images/size/w2000/2024/11/lifen_dust_customer_story.jpg",
  // },
];
