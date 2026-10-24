import { MissionShowcaseSection } from "@marketing/components/home/content/Product/mission-control/MissionShowcaseSection";
import { HeroOfficeSection } from "@marketing/components/home/content/Product/HeroOfficeSection";
import { HomeAIOperatorsCTASection } from "@marketing/components/home/content/Product/HomeAIOperatorsCTASection";
import {
  ProductDetails,
  ProductQuestions,
} from "@marketing/components/home/content/Product/ProductDetails";
import { HomeCoordinatedSection } from "@marketing/components/home/content/Product/HomeCoordinatedSection";
import { HomeNewsSection } from "@marketing/components/home/content/Product/HomeNewsSection";
import { HomeQuotesSection } from "@marketing/components/home/content/Product/HomeQuotesSection";
import { HomeRevealStyles } from "@marketing/components/home/content/Product/HomeReveal";
import { HomeSecuritySection } from "@marketing/components/home/content/Product/HomeSecuritySection";
import { HomeTeamSportSection } from "@marketing/components/home/content/Product/HomeTeamSportSection";
import { HomeTeamUsageSection } from "@marketing/components/home/content/Product/HomeTeamUsageSection";
import { HomeTrustedSection } from "@marketing/components/home/content/Product/HomeTrustedSection";
import type { NewsItem } from "@marketing/lib/homepage_news";

const QUOTES = [
  {
    quote: "Describe the outcome. Coordinate the fleet. Close the loop.",
    authorName: "Aeros",
    authorRole: "Natural-language dispatch",
    imageSrc: "/static/landing/drone/workspace.svg",
    imageAlt: "Illustrative Aeros mission dispatch workspace",
  },
  {
    quote:
      "Every recommendation should show what changed, what it means, and the evidence behind it.",
    authorName: "Aeros",
    authorRole: "Decision support",
    imageSrc: "/static/landing/drone/recovery.svg",
    imageAlt: "Illustrative Aeros exception and recovery review",
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
          <MissionShowcaseSection />
          <HomeCoordinatedSection />
          <HomeQuotesSection quotes={QUOTES} />
          <ProductDetails />
          <HomeTeamSportSection />
          <HomeSecuritySection />
          <HomeTeamUsageSection />
          <HomeNewsSection news={news} />
          <ProductQuestions />
          <HomeAIOperatorsCTASection />
        </div>
      </div>
    </section>
  );
}
