import { Building04 } from "@dust-tt/sparkle";
import type { IndustryPageConfig } from "@marketing/components/home/content/Industry/configs/utils";
import { createLayoutConfig } from "@marketing/components/home/content/Industry/configs/utils";

export const b2bSaasConfig: IndustryPageConfig = {
  seo: {
    title: "Aeros for Airlines",
    description:
      "Connect dispatch, flight watch, crew, and maintenance around the operational changes that affect the schedule.",
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
      label: "Airlines",
      color: "warning",
      icon: Building04,
    },
    title: (
      <>
        {" "}
        Coordinate the network, one <br /> mission at a time.{" "}
      </>
    ),
    description:
      "Connect dispatch, flight watch, crew, and maintenance around the operational changes that affect the schedule.",
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
        "Dust is the most impactful software we've adopted since building Clay.",
      author: {
        name: "Everett Berry",
        title: "Dust customer reference · Head of GTM Engineering at Clay",
      },
      company: {
        logo: "/static/landing/logos/color/clay_white.png",
        alt: "Clay logo",
      },
      bgColor: "bg-green-600",
      textColor: "text-white",
    },
    decorativeShapes: {
      topRight: "/static/landing/industry/shapes/rounded-rectangle.svg",
      bottomLeft: "/static/landing/industry/shapes/diamond.svg",
    },
  },
  aiAgents: {
    title: "Mission intelligence for airlines",
    description:
      "Connect dispatch, flight watch, crew, and maintenance around the operational changes that affect the schedule. The product roadmap brings mission monitoring, contextual alerts, recovery options, and team review into the same operating picture.",
    bgColor: "bg-gray-50",
  },
  trustedBy: {
    title: "Reference ecosystem · existing third-party logos",
    logoSet: "b2b-saas",
  },
  painPoints: {
    title: "From changing conditions to coordinated action",
    painPoints: [
      {
        icon: "/static/landing/industry/d-blue.svg",
        title: "Understand the mission",
        description:
          "Connect dispatch, flight watch, crew, and maintenance around the operational changes that affect the schedule.",
        color: "red",
      },
      {
        icon: "/static/landing/industry/d-red.svg",
        title: "Evaluate the impact",
        description:
          "Prioritize changes by their effect on the mission, its aircraft, and its operating window.",
        color: "blue",
      },
      {
        icon: "/static/landing/industry/d-green.svg",
        title: "Coordinate the response",
        description:
          "Prepare clear operational updates with the condition, impact, and proposed response for human review.",
        color: "green",
      },
    ],
  },
  dustInAction: {
    title: "Airlines workflows",
    useCases: [
      {
        title: "Mission monitoring",
        image: "/static/landing/industry/features/Sales_agent.webp",
        bgColor: "bg-blue-100",
        features: [
          {
            icon: "bg-red-500",
            title: "Flight watch",
            description:
              "Monitor mission status alongside route weather, airport conditions, and airspace constraints.",
          },
          {
            icon: "bg-yellow-400 rounded-tr-full",
            title: "Mission-relevant alerts",
            description:
              "Prioritize changes by their effect on the mission, its aircraft, and its operating window.",
          },
          {
            icon: "bg-blue-500 rounded-bl-full",
            title: "Operational handover",
            description:
              "Carry the current assessment, open actions, and ownership into the next shift.",
          },
          {
            icon: "bg-sky-400 rounded-br-full",
            title: "Crew coordination",
            description:
              "Prepare clear operational updates with the condition, impact, and proposed response for human review.",
          },
        ],
      },
      {
        title: "Operational assessment",
        image: "/static/landing/industry/features/Content_localization.webp",
        bgColor: "bg-rose-100",
        features: [
          {
            icon: "bg-pink-400 rounded-tl-full",
            title: "Flight watch",
            description:
              "Monitor mission status alongside route weather, airport conditions, and airspace constraints.",
          },
          {
            icon: "bg-red-500",
            title: "Mission-relevant alerts",
            description:
              "Prioritize changes by their effect on the mission, its aircraft, and its operating window.",
          },
          {
            icon: "bg-yellow-400 rounded-tr-full",
            title: "Operational handover",
            description:
              "Carry the current assessment, open actions, and ownership into the next shift.",
          },
        ],
      },
      {
        title: "Recovery planning",
        image: "/static/landing/industry/features/Connection_management.webp",
        bgColor: "bg-green-100",
        features: [
          {
            icon: "bg-pink-400 rounded-tl-full",
            title: "Flight watch",
            description:
              "Monitor mission status alongside route weather, airport conditions, and airspace constraints.",
          },
          {
            icon: "bg-red-500",
            title: "Mission-relevant alerts",
            description:
              "Prioritize changes by their effect on the mission, its aircraft, and its operating window.",
          },
          {
            icon: "bg-yellow-400 rounded-tr-full",
            title: "Operational handover",
            description:
              "Carry the current assessment, open actions, and ownership into the next shift.",
          },
          {
            icon: "bg-green-500",
            title: "Crew coordination",
            description:
              "Prepare clear operational updates with the condition, impact, and proposed response for human review.",
          },
        ],
      },
      {
        title: "Team coordination",
        image: "/static/landing/industry/features/Eng_debug.webp",
        bgColor: "bg-gray-100",
        features: [
          {
            icon: "bg-pink-400 rounded-tl-full",
            title: "Flight watch",
            description:
              "Monitor mission status alongside route weather, airport conditions, and airspace constraints.",
          },
          {
            icon: "bg-red-500",
            title: "Mission-relevant alerts",
            description:
              "Prioritize changes by their effect on the mission, its aircraft, and its operating window.",
          },
          {
            icon: "bg-yellow-400 rounded-tr-full",
            title: "Operational handover",
            description:
              "Carry the current assessment, open actions, and ownership into the next shift.",
          },
          {
            icon: "bg-green-500",
            title: "Crew coordination",
            description:
              "Prepare clear operational updates with the condition, impact, and proposed response for human review.",
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
        bgColor: "bg-pink-300",
        badgeColor: "bg-red-500",
        badgeTextColor: "text-white",
        borderRadius: "rounded-l-full",
      },
      {
        value: "02",
        unit: "",
        type: "Options",
        description: "A proposed move needs evidence and visible assumptions.",
        bgColor: "bg-lime-300",
        badgeColor: "bg-green-600",
        badgeTextColor: "text-white",
        borderRadius: "rounded-r-full",
      },
      {
        value: "03",
        unit: "",
        type: "Review",
        description: "The authorized operations team owns the decision.",
        bgColor: "bg-blue-300",
        badgeColor: "bg-pink-300",
        badgeTextColor: "text-gray-900",
        borderRadius: "rounded-t-full",
      },
    ],
  },
  demoVideo: {
    sectionTitle: "Reference workflow demonstration",
    videoUrl: "https://fast.wistia.net/embed/iframe/8q80neektv",
  },
  testimonial: {
    quote:
      "Dust is the most impactful software we've adopted since building Clay.",
    author: {
      name: "Everett Berry",
      title: "Dust customer reference · Head of GTM Engineering at Clay",
    },
    company: {
      logo: "/static/landing/logos/color/clay_white.png",
      alt: "Clay logo",
    },
    bgColor: "bg-green-600",
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
