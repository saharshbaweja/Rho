import { MedicalCross } from "@dust-tt/sparkle";
import type { IndustryPageConfig } from "@marketing/components/home/content/Industry/configs/utils";
import { createLayoutConfig } from "@marketing/components/home/content/Industry/configs/utils";

export const insuranceConfig: IndustryPageConfig = {
  seo: {
    title: "Aeros for Charter Operators",
    description:
      "Review changing itineraries against crew, aircraft, airport, and operator requirements before committing to the next move.",
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
      label: "Charter Operators",
      color: "highlight",
      icon: MedicalCross,
    },
    title: (
      <> Plan the trip. Understand <br /> the constraints. </>
    ),
    description:
      "Review changing itineraries against crew, aircraft, airport, and operator requirements before committing to the next move.",
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
        "Dust isn't just about saving time—it's about making better, more informed decisions.",
      author: {
        name: "Etienne Debost",
        title: "Dust customer reference · Head of Architecture",
      },
      company: {
        logo: "/static/landing/logos/white/wakam.svg",
        alt: "Wakam",
      },
      bgColor: "bg-blue-600",
      textColor: "text-white",
    },
    decorativeShapes: {
      topRight: "/static/landing/industry/shapes/rounded-rectangle.svg",
      bottomLeft: "/static/landing/industry/shapes/diamond.svg",
    },
  },
  aiAgents: {
    title:
      "Mission intelligence for charter operators",
    description:
      "Review changing itineraries against crew, aircraft, airport, and operator requirements before committing to the next move. The product roadmap brings mission monitoring, contextual alerts, recovery options, and team review into the same operating picture.",
    bgColor: "bg-gray-50",
  },
  trustedBy: {
    title: "Reference ecosystem · existing third-party logos",
    logoSet: "insurance",
  },
  painPoints: {
    title: "From changing conditions to coordinated action",
    painPoints: [
      {
        icon: "/static/landing/industry/d-blue.svg",
        title: "Understand the mission",
        description:
          "Review changing itineraries against crew, aircraft, airport, and operator requirements before committing to the next move.",
        color: "blue",
      },
      {
        icon: "/static/landing/industry/d-red.svg",
        title: "Evaluate the impact",
        description:
          "Evaluate how delays, diversions, and revised arrival times affect duty and rest margins.",
        color: "red",
      },
      {
        icon: "/static/landing/industry/d-green.svg",
        title: "Coordinate the response",
        description:
          "Compare rescheduling and coverage options with the relevant mission and operator constraints visible.",
        color: "green",
      },
    ],
  },
  dustInAction: {
    title: "Charter Operators workflows",
    useCases: [
      {
        title: "Mission monitoring",
        image: "/static/landing/industry/features/UxWriter.webp",
        bgColor: "bg-golden-100",
        features: [
          {
            icon: "bg-golden-500",
            title: "Crew availability",
            description:
              "Bring roster availability and required qualifications into mission planning.",
          },
          {
            icon: "bg-blue-500 rounded-tl-full",
            title: "Duty impact",
            description:
              "Evaluate how delays, diversions, and revised arrival times affect duty and rest margins.",
          },
          {
            icon: "bg-purple-400 rounded-br-full",
            title: "Rotation dependencies",
            description:
              "Trace a proposed change through later legs and identify where the crew plan needs review.",
          },
          {
            icon: "bg-red-400",
            title: "Recovery coordination",
            description:
              "Compare rescheduling and coverage options with the relevant mission and operator constraints visible.",
          },
        ],
      },
      {
        title: "Operational assessment",
        image: "/static/landing/industry/features/Compliance_verification.webp",
        bgColor: "bg-blue-100",
        features: [
          {
            icon: "bg-golden-500",
            title: "Crew availability",
            description:
              "Bring roster availability and required qualifications into mission planning.",
          },
          {
            icon: "bg-blue-500 rounded-tl-full",
            title: "Duty impact",
            description:
              "Evaluate how delays, diversions, and revised arrival times affect duty and rest margins.",
          },
          {
            icon: "bg-purple-400 rounded-br-full",
            title: "Rotation dependencies",
            description:
              "Trace a proposed change through later legs and identify where the crew plan needs review.",
          },
          {
            icon: "bg-red-400",
            title: "Recovery coordination",
            description:
              "Compare rescheduling and coverage options with the relevant mission and operator constraints visible.",
          },
        ],
      },
      {
        title: "Recovery planning",
        image: "/static/landing/industry/features/Legal_review_3.webp",
        bgColor: "bg-green-100",
        features: [
          {
            icon: "bg-golden-500",
            title: "Crew availability",
            description:
              "Bring roster availability and required qualifications into mission planning.",
          },
          {
            icon: "bg-blue-500 rounded-tl-full",
            title: "Duty impact",
            description:
              "Evaluate how delays, diversions, and revised arrival times affect duty and rest margins.",
          },
          {
            icon: "bg-purple-400 rounded-br-full",
            title: "Rotation dependencies",
            description:
              "Trace a proposed change through later legs and identify where the crew plan needs review.",
          },
        ],
      },
      {
        title: "Team coordination",
        image: "/static/landing/industry/features/Radar_AIDigest.webp",
        bgColor: "bg-gray-950",
        features: [
          {
            icon: "bg-golden-500",
            title: "Crew availability",
            description:
              "Bring roster availability and required qualifications into mission planning.",
          },
          {
            icon: "bg-blue-500 rounded-tl-full",
            title: "Duty impact",
            description:
              "Evaluate how delays, diversions, and revised arrival times affect duty and rest margins.",
          },
          {
            icon: "bg-purple-400 rounded-br-full",
            title: "Rotation dependencies",
            description:
              "Trace a proposed change through later legs and identify where the crew plan needs review.",
          },
          {
            icon: "bg-red-400",
            title: "Recovery coordination",
            description:
              "Compare rescheduling and coverage options with the relevant mission and operator constraints visible.",
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
      "Dust isn't just about saving time—it's about making better, more informed decisions.",
    author: {
      name: "Etienne Debost",
      title: "Dust customer reference · Head of Architecture",
    },
    company: {
      logo: "/static/landing/logos/white/wakam.svg",
      alt: "Wakam",
    },
    bgColor: "bg-blue-600",
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
