import { FeatureScene } from "@marketing/components/home/content/Product/mission-control/FeatureScene";
import UTMButton from "@marketing/components/UTMButton";
import { HomeReveal } from "@marketing/components/home/content/Product/HomeReveal";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  // Figma node 3942:1729 — 125deg pastel gradient per card panel.
  panelGradient: string;
  imageSrc?: string;
  videoSrc?: string;
  ctaLabel: string;
  ctaHref: string;
}

const features: FeatureItem[] = [
  {
    id: "pods",
    title: "Your connected fleet. One workspace.",
    description:
      "Coordinate aircraft, docks, providers, and field teams around a shared mission plan. Keep fleet state, assignments, operator approvals, and work orders in sync.",
    panelGradient: "linear-gradient(125deg, #FFF1F7 0.54%, #FFC3DF 100%)",
    videoSrc: "/static/landing/drone/films/fleet-readiness.mp4",
    ctaLabel: "Discuss your workflow",
    ctaHref: "/home/contact",
  },
  {
    id: "skill",
    title: "Continuous reassessment",
    description:
      "When wind rises or a drone becomes unavailable, identify affected missions and compare recovery options. Reassign work, delay a mission, or return an aircraft with operator approval.",
    panelGradient: "linear-gradient(125deg, #E9F7FF 0.54%, #9FDBFF 100%)",
    videoSrc: "/static/landing/drone/films/mission-recovery.mp4",
    ctaLabel: "Discuss your workflow",
    ctaHref: "/home/contact",
  },
];

export function InteractiveFeaturesSection() {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex w-screen flex-col gap-[48px] bg-[#020618] py-[128px]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center px-6">
        <HomeReveal>
          <h2 className="m-0 py-[8px] text-center font-sans text-[48px] font-normal leading-[52px] tracking-[-0.06em] text-white">
            Built around the entire mission
          </h2>
        </HomeReveal>
      </div>

      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-[16px] px-6 md:grid-cols-2">
        {features.map((feature, i) => (
          <HomeReveal key={feature.id} delay={80 + i * 80} className="h-full">
            <div className="flex h-full flex-col items-center gap-[32px] rounded-[16px] bg-[#090F2A] p-[32px]">
              <div
                className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-[8px]"
                style={{ backgroundImage: feature.panelGradient }}
              >
                {feature.videoSrc ? (
                  <FeatureScene
                    film={
                      feature.id === "pods"
                        ? "fleet-readiness"
                        : "mission-recovery"
                    }
                  />
                ) : (
                  feature.imageSrc && (
                    <img
                      src={feature.imageSrc}
                      alt={feature.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )
                )}
              </div>
              <div className="flex w-full flex-1 flex-col items-center gap-[16px]">
                <h4 className="m-0 text-center font-sans text-[32px] font-semibold leading-[30px] tracking-[-0.03em] text-white">
                  {feature.title}
                </h4>
                <p className="m-0 text-center font-sans text-[16px] leading-[25.6px] tracking-[-0.02em] text-white/70">
                  {feature.description}
                </p>
              </div>
              <UTMButton
                variant="outline"
                size="sm"
                label={feature.ctaLabel}
                href={feature.ctaHref}
              />
            </div>
          </HomeReveal>
        ))}
      </div>
    </div>
  );
}
