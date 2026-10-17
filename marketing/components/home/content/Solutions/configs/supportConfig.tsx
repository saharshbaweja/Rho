import { Lightbulb04, Rocket02, Users01 } from "@dust-tt/sparkle";
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
  uptitle: "Flight Operations",
  title: <> See the operation. Understand the next move. </>,
  accentColor: "text-brand-electric-blue",
  description: (
    <> Bring active missions, changing conditions, and operational priorities into a shared view for the OCC and flight deck. Keep every review connected to the flight it affects. </>
  ),
  bulletPoints: [
    "Monitor mission status alongside route weather, airport conditions, and airspace constraints.",
    "Prioritize changes by their effect on the mission, its aircraft, and its operating window.",
    "Carry the current assessment, open actions, and ownership into the next shift.",
    "Prepare clear operational updates with the condition, impact, and proposed response for human review.",
  ],
  image: "/static/landing/support/ticketResolution.png",
  seo: {
    title: "Aeros for Flight Operations | Mission Intelligence",
    description:
      "Bring active missions, changing conditions, and operational priorities into a shared view for the OCC and flight deck. Keep every review connected to the flight it affects.",
  },
};

export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/support/support1.png",
      alt: "Support Visual 1",
      depth: -30,
    },
    {
      src: "/static/landing/support/support2.png",
      alt: "Support Visual 2",
      depth: -10,
    },
    {
      src: "/static/landing/support/support3.png",
      alt: "Support Visual 3",
      depth: 20,
    },
    {
      src: "/static/landing/support/support4.png",
      alt: "Support Visual 4",
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
  sectionTitle: "Flight Operations, with the mission in view",
  items: [
    {
      icon: Rocket02,
      title: "Understand the mission",
      description:
        "Bring active missions, changing conditions, and operational priorities into a shared view for the OCC and flight deck. Keep every review connected to the flight it affects.",
    },
    {
      icon: Users01,
      title: "Evaluate the impact",
      description:
        "Prioritize changes by their effect on the mission, its aircraft, and its operating window.",
    },
    {
      icon: Lightbulb04,
      title: "Coordinate the response",
      description:
        "Prepare clear operational updates with the condition, impact, and proposed response for human review.",
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
  sectionTitle: "Flight Operations workflows",
  sectionDescription:
    "The Aeros roadmap for flight operations, from assessment to coordinated action.",
  items: [
    {
      title: "Flight watch",
      content:
        "Monitor mission status alongside route weather, airport conditions, and airspace constraints.",
      images: ["/static/landing/support/ticketDeflection.png"],
    },
    {
      title: "Mission-relevant alerts",
      content:
        "Prioritize changes by their effect on the mission, its aircraft, and its operating window.",
      images: ["/static/landing/support/ticketResolution.png"],
    },
    {
      title: "Operational handover",
      content:
        "Carry the current assessment, open actions, and ownership into the next shift.",
      images: ["/static/landing/support/docExpert.png"],
    },
    {
      title: "Crew coordination",
      content:
        "Prepare clear operational updates with the condition, impact, and proposed response for human review.",
      images: ["/static/landing/support/ticketInsights.png"],
    },
  ],
};

export const ROI: ROIProps = {
  number: "Review",
  subtitle: "Illustrative reference asset; not an Aeros performance result.",
  logo: "/static/landing/logos/gray/malt.png",
};

export const Quote: QuoteProps = {
  quote:
    "We're managing a higher volume of tickets and have cut processing time—from an average of 6 minutes per ticket to just a few seconds.",
  name: "Anaïs Ghelfi",
  title: "Dust customer reference · Head of Data Platform at Malt",
  logo: "/static/landing/logos/color/malt.png",
};

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference workflow demonstration",
  videoUrl: "https://fast.wistia.net/embed/iframe/r0dwaexoez",
  showCaptions: true,
};

export const Stories: CustomerStory[] = [
  {
    title: "Dust reference: Blueground accelerates customer support resolution time with Dust",
    content:
      "Discover how Blueground boosted satisfaction and cut resolution time using Dust agents.",
    href: "/customers/customer-support-blueground",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/06/Blueground_dust.jpg",
  },
  {
    title: "Dust reference: Malt cuts support ticket closing time by 50% with Dust",
    content:
      "Malt streamlines customer support using Dust's AI platform for rapid, consistent multilingual responses.",
    href: "/customers/malt-customer-support",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/malt_dust.png",
  },
  {
    title: "Dust reference: Pennylane's journey to deploy Dust for Customer Care teams",
    content:
      "Dust evolved from a simple support tool into an integral part of Pennylane's operations.",
    href: "/customers/pennylane-customer-support-journey",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Pennylane-__-Dust.jpg",
  },
  {
    title: "Dust reference: Lifen uses Dust AI agents to boost team productivity",
    content:
      "Lifen uses Dust AI agents to boost team productivity and save hours of work each week.",
    href: "/customers/customer-story-lifen",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Lifen-__-Dust.png",
  },
];
