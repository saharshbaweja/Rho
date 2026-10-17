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
} from "@marketing/components/home/content/Solutions/configs/utils";
import Link from "next/link";

// Config exports
export const pageSettings: pageSettingsProps = {
  uptitle: "Dispatch",
  title: (
    <> Turn mission complexity into <br></br> a clear dispatch plan. </>
  ),
  accentColor: "text-brand-red-rose",
  description: (
    <> Bring weather, airport restrictions, aircraft limits, crew constraints, and operator procedures into one mission assessment. Compare the next steps with the evidence in view. </>
  ),
  bulletPoints: [
    "Assemble the route, time windows, forecasts, notices, and operating limits into a focused briefing for dispatcher review.",
    "Assess airport hours, runway restrictions, available services, and aircraft requirements for the planned arrival or departure.",
    "Compare departure windows and alternates against the same mission constraints, including the effect on later legs.",
    "Keep unresolved conditions, supporting sources, and required approvals together before an authorized dispatcher makes the release decision.",
  ],
  image: "/static/landing/sales/accountSnapshot.png",
  seo: {
    title: "Aeros for Dispatch | Mission Intelligence",
    description:
      "Bring weather, airport restrictions, aircraft limits, crew constraints, and operator procedures into one mission assessment. Compare the next steps with the evidence in view.",
  },
};

export const Hero: HeroProps = {
  uptitle: pageSettings.uptitle,
  title: pageSettings.title,
  description: pageSettings.description,
  visuals: [
    {
      src: "/static/landing/sales/sales1.png",
      alt: "Sales Visual 1",
      depth: -30,
    },
    {
      src: "/static/landing/sales/sales2.png",
      alt: "Sales Visual 2",
      depth: -10,
    },
    {
      src: "/static/landing/sales/sales3.png",
      alt: "Sales Visual 3",
      depth: 20,
    },
    {
      src: "/static/landing/sales/sales4.png",
      alt: "Sales Visual 4",
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
  sectionTitle: "Dispatch, with the mission in view",
  items: [
    {
      icon: MagicWand02,
      title: "Understand the mission",
      description:
        "Bring weather, airport restrictions, aircraft limits, crew constraints, and operator procedures into one mission assessment. Compare the next steps with the evidence in view.",
    },
    {
      icon: CheckCircle,
      title: "Evaluate the impact",
      description:
        "Assess airport hours, runway restrictions, available services, and aircraft requirements for the planned arrival or departure.",
    },

    {
      icon: Users01,
      title: "Coordinate the response",
      description:
        "Keep unresolved conditions, supporting sources, and required approvals together before an authorized dispatcher makes the release decision.",
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
  sectionTitle: "Dispatch workflows",
  sectionDescription:
    "The Aeros roadmap for dispatch, from assessment to coordinated action.",
  items: [
    {
      title: "Mission briefing",
      content:
        "Assemble the route, time windows, forecasts, notices, and operating limits into a focused briefing for dispatcher review.",
      images: ["/static/landing/sales/accountSnapshot.png"],
    },
    {
      title: "Airport suitability",
      content:
        "Assess airport hours, runway restrictions, available services, and aircraft requirements for the planned arrival or departure.",
      images: ["/static/landing/sales/meetingSummary.png"],
    },
    {
      title: "Departure options",
      content:
        "Compare departure windows and alternates against the same mission constraints, including the effect on later legs.",
      images: ["/static/landing/sales/prospectQuestions.png"],
    },
    {
      title: "Release review",
      content:
        "Keep unresolved conditions, supporting sources, and required approvals together before an authorized dispatcher makes the release decision.",
      images: ["/static/landing/sales/salesCoach.png"],
    },
  ],
};

export const Quote: QuoteProps = {
  quote:
    "Dust is the most impactful software we've adopted since building Clay. It continuously gets smarter, turning hours of documentation search into instant, cited answers—letting our team spend less time searching and more time closing deals.",
  name: "Everett Berry ",
  title: "Dust customer reference · Head of GTM Engineering at Clay",
  logo: "/static/landing/logos/color/clay.png",
};

export const DemoVideo: DemoVideoProps = {
  sectionTitle: "Reference workflow demonstration",
  videoUrl: "https://fast.wistia.net/embed/iframe/8q80neektv",
  showCaptions: true,
};

export const Stories: CustomerStory[] = [
  {
    title: "Dust reference: Clay powers 4x sales team growth with Dust AI agents",
    content:
      "Clay uses Dust AI agents to scale their GTM team 4x while maintaining sales velocity.",
    href: "/customers/clay-scaling-gtme-team",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/06/clay_dust_agents.jpg",
  },
  {
    title: "Dust reference: Alan's teams save 3h weekly scraping sales transcripts",
    content:
      "Alan’s sales & marketing team transforms sales conversations into intelligence with AI agents",
    href: "/customers/alans-pmm-team-transforms-sales-conversations-into-intelligence-with-ai-agents",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Alan-__-Dust-1-1.png",
  },
  {
    title: "Dust reference: Kyriba's RFP Agent for improving pre-sales efficiency",
    content:
      "43% of Kyriba employees save more than 3 hours weekly leveraging Dust for RFPs.",
    href: "/customers/kyriba-accelerating-innovation-with-dust",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/07/Kyriba-__-Dust.png",
  },
  {
    title: "Dust reference: 20%+ productivity gains in Sales: Insights from Alan and Payfit",
    content:
      "Dust agents significantly lowered their acquisition costs, allowing them to hire more salespeople.",
    href: "/customers/generative-ai-insights-alan-payfit-leaders",
    src: "https://blog.dust.tt/content/images/size/w2000/2025/01/Founder.jpg",
  },
];

// FAQ items for the sales page
export const salesFAQItems = [
  {
    question: "How does Aeros assess a mission?",
    answer: (
      <> Aeros connects the conditions that matter to {" "}
        <strong> each individual mission </strong> . <br /> A forecast or restriction is assessed in relation to the route, operating window, aircraft, and operator requirements. <br />
        <strong> Context comes first. </strong> The assessment brings together <strong> aviation data </strong> and {" "}
        <strong> operator knowledge </strong> , with the relevant sources available for review. <br /> The objective is to help the operations team <strong> understand the impact and evaluate the response </strong> . </>
    ),
  },
  {
    question: "How are changing conditions handled?",
    answer: (
      <> Aeros is designed to reassess the missions affected by a source update. A change should reach the team with its operational consequence, rather than as another unfiltered notification. <br />
        <h3> Connect the inputs </h3> The roadmap brings together the conditions needed to understand the flight: <ul>
          <li> Weather forecasts and observations </li>
          <li> NOTAMs and temporary restrictions </li>
          <li> Airport information and services </li>
          <li> Aircraft state and limitations </li>
          <li> Crew availability and duty context </li>
          <li> Mission schedules and rotations </li>
          <li> Operator procedures and limits </li>
        </ul>
        <strong> The objective: </strong> A focused review of the missions that need attention. <br />
        <h3> Understand the impact </h3> The review asks <strong> what changes for this flight </strong> and what the responsible team needs to examine next: <ul>
          <li> Identify the affected operating window </li>
          <li> Check the relevant aircraft and airport constraints </li>
          <li> Trace the effect on later legs </li>
          <li> Make unresolved conditions visible </li>
        </ul>
        <h3> Keep the team aligned </h3> The current assessment should be available to <strong>
          {" "} dispatch, flight operations, crew, and maintenance </strong> , with clear ownership of the next action. <br />
        <h3> Preserve the review context </h3> A review starts with <strong> the current mission </strong> and continues with <strong> its supporting evidence </strong> , so the next shift can understand the situation and the actions still open. </>
    ),
  },
  {
    question: "How are recovery options compared?",
    answer: (
      <>
        <h3> Departure planning </h3> Review the <strong> operating window </strong> alongside <strong> airport restrictions </strong> and <strong> forecast conditions </strong> , then evaluate whether a proposed timing change resolves the relevant constraints. <h3> Alternate assessment </h3> The <strong> mission review </strong> brings airport services, aircraft requirements, and applicable operator procedures into a <strong> consistent comparison </strong> . Existing examples elsewhere on the site remain third-party reference material. {" "}
        <a
          href="/blog/generative-ai-insights-alan-payfit-leaders"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
        > View a reference example </a> . <h3> Aircraft recovery </h3> Keep the <strong> aircraft status </strong> connected to the <strong> rotation plan </strong> when assessing a replacement or repositioning option. The review should include <strong> the downstream effect </strong> on the operation. <h3> Crew recovery </h3> Review the <strong> revised mission timing </strong> alongside <strong> crew availability </strong> and the relevant qualifications, duty margins, and operator procedures. <h3> Decision handover </h3> Share the <strong> selected response </strong> with <strong> the responsible teams </strong> and keep the <strong> open conditions and approvals </strong> visible until the authorized people complete the review. </>
    ),
  },
  {
    question: "What evidence supports an assessment?",
    answer: (
      <> An operational assessment should make its basis inspectable. A conclusion is more useful when the team can see the source, its validity, and the assumptions used. <br />
        <h3> Source context </h3> Keep the origin of each condition visible: <ul>
          <li>
            <strong> Published facts </strong> identify the observation, notice, or airport information used. </li>
          <li>
            <strong> Operator rules </strong> identify the company procedure or operating limit applied. </li>
          <li> Effective periods show when a restriction applies. </li>
          <li> Missing inputs remain visible rather than silently assumed. </li>
        </ul>
        <h3> Mission-specific reasoning </h3> The relevant question is how the condition affects this flight, aircraft, route, and operating window. <h3> Evidence for review </h3> Keep the <strong> supporting source </strong> and <strong> assessment context </strong> together so the responsible specialist can verify the recommendation before acting. </>
    ),
  },
  {
    question: "Who makes the operational decision?",
    answer: (
      <> Aeros supports operational judgment; it does not replace the authority of the people responsible for the flight. <br />
        <h3> Define the review responsibilities </h3> The mission review keeps clear ownership for each role: <ul>
          <li>
            <strong> Dispatch </strong> reviews the plan and release requirements. </li>
          <li>
            <strong> Maintenance control </strong> reviews aircraft readiness and relevant restrictions. </li>
          <li>
            <strong> Flight crew </strong> reviews the mission within established command responsibilities. </li>
        </ul>
        <h3> Connect the operator context </h3> Configure the review around <strong> approved procedures and operating limits </strong> , with integration coverage and source quality validated during rollout. <h3> Validate the assessment </h3> Check the outputs against real operating scenarios with the people who will review them. <h3> Keep the workflow connected </h3> The roadmap includes contextual assistance alongside existing tools. Explore a {" "}
        <Link
          href="/home/chrome-extension"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
        > reference extension </Link> , while planning the workflows your team needs. <h3> Expand with evidence </h3> Start with a defined mission workflow, review the results, and broaden scope after the team validates the process. <br />
        <strong> Rollout scope: </strong> Data access, integration availability, approval responsibilities, and operating procedures are confirmed with each operator. <br />
        <br />
        <strong> Explore the approach </strong>
        <br /> Define the mission workflow, data requirements, and review responsibilities. You can {" "}
        <Link href="/home/pricing" className="underline underline-offset-4"> review access options </Link>{" "} while planning the operational use case. </>
    ),
  },
];
