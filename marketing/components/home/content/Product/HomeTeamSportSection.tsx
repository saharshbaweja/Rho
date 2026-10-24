import { FeatureScene } from "@marketing/components/home/content/Product/mission-control/FeatureScene";
import { H2, P } from "@marketing/components/home/ContentComponents";
import { HomeEyebrow } from "@marketing/components/home/content/Product/HomeEyebrow";
import { HomeQuoteMark } from "@marketing/components/home/content/Product/HomeQuoteMark";
import { HomeReveal } from "@marketing/components/home/content/Product/HomeReveal";
import { Source_Serif_4 } from "next/font/google";
import Image from "next/image";

const sourceSerif = Source_Serif_4({ subsets: ["latin"] });

export function HomeTeamSportSection() {
  return (
    <section className="w-full bg-background py-14 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col px-6">
        {/* Two-column layout: copy + Aeros pull-quote on the left,
            collaboration illustration on the right. Mirrors the
            HomeCoordinatedSection layout. */}
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex w-full flex-col gap-6 lg:w-1/2">
            <HomeReveal>
              <HomeEyebrow label="Shared context. Clear ownership." />
            </HomeReveal>
            <HomeReveal delay={80}>
              <H2 className="text-balance font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
                One mission. Every team aligned.
              </H2>
            </HomeReveal>
            <HomeReveal delay={160}>
              <P
                size="sm"
                className="max-w-[480px] leading-[1.6] text-muted-foreground"
              >
                When a mission changes, every team needs the same picture. Aeros
                connects fleet operators, service providers, and field teams
                around one mission plan. Share assignments, resolve exceptions,
                and keep approval ownership clear across every connected fleet.
              </P>
            </HomeReveal>
            <HomeReveal as="figure" delay={240} className="m-0 mt-4 w-full">
              <div className="flex w-full max-w-[520px] flex-col gap-4 border-l-2 border-foreground/15 pl-5 text-left">
                <HomeQuoteMark />
                <blockquote
                  className={`${sourceSerif.className} m-0 text-balance text-base font-normal leading-[1.4] tracking-[-0.005em] text-foreground md:text-lg`}
                >
                  &ldquo;Shared intelligence. Human judgment. Clear
                  accountability.&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 not-italic">
                  <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                    <Image
                      src="/static/landing/home/aeros-principle-mark.svg"
                      alt="Aeros operating principle"
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      Aeros
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Operating principle
                    </span>
                  </span>
                </figcaption>
              </div>
            </HomeReveal>
          </div>
          <HomeReveal
            variant="photo"
            delay={120}
            className="flex w-full justify-center self-stretch lg:w-1/2"
          >
            <div className="relative flex w-full max-w-[560px] items-center self-stretch overflow-hidden rounded-3xl">
              <FeatureScene feature="Aeros Control" />
            </div>
          </HomeReveal>
        </div>
      </div>
    </section>
  );
}
