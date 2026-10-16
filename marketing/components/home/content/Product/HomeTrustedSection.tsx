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
  .home-trusted-track:hover {
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
      className="relative w-full overflow-hidden"
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

const MISSION_INPUTS = [
  {
    label: "Weather",
    detail: "Forecasts & conditions",
    path: "M7 16a4 4 0 1 1 1-7 5 5 0 0 1 9 2 3 3 0 0 1 0 6H7m2 3 1-2m4 2 1-2",
    color: "#eaf5ff",
  },
  {
    label: "NOTAMs",
    detail: "Airspace & airport changes",
    path: "M5 4h14v16H5V4zm4 4h6m-6 4h6m-6 4h3",
    color: "#f0edff",
  },
  {
    label: "Aircraft",
    detail: "Readiness & limitations",
    path: "m12 3 2 7 7 4v2l-7-2v5l2 2H8l2-2v-5l-7 2v-2l7-4 2-7Z",
    color: "#edf7ef",
  },
  {
    label: "Crew",
    detail: "Availability & duty limits",
    path: "M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM5 21v-2a7 7 0 0 1 14 0v2M18 4a3 3 0 0 1 0 6m3 7a5 5 0 0 0-3-4",
    color: "#fff3df",
  },
  {
    label: "Schedules",
    detail: "Missions & dependencies",
    path: "M4 6h16v15H4V6zm0 5h16M8 3v5m8-5v5M8 15h3m2 3h3",
    color: "#ffedf3",
  },
  {
    label: "Procedures",
    detail: "Operator rules & manuals",
    path: "M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1m0-15c3-2 6-2 9-1v15c-3-1-6-1-9 1V5Z",
    color: "#e8f6f5",
  },
];

export function HomeTrustedSection() {
  return (
    <section className="flex w-full items-center justify-center bg-background pb-20 pt-12">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-12 px-6 text-center">
        <HomeReveal>
          <h2 className="m-0 text-balance text-center text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">
            Every mission has moving parts.
            <br />
            Aeros brings them <span className="text-blue-500">into one picture.</span>
          </h2>
          <p className="mx-auto mb-0 mt-4 max-w-[620px] text-sm leading-relaxed text-muted-foreground">
            The operational context behind every change, option, and decision.
          </p>
        </HomeReveal>
        <HomeReveal delay={120} className="w-full">
          <ul className="m-0 grid w-full list-none grid-cols-2 gap-x-6 gap-y-8 p-0 md:grid-cols-3 lg:grid-cols-6">
            {MISSION_INPUTS.map((input) => (
              <li key={input.label} className="flex flex-col items-center">
                <span
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-foreground"
                  style={{ backgroundColor: input.color }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d={input.path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-base font-semibold tracking-[-0.01em] text-foreground">
                  {input.label}
                </span>
                <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {input.detail}
                </span>
              </li>
            ))}
          </ul>
        </HomeReveal>
      </div>
    </section>
  );
}
