import { BarChart01 } from "@dust-tt/sparkle";
import type { IndustryPageConfig } from "@marketing/components/home/content/Industry/configs/utils";
import { createLayoutConfig } from "@marketing/components/home/content/Industry/configs/utils";

export const consultingConfig: IndustryPageConfig = {
  seo: {
    title: "Aeros for Business Aviation",
    description:
      "Bring airport restrictions, aircraft readiness, crew availability, and operator procedures into a focused review for each trip.",
  },
  layout: createLayoutConfig([
    "hero",
    "impactMetrics",
    "dustInAction",
    "testimonial",
    "customerStories",
    "justUseDust",
  ]),
  hero: {
    chip: {
      label: "Business Aviation",
      color: "highlight",
      icon: BarChart01,
    },
    title: (
      <> Keep every mission connected <br /> to the <br /> full context. </>
    ),
    description:
      "Bring airport restrictions, aircraft readiness, crew availability, and operator procedures into a focused review for each trip.",
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
        "In less than a year, we went from manual processes to 42 AI agents handling everything from strategy analysis to final delivery.",
      author: {
        name: "Vincent Vitré",
        title: "Dust customer reference · COO & Partner at Insign",
      },
      company: {
        logo: "/static/landing/logos/white/insign.svg",
        alt: "Insign logo",
      },
      bgColor: "bg-green-400",
      textColor: "text-white",
    },
    decorativeShapes: {
      topRight: "/static/landing/industry/shapes/rounded-rectangle.svg",
      bottomLeft: "/static/landing/industry/shapes/diamond.svg",
    },
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
        description:
          "The authorized operations team owns the decision.",
      },
    ],
  },
  dustInAction: {
    title: "Business Aviation workflows",
    useCases: [
      {
        title: "Mission monitoring",
        image: "/static/landing/industry/features/Sales_agent.webp",
        bgColor: "bg-rose-100",
        features: [
          {
            icon: "bg-red-500 rounded-br-full",
            title: "Mission briefing",
            description:
              "Assemble the route, time windows, forecasts, notices, and operating limits into a focused briefing for dispatcher review.",
          },
          {
            icon: "bg-purple-500 rounded-tl-full",
            title: "Airport suitability",
            description:
              "Assess airport hours, runway restrictions, available services, and aircraft requirements for the planned arrival or departure.",
          },
          {
            icon: "bg-blue-500 rounded-tr-full",
            title: "Departure options",
            description:
              "Compare departure windows and alternates against the same mission constraints, including the effect on later legs.",
          },
          {
            icon: "bg-green-500 rounded-bl-full",
            title: "Release review",
            description:
              "Keep unresolved conditions, supporting sources, and required approvals together before an authorized dispatcher makes the release decision.",
          },
        ],
      },
      {
        title: "Operational assessment",
        image: "/static/landing/industry/features/Search_assistant.webp",
        bgColor: "bg-blue-100",
        features: [
          {
            icon: "bg-blue-500 rounded-tl-full",
            title: "Mission briefing",
            description:
              "Assemble the route, time windows, forecasts, notices, and operating limits into a focused briefing for dispatcher review.",
          },
          {
            icon: "bg-pink-400 rounded-tr-full",
            title: "Airport suitability",
            description:
              "Assess airport hours, runway restrictions, available services, and aircraft requirements for the planned arrival or departure.",
          },
          {
            icon: "bg-green-500 rounded-bl-full",
            title: "Departure options",
            description:
              "Compare departure windows and alternates against the same mission constraints, including the effect on later legs.",
          },
          {
            icon: "bg-yellow-400 rounded-br-full",
            title: "Release review",
            description:
              "Keep unresolved conditions, supporting sources, and required approvals together before an authorized dispatcher makes the release decision.",
          },
        ],
      },
      {
        title: "Recovery planning",
        image: "/static/landing/industry/features/Doc_analysis_2.webp",
        bgColor: "bg-green-100",
        features: [
          {
            icon: "bg-gray-600 rounded-tl-full",
            title: "Mission briefing",
            description:
              "Assemble the route, time windows, forecasts, notices, and operating limits into a focused briefing for dispatcher review.",
          },
          {
            icon: "bg-blue-500 rounded-tr-full",
            title: "Airport suitability",
            description:
              "Assess airport hours, runway restrictions, available services, and aircraft requirements for the planned arrival or departure.",
          },
          {
            icon: "bg-yellow-400 rounded-bl-full",
            title: "Departure options",
            description:
              "Compare departure windows and alternates against the same mission constraints, including the effect on later legs.",
          },
          {
            icon: "bg-green-500 rounded-br-full",
            title: "Release review",
            description:
              "Keep unresolved conditions, supporting sources, and required approvals together before an authorized dispatcher makes the release decision.",
          },
        ],
      },
      {
        title: "Team coordination",
        image: "/static/landing/industry/features/Social_post.webp",
        bgColor: "bg-orange-100",
        features: [
          {
            icon: "bg-blue-500 rounded-tl-full",
            title: "Mission briefing",
            description:
              "Assemble the route, time windows, forecasts, notices, and operating limits into a focused briefing for dispatcher review.",
          },
          {
            icon: "bg-sky-400",
            title: "Airport suitability",
            description:
              "Assess airport hours, runway restrictions, available services, and aircraft requirements for the planned arrival or departure.",
          },
          {
            icon: "bg-red-500 rounded-br-full",
            title: "Departure options",
            description:
              "Compare departure windows and alternates against the same mission constraints, including the effect on later legs.",
          },
          {
            icon: "bg-green-500 rounded-tr-full",
            title: "Release review",
            description:
              "Keep unresolved conditions, supporting sources, and required approvals together before an authorized dispatcher makes the release decision.",
          },
        ],
      },
    ],
  },
  testimonial: {
    quote:
      "In less than a year, we went from manual processes to 42 AI agents handling everything from strategy analysis to final delivery.",
    author: {
      name: "Vincent Vitré",
      title: "Dust customer reference · COO & Partner at Insign",
    },
    company: {
      logo: "/static/landing/logos/white/insign.svg",
      alt: "Insign logo",
    },
    bgColor: "bg-green-400",
    textColor: "text-white",
  },
  justUseDust: {
    title: "Explore Aeros for your operation",
    titleColor: "text-blue-600",
    ctaButtons: {
      primary: {
        label: "Explore access",
        href: "/home/pricing",
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
