import { Building02 } from "@dust-tt/sparkle";
import type { IndustryPageConfig } from "@marketing/components/home/content/Industry/configs/utils";
import { createLayoutConfig } from "@marketing/components/home/content/Industry/configs/utils";

export const retailEcommerceConfig: IndustryPageConfig = {
  seo: {
    title: "Aeros for Special Missions",
    description:
      "Bring mission-specific requirements, airport capability, aircraft status, and operational procedures into one evidence-led review.",
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
      label: "Special Missions",
      color: "success",
      icon: Building02,
    },
    title: (
      <>
        {" "}
        Build each <br /> assessment around the mission.{" "}
      </>
    ),
    description:
      "Bring mission-specific requirements, airport capability, aircraft status, and operational procedures into one evidence-led review.",
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
        "Curiosity turned into necessity: I couldn't do half my job without Dust.",
      author: {
        name: "Valentine Chelius",
        title: "Dust customer reference · Head of Marketing",
      },
      company: {
        logo: "/static/landing/logos/white/fleet.svg",
        alt: "Fleet Logo",
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
    title: "Mission intelligence for special missions",
    description:
      "Bring mission-specific requirements, airport capability, aircraft status, and operational procedures into one evidence-led review. The product roadmap brings mission monitoring, contextual alerts, recovery options, and team review into the same operating picture.",
    bgColor: "bg-gray-50",
  },
  trustedBy: {
    title: "Reference ecosystem · existing third-party logos",
    logoSet: "retail",
  },
  painPoints: {
    title: "From changing conditions to coordinated action",
    painPoints: [
      {
        icon: "/static/landing/industry/d-blue.svg",
        title: "Understand the mission",
        description:
          "Bring mission-specific requirements, airport capability, aircraft status, and operational procedures into one evidence-led review.",
        color: "blue",
      },
      {
        icon: "/static/landing/industry/d-red.svg",
        title: "Evaluate the impact",
        description:
          "Read published airport information alongside temporary restrictions and mission timing.",
        color: "red",
      },
      {
        icon: "/static/landing/industry/d-green.svg",
        title: "Coordinate the response",
        description:
          "Show where a conclusion came from, when it applies, and which inputs still need verification.",
        color: "green",
      },
    ],
  },
  dustInAction: {
    title: "Special Missions workflows",
    useCases: [
      {
        title: "Mission monitoring",
        image: "/static/landing/industry/features/UxWriter_2.webp",
        bgColor: "bg-pink-100",
        features: [
          {
            icon: "bg-red-500",
            title: "Procedure research",
            description:
              "Find relevant passages in approved manuals and procedures without losing the source context.",
          },
          {
            icon: "bg-yellow-400 rounded-tr-full",
            title: "Airport context",
            description:
              "Read published airport information alongside temporary restrictions and mission timing.",
          },
          {
            icon: "bg-green-600 rounded-bl-full",
            title: "Operator limits",
            description:
              "Keep company-specific restrictions and approved operating policies in the assessment.",
          },
          {
            icon: "bg-blue-400",
            title: "Source traceability",
            description:
              "Show where a conclusion came from, when it applies, and which inputs still need verification.",
          },
        ],
      },
      {
        title: "Operational assessment",
        image: "/static/landing/industry/features/Data_graph.webp",
        bgColor: "bg-green-100",
        features: [
          {
            icon: "bg-pink-400",
            title: "Procedure research",
            description:
              "Find relevant passages in approved manuals and procedures without losing the source context.",
          },
          {
            icon: "bg-red-500 rounded-tr-full",
            title: "Airport context",
            description:
              "Read published airport information alongside temporary restrictions and mission timing.",
          },
          {
            icon: "bg-yellow-400 rounded-bl-full",
            title: "Operator limits",
            description:
              "Keep company-specific restrictions and approved operating policies in the assessment.",
          },
          {
            icon: "bg-blue-400",
            title: "Source traceability",
            description:
              "Show where a conclusion came from, when it applies, and which inputs still need verification.",
          },
        ],
      },
      {
        title: "Recovery planning",
        image: "/static/landing/industry/features/Radar_AIDigest.webp",
        bgColor: "bg-gray-950",
        features: [
          {
            icon: "bg-pink-400",
            title: "Procedure research",
            description:
              "Find relevant passages in approved manuals and procedures without losing the source context.",
          },
          {
            icon: "bg-red-500 rounded-tr-full",
            title: "Airport context",
            description:
              "Read published airport information alongside temporary restrictions and mission timing.",
          },
          {
            icon: "bg-yellow-400 rounded-bl-full",
            title: "Operator limits",
            description:
              "Keep company-specific restrictions and approved operating policies in the assessment.",
          },
          {
            icon: "bg-green-600",
            title: "Source traceability",
            description:
              "Show where a conclusion came from, when it applies, and which inputs still need verification.",
          },
        ],
      },
      {
        title: "Team coordination",
        image: "/static/landing/industry/features/Catalog.webp",
        bgColor: "bg-blue-100",
        features: [
          {
            icon: "bg-pink-400",
            title: "Procedure research",
            description:
              "Find relevant passages in approved manuals and procedures without losing the source context.",
          },
          {
            icon: "bg-red-500 rounded-tr-full",
            title: "Airport context",
            description:
              "Read published airport information alongside temporary restrictions and mission timing.",
          },
          {
            icon: "bg-yellow-400 rounded-bl-full",
            title: "Operator limits",
            description:
              "Keep company-specific restrictions and approved operating policies in the assessment.",
          },
          {
            icon: "bg-blue-400",
            title: "Source traceability",
            description:
              "Show where a conclusion came from, when it applies, and which inputs still need verification.",
          },
        ],
      },
      {
        title: "Mission monitoring",
        image: "/static/landing/industry/features/Provider_list.webp",
        bgColor: "bg-orange-100",
        features: [
          {
            icon: "bg-pink-400",
            title: "Procedure research",
            description:
              "Find relevant passages in approved manuals and procedures without losing the source context.",
          },
          {
            icon: "bg-red-500 rounded-tr-full",
            title: "Airport context",
            description:
              "Read published airport information alongside temporary restrictions and mission timing.",
          },
          {
            icon: "bg-yellow-400 rounded-bl-full",
            title: "Operator limits",
            description:
              "Keep company-specific restrictions and approved operating policies in the assessment.",
          },
          {
            icon: "bg-green-600",
            title: "Source traceability",
            description:
              "Show where a conclusion came from, when it applies, and which inputs still need verification.",
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
    videoUrl: "https://fast.wistia.net/embed/iframe/9u1uft5pg7",
  },
  testimonial: {
    quote:
      "Curiosity turned into necessity: I couldn't do half my job without Dust.",
    author: {
      name: "Valentine Chelius",
      title: "Dust customer reference · Head of Marketing",
    },
    company: {
      logo: "/static/landing/logos/white/fleet.svg",
      alt: "Fleet Logo",
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
