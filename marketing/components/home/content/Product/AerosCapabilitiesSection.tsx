import { HomeReveal } from "@marketing/components/home/content/Product/HomeReveal";
import { HomeEyebrow } from "@marketing/components/home/content/Product/HomeEyebrow";
import Image from "next/image";
import Link from "next/link";

const capabilities = [
  {
    number: "01",
    category: "UNDERSTAND THE OBJECTIVE",
    title: "Mission intelligence.",
    description: "Translate an operational objective into a flight plan that accounts for available aircraft, coverage and operator constraints.",
    image: "/static/landing/drone/films/mission-story.jpg",
    alt: "Aeros mission workflow film still",
    href: "/home/solutions/search-rescue",
    action: "Explore mission planning",
  },
  {
    number: "02",
    category: "COORDINATE THE FLEET",
    title: "Fleet orchestration.",
    description: "Plan coordinated assignments across aircraft and teams, with readiness, handoffs and exceptions visible in one place.",
    image: "/static/landing/drone/films/fleet-readiness.jpg",
    alt: "Aeros fleet readiness interface film still",
    href: "#dispatch-workflow",
    action: "See fleet coordination",
  },
  {
    number: "03",
    category: "MODEL THE ENVIRONMENT",
    title: "Spatial intelligence.",
    description: "Bring airspace, weather, terrain and changing aircraft state into a shared picture of the operation.",
    image: "/static/landing/drone/alameda-aerial.jpg",
    alt: "Aerial photograph of terrain and infrastructure",
    href: "/home/solutions/infrastructure-inspection",
    action: "Explore spatial workflows",
  },
  {
    number: "04",
    category: "LEARN FROM THE MISSION",
    title: "Visual intelligence.",
    description: "Bring imagery, observations and reviewable evidence back to the people making operational decisions.",
    image: "/static/landing/drone/films/mission-recovery.jpg",
    alt: "Aeros mission recovery review film still",
    href: "#mission-control",
    action: "View the recorded demo",
  },
] as const;

export function AerosCapabilitiesSection() {
  return (
    <section id="capabilities" aria-labelledby="aeros-capabilities-title" className="w-full bg-[#0b1115] py-20 text-[#edf3f6] lg:py-36">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <HomeReveal>
          <div className="grid gap-8 border-t border-[#34434c] pt-7 lg:grid-cols-[1fr_2fr] lg:gap-12">
            <HomeEyebrow label="The Aeros intelligence stack" />
            <h2 id="aeros-capabilities-title" className="aeros-statement m-0 max-w-[1000px]">
              One operation.
              <br />
              Every layer of intelligence.
            </h2>
          </div>
          <p className="ml-auto mt-8 max-w-[510px] text-base leading-[1.65] text-[#aebdc7] lg:mt-10 lg:text-lg">
            Starting with drones. Building the software that can plan, coordinate, understand and adapt as the physical world changes.
          </p>
        </HomeReveal>
        <div className="aeros-capability-grid mt-16 lg:mt-28">
          {capabilities.map((item, index) => (
            <HomeReveal key={item.number} as="article" className="aeros-editorial-card pt-5" delay={index % 2 ? 120 : 0}>
              <div className="mb-7 flex items-center justify-between font-mono text-[10px] tracking-[.13em] text-[#9cb0bc]">
                <span className="aeros-editorial-index">{item.number} / 04</span>
                <span>{item.category}</span>
              </div>
              <div className="aeros-editorial-image relative aspect-[16/10] w-full bg-[#17232a]">
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081117]/55 via-transparent to-transparent" />
              </div>
              <div className="mt-7 flex flex-col gap-4">
                <h3 className="m-0 text-[clamp(1.9rem,3.3vw,3.3rem)] font-semibold leading-[1.02] tracking-[-.055em]">
                  {item.title}
                </h3>
                <p className="m-0 max-w-[470px] text-base leading-[1.65] text-[#acbcc6]">{item.description}</p>
                <Link href={item.href} className="aeros-index-link mt-4">
                  <span className="aeros-index-window" aria-hidden="true">
                    <span className="aeros-index-stack"><span>{item.number}</span><span>↗</span></span>
                  </span>
                  <span className="aeros-index-label">{item.action}</span>
                </Link>
              </div>
            </HomeReveal>
          ))}
        </div>
        <HomeReveal className="mt-24 border-t border-[#34434c] pt-10 lg:mt-36">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <p className="m-0 max-w-[820px] text-[clamp(2rem,5.6vw,5.8rem)] font-semibold leading-[1.04] tracking-[-.06em]">
              The skies are the starting point.
            </p>
            <Link href="/home/about" className="aeros-index-link shrink-0">
              <span className="aeros-index-window" aria-hidden="true"><span className="aeros-index-stack"><span>05</span><span>↗</span></span></span>
              <span className="aeros-index-label">Our direction</span>
            </Link>
          </div>
        </HomeReveal>
      </div>
    </section>
  );
}
