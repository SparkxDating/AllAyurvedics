export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") return;
  const { validateServerEnv } = await import("./lib/server/env");
  validateServerEnv();
}
