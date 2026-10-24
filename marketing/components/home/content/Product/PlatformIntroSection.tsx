import { LegacyButton as Button } from "@dust-tt/sparkle";
import { H1, P } from "@marketing/components/home/ContentComponents";
import { classNames } from "@marketing/lib/utils";

export function PlatformIntroSection() {
  return (
    <div
      className={classNames(
        "flex flex-col justify-end gap-4 pt-12 sm:pt-12 lg:pt-24",
        "col-span-10"
      )}
    >
      <P size="lg" className="text-muted-foreground">
        {" "}
        Aeros Platform{" "}
      </P>
      <H1
        mono
        className="text-5xl font-medium leading-tight md:text-6xl lg:text-7xl"
      >
        {" "}
        For Operational Systems{" "}
      </H1>
      <P size="lg" className="text-muted-foreground">
        {" "}
        Bring aviation sources and operator systems into a consistent mission
        context, with integration scope validated for your operation.{" "}
      </P>
      <div className="flex flex-col gap-4 xs:flex-row sm:flex-row md:flex-row">
        <Button
          variant="primary"
          label="View reference documentation"
          size="md"
          className="mt-8"
          href="https://docs.dust.tt"
          target="_blank"
        />
      </div>
    </div>
  );
}
