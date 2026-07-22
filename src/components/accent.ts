import type { AccentToken } from "@/lib/types";

const ACCENT_VAR: Record<AccentToken, string> = {
  mirroreum: "var(--color-mirroreum)",
  cheonhyangrang: "var(--color-cheonhyangrang)",
  lighthouse: "var(--color-lighthouse)",
  mother: "var(--color-mother)",
  alo: "var(--color-alo)",
  artmuseum: "var(--color-artmuseum)",
  library: "var(--color-library)",
  waryong: "var(--color-waryong)",
  niagara: "var(--color-niagara)",
  pottery: "var(--color-pottery)",
};

export function accentVar(accent?: AccentToken): string {
  return accent ? ACCENT_VAR[accent] : "var(--color-ink)";
}
