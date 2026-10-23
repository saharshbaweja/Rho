import { Bank } from "@dust-tt/sparkle";
import type { IndustryPageConfig } from "@marketing/components/home/content/Industry/configs/utils";
import { createLayoutConfig } from "@marketing/components/home/content/Industry/configs/utils";

export const financialServicesConfig: IndustryPageConfig = {
  seo: {
    title: "Aeros for Cargo Operations",
    description:
      "Assess airport windows, aircraft constraints, weather, and downstream legs together when conditions change.",
  },
  layout: createLayoutConfig([
    "hero",
    "aiAgents",
    "trustedBy",
    "painPoints",
    "dustInAction",
    "impactMetrics",
    "demoVideo",
    "testimonial",
    "customerStories",
    "justUseDust",
  ]),
  hero: {
    chip: {
      label: "Cargo Operations",
      color: "info",
      icon: Bank,
    },
    title: (
      <>
        {" "}
        Protect the rotation behind <br /> every cargo mission.{" "}
      </>
    ),
    description:
      "Assess airport windows, aircraft constraints, weather, and downstream legs together when conditions change.",
    ctaButtons: {
      primary: {
        label: "Explore Aeros",
        href: "/home/pricing",
      },
      secondary: {
        label: "Request a demo",
        href: "/home/contact",
      },
    },
    testimonialCard: {
      quote:
        "Dust helped us transform Kyriba's operations and foster a culture of continuous innovation.",
      author: {
        name: "Boris Lipiainen",
        title: "Dust customer reference · Chief Technology Officer",
      },
      company: {
        logo: "/static/landing/logos/white/kyriba.svg",
        alt: "Kyriba logo",
      },
      bgColor: "bg-violet-400",
      textColor: "text-white",
    },
    decorativeShapes: {
      topRight: "/static/landing/industry/shapes/rounded-rectangle.svg",
      bottomLeft: "/static/landing/industry/shapes/diamond.svg",
    },
  },
  aiAgents: {
    title: "Mission intelligence for cargo operations",
    description:
      "Assess airport windows, aircraft constraints, weather, and downstream legs together when conditions change. The product roadmap brings mission monitoring, contextual alerts, recovery options, and team review into the same operating picture.",
    bgColor: "bg-gray-50",
  },
  trustedBy: {
    title: "Reference ecosystem · existing third-party logos",
    logoSet: "finance",
  },
  painPoints: {
    title: "From changing conditions to coordinated action",
    painPoints: [
      {
        icon: "/static/landing/industry/d-blue.svg",
        title: "Understand the mission",
        description:
          "Assess airport windows, aircraft constraints, weather, and downstream legs together when conditions change.",
        color: "blue",
      },
      {
        icon: "/static/landing/industry/d-red.svg",
        title: "Evaluate the impact",
        description:
          "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
        color: "red",
      },
      {
        icon: "/static/landing/industry/d-green.svg",
        title: "Coordinate the response",
        description:
          "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
        color: "green",
      },
    ],
  },
  dustInAction: {
    title: "Cargo Operations workflows",
    useCases: [
      {
        title: "Mission monitoring",
        image: "/static/landing/industry/features/Compliance_verification.webp",
        bgColor: "bg-blue-100",
        features: [
          {
            icon: "bg-red-500 rounded-tr-full",
            title: "Network impact",
            description:
              "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
          },
          {
            icon: "bg-yellow-400 rounded-bl-full",
            title: "Recovery scenarios",
            description:
              "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
          },
          {
            icon: "bg-green-500 rounded-bl-full",
            title: "Operational tradeoffs",
            description:
              "Review time, fuel, crew, and passenger considerations where the required data is available.",
          },
          {
            icon: "bg-blue-400 rounded-tr-full",
            title: "Decision handover",
            description:
              "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
          },
        ],
      },
      {
        title: "Operational assessment",
        image: "/static/landing/industry/features/Sales_agent_2.webp",
        bgColor: "bg-purple-100",
        features: [
          {
            icon: "bg-pink-400",
            title: "Network impact",
            description:
              "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
          },
          {
            icon: "bg-red-500 rounded-tr-full",
            title: "Recovery scenarios",
            description:
              "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
          },
          {
            icon: "bg-yellow-400 rounded-bl-full",
            title: "Operational tradeoffs",
            description:
              "Review time, fuel, crew, and passenger considerations where the required data is available.",
          },
          {
            icon: "bg-blue-400 rounded-tr-full",
            title: "Decision handover",
            description:
              "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
          },
        ],
      },
      {
        title: "Recovery planning",
        image: "/static/landing/industry/features/Incident_copilot_slack.webp",
        bgColor: "bg-green-100",
        features: [
          {
            icon: "bg-green-500",
            title: "Network impact",
            description:
              "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
          },
          {
            icon: "bg-blue-500 rounded-tl-full",
            title: "Recovery scenarios",
            description:
              "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
          },
          {
            icon: "bg-red-400 rounded-br-full",
            title: "Operational tradeoffs",
            description:
              "Review time, fuel, crew, and passenger considerations where the required data is available.",
          },
          {
            icon: "bg-yellow-400",
            title: "Decision handover",
            description:
              "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
          },
        ],
      },
      {
        title: "Team coordination",
        image: "/static/landing/industry/features/Content_localization.webp",
        bgColor: "bg-golden-100",
        features: [
          {
            icon: "bg-golden-500",
            title: "Network impact",
            description:
              "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
          },
          {
            icon: "bg-blue-500 rounded-tl-full",
            title: "Recovery scenarios",
            description:
              "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
          },
          {
            icon: "bg-purple-400 rounded-br-full",
            title: "Operational tradeoffs",
            description:
              "Review time, fuel, crew, and passenger considerations where the required data is available.",
          },
          {
            icon: "bg-red-400",
            title: "Decision handover",
            description:
              "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
          },
        ],
      },
    ],
  },
  impactMetrics: {
    bgColor: "bg-blue-50",
    metrics: [
      {
        value: "01",
        unit: "",
        type: "Context",
        description: "Mission context comes before a recommendation.",
      },
      {
        value: "02",
        unit: "",
        type: "Options",
        description: "A proposed move needs evidence and visible assumptions.",
      },
      {
        value: "03",
        unit: "",
        type: "Review",
        description: "The authorized operations team owns the decision.",
      },
    ],
  },
  demoVideo: {
    sectionTitle: "Reference workflow demonstration",
    videoUrl: "https://fast.wistia.net/embed/iframe/zzbhe95pvz",
  },
  testimonial: {
    quote:
      "Dust helped us transform Kyriba's operations and foster a culture of continuous innovation.",
    author: {
      name: "Boris Lipiainen",
      title: "Dust customer reference · Chief Technology Officer",
    },
    company: {
      logo: "/static/landing/logos/white/kyriba.svg",
      alt: "Kyriba logo",
    },
    bgColor: "bg-violet-400",
    textColor: "text-white",
  },
  justUseDust: {
    title: "Explore Aeros for your operation",
    titleColor: "text-blue-600",
    ctaButtons: {
      primary: {
        label: "Explore access",
        href: "/api/workos/login",
      },
      secondary: {
        label: "Request a demo",
        href: "/home/contact",
      },
    },
    bgColor: "bg-blue-50",
    decorativeShapes: true,
  },
};
