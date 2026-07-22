"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import OutlineButton from "@/components/OutlineButton";
import { useSession } from "@/lib/session-context";
import { SPOTS } from "@/lib/mock-data";
import { accentVar } from "@/components/accent";

const CHAPTER_LABEL: Record<1 | 2 | 3, string> = {
  1: "CHAPTER I. 承",
  2: "CHAPTER II. 轉",
  3: "CHAPTER III. 結",
};

export default function TransitPage() {
  const router = useRouter();
  const { session, hydrated } = useSession();

  useEffect(() => {
    if (hydrated && !session.activeSpotId) {
      router.replace("/forks");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, session.activeSpotId]);

  if (!session.activeSpotId) return null;
  const spot = SPOTS[session.activeSpotId];
  const accent = accentVar(spot.accent);

  return (
    <main className="flex flex-grow flex-col pb-10">
      <PageHeader step={session.currentChapterNo} accent={accent} />
      <div className="flex flex-grow flex-col px-6 pt-16">
        <span className="type-subtitle-en mb-4 block" style={{ color: accent }}>
          {CHAPTER_LABEL[session.currentChapterNo]}
        </span>
        <h2 className="type-question mb-16 leading-snug text-ink">
          {spot.transitAction}
        </h2>

        <div className="mb-16 flex items-center justify-center">
          <svg width="100%" height="120" viewBox="0 0 400 120" fill="none">
            <path
              d="M10 100C60 80 110 110 160 70C210 30 260 60 310 40C340 28 360 20 390 10"
              stroke="var(--color-line)"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="100" r="4" fill={accent} />
            <circle cx="390" cy="10" r="4" fill="white" stroke={accent} strokeWidth="1.5" />
          </svg>
        </div>

        <div
          className="mt-auto border-l-2 pl-6 py-2"
          style={{ borderColor: accent }}
        >
          <p className="type-body text-muted">
            생각하며 걸어요:
            <br />
            <span className="text-ink">{spot.transitThought}</span>
          </p>
        </div>

        <div className="mt-8">
          <OutlineButton
            accent={spot.accent}
            icon={<span aria-hidden>↗</span>}
            onClick={() => router.push("/arrival")}
          >
            도착했어요
          </OutlineButton>
        </div>
      </div>
    </main>
  );
}
