"use client";

import { useEffect, useRef, useState } from "react";

export type SubmitState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "done"; status: string }
  | { phase: "error"; error: string; fieldErrors?: Record<string, string> };

export function useFormSubmit(endpoint: string) {
  const [state, setState] = useState<SubmitState>({ phase: "idle" });
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(form: HTMLFormElement, extra: Record<string, unknown> = {}) {
    setState({ phase: "submitting" });
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...extra, startedAt: startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        status?: string;
        error?: string;
        errors?: Record<string, string>;
      };
      if (res.ok && json.ok) {
        setState({ phase: "done", status: json.status ?? "sent" });
      } else {
        setState({ phase: "error", error: json.error ?? (json.errors ? "validation" : "server_error"), fieldErrors: json.errors });
      }
    } catch {
      setState({ phase: "error", error: "network" });
    }
  }

  return { state, submit, reset: () => setState({ phase: "idle" }) };
}
