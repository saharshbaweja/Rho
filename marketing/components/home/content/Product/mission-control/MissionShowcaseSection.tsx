import { HomeReveal } from "@marketing/components/home/content/Product/HomeReveal";
import { HomeEyebrow } from "@marketing/components/home/content/Product/HomeEyebrow";
import { MissionControl } from "./MissionControl";
export function MissionShowcaseSection() {
  return (
    <section
      id="mission-control"
      className="w-full scroll-mt-24 bg-[#f5f8f9] py-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 lg:px-10">
        <HomeReveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex max-w-[680px] flex-col gap-5">
              <HomeEyebrow label="See the operation unfold" />
              <h2 className="m-0 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-foreground md:text-5xl">
                The whole mission.
                <br />
                One conversation.
              </h2>
            </div>
            <p className="m-0 max-w-[340px] text-sm leading-relaxed text-muted-foreground">
              Follow a request from first intent to the final report. Play the
              story, explore each chapter, or take a closer look at the fleet.
            </p>
          </div>
        </HomeReveal>
        <HomeReveal delay={100}>
          <MissionControl />
        </HomeReveal>
        <div className="flex flex-wrap justify-between gap-5 border-t border-[#dce6eb] pt-6 text-xs text-[#7b909c]">
          <span>
            <strong className="font-medium text-[#3c5a69]">Fleet aware.</strong>{" "}
            Readiness before every assignment.
          </span>
          <span>
            <strong className="font-medium text-[#3c5a69]">
              Provider neutral.
            </strong>{" "}
            Your flight stack stays in place.
          </span>
          <span>
            <strong className="font-medium text-[#3c5a69]">
              Operator led.
            </strong>{" "}
            Clear authority at every step.
          </span>
        </div>
      </div>
    </section>
  );
}
