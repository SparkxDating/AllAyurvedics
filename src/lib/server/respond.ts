import "server-only";

export type FormStatus = "sent" | "pending" | "coming_soon" | "created" | "ok";

export function json(data: unknown, status = 200, requestId?: string, extraHeaders?: Record<string, string>) {
  const headers: Record<string, string> = { "Cache-Control": "no-store", ...extraHeaders };
  if (requestId) headers["X-Request-Id"] = requestId;
  return Response.json(data, { status, headers });
}

const MAX_BODY_BYTES = 64_000;

export async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const declared = Number(request.headers.get("content-length") || "0");
    if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return null;
    const type = request.headers.get("content-type") || "";
    let value: unknown;
    if (type.includes("application/json") || type === "") {
      const text = await request.text();
      if (text.length > MAX_BODY_BYTES) return null;
      if (!text) return null;
      value = JSON.parse(text) as unknown;
    } else if (type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data")) {
      const form = await request.formData();
      const record: Record<string, unknown> = {};
      for (const [key, entry] of form.entries()) {
        if (typeof entry === "string") record[key] = entry;
      }
      value = record;
    } else {
      return null;
    }
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return value as Record<string, unknown>;
  } catch {
    return null;
  }
}
