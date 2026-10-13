import { HeroOfficeSection } from "@marketing/components/home/content/Product/HeroOfficeSection";
import { HomeAIOperatorsCTASection } from "@marketing/components/home/content/Product/HomeAIOperatorsCTASection";
import { HomeAgentsImproveSection } from "@marketing/components/home/content/Product/HomeAgentsImproveSection";
import { HomeCoordinatedSection } from "@marketing/components/home/content/Product/HomeCoordinatedSection";
import { HomeNewsSection } from "@marketing/components/home/content/Product/HomeNewsSection";
import { HomeQuotesSection } from "@marketing/components/home/content/Product/HomeQuotesSection";
import { HomeRevealStyles } from "@marketing/components/home/content/Product/HomeReveal";
import { HomeSecuritySection } from "@marketing/components/home/content/Product/HomeSecuritySection";
import { HomeTeamSportSection } from "@marketing/components/home/content/Product/HomeTeamSportSection";
import { HomeTeamUsageSection } from "@marketing/components/home/content/Product/HomeTeamUsageSection";
import { HomeTrustedSection } from "@marketing/components/home/content/Product/HomeTrustedSection";
import type { NewsItem } from "@marketing/lib/homepage_news";

const TESTIMONIAL_IMAGE = "/static/landing/people/quote-testimonial.png";

const QUOTES = [
  {
    quote:
      "Turn fragmented operational inputs into a clear set of viable actions.",
    authorName: "Aeros",
    authorRole: "Operations intelligence",
    imageSrc: TESTIMONIAL_IMAGE,
    imageAlt: "Everett Berry, Head of GTM Engineering at Clay",
  },
  {
    quote: "Every recommendation should show what changed, what it means, and the evidence behind it.",
    authorName: "Aeros",
    authorRole: "Decision support",
    imageSrc: "/static/landing/people/shashank-khanna.png",
    imageAlt: "Shashank Khanna, Founder in Residence at Vanta",
    bg: "bg-violet-50",
  },
];

interface IntroSectionProps {
  news?: NewsItem[];
}

export function IntroSection({ news }: IntroSectionProps = {}) {
  return (
    <section className="w-full">
      <HomeRevealStyles />
      <div className="flex flex-col">
        <HeroOfficeSection />
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex w-screen flex-col">
          <HomeTrustedSection />
          <HomeCoordinatedSection />
          <HomeQuotesSection quotes={QUOTES} />
          <HomeAgentsImproveSection />
          <HomeTeamSportSection />
          <HomeSecuritySection />
          <HomeTeamUsageSection />
          <HomeNewsSection news={news} />
          <HomeAIOperatorsCTASection />
        </div>
      </div>
    </section>
  );
}
