import { getAllHomepageNews } from "@marketing/lib/contentful/client";
import type { NewsItem } from "@marketing/lib/contentful/types";

export type { NewsItem };

// Last-known-good list — used when the Contentful fetch fails (network
// blip, credentials rotation, etc.) so the homepage never breaks. Keep
// roughly in sync with the live Contentful entries when shipping major
// homepage updates so the fallback doesn't surface stale press links.
export const FALLBACK_NEWS: NewsItem[] = [
  {
    source: "AEROS · MISSION CONTEXT",
    title:
      "One flight, one disruption, several viable operational paths",
    date: "May 12, 2026",
    href: "https://youtu.be/iDF_On2kOxo",
  },
  {
    source: "AEROS · CHANGE DETECTION",
    title: "See what changed and why it matters to this mission",
    date: "Apr 17, 2026",
    href: "https://hypertext.fyi/what-is-arr-anyway/",
  },
  {
    source: "AEROS · EVIDENCE",
    title: "Every recommendation should show the source behind it",
    date: "Mar 31, 2026",
    href: "https://www.wing.vc/et30/list",
  },
  {
    source: "AEROS · HUMAN REVIEW",
    title:
      "AI does the synthesis; operators make the call",
    date: "Jul 3, 2025",
    href: "https://venturebeat.com/ai/dust-hits-6m-arr-helping-enterprises-build-ai-agents-that-actually-do-stuff-instead-of-just-talking",
  },
  {
    source: "AEROS · PLATFORM",
    title: "The intelligence layer above aviation operating systems",
    date: "Jul 3, 2023",
    href: "https://sequoiacap.com/article/partnering-with-dust-llm-powered-productivity/",
  },
];

// Fetches the marketing-managed news list from Contentful. Designed to be
// called from `getStaticProps` / `getServerSideProps`. Falls back to the
// hardcoded `FALLBACK_NEWS` array on any failure so the page never breaks
// because of a transient external dependency. Contentful's CDA already
// serves from a CDN, so we don't add a layer of in-memory caching here —
// each request hits Contentful's edge cache directly.
export async function fetchHomepageNews(): Promise<NewsItem[]> {
  const result = await getAllHomepageNews();
  if (result.isErr() || result.value.length === 0) {
    return FALLBACK_NEWS;
  }
  return result.value;
}
