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

// 承轉結 세 챕터의 도착 지점을 곡선 위에 미리 찍어둔 좌표.
const CHAPTER_POINTS = [
  { x: 140, y: 75 },
  { x: 270, y: 45 },
  { x: 390, y: 10 },
];

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
              d="M10 100C60 90 100 80 140 75C180 68 230 55 270 45C310 35 350 20 390 10"
              stroke="var(--color-line)"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="100" r="4" fill={accent} />
            {CHAPTER_POINTS.map((p, i) => {
              const chapterNo = i + 1;
              const isCurrent = chapterNo === session.currentChapterNo;
              const isDone = chapterNo < session.currentChapterNo;
              return (
                <circle
                  key={chapterNo}
                  cx={p.x}
                  cy={p.y}
                  r={isCurrent ? 5 : 3}
                  fill={isDone ? "var(--color-ink)" : "white"}
                  stroke={isCurrent ? accent : isDone ? "var(--color-ink)" : "var(--color-line)"}
                  strokeWidth={isCurrent ? 1.5 : 1}
                />
              );
            })}
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
            {spot.name}에 도착했어요
          </OutlineButton>
        </div>
      </div>
    </main>
  );
}
