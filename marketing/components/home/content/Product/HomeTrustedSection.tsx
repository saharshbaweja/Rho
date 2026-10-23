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
  { name: "Existing drone fleets", capability: "Aircraft, docks & payloads" },
  { name: "Fleet providers", capability: "One shared mission workspace" },
  { name: "Weather & airspace", capability: "Constraints before dispatch" },
  {
    name: "Mission readiness",
    capability: "Battery, availability & permissions",
  },
  { name: "Work orders & GIS", capability: "Turn asset lists into missions" },
  { name: "Recovery planning", capability: "Reassign, delay & return" },
  { name: "Operator oversight", capability: "Approvals & decision history" },
  { name: "Results & reporting", capability: "Close the loop on every job" },
];

export function HomeTrustedSection() {
  const capabilities = [...CAPABILITY_ROADMAP, ...CAPABILITY_ROADMAP];
  return (
    <section className="flex w-full items-center justify-center bg-background pb-20 pt-12">
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-12 text-center">
        <HomeReveal>
          <h2 className="m-0 text-balance px-6 text-center text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">
            The fleets you already run.
            <br />
            One <span className="text-blue-500">dispatch layer.</span>
          </h2>
          <p className="mx-auto mb-0 mt-4 max-w-[620px] px-6 text-sm leading-relaxed text-muted-foreground">
            A vendor-neutral layer connecting mission demand with your existing
            drone operations.
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
                      <img
                        src="/static/landing/home/aeros-principle-mark.svg"
                        alt=""
                        className="h-7 w-7"
                        width={28}
                        height={28}
                      />
                      <span className="max-w-[190px] text-left text-lg font-semibold leading-tight tracking-[-0.025em] text-foreground/80">
                        {item.name}
                      </span>
                    </div>
                    <span className="mt-4 text-[11px] leading-none text-muted-foreground">
                      {item.capability}
                    </span>
                  </>
                );
                const className =
                  "flex w-[288px] flex-shrink-0 flex-col items-center px-6";
                return (
                  <div
                    key={`${item.name}-${idx}`}
                    aria-hidden={duplicate}
                    className={className}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </MarqueeMaskWrap>
          <p className="mb-0 mt-7 px-6 text-[11px] leading-relaxed text-muted-foreground">
            Integration scope is validated with each fleet and provider.
            Aircraft and flight authority remain with your operating team.
          </p>
        </HomeReveal>
      </div>
    </section>
  );
}
