import { HomeReveal } from "@marketing/components/home/content/Product/HomeReveal";
import { HomeEyebrow } from "@marketing/components/home/content/Product/HomeEyebrow";
import { OperationsTheater } from "./OperationsTheater";
export function MissionShowcaseSection() {
  return (
    <section
      id="mission-control"
      className="w-full scroll-mt-24 bg-[#0c1317] py-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 lg:px-10">
        <HomeReveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex max-w-[680px] flex-col gap-5">
              <HomeEyebrow label="Mission autonomy, in context" />
              <h2 className="m-0 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-foreground md:text-5xl">
                From the first request.
                <br />
                To the last aircraft home.
              </h2>
            </div>
            <p className="m-0 max-w-[340px] text-sm leading-relaxed text-muted-foreground">
              Choose an operation. See how Aeros turns intent into assignments,
              connects the scene to your team, and keeps coverage moving when
              the plan changes.
            </p>
          </div>
        </HomeReveal>
        <HomeReveal delay={100}>
          <OperationsTheater initialScenario={1} />
        </HomeReveal>
        <div className="flex flex-wrap justify-between gap-5 border-t border-border pt-6 text-xs text-muted-foreground">
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
