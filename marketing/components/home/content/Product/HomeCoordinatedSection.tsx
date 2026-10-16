import { H2, P } from "@marketing/components/home/ContentComponents";
import { HomeEyebrow } from "@marketing/components/home/content/Product/HomeEyebrow";
import { HomeReveal } from "@marketing/components/home/content/Product/HomeReveal";
import Image from "next/image";

export function HomeCoordinatedSection() {
  return (
    <section className="w-full bg-background py-14 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-12 px-6 lg:flex-row-reverse lg:items-center lg:gap-20">
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          <HomeReveal>
            <HomeEyebrow label="From change to decision" />
          </HomeReveal>
          <HomeReveal delay={80}>
            <H2 className="text-balance font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
              One change. The whole mission in view.
            </H2>
          </HomeReveal>
          <HomeReveal delay={160}>
            <P
              size="sm"
              className="max-w-[480px] leading-[1.6] text-muted-foreground"
            >
              A new forecast can change more than the route. Aeros connects
              weather, aircraft, crew limits, and operator procedures to show
              the mission impact, compare viable options, and put an
              evidence-backed decision in your team’s hands.
            </P>
          </HomeReveal>
        </div>
        <HomeReveal
          variant="photo"
          delay={120}
          className="flex w-full justify-center self-stretch lg:w-1/2"
        >
          <div className="flex w-full max-w-[520px] items-center justify-center self-stretch rounded-3xl bg-blue-50 p-8">
            <Image
              src="/static/landing/home/aeros-mission-decision-flow.svg"
              alt="Illustrative Aeros workflow: weather change, connected mission context, operational impact, options, and dispatcher review"
              width={880}
              height={960}
              className="m-auto h-auto w-full max-w-[420px] object-contain"
              priority={false}
            />
          </div>
        </HomeReveal>
      </div>
    </section>
  );
}
