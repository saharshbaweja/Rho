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
export const pageSettings: pageSettingsProps = {
  uptitle: "Rapid response",
  title: "From an incoming task to a shared aerial picture.",
  description:
    "Turn a location, alert, or operator request into a coordinated drone mission. Check the nearest ready aircraft, review the plan, and keep scene context connected to the people responding.",
  accentColor: "text-brand-electric-blue",
  bulletPoints: [
    "Describe the incident, location, priority, and required scene context. Keep the task attached to the aircraft assignments and review the scope before dispatch.",
    "Check connected aircraft, payloads, battery state, docks, operator availability, weather, and airspace constraints. Validate provider integrations before operational use.",
    "Monitor mission status and identify affected assignments when conditions change. Review reassignment, delay, or return-to-base options with clear approval ownership.",
    "Retain scene observations, aircraft handovers, and operator decisions in one mission record for debrief and follow-up.",
  ],
  image: "/static/landing/drone/workspace.svg",
  seo: {
    title: "Aeros for Rapid response",
    description:
      "Turn a location, alert, or operator request into a coordinated drone mission. Check the nearest ready aircraft, review the plan, and keep scene context connected to the people responding.",
  },
};
export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/drone/workspace.svg",
      alt: "Rapid response drone dispatch workspace",
      depth: 0,
    },
  ],
  ctaButtons: {
    primary: {
      label: "Explore the platform",
      href: "/home#products",
      icon: Rocket02,
    },
    secondary: { label: "Request a demo", href: "/home/contact" },
  },
};
export const Benefits: BenefitsProps = {
  sectionTitle: "Rapid response, coordinated from request to result",
  items: [
    {
      icon: MagicWand02,
      title: "Natural-language planning",
      description:
        "Describe the incident, location, priority, and required scene context. Keep the task attached to the aircraft assignments and review the scope before dispatch.",
    },
    {
      icon: CheckCircle,
      title: "Mission-aware dispatch",
      description:
        "Check connected aircraft, payloads, battery state, docks, operator availability, weather, and airspace constraints. Validate provider integrations before operational use.",
    },
    {
      icon: Users01,
      title: "Operator-led recovery",
      description:
        "Monitor mission status and identify affected assignments when conditions change. Review reassignment, delay, or return-to-base options with clear approval ownership.",
    },
  ],
};
export const Metrics: MetricProps = {
  metrics: [
    { value: "Connected", description: "Your existing fleets and providers." },
    {
      value: "Accountable",
      description: "Operator approvals and mission history.",
    },
  ],
  color: "golden",
};
export const UseCases: UseCaseProps = {
  sectionTitle: "Rapid response workflows",
  sectionDescription:
    "From the first request to mission completion, keep fleet state, operating constraints, and people connected.",
  items: [
    {
      title: "Describe the job",
      content:
        "Describe the incident, location, priority, and required scene context. Keep the task attached to the aircraft assignments and review the scope before dispatch.",
      images: ["/static/landing/drone/workspace.svg"],
    },
    {
      title: "Dispatch the right fleet",
      content:
        "Check connected aircraft, payloads, battery state, docks, operator availability, weather, and airspace constraints. Validate provider integrations before operational use.",
      images: ["/static/landing/drone/fleet.svg"],
    },
    {
      title: "Adapt with oversight",
      content:
        "Monitor mission status and identify affected assignments when conditions change. Review reassignment, delay, or return-to-base options with clear approval ownership.",
      images: ["/static/landing/drone/recovery.svg"],
    },
    {
      title: "Close the loop",
      content:
        "Retain scene observations, aircraft handovers, and operator decisions in one mission record for debrief and follow-up.",
      images: ["/static/landing/drone/flow.svg"],
    },
  ],
};
export const Quote: QuoteProps = {
  quote:
    "Describe the outcome. Coordinate the fleet. Keep operators in control.",
  name: "Aeros",
  title: "Our operating principle",
  logo: "/static/aeros-logo-white.svg",
};
export const ROI: ROIProps = {
  number: "Connected",
  subtitle: "A shared mission context across your fleet.",
  logo: "/static/aeros-logo-white.svg",
};
export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Explore the dispatch workflow",
};
export const Stories: CustomerStory[] = [];
