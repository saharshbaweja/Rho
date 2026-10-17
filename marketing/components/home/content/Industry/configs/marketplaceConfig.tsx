import { ShoppingBag01 } from "@dust-tt/sparkle";
import type { IndustryPageConfig } from "@marketing/components/home/content/Industry/configs/utils";
import { createLayoutConfig } from "@marketing/components/home/content/Industry/configs/utils";

export const marketplaceConfig: IndustryPageConfig = {
  seo: {
    title: "Aeros for Regional Operators",
    description:
      "Connect short rotations, station constraints, crew margins, and aircraft availability to the decisions that keep the network coordinated.",
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
      label: "Regional Operators",
      color: "highlight",
      icon: ShoppingBag01,
    },
    title: (
      <> See how one change affects <br /> the next leg. </>
    ),
    description:
      "Connect short rotations, station constraints, crew margins, and aircraft availability to the decisions that keep the network coordinated.",
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
        "Dust has empowered our employees to work smarter, innovate, and push boundaries.",
      author: {
        name: "Matthieu Birach",
        title: "Dust customer reference · Chief People Officer at Doctolib",
      },
      company: {
        logo: "/static/landing/logos/white/doctolib.svg",
        alt: "Doctolib logo",
      },
      bgColor: "bg-blue-800",
      textColor: "text-white",
    },
    decorativeShapes: {
      topRight: "/static/landing/industry/shapes/rounded-rectangle.svg",
      bottomLeft: "/static/landing/industry/shapes/diamond.svg",
    },
  },
  aiAgents: {
    title: "Mission intelligence for regional operators",
    description:
      "Connect short rotations, station constraints, crew margins, and aircraft availability to the decisions that keep the network coordinated. The product roadmap brings mission monitoring, contextual alerts, recovery options, and team review into the same operating picture.",
    bgColor: "bg-gray-50",
  },
  trustedBy: {
    title: "Reference ecosystem · existing third-party logos",
    logoSet: "marketplace",
  },
  painPoints: {
    title: "From changing conditions to coordinated action",
    painPoints: [
      {
        icon: "/static/landing/industry/d-blue.svg",
        title: "Understand the mission",
        description:
          "Connect short rotations, station constraints, crew margins, and aircraft availability to the decisions that keep the network coordinated.",
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
    title: "Regional Operators workflows",
    useCases: [
      {
        title: "Mission monitoring",
        image: "/static/landing/industry/features/Sales_agent.webp",
        bgColor: "bg-blue-100",
        features: [
          {
            icon: "bg-blue-500",
            title: "Network impact",
            description:
              "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
          },
          {
            icon: "bg-yellow-400 rounded-tr-full",
            title: "Recovery scenarios",
            description:
              "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
          },
          {
            icon: "bg-green-500",
            title: "Operational tradeoffs",
            description:
              "Review time, fuel, crew, and passenger considerations where the required data is available.",
          },
          {
            icon: "bg-pink-400 rounded-tl-full",
            title: "Decision handover",
            description:
              "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
          },
        ],
      },
      {
        title: "Operational assessment",
        image: "/static/landing/industry/features/UxWriter_2.webp",
        bgColor: "bg-green-100",
        features: [
          {
            icon: "bg-sky-400 rounded-br-full",
            title: "Network impact",
            description:
              "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
          },
          {
            icon: "bg-red-500",
            title: "Recovery scenarios",
            description:
              "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
          },
          {
            icon: "bg-yellow-400 rounded-tr-full",
            title: "Operational tradeoffs",
            description:
              "Review time, fuel, crew, and passenger considerations where the required data is available.",
          },
          {
            icon: "bg-green-500",
            title: "Decision handover",
            description:
              "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
          },
          {
            icon: "bg-pink-400",
            title: "Network impact",
            description:
              "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
          },
        ],
      },
      {
        title: "Recovery planning",
        image: "/static/landing/industry/features/Contact_analysis.webp",
        bgColor: "bg-rose-100",
        features: [
          {
            icon: "bg-yellow-400",
            title: "Network impact",
            description:
              "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
          },
          {
            icon: "bg-indigo-500",
            title: "Recovery scenarios",
            description:
              "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
          },
          {
            icon: "bg-red-500",
            title: "Operational tradeoffs",
            description:
              "Review time, fuel, crew, and passenger considerations where the required data is available.",
          },
          {
            icon: "bg-pink-400 rounded-tl-full",
            title: "Decision handover",
            description:
              "Share the selected option, its assumptions, open conditions, and next actions with the responsible teams.",
          },
        ],
      },
      {
        title: "Team coordination",
        image: "/static/landing/industry/features/Content_localization.webp",
        bgColor: "bg-yellow-100",
        features: [
          {
            icon: "bg-yellow-400 rounded-tr-full",
            title: "Network impact",
            description:
              "Trace the missions and later legs exposed to an airport, weather, aircraft, or crew disruption.",
          },
          {
            icon: "bg-blue-500",
            title: "Recovery scenarios",
            description:
              "Compare delay, alternate, aircraft swap, and crew change options using a consistent set of constraints.",
          },
          {
            icon: "bg-green-500",
            title: "Operational tradeoffs",
            description: "Review time, fuel, crew, and passenger considerations where the required data is available.",
          },
          {
            icon: "bg-pink-400 rounded-tl-full",
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
    ],
  },
  demoVideo: {
    sectionTitle: "Reference workflow demonstration",
    videoUrl: "https://fast.wistia.net/embed/iframe/r0dwaexoez",
  },
  testimonial: {
    quote:
      "Dust has empowered our employees to work smarter, innovate, and push boundaries.",
    author: {
      name: "Matthieu Birach",
      title: "Dust customer reference · Chief People Officer at Doctolib",
    },
    company: {
      logo: "/static/landing/logos/white/doctolib.svg",
      alt: "Doctolib logo",
    },
    bgColor: "bg-blue-800",
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
