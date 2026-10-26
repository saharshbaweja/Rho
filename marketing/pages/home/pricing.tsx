import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import {
  Button,
  Check,
  ChevronDown,
  Chip,
  cn,
  LayerSingle,
  LayersThree01,
  LayersTwo01,
  Minus,
  SearchInput,
  Separator,
} from "@dust-tt/sparkle";
import { FAQ, type FAQItem } from "@marketing/components/home/FAQ";
import { PageMetadata } from "@marketing/components/home/PageMetadata";
import { HomeAIOperatorsCTASection } from "@marketing/components/home/content/Product/HomeAIOperatorsCTASection";
import { useSignUpModal } from "@marketing/hooks/useSignUpModal";
import {
  formatPriceWithCurrency,
  useUserBillingCurrency,
} from "@marketing/lib/client/subscription";
import {
  TRACKING_ACTIONS,
  TRACKING_AREAS,
  trackEvent,
  withTracking,
} from "@marketing/lib/tracking";
import { classNames } from "@marketing/lib/utils";
import { appendUTMParams } from "@marketing/lib/utils/utm";
import { assertNeverAndIgnore } from "@marketing/types/shared/utils/assert_never";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import type React from "react";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";

export async function getStaticProps() {
  return {
    props: {
      gtmTrackingId: process.env.NEXT_PUBLIC_GTM_TRACKING_ID ?? null,
    },
  };
}

type CtaStyle = "primary" | "outline" | "dark";

interface SeatTier {
  id: "free" | "pro" | "max";
  name: string;
  priceYearDollars: number;
  priceMonthDollars: number;
  credits: string;
}

interface Plan {
  id: "business" | "enterprise";
  name: string;
  tagline: string;
  seatTiers?: SeatTier[];
  cta: string;
  ctaStyle: CtaStyle;
  featured: boolean;
  highlightsHeader?: string;
  highlights: string[];
}

type CellValue = boolean | string;

interface ComparisonRow {
  feature: string;
  featureShort?: string;
  note?: string;
  business: CellValue;
  enterprise: CellValue;
}

interface ComparisonSectionData {
  section: string;
  rows: ComparisonRow[];
}

interface FAQItemData {
  q: string;
  a: ReactNode;
}

type Billing = "yearly" | "monthly";

const SEAT_TIERS: SeatTier[] = [
  {
    id: "free",
    name: "1–3 drones",
    priceYearDollars: 349,
    priceMonthDollars: 435,
    credits: "per active drone / month · unlimited users",
  },
  {
    id: "pro",
    name: "4–10 drones",
    priceYearDollars: 299,
    priceMonthDollars: 375,
    credits: "per active drone / month · unlimited users",
  },
  {
    id: "max",
    name: "11–25 drones",
    priceYearDollars: 249,
    priceMonthDollars: 310,
    credits: "per active drone / month · unlimited users",
  },
];

const SEAT_TIER_BADGE: Record<
  SeatTier["id"],
  {
    bg: string;
    iconColor: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  free: { bg: "bg-gray-100", iconColor: "text-gray-700", Icon: LayerSingle },
  pro: { bg: "bg-blue-100", iconColor: "text-blue-500", Icon: LayersTwo01 },
  max: {
    bg: "bg-golden-100",
    iconColor: "text-golden-600",
    Icon: LayersThree01,
  },
};

const PLANS: Plan[] = [
  {
    id: "business",
    name: "Business",
    tagline: "For organizations coordinating up to 25 active drones",
    seatTiers: SEAT_TIERS,
    cta: "Request access",
    ctaStyle: "primary",
    featured: true,
    highlights: [
      "Mission planning, monitoring and dispatch workspace",
      "Fleet state, weather, airspace, mission readiness and dock context",
      "Remote pilot availability and qualification context",
      "Battery, payload, dock and maintenance readiness",
      "AI-generated operational options with source traceability",
      "Shared mission timeline, approvals and operational handoffs",
      "Unlimited users across operations, dispatch, providers and maintenance",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large fleets and mission-critical operations",
    cta: "Talk to sales",
    ctaStyle: "dark",
    featured: false,
    highlightsHeader: "Everything in Business plus:",
    highlights: [
      "Custom integrations with GIS, work-order, dock and fleet systems",
      "Higher-frequency data feeds and fleet-wide monitoring",
      "SSO, SCIM, advanced roles and centralized administration",
      "Custom retention, audit exports and deployment controls",
      "Dedicated implementation, priority support and SLA",
      "Volume fleet pricing and custom contract terms",
    ],
  },
];

const COMPARISON: ComparisonSectionData[] = [
  {
    section: "Operational intelligence",
    rows: [
      {
        feature: "Mission planning and live mission monitoring",
        business: true,
        enterprise: true,
      },
      {
        feature: "Weather, launch-site and airspace context",
        business: true,
        enterprise: true,
      },
      {
        feature: "Mission tracking and exception detection",
        business: true,
        enterprise: true,
      },
      {
        feature: "Operator availability and qualification context",
        business: true,
        enterprise: true,
      },
      {
        feature: "Battery, payload, dock and maintenance readiness",
        business: true,
        enterprise: true,
      },
      {
        feature: "AI operational options with source traceability",
        featureShort: "AI options with source traceability",
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    section: "Data & integrations",
    rows: [
      {
        feature: "Drone, provider, mission and operating-policy imports",
        business: "Standard",
        enterprise: "Custom + bi-directional",
      },
      {
        feature: "Weather and airspace context",
        business: "Included",
        enterprise: "High-volume + custom",
      },
      {
        feature: "Integrations with existing operations systems",
        featureShort: "Operations system integrations",
        business: "Up to 3 standard",
        enterprise: "Unlimited + custom",
      },
    ],
  },
  {
    section: "Security & admin",
    rows: [
      {
        feature: "Role-based access controls",
        business: true,
        enterprise: true,
      },
      {
        feature: "Single sign-on (SSO)",
        business: false,
        enterprise: true,
      },
      {
        feature: "SCIM provisioning",
        business: false,
        enterprise: true,
      },
      {
        feature: "Decision history and operational audit trail",
        business: true,
        enterprise: true,
      },
      {
        feature: "Data retention",
        business: "Standard",
        enterprise: "Custom",
      },
      {
        feature: "Deployment and data-residency options",
        business: "Standard cloud",
        enterprise: "Custom",
      },
      {
        feature: "Single-tenant deployment",
        business: false,
        enterprise: true,
      },
      {
        feature: "Custom legal terms (MSA, DPA)",
        business: false,
        enterprise: true,
      },
    ],
  },
  {
    section: "Support",
    rows: [
      {
        feature: "Support tier",
        business: "Email + in-app",
        enterprise: "Priority + SLA",
      },
      {
        feature: "Onboarding and implementation",
        business: "Guided",
        enterprise: "Dedicated",
      },
    ],
  },
  {
    section: "Platform & APIs",
    rows: [
      {
        feature: "API and webhooks",
        business: "Standard",
        enterprise: "Expanded + custom",
      },
      {
        feature: "SMS and email operational alerts",
        featureShort: "Operational alerts",
        business: true,
        enterprise: true,
      },
      {
        feature: "AI and mission-data usage",
        business: "Included fair use",
        enterprise: "Pooled + custom limits",
      },
    ],
  },
];

function SeatTiersFAQAnswer() {
  const currency = useUserBillingCurrency();
  const formatSeatPrice = (priceDollars: number) =>
    formatPriceWithCurrency(priceDollars, currency);

  const small = SEAT_TIERS.find((tier) => tier.id === "free");
  const growing = SEAT_TIERS.find((tier) => tier.id === "pro");
  const scaled = SEAT_TIERS.find((tier) => tier.id === "max");

  return (
    <>
      <p className="mb-3">
        Business pricing is based on the number of aircraft actively managed in
        Aeros, not on the number of people who need access:
      </p>
      <ul>
        <li>
          <strong>1–3 drones:</strong>{" "}
          {formatSeatPrice(small?.priceMonthDollars ?? 435)}/drone/month, or{" "}
          {formatSeatPrice(small?.priceYearDollars ?? 349)}/drone/month billed
          yearly.
        </li>
        <li>
          <strong>4–10 drones:</strong>{" "}
          {formatSeatPrice(growing?.priceMonthDollars ?? 375)}/drone/month, or{" "}
          {formatSeatPrice(growing?.priceYearDollars ?? 299)}/drone/month billed
          yearly.
        </li>
        <li>
          <strong>11–25 drones:</strong>{" "}
          {formatSeatPrice(scaled?.priceMonthDollars ?? 310)}/drone/month, or{" "}
          {formatSeatPrice(scaled?.priceYearDollars ?? 249)}/drone/month billed
          yearly.
        </li>
      </ul>
      <p className="mt-3">
        All Business tiers include unlimited users so dispatch, operations,
        providers, maintenance and leadership can work from the same operational
        picture.
      </p>
    </>
  );
}

const FAQS: FAQItemData[] = [
  {
    q: "How is Aeros priced?",
    a: "Business is priced per active drone, with unlimited users included. The per-aircraft rate decreases as your fleet grows. Enterprise pricing is tailored to larger fleets, custom integrations, data volume, governance, deployment requirements and support.",
  },
  {
    q: "What counts as an active aircraft?",
    a: "An active aircraft is a drone enabled in Aeros for mission planning, monitoring or operational decision support during the billing period. You are not charged per flight, message or dispatcher.",
  },
  {
    q: "Are users charged separately?",
    a: "No. Business includes unlimited users. We want operations, dispatch, providers, maintenance and leadership working from the same source of truth instead of rationing access by seat.",
  },
  {
    q: "Is AI or mission-data usage metered?",
    a: "Core mission analysis, monitoring and mission-data usage are included under a fair-use policy for Business customers. Very high-volume polling, custom data feeds or unusually compute-intensive workflows can be scoped separately. Enterprise plans use pooled and custom usage limits.",
  },
  {
    q: "How do the Business fleet tiers work?",
    a: <SeatTiersFAQAnswer />,
  },
  {
    q: "Can we start with a smaller pilot?",
    a: "Yes. Operators can begin with a selected set of aircraft and workflows, validate the operational value, then expand to the rest of the fleet. Enterprise pilots can also be scoped around a specific mission type, base or operations team.",
  },
  {
    q: "What happens if our fleet size changes?",
    a: "Monthly customers are billed according to the active-aircraft tier for that billing period. Annual customers keep their committed tier and can add aircraft during the term; larger fleet expansions can be moved to a volume or Enterprise agreement.",
  },
  {
    q: "When should I consider Enterprise?",
    a: "Enterprise is designed for fleets above 25 aircraft and operators that need custom fleet, dock, GIS or work-order integrations; higher-frequency data feeds; SSO or SCIM; dedicated implementation; custom retention or deployment controls; or contractual SLAs.",
  },
];

interface BillingToggleProps {
  billing: Billing;
  setBilling: (b: Billing) => void;
}

function BillingToggle({ billing, setBilling }: BillingToggleProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) {
      return;
    }
    const update = () => {
      const el = wrap.querySelector<HTMLButtonElement>(
        `[data-val="${billing}"]`
      );
      if (el) {
        setSliderStyle({ left: el.offsetLeft, width: el.offsetWidth });
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [billing]);

  const pillBase =
    "relative z-[1] inline-flex h-8 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 heading-sm motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted";

  return (
    <div
      ref={wrapRef}
      role="group"
      aria-label="Billing period"
      className="relative flex w-full items-center gap-1 rounded-full bg-muted p-0.5"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0.5 bottom-0.5 rounded-full border border-border bg-background motion-safe:transition-[left,width] motion-safe:duration-[220ms] motion-safe:ease-out"
        style={{ left: sliderStyle.left, width: sliderStyle.width }}
      />
      <button
        type="button"
        data-val="yearly"
        aria-pressed={billing === "yearly"}
        onClick={() => setBilling("yearly")}
        className={cn(
          pillBase,
          billing === "yearly" ? "text-foreground" : "text-muted-foreground"
        )}
      >
        Yearly
        <Chip size="mini" color="highlight" label="Save 20%" />
      </button>
      <button
        type="button"
        data-val="monthly"
        aria-pressed={billing === "monthly"}
        onClick={() => setBilling("monthly")}
        className={cn(
          pillBase,
          billing === "monthly" ? "text-foreground" : "text-muted-foreground"
        )}
      >
        Monthly
      </button>
    </div>
  );
}

interface PlanCardProps {
  plan: Plan;
  billing: Billing;
  setBilling: (b: Billing) => void;
  onBusinessStart: () => void;
  onEnterpriseContact: () => void;
}

function PlanCard({
  plan,
  billing,
  setBilling,
  onBusinessStart,
  onEnterpriseContact,
}: PlanCardProps) {
  const currency = useUserBillingCurrency();

  const handleClick = () => {
    if (plan.id === "business") {
      onBusinessStart();
    } else {
      onEnterpriseContact();
    }
  };

  let buttonVariant: "highlight" | "primary" | "outline";
  switch (plan.ctaStyle) {
    case "primary":
      buttonVariant = "highlight";
      break;
    case "dark":
      buttonVariant = "primary";
      break;
    case "outline":
      buttonVariant = "outline";
      break;
    default:
      assertNeverAndIgnore(plan.ctaStyle);
      buttonVariant = "outline";
  }

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border border-border bg-background p-8 text-left",
        "motion-safe:transition-[box-shadow,border-color] motion-safe:duration-200 motion-safe:ease",
        "hover:border-border-darker hover:shadow-md"
      )}
    >
      <h3 className="heading-2xl mb-1.5 text-foreground">{plan.name}</h3>
      <p className="copy-base mb-7 text-muted-foreground">{plan.tagline}</p>

      <Button
        variant={buttonVariant}
        size="md"
        label={plan.cta}
        onClick={handleClick}
        className="mb-6 w-full"
      />

      {plan.seatTiers && (
        <>
          <Separator className="mb-4" />
          <div className="mb-4">
            <BillingToggle billing={billing} setBilling={setBilling} />
          </div>
          <div className="mb-5">
            <div className="flex flex-col gap-4">
              {plan.seatTiers.map((tier) => {
                const tierPriceDollars =
                  billing === "yearly"
                    ? tier.priceYearDollars
                    : tier.priceMonthDollars;
                const shortName = tier.name.replace(" seat", "");
                const shortCredits = tier.credits;
                const badge = SEAT_TIER_BADGE[tier.id];
                const Icon = badge.Icon;
                return (
                  <div key={tier.id} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border/70",
                        badge.bg
                      )}
                      aria-hidden="true"
                    >
                      <Icon className={cn("h-5 w-5", badge.iconColor)} />
                    </span>
                    <div className="flex flex-1 flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="heading-sm text-foreground">
                          {shortName}
                        </span>
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={tierPriceDollars}
                            initial={{ y: -4, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 4, opacity: 0 }}
                            transition={{
                              duration: 0.15,
                              ease: [0.215, 0.61, 0.355, 1],
                            }}
                            className="heading-sm tabular-nums text-foreground"
                          >
                            {formatPriceWithCurrency(
                              tierPriceDollars,
                              currency
                            )}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className="copy-xs text-muted-foreground">
                        {shortCredits}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="copy-xs mt-5 text-right text-muted-foreground">
              All prices in USD · per active drone / month
            </p>
          </div>
        </>
      )}

      <Separator className="mb-5" />

      {plan.highlightsHeader && (
        <p className="copy-base mb-3 font-semibold text-foreground">
          {plan.highlightsHeader}
        </p>
      )}
      <ul className="copy-sm flex flex-col gap-3">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-foreground">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface HeroProps {
  billing: Billing;
  setBilling: (b: Billing) => void;
  onBusinessStart: () => void;
  onEnterpriseContact: () => void;
}

function Hero({
  billing,
  setBilling,
  onBusinessStart,
  onEnterpriseContact,
}: HeroProps) {
  return (
    <section className="-mx-6 flex flex-col items-center px-4 pt-6 text-center md:mx-0 md:px-0 md:pt-10 lg:pt-14">
      <Link
        href="/home/contact"
        onClick={withTracking(TRACKING_AREAS.PRICING, "hero_pricing_pill")}
        className="group mb-5 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white py-1.5 pl-3 pr-3 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
        <span className="whitespace-nowrap">
          Priced by active drones, with unlimited users
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
          aria-hidden="true"
        >
          <line x1="3" y1="8" x2="13" y2="8" />
          <polyline points="9 4 13 8 9 12" />
        </svg>
      </Link>
      <h1
        className={classNames(
          "heading-5xl md:heading-6xl lg:heading-7xl",
          "mb-5 max-w-3xl text-balance text-foreground"
        )}
      >
        Pricing that scales
        <br />
        with your operation
      </h1>
      <p className="copy-lg mb-9 max-w-2xl text-balance text-muted-foreground">
        Business pricing scales with active aircraft and includes unlimited
        users. Enterprise is tailored to fleet size, integrations, data volume,
        governance, deployment requirements and support.
      </p>

      <div className="mt-12 grid w-full grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:max-w-3xl">
        {PLANS.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            billing={billing}
            setBilling={setBilling}
            onBusinessStart={onBusinessStart}
            onEnterpriseContact={onEnterpriseContact}
          />
        ))}
      </div>
    </section>
  );
}

interface FeatureCellProps {
  value: CellValue;
}

function FeatureCell({ value }: FeatureCellProps) {
  if (value === true) {
    return (
      <span
        aria-label="Included"
        className="inline-flex h-6 w-6 items-center justify-center text-foreground"
      >
        <Check className="h-5 w-5" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span
        aria-label="Not included"
        className="inline-flex h-6 w-6 items-center justify-center text-primary-300"
      >
        <Minus className="h-5 w-5" />
      </span>
    );
  }
  return <span className="copy-sm text-foreground">{value}</span>;
}

interface ComparisonTableProps {
  onBusinessStart: () => void;
  onEnterpriseContact: () => void;
}

function ComparisonTable({
  onBusinessStart,
  onEnterpriseContact,
}: ComparisonTableProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(COMPARISON.map((s) => [s.section, true]))
  );
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const toggleSection = (sectionName: string) => {
    if (isSearching) {
      return;
    }
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !(prev[sectionName] ?? true),
    }));
  };

  const filteredSections = COMPARISON.map((section) => {
    if (!isSearching) {
      return section;
    }
    const rows = section.rows.filter((row) => {
      const haystack = `${row.feature} ${row.note ?? ""}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
    return { ...section, rows };
  }).filter((section) => !isSearching || section.rows.length > 0);

  const matchCount = filteredSections.reduce(
    (acc, section) => acc + section.rows.length,
    0
  );

  const ctaFor = (planId: Plan["id"]) => {
    if (planId === "business") {
      return (
        <Button
          variant="highlight"
          size="sm"
          label="Request access"
          onClick={onBusinessStart}
        />
      );
    }
    return (
      <Button
        variant="primary"
        size="sm"
        label="Talk to sales"
        onClick={onEnterpriseContact}
      />
    );
  };

  return (
    <section className="-mx-6 px-3 py-8 md:mx-0 md:px-12 md:py-12 lg:px-32">
      <div>
        <div className="mb-10 text-center md:mb-14">
          <h2 className="heading-5xl">Compare plans feature by feature</h2>
        </div>

        <div>
          <table className="w-full border-separate border-spacing-0">
            <thead className="sticky top-16 z-10">
              <tr className="grid grid-cols-2 bg-background md:table-row">
                <th className="hidden border-b border-border bg-background px-2 text-left align-bottom md:table-cell md:py-5">
                  <SearchInput
                    name="features-search"
                    placeholder="Search features…"
                    value={query}
                    onChange={setQuery}
                    className="max-w-xs [&_input]:font-medium [&_input::placeholder]:font-medium"
                  />
                  <span role="status" className="sr-only">
                    {isSearching
                      ? `${matchCount} feature${matchCount === 1 ? "" : "s"} matching`
                      : ""}
                  </span>
                </th>
                {PLANS.map((p) => (
                  <th
                    key={p.id}
                    className="block border-b border-border bg-background px-3 py-4 text-center align-bottom md:table-cell md:w-[240px] md:px-5 md:py-5"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className="heading-lg text-foreground">
                        {p.name}
                      </span>
                      {ctaFor(p.id)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {filteredSections.map((section) => {
              const isOpen = isSearching
                ? true
                : (openSections[section.section] ?? true);
              return (
                <tbody
                  key={section.section}
                  className="motion-safe:[&_tr[data-row=feature]]:transition-opacity motion-safe:[&_tr[data-row=feature]]:duration-200 [@media(hover:hover)]:[&:has(tr[data-row=feature]:hover)_tr[data-row=feature]:not(:hover)]:opacity-40"
                >
                  <tr className="grid grid-cols-1 md:table-row">
                    <th
                      colSpan={3}
                      scope="colgroup"
                      className="block border-t border-border p-0 text-left md:table-cell"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSection(section.section)}
                        aria-expanded={isOpen}
                        className="group flex w-full items-center justify-between gap-2 px-2 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                      >
                        <span className="heading-2xl font-semibold text-foreground">
                          {section.section}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform duration-200",
                            !isOpen && "-rotate-90"
                          )}
                        />
                      </button>
                    </th>
                  </tr>
                  <AnimatePresence initial={false}>
                    {isOpen &&
                      section.rows.map((row, idx) => (
                        <motion.tr
                          key={`${section.section}:${row.feature}`}
                          data-row="feature"
                          className={cn(
                            "grid grid-cols-2 md:table-row",
                            idx % 2 === 1 && "bg-muted/40"
                          )}
                          initial={{ y: -4 }}
                          animate={{ y: 0 }}
                          transition={{
                            duration: 0.18,
                            ease: [0.215, 0.61, 0.355, 1],
                          }}
                        >
                          <td className="col-span-2 block px-2 pb-1.5 pt-3.5 align-middle md:table-cell md:py-3.5 md:pb-3.5">
                            <span className="copy-sm block max-w-[560px] font-medium text-foreground">
                              <span className="md:hidden">
                                {row.featureShort ?? row.feature}
                              </span>
                              <span className="hidden md:inline">
                                {row.feature}
                              </span>
                            </span>
                            {row.note && (
                              <span className="copy-xs mt-0.5 block font-medium text-faint">
                                {row.note}
                              </span>
                            )}
                          </td>
                          <td className="block px-2 pb-3.5 pt-1.5 text-center align-middle md:table-cell md:w-[240px] md:px-5 md:py-3.5 md:pt-3.5">
                            <FeatureCell value={row.business} />
                          </td>
                          <td className="block px-2 pb-3.5 pt-1.5 text-center align-middle md:table-cell md:w-[240px] md:px-5 md:py-3.5 md:pt-3.5">
                            <FeatureCell value={row.enterprise} />
                          </td>
                        </motion.tr>
                      ))}
                  </AnimatePresence>
                </tbody>
              );
            })}
            {isSearching && filteredSections.length === 0 && (
              <tbody>
                <tr>
                  <td
                    colSpan={3}
                    className="border-t border-border px-2 py-12 text-center copy-sm text-muted-foreground"
                  >
                    No features match “{query}”.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const items: FAQItem[] = FAQS.map((f) => ({
    question: f.q,
    answer: f.a,
  }));

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y border-border bg-muted">
      <div className="container mx-auto px-6 py-20">
        <div className="px-4 md:px-12 lg:px-32">
          <FAQ title="Frequently asked questions" items={items} />
        </div>
      </div>
    </section>
  );
}

// oxlint-disable-next-line dust/nextjsPageComponentNaming -- pre-existing
export default function PricingNextJS() {
  const router = useRouter();
  const [billing, setBilling] = useState<Billing>("yearly");
  const { openSignUpModal } = useSignUpModal();

  const onBusinessStart = () => {
    trackEvent({
      area: TRACKING_AREAS.PRICING,
      object: "plan_card_start_trial",
      action: TRACKING_ACTIONS.CLICK,
      extra: { plan: "business", billing },
    });
    openSignUpModal();
  };

  const onEnterpriseContact = () => {
    trackEvent({
      area: TRACKING_AREAS.PRICING,
      object: "plan_card_contact_sales",
      action: TRACKING_ACTIONS.CLICK,
      extra: { plan: "enterprise", billing },
    });
    window.location.href = appendUTMParams("/home/contact");
  };

  return (
    <MotionConfig reducedMotion="user">
      <PageMetadata
        title="Aeros Pricing: Business and Enterprise Plans for Fleet Operations"
        description="Aeros Business pricing scales by active aircraft with unlimited users included. Enterprise plans support larger fleets, custom integrations, governance, deployment requirements and SLAs."
        pathname={router.asPath}
      />
      <Hero
        billing={billing}
        setBilling={setBilling}
        onBusinessStart={onBusinessStart}
        onEnterpriseContact={onEnterpriseContact}
      />
      <ComparisonTable
        onBusinessStart={onBusinessStart}
        onEnterpriseContact={onEnterpriseContact}
      />
      <FAQSection />
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-6 w-screen md:-mt-24 xl:-mt-16 2xl:-mt-24">
        <HomeAIOperatorsCTASection />
      </div>
    </MotionConfig>
  );
}

PricingNextJS.getLayout = (
  page: React.ReactElement,
  pageProps: LandingLayoutProps
) => <LandingLayout pageProps={pageProps}>{page}</LandingLayout>;
