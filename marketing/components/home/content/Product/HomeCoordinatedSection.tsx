import { FeatureScene } from "@marketing/components/home/content/Product/mission-control/FeatureScene";
import { H2, P } from "@marketing/components/home/ContentComponents";
import { HomeEyebrow } from "@marketing/components/home/content/Product/HomeEyebrow";
import { HomeReveal } from "@marketing/components/home/content/Product/HomeReveal";

export function HomeCoordinatedSection() {
  return (
    <section
      id="dispatch-workflow"
      className="w-full bg-background py-14 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-12 px-6 lg:flex-row-reverse lg:items-center lg:gap-20">
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          <HomeReveal>
            <HomeEyebrow label="Intent becomes a coordinated operation" />
          </HomeReveal>
          <HomeReveal delay={80}>
            <H2 className="text-balance font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
              Task the mission. Aeros coordinates the details.
            </H2>
          </HomeReveal>
          <HomeReveal delay={160}>
            <P
              size="sm"
              className="max-w-[480px] leading-[1.6] text-muted-foreground"
            >
              “Inspect the waterfront before sunrise.” Define the outcome once.
              Aeros assembles the assets, aircraft, payloads, operating window,
              and reserve capacity into a plan your team can review. Approved
              assignments flow to the providers that already operate your fleet.
            </P>
          </HomeReveal>
        </div>
        <HomeReveal
          variant="photo"
          delay={120}
          className="flex w-full justify-center self-stretch lg:w-1/2"
        >
          <div className="flex w-full items-center self-stretch rounded-3xl bg-blue-50">
            <FeatureScene film="mission-story" />
          </div>
        </HomeReveal>
      </div>
    </section>
  );
}
