import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import config from "../../../next.config.js";
import { SolutionPage } from "./SolutionPage";
import { SOLUTIONS } from "./solutionContent";

describe("Aeros solution routes", () => {
  it.each(SOLUTIONS)(
    "renders $label with clean public links and an explicit preview boundary",
    (solution) => {
      const html = renderToStaticMarkup(<SolutionPage solution={solution} />);
      expect(html).toContain("Interactive product simulation");
      expect(html).toContain("No live aircraft");
      expect(html).toContain('href="/home/contact"');
      expect(html).toContain('id="solution-demo"');
      if (solution.slug === "search-rescue") {
        expect(html).toContain("Sectors completed");
        expect(html).toContain("East boundary");
        expect(html).not.toContain("Assets covered");
      }
      expect(html).not.toMatch(/\bDust\b|dust\.tt|dust-platform/);
      for (const match of html.matchAll(
        /href="(\/home\/solutions\/[^"#]+)"/g
      )) {
        expect(
          SOLUTIONS.some((item) => match[1] === `/home/solutions/${item.slug}`)
        ).toBe(true);
      }
    }
  );
  it("redirects every inherited solution URL directly to a current solution", async () => {
    const redirects = await config.redirects();
    const legacy = [
      "engineering",
      "customer-support",
      "data-analytics",
      "dust-platform",
      "knowledge",
      "marketing",
      "recruiting-people",
      "sales",
      "legal",
      "it",
      "productivity",
    ];
    for (const slug of legacy) {
      for (const prefix of ["/solutions/", "/home/solutions/"]) {
        const rule = redirects.find(
          (item) => item.source === `${prefix}${slug}`
        );
        expect(rule).toBeDefined();
        expect(
          SOLUTIONS.some(
            (item) => rule?.destination === `/home/solutions/${item.slug}`
          )
        ).toBe(true);
        expect(rule?.permanent).toBe(true);
      }
    }
  });
  it("does not redirect a current solution away from its own page", async () => {
    const redirects = await config.redirects();
    for (const solution of SOLUTIONS) {
      expect(
        redirects.some(
          (item) => item.source === `/home/solutions/${solution.slug}`
        )
      ).toBe(false);
    }
  });
  it("removes Dust destinations and trust origins from public configuration", async () => {
    const redirects = await config.redirects();
    expect(redirects.some((item) => /dust/i.test(item.destination))).toBe(
      false
    );
    const headers = await config.headers();
    expect(JSON.stringify(headers)).not.toMatch(/dust\.tt/);
  });
});
