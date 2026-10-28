import { LandingVideo } from "@marketing/components/home/content/Product/mission-control/LandingVideo";
import { Button } from "@dust-tt/sparkle";
import { HomeReveal } from "@marketing/components/home/content/Product/HomeReveal";
import { TRACKING_AREAS, withTracking } from "@marketing/lib/tracking";
import Link from "next/link";

const HEADLINE_LINE_1 = "One instruction.";
const HEADLINE_LINE_2 = "An entire operation.";
const LEAD_COPY =
  "Describe the mission. Aeros plans, dispatches, and coordinates the drone fleet you already operate—from the first request to the final report. Your operators stay in control.";

export function HeroOfficeSection() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-background pb-12">
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col items-stretch gap-10 px-6 pt-16 lg:flex-row lg:items-center lg:gap-0 lg:px-10 lg:pt-24">
        <div className="z-10 flex w-full flex-col items-start gap-6 lg:w-[37%] lg:pr-8">
          <HomeReveal>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              AI DISPATCH · MISSION AUTONOMY
            </p>
            <h1
              className="m-0 text-balance text-[clamp(40px,4.1vw,68px)] font-semibold leading-[90%] tracking-[-0.04em] text-foreground"
              style={{ fontFamily: "var(--font-sans, inherit)" }}
            >
              {HEADLINE_LINE_1}
              <br />
              {HEADLINE_LINE_2}
            </h1>
          </HomeReveal>
          <HomeReveal delay={80}>
            <p className="copy-lg max-w-[520px] text-pretty leading-[1.55] text-muted-foreground">
              {LEAD_COPY}
            </p>
          </HomeReveal>
          <HomeReveal delay={160}>
            <div className="flex flex-row flex-wrap justify-start gap-3">
              <Link href="/home/contact">
                <Button
                  variant="highlight"
                  size="md"
                  label="Request a demo"
                  onClick={withTracking(TRACKING_AREAS.HOME, "hero_book_demo")}
                />
              </Link>
              <Button
                variant="ghost-secondary"
                size="md"
                label="Watch the Boston demo →"
                href="#mission-control"
                onClick={withTracking(
                  TRACKING_AREAS.HOME,
                  "hero_watch_boston_demo"
                )}
              />
            </div>
          </HomeReveal>
        </div>

        <HomeReveal delay={80} className="relative w-full lg:w-[63%]">
          <LandingVideo
            src="/static/landing/drone/films/aeros-film-v4.mp4"
            poster="/static/landing/drone/films/aeros-film-v4.jpg"
            title="Aeros film"
            description="01:02 · From mission request to report"
            autoPlay
            ambient
          />
        </HomeReveal>
      </div>
    </section>
  );
}
