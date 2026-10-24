import { afterEach, describe, expect, it, vi } from "vitest";
import handler from "@marketing/pages/api/demo-request";
import { EnvironmentConfig } from "@marketing/types/shared/utils/config";
const valid = {
  name: "Demo Operator",
  email: "operator@example.com",
  organization: "Example Fleet",
  fleet: "12 drones",
  mission: "Inspect the north district assets",
  consent: "yes",
};
function response() {
  const res = { setHeader: vi.fn(), status: vi.fn(), json: vi.fn() };
  res.status.mockReturnValue(res);
  return res;
}
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
describe("demo request delivery", () => {
  it("rejects unsupported methods and malformed input before delivery", async () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    const res = response();
    await handler({ method: "GET", body: undefined }, res);
    expect(res.status).toHaveBeenCalledWith(405);
    await handler({ method: "POST", body: { email: "invalid" } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("returns 503 when delivery is unconfigured", async () => {
    vi.spyOn(EnvironmentConfig, "getOptionalEnvVariable").mockReturnValue(
      undefined
    );
    const res = response();
    await handler({ method: "POST", body: valid }, res);
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).not.toHaveBeenCalledWith({ success: true });
  });
  it("delivers validated requests only to the configured endpoint", async () => {
    vi.spyOn(EnvironmentConfig, "getOptionalEnvVariable").mockImplementation(
      (key) =>
        key === "AEROS_DEMO_WEBHOOK_URL"
          ? "https://example.com/intake"
          : undefined
    );
    const fetcher = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetcher);
    const res = response();
    await handler({ method: "POST", body: valid }, res);
    expect(fetcher).toHaveBeenCalledOnce();
    expect(fetcher.mock.calls[0][0].href).toBe("https://example.com/intake");
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toMatchObject(valid);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it("returns an error when upstream delivery fails", async () => {
    vi.spyOn(EnvironmentConfig, "getOptionalEnvVariable").mockReturnValue(
      "https://example.com/intake"
    );
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("timeout")));
    const res = response();
    await handler({ method: "POST", body: valid }, res);
    expect(res.status).toHaveBeenCalledWith(502);
  });
});
