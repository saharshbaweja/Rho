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
  uptitle: "Crew & Scheduling",
  title: <> Keep the crew plan connected to the mission. </>,
  accentColor: "text-brand-orange-golden",
  description: (
    <> Review crew availability, qualifications, duty limits, and aircraft rotations alongside the changes that can disrupt the schedule. </>
  ),
  bulletPoints: [
    "Bring roster availability and required qualifications into mission planning.",
    "Evaluate how delays, diversions, and revised arrival times affect duty and rest margins.",
    "Trace a proposed change through later legs and identify where the crew plan needs review.",
    "Compare rescheduling and coverage options with the relevant mission and operator constraints visible.",
  ],
  image: "/static/landing/marketing/crossMedia.png",
  seo: {
    title: "Aeros for Crew & Scheduling | Mission Intelligence",
    description:
      "Review crew availability, qualifications, duty limits, and aircraft rotations alongside the changes that can disrupt the schedule.",
  },
};

export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/marketing/marketing1.png",
      alt: "Marketing Visual 1",
      depth: -30,
    },
    {
      src: "/static/landing/marketing/marketing2.png",
      alt: "Marketing Visual 2",
      depth: -10,
    },
    {
      src: "/static/landing/marketing/marketing3.png",
      alt: "Marketing Visual 3",
      depth: 20,
    },
    {
      src: "/static/landing/marketing/marketing4.png",
      alt: "Marketing Visual 4",
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
  sectionTitle: "Crew & Scheduling, with the mission in view",
  items: [
    {
      icon: MagicWand02,
      title: "Understand the mission",
      description:
        "Review crew availability, qualifications, duty limits, and aircraft rotations alongside the changes that can disrupt the schedule.",
    },
    {
      icon: CheckCircle,
      title: "Evaluate the impact",
      description:
        "Evaluate how delays, diversions, and revised arrival times affect duty and rest margins.",
    },
    {
      icon: Users01,
      title: "Coordinate the response",
      description:
        "Compare rescheduling and coverage options with the relevant mission and operator constraints visible.",
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
  sectionTitle: "Crew & Scheduling workflows",
  sectionDescription:
    "The Aeros roadmap for crew & scheduling, from assessment to coordinated action.",
  items: [
    {
      title: "Crew availability",
      content:
        "Bring roster availability and required qualifications into mission planning.",
      images: ["/static/landing/marketing/localizer.png"],
    },
    {
      title: "Duty impact",
      content:
        "Evaluate how delays, diversions, and revised arrival times affect duty and rest margins.",
      images: ["/static/landing/marketing/contentOptimizer.png"],
    },
    {
      title: "Rotation dependencies",
      content:
        "Trace a proposed change through later legs and identify where the crew plan needs review.",
      images: ["/static/landing/marketing/crossMedia.png"],
    },
    {
      title: "Recovery coordination",
      content:
        "Compare rescheduling and coverage options with the relevant mission and operator constraints visible.",
      images: ["/static/landing/marketing/aiNewsletter.png"],
    },
  ],
};

export const ROI: ROIProps = {
  number: "Review",
  subtitle: "Illustrative reference asset; not an Aeros performance result.",
  logo: "/static/landing/logos/gray/qonto.png",
};

export const Quote: QuoteProps = {
  quote:
    "Dust is not just a tool - it's like having an extra team member who knows your brand voice, can handle recurring tasks, and helps you tackle new challenges. I couldn't do half of my job without it, especially with tight deadlines and a small team.",
  name: "Valentine Chelius",
  title: "Dust customer reference · Head of Marketing at Fleet",
  logo: "/static/landing/logos/color/fleet.png",
};

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference workflow demonstration",
  videoUrl: "https://fast.wistia.net/embed/iframe/z8ky9a7ugn",
  showCaptions: true,
};

export const Stories: CustomerStory[] = [
  {
    title: "Dust reference: How Alan produces customer stories 80% faster with Dust",
    content:
      "Alan's marketing team uses Dust to create customer stories that resonate with their audience, all while maintaining brand consistency.",
    href: "/customers/alan-marketing-customer-story-production-dust",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Alan-__-Dust-1.png",
  },
  {
    title: "Dust reference: How Qonto Achieved 70% Faster Localization with Dust",
    content:
      "Qonto's Tolki assistant serves as a virtual polyglot, helping the content team localize content while maintaining brand voice and regional standards.",
    href: "/customers/qonto-dust-ai-partnership",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Qonto-__-Dust.jpg",
  },
  {
    title: "Dust reference: Building a Marketing Engine from Scratch at Fleet",
    content:
      "With just two interns, Valentine created a scalable marketing operation using Dust's AI capabilities for content and brand management.",
    href: "/customers/how-valentine-head-of-marketing-at-fleet-uses-dust",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/01/dust_fleet.png",
  },
  // {
  //   title: "Lifen uses Dust AI agents to boost team productivity", // Soon to be replaced with Clay for RFP?
  //   content:
  //     "Lifen uses Dust AI agents to boost team productivity and save hours of work each week.",
  //   href: "/customers/customer-story-lifen",
  //   src: "https://blog.dust.tt/content/images/size/w2000/2024/11/lifen_dust_customer_story.jpg",
  // },
];
