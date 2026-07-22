"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import OutlineButton from "@/components/OutlineButton";
import { useSession } from "@/lib/session-context";
import { SPOTS } from "@/lib/mock-data";
import { accentVar } from "@/components/accent";

export default function ArrivalPage() {
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
  const [readingObj, readingVerb] = spot.reading.split(" ");

  return (
    <main className="flex flex-grow flex-col pb-10">
      <PageHeader step={session.currentChapterNo} accent={accent} />
      <div className="px-6 pt-10">
        <article className="border border-line bg-card p-8">
          <span
            className="type-subtitle-en mb-8 block"
            style={{ color: accent }}
          >
            {spot.readingEn}
          </span>
          <h2 className="mb-4">
            <span className="type-display-sm block font-bold text-ink">
              {readingObj}
            </span>
            <span className="type-display-sm block font-light text-ink">
              {readingVerb}
            </span>
          </h2>
          <p className="type-body mb-10 italic text-muted">
            &ldquo;{spot.voice}&rdquo;
          </p>
          <div className="mb-10 h-px w-12 bg-line" />
          <section>
            <span className="type-subtitle-en mb-4 block text-muted">
              MISSION
            </span>
            <p className="type-question leading-tight text-ink">
              {spot.mission}
            </p>
          </section>

          <div className="h-16 w-full" />

          <OutlineButton
            accent={spot.accent}
            onClick={() => router.push("/dialogue")}
          >
            다음
          </OutlineButton>
        </article>
      </div>
    </main>
  );
}
