import { FeatureScene } from "@marketing/components/home/content/Product/mission-control/FeatureScene";
import {
  HomeReveal,
  HomeRevealStyles,
} from "@marketing/components/home/content/Product/HomeReveal";
import { HomeEyebrow } from "@marketing/components/home/content/Product/HomeEyebrow";
import { PageMetadata } from "@marketing/components/home/PageMetadata";
import { useRouter } from "next/router";
import Link from "next/link";
export interface OperationsPageProps {
  eyebrow: string;
  title: string;
  description: string;
  sections: { title: string; description: string }[];
  image?: string;
}
export function OperationsPage({
  eyebrow,
  title,
  description,
  sections,
  image = "/static/landing/drone/workspace.svg",
}: OperationsPageProps) {
  const router = useRouter();
  return (
    <>
      <PageMetadata
        title={`${eyebrow} | Aeros`}
        description={description}
        pathname={router.asPath}
      />
      <HomeRevealStyles />
      <section className="w-full bg-background pb-20 pt-14 lg:pt-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
            <div className="flex flex-1 flex-col items-start gap-6">
              <HomeEyebrow label={eyebrow} />
              <h1 className="m-0 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground md:text-6xl">
                {title}
              </h1>
              <p className="m-0 max-w-[560px] text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/home/contact"
                  className="rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600"
                >
                  Discuss your workflow →
                </Link>
                <Link
                  href="/home/product#dispatch-demo"
                  className="rounded-full border border-border px-6 py-3 text-sm text-foreground"
                >
                  Explore the demo
                </Link>
              </div>
            </div>
            <HomeReveal className="w-full lg:w-1/2">
              <FeatureScene
                film={
                  eyebrow.toLowerCase().includes("oversight") ||
                  eyebrow.toLowerCase().includes("security")
                    ? "mission-recovery"
                    : eyebrow.toLowerCase().includes("integration") ||
                        eyebrow.toLowerCase().includes("provider")
                      ? "fleet-readiness"
                      : "mission-story"
                }
              />
            </HomeReveal>
          </div>
          <div className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-2">
            {sections.map((section, index) => (
              <article
                key={section.title}
                className="bg-background p-8 md:p-10"
              >
                <span className="font-mono text-sm text-blue-500">
                  0{index + 1}
                </span>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="mb-0 text-base leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
