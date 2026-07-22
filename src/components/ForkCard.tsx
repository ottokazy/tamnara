"use client";

import type { Spot } from "@/lib/types";
import { accentVar } from "./accent";

export default function ForkCard({
  spot,
  reason,
  onSelect,
}: {
  spot: Spot;
  reason?: string; // 있으면 여정의 실에 맞춰 새로 쓴 이유, 없으면 고정 문구
  onSelect: () => void;
}) {
  const c = accentVar(spot.accent);
  return (
    <button
      onClick={onSelect}
      style={{ ["--card-c" as string]: c }}
      className="w-full border border-ink/15 bg-card px-6 py-5 text-left transition-colors hover:border-[var(--card-c)] active:scale-[0.99]"
    >
      <div className="type-subtitle-en mb-2" style={{ color: c }}>
        {spot.readingEn}
      </div>
      <div className="text-lg font-bold text-ink">{spot.name}</div>
      <p className="type-caption mt-2 text-muted">{reason ?? spot.forkReason}</p>
      <p className="type-caption mt-3 text-muted">도보 {spot.walkMin}분</p>
    </button>
  );
}
