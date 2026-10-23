import type { NextApiRequest } from "next";
import { z } from "zod";
import { EnvironmentConfig } from "@marketing/types/shared/utils/config";

const RequestSchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(200),
    organization: z.string().trim().min(1).max(200),
    fleet: z.string().trim().min(1).max(200),
    mission: z.string().trim().min(10).max(4000),
    consent: z.literal("yes"),
  })
  .strict();

interface DemoResponse {
  setHeader(name: string, value: string): unknown;
  status(code: number): {
    json(body: { error?: string; success?: boolean }): unknown;
  };
}

export const config = { api: { bodyParser: { sizeLimit: "16kb" } } };

/**
 * @cc [owner:saharshbaweja,label:api;security] configured-delivery-only
 * Demo requests MUST be validated and delivered only to the configured HTTPS webhook.
 * Missing delivery configuration MUST return 503, and delivery failure MUST NOT return success.
 * Request fields and webhook credentials MUST NOT be logged or returned in responses.
 */
export default async function handlerNextJS(
  req: Pick<NextApiRequest, "method" | "body">,
  res: DemoResponse
) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const parsed = RequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request" });
  }
  const webhook = EnvironmentConfig.getOptionalEnvVariable(
    "AEROS_DEMO_WEBHOOK_URL"
  );
  if (!webhook) {
    return res.status(503).json({ error: "Demo delivery is not configured" });
  }
  let target: URL;
  try {
    target = new URL(webhook);
  } catch {
    return res.status(503).json({ error: "Demo delivery is not configured" });
  }
  if (target.protocol !== "https:") {
    return res.status(503).json({ error: "Demo delivery is not configured" });
  }
  const token = EnvironmentConfig.getOptionalEnvVariable(
    "AEROS_DEMO_WEBHOOK_TOKEN"
  );
  let delivered = false;
  try {
    const response = await fetch(target, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(10000),
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        ...parsed.data,
        source: "aeros-website",
        receivedAt: new Date().toISOString(),
      }),
    });
    delivered = response.ok;
  } catch {
    delivered = false;
  }
  if (!delivered) {
    return res.status(502).json({ error: "Delivery failed" });
  }
  return res.status(200).json({ success: true });
}
