import { Button, Rocket02 } from "@dust-tt/sparkle";
import { H1, P } from "@marketing/components/home/ContentComponents";
import {
  HomeReveal,
  HomeRevealStyles,
} from "@marketing/components/home/content/Product/HomeReveal";
import Link from "next/link";

export function ProductIntroSection() {
  return (
    <div className="sm:pt-18 w-full pb-12 pt-12 lg:pt-36">
      <HomeRevealStyles />
      <div className="flex flex-col gap-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:gap-2 lg:px-6">
          <HomeReveal>
            <H1 className="text-center text-5xl font-semibold md:text-6xl lg:text-7xl">
              Your fleet.
              <br />
              One operating picture.
            </H1>
          </HomeReveal>
          <HomeReveal delay={80}>
            <P size="lg" className="text-base text-muted-foreground sm:text-lg">
              Describe the mission. Aeros plans, assigns, and coordinates work
              across your existing drone fleets and providers. Readiness checks,
              exception handling, and operator oversight stay connected from the
              first request to the final report.
            </P>
          </HomeReveal>
          <HomeReveal delay={160}>
            <div className="mt-4 flex flex-row justify-center gap-4">
              <Link href="/home/contact" shallow={true}>
                <Button variant="highlight" size="md" label="Request a demo" />
              </Link>
              <Link href="/home/pricing" shallow={true}>
                <Button
                  variant="outline"
                  size="md"
                  label="Explore access"
                  icon={Rocket02}
                />
              </Link>
            </div>
          </HomeReveal>
        </div>
      </div>
    </div>
  );
}
