"use client";

import { useSyncExternalStore } from "react";

const KEY = "aa_source";

/** Turn utm_* query params into a short, readable "Source" line, e.g. "source=instagram, campaign=reel_12". */
export function sourceFromSearch(search: string): string {
  const p = new URLSearchParams(search);
  const clean = (v: string | null) => (v ?? "").replace(/[^\p{L}\p{N} ._\-+/:|]/gu, "").trim().slice(0, 60);
  const parts = (
    [
      ["source", "utm_source"],
      ["medium", "utm_medium"],
      ["campaign", "utm_campaign"],
      ["content", "utm_content"],
    ] as const
  )
    .map(([label, key]) => [label, clean(p.get(key))] as const)
    .filter(([, v]) => v)
    .map(([label, v]) => `${label}=${v}`);
  if (parts.length) return parts.join(", ").slice(0, 160);
  if (p.get("fbclid")) return "facebook/instagram link (fbclid)";
  return "";
}

function read(): string {
  try {
    const fromUrl = sourceFromSearch(window.location.search);
    if (fromUrl) {
      sessionStorage.setItem(KEY, fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

const subscribe = () => () => {};

/** Campaign source for the current visit ("" on the server and when there are no UTM params). Remembered for the browser tab. */
export function useUtmSource(): string {
  return useSyncExternalStore(subscribe, read, () => "");
}
