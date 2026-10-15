import { Button } from "@dust-tt/sparkle";
import { HomeReveal } from "@marketing/components/home/content/Product/HomeReveal";
import { useSignUpModal } from "@marketing/hooks/useSignUpModal";
import { TRACKING_AREAS, withTracking } from "@marketing/lib/tracking";
import Link from "next/link";

const HEADLINE_LINE_1 = "Mission intelligence for";
const HEADLINE_LINE_2 = "modern flight operations";
const LEAD_COPY =
  "Aeros connects your missions, live aviation data, aircraft, crews, and operating procedures so your team can understand every change, evaluate viable options, and make operational decisions with the full picture.";

export function HeroOfficeSection() {
  const { openSignUpModal } = useSignUpModal();

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-background pb-12">
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col-reverse items-stretch gap-10 px-6 pt-16 lg:flex-row lg:items-center lg:gap-0 lg:px-10 lg:pt-24">
        <div className="z-10 flex w-full flex-col items-start gap-6 lg:w-[42%] lg:pr-8">
          <HomeReveal>
            <h1
              className="m-0 text-balance text-[clamp(40px,4.8vw,76px)] font-semibold leading-[90%] tracking-[-0.04em] text-foreground"
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
                label="Request access →"
                onClick={withTracking(
                  TRACKING_AREAS.HOME,
                  "hero_start_free",
                  openSignUpModal
                )}
              />
            </div>
          </HomeReveal>
        </div>

        <HomeReveal
          delay={80}
          className="relative hidden w-full lg:block lg:w-[58%]"
        >
          <div
            className="dust-floor-host w-full lg:h-[min(86vh,900px)]"
            aria-hidden="true"
          >
            <video
              className="h-full w-full object-contain"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source
                src="/static/landing/home/Aeros_Hero_Video_1080p.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </HomeReveal>
      </div>
    </section>
  );
}
