import { useState } from "react";

const SCENARIOS = [
  {
    name: "Asset inspection",
    request:
      "Inspect the 120 streetlights in the north district before sunrise. Flag assets that need review.",
    assets: 120,
    missions: 6,
    aircraft: "D-04 · D-08 · D-12",
    result: "120 assets covered · 7 flagged for review",
  },
  {
    name: "Site patrol",
    request:
      "Patrol the east perimeter every 30 minutes tonight. Keep one aircraft available for response.",
    assets: 24,
    missions: 4,
    aircraft: "D-04 · D-08",
    result: "24 checkpoints covered · 2 observations to review",
  },
  {
    name: "Progress survey",
    request:
      "Survey the three construction zones this afternoon and return a coverage report for each site.",
    assets: 3,
    missions: 3,
    aircraft: "D-08 · D-12",
    result: "3 zones surveyed · coverage reports ready",
  },
];

/**
 * @cc [owner:saharshbaweja,label:product] simulation-only
 * This marketing demo MUST identify its data as simulated and MUST NOT call a fleet or flight-control API.
 */
/**
 * @cc [owner:saharshbaweja,label:product] operator-gated-simulation
 * Dispatch and recovery advance only after explicit operator clicks. Changing the request or scenario resets the plan.
 */
export function DispatchDemo({ compact = false }: { compact?: boolean }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = SCENARIOS[scenarioIndex];
  const [request, setRequest] = useState(scenario.request);
  const [stage, setStage] = useState(0);
  const [message, setMessage] = useState("");
  const titles = [
    "Describe the outcome",
    "Ready for operator review",
    "Fleet dispatched",
    "Exception detected",
    "Recovery approved",
    "Mission complete",
  ];
  function plan() {
    if (request.trim().length < 12) {
      setMessage("Describe a mission in at least 12 characters.");
      return;
    }
    setMessage("");
    setStage(1);
  }
  return (
    <div
      className="overflow-hidden rounded-3xl border border-border bg-background shadow-xl"
      aria-label="Interactive drone dispatch simulation"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
        <span className="text-sm font-semibold text-foreground">
          aeros{" "}
          <span className="ml-2 font-normal text-muted-foreground">
            / mission control
          </span>
        </span>
        <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-blue-700">
          Simulated demo
        </span>
      </div>
      <div className={compact ? "p-5" : "grid gap-6 p-5 md:grid-cols-2 md:p-8"}>
        <div className="flex flex-col gap-4">
          <div
            className="flex flex-wrap gap-2"
            aria-label="Example mission scenarios"
          >
            {SCENARIOS.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={scenarioIndex === index}
                onClick={() => {
                  setScenarioIndex(index);
                  setRequest(item.request);
                  setStage(0);
                  setMessage("");
                }}
                className={`rounded-full border px-3 py-2 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 ${scenarioIndex === index ? "border-blue-500 bg-blue-50 text-blue-700" : "border-border text-muted-foreground"}`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              plan();
            }}
            className="flex flex-col gap-3"
          >
            <label
              className="text-xs font-medium text-muted-foreground"
              htmlFor={compact ? "hero-mission" : "product-mission"}
            >
              What should your fleet do?
            </label>
            <textarea
              id={compact ? "hero-mission" : "product-mission"}
              value={request}
              maxLength={1000}
              rows={3}
              onChange={(event) => {
                setRequest(event.target.value);
                setStage(0);
                setMessage("");
              }}
              className="w-full resize-y rounded-xl border border-border bg-background p-3 text-sm leading-relaxed text-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <p className="m-0 text-[11px] leading-relaxed text-muted-foreground">
              Illustrative workflow. Uses preset scenario data; no live AI,
              aircraft, weather, or airspace connection.
            </p>
            {message && (
              <p role="alert" className="text-sm text-red-600">
                {message}
              </p>
            )}
            <button
              type="submit"
              className="w-fit rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              {stage === 0
                ? "Generate example plan →"
                : "Regenerate example plan →"}
            </button>
          </form>
          {!compact && (
            <img
              src="/static/landing/drone/map.svg"
              alt="Illustrative mission areas, launch sites, and drone routes"
              width="800"
              height="420"
              className="mt-2 w-full rounded-2xl"
            />
          )}
        </div>
        <div
          className={
            compact
              ? "mt-5 rounded-2xl bg-blue-50 p-4"
              : "rounded-2xl bg-blue-50 p-5"
          }
        >
          <div aria-live="polite" aria-atomic="true">
            <p className="m-0 font-mono text-[10px] uppercase tracking-widest text-blue-700">
              {stage === 0 ? "Mission workspace" : `Step ${stage} / 5`}
            </p>
            <h3 className="mb-3 mt-2 text-lg font-semibold tracking-tight text-foreground">
              {titles[stage]}
            </h3>
            {stage === 0 ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Choose a scenario and build an example plan. Follow the path
                from readiness to dispatch, recovery, and results.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2 border-y border-blue-200 py-3 text-center">
                  {[
                    ["Scope", String(scenario.assets)],
                    ["Missions", String(scenario.missions)],
                    ["Providers", "2"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <span className="block text-lg font-semibold text-foreground">
                        {value}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <ul className="my-4 list-none space-y-2 p-0 text-xs leading-relaxed text-foreground">
                  <li>✓ Assigned fleet: {scenario.aircraft}</li>
                  <li>✓ Example readiness: battery, payload, dock available</li>
                  <li>✓ Example constraints: weather and airspace reviewed</li>
                  <li>
                    ✓ Operator approval{" "}
                    {stage === 1 ? "required before dispatch" : "recorded"}
                  </li>
                </ul>
                {stage === 2 && (
                  <p className="rounded-xl bg-white/70 p-3 text-xs text-blue-800">
                    Missions executing in simulation. Fleet status and coverage
                    are monitored together.
                  </p>
                )}
                {stage === 3 && (
                  <p className="rounded-xl bg-orange-100 p-3 text-xs leading-relaxed text-foreground">
                    D-08 is unavailable. Two assignments are affected. Proposed
                    recovery: reassign to D-16, retain the mission boundary, and
                    add 8 minutes to the completion window.
                  </p>
                )}
                {stage === 4 && (
                  <p className="rounded-xl bg-green-100 p-3 text-xs leading-relaxed text-foreground">
                    Recovery approved. D-16 takes the remaining assignments.
                    Updated ownership and timing are recorded.
                  </p>
                )}
                {stage === 5 && (
                  <p className="rounded-xl bg-green-100 p-3 text-xs leading-relaxed text-foreground">
                    {scenario.result}. The sample report includes coverage,
                    exceptions, and operator decisions.
                  </p>
                )}
              </>
            )}
          </div>
          {stage === 1 && (
            <button
              type="button"
              onClick={() => setStage(2)}
              className="rounded-full bg-blue-500 px-4 py-2 text-xs font-medium text-white"
            >
              Approve simulated dispatch →
            </button>
          )}
          {stage === 2 && (
            <button
              type="button"
              onClick={() => setStage(3)}
              className="rounded-full border border-blue-300 px-4 py-2 text-xs text-blue-800"
            >
              Simulate aircraft exception →
            </button>
          )}
          {stage === 3 && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setStage(4)}
                className="rounded-full bg-blue-500 px-4 py-2 text-xs font-medium text-white"
              >
                Approve recovery →
              </button>
              <button
                type="button"
                onClick={() => setStage(1)}
                className="rounded-full border border-blue-300 px-4 py-2 text-xs text-blue-800"
              >
                Hold and review plan
              </button>
            </div>
          )}
          {stage === 4 && (
            <button
              type="button"
              onClick={() => setStage(5)}
              className="rounded-full bg-blue-500 px-4 py-2 text-xs font-medium text-white"
            >
              View sample results →
            </button>
          )}
          {stage === 5 && (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  const report = new Blob(
                    [
                      JSON.stringify(
                        {
                          simulation: true,
                          scenario: scenario.name,
                          request,
                          missions: scenario.missions,
                          aircraft: scenario.aircraft,
                          recovery:
                            "D-08 reassigned to D-16 with operator approval",
                          result: scenario.result,
                        },
                        null,
                        2
                      ),
                    ],
                    { type: "application/json" }
                  );
                  const url = URL.createObjectURL(report);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "aeros-sample-mission-report.json";
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="rounded-full bg-blue-500 px-4 py-2 text-xs font-medium text-white"
              >
                Download sample report
              </button>
              <button
                type="button"
                onClick={() => setStage(0)}
                className="text-xs text-blue-800 underline"
              >
                Start again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
