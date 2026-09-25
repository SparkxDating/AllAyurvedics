import "server-only";

export type FormStatus = "sent" | "pending" | "coming_soon" | "created" | "ok";

export function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const type = request.headers.get("content-type") || "";
    if (type.includes("application/json")) return (await request.json()) as Record<string, unknown>;
    const form = await request.formData();
    return Object.fromEntries(form.entries());
  } catch {
    return null;
  }
}
