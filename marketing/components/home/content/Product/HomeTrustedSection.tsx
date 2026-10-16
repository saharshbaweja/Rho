import { LogoBarImage } from "@marketing/components/home/LogoBarImage";
import { useLogoBar } from "@marketing/components/home/LogoListsContext";
import { HomeReveal } from "@marketing/components/home/content/Product/HomeReveal";
import type { LogoBarLogo } from "@marketing/lib/logo_bars";
import {
  fallbackHomeTrustedGeo,
  homeTrustedBarSlug,
  toLogoListRegion,
} from "@marketing/lib/logo_bars";
import { useGeolocation } from "@marketing/lib/swr/geo";
import { useRouter } from "next/router";

// Logo lineups live in Contentful (`logoList` entries, one per region), with
// the hardcoded lists in lib/logo_bars.ts as the fallback. Case-study links
// come from the same entries, so they can no longer drift from TrustedBy's.
function useHomeTrustedLogos(): LogoBarLogo[] {
  const { query } = useRouter();
  const { geoData } = useGeolocation();

  // ?geo=FR|GB|US overrides geo detection (useful for dev/testing)
  const geoParam =
    typeof query.geo === "string" ? query.geo.toUpperCase() : undefined;
  const countryCode = geoParam ?? geoData?.countryCode;

  const region = toLogoListRegion(countryCode);

  return useLogoBar(region, homeTrustedBarSlug(fallbackHomeTrustedGeo(region)));
}

const MARQUEE_CSS = `
  @keyframes home-trusted-marquee {
    from { transform: translate3d(0, 0, 0); }
    to   { transform: translate3d(-50%, 0, 0); }
  }
  .home-trusted-track {
    animation: home-trusted-marquee 40s linear infinite;
    will-change: transform;
  }
  .home-trusted-mask:hover .home-trusted-track,
  .home-trusted-mask:focus-within .home-trusted-track {
    animation-play-state: paused;
  }

  /* Case study chip — always visible for logos that have a URL. Color
     deepens on hover (handled by Tailwind hover:text-foreground). */
  .home-trusted-chip {
    transition: color 180ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .home-trusted-track { animation: none; }
    .home-trusted-chip { transition: none; }
  }
`;

function MarqueeMaskWrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="home-trusted-mask relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Compact, chrome-less variant of the marquee — same logos and animation but
 * without the title, background, or case-study chips. Use when you want the
 * rolling logos inline (e.g. embedded in a landing page column).
 */
export function HomeTrustedMarqueeCompact() {
  const logos = useHomeTrustedLogos();
  const marqueeLogos = [...logos, ...logos];
  return (
    <div className="w-full">
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />
      <MarqueeMaskWrap>
        <div className="home-trusted-track flex w-max items-center gap-x-10 sm:gap-x-12">
          {marqueeLogos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="flex h-10 flex-shrink-0 items-center justify-center opacity-60"
              aria-hidden={idx >= logos.length}
            >
              <LogoBarImage
                logo={logo}
                alt={idx >= logos.length ? "" : logo.name}
                width={180}
                height={50}
              />
            </div>
          ))}
        </div>
      </MarqueeMaskWrap>
    </div>
  );
}

// Source marks identify reference agencies in the product roadmap, not customers.
const CAPABILITY_ROADMAP = [
  { name: "FAA", image: "faa.svg", capability: "NOTAMs, TFRs & airport status", url: "https://www.faa.gov/" },
  { name: "NOAA", image: "noaa.png", capability: "METARs, TAFs & weather hazards", url: "https://aviationweather.gov/" },
  { name: "EUROCONTROL", image: "eurocontrol.svg", capability: "Airspace, network & flow constraints", url: "https://www.eurocontrol.int/" },
  { name: "EASA", image: "easa.svg", capability: "Regulations & airworthiness", url: "https://www.easa.europa.eu/en" },
  { name: "Mission intelligence", capability: "Live context & change detection" },
  { name: "Crew & scheduling", capability: "Availability, duty & mission dependencies" },
  { name: "Aircraft & maintenance", capability: "Readiness, MELs & operational impact" },
  { name: "Operator procedures", capability: "Manuals, policies & operating limits" },
  { name: "Recovery planning", capability: "Delays, alternates & aircraft swaps" },
  { name: "Decision evidence", capability: "Source-linked options & tradeoffs" },
  { name: "Team coordination", capability: "Shared context & role-based approvals" },
];

export function HomeTrustedSection() {
  const capabilities = [...CAPABILITY_ROADMAP, ...CAPABILITY_ROADMAP];
  return (
    <section className="flex w-full items-center justify-center bg-background pb-20 pt-12">
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-12 text-center">
        <HomeReveal>
          <h2 className="m-0 text-balance px-6 text-center text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">
            The aviation ecosystem.
            <br />
            One <span className="text-blue-500">operational picture.</span>
          </h2>
          <p className="mx-auto mb-0 mt-4 max-w-[620px] px-6 text-sm leading-relaxed text-muted-foreground">
            The Aeros roadmap: aviation data, operational constraints, and coordinated decisions.
          </p>
        </HomeReveal>
        <HomeReveal delay={120} className="w-full">
          <MarqueeMaskWrap>
            <div className="home-trusted-track flex w-max items-end">
              {capabilities.map((item, idx) => {
                const duplicate = idx >= CAPABILITY_ROADMAP.length;
                const content = (
                  <>
                    <div className="flex h-14 items-center justify-center gap-3">
                      {"image" in item ? (
                        <img
                          src={`/static/landing/sources/${item.image}`}
                          alt={duplicate ? "" : item.name}
                          className="h-14 w-[160px] object-contain"
                          width={160}
                          height={56}
                        />
                      ) : (
                        <>
                          <img src="/static/landing/home/aeros-principle-mark.svg" alt="" className="h-7 w-7" width={28} height={28} />
                          <span className="max-w-[190px] text-left text-lg font-semibold leading-tight tracking-[-0.025em] text-foreground/80">{item.name}</span>
                        </>
                      )}
                    </div>
                    <span className="mt-4 text-[11px] leading-none text-muted-foreground">{item.capability}</span>
                  </>
                );
                const className = "flex w-[288px] flex-shrink-0 flex-col items-center px-6";
                return "url" in item ? (
                  <a key={`${item.name}-${idx}`} href={item.url} target="_blank" rel="noopener noreferrer" tabIndex={duplicate ? -1 : undefined} aria-hidden={duplicate} className={className}>
                    {content}
                  </a>
                ) : (
                  <div key={`${item.name}-${idx}`} aria-hidden={duplicate} className={className}>
                    {content}
                  </div>
                );
              })}
            </div>
          </MarqueeMaskWrap>
          <p className="mb-0 mt-7 px-6 text-[11px] leading-relaxed text-muted-foreground">
            Sources shown for reference. Roadmap scope; availability varies by integration. No agency endorsement implied.
          </p>
        </HomeReveal>
      </div>
    </section>
  );
}
