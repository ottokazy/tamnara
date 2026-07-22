"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import ForkCard from "@/components/ForkCard";
import BookSpineProgress from "@/components/BookSpineProgress";
import { useSession } from "@/lib/session-context";
import { SPOTS } from "@/lib/mock-data";
import { fetchChapterClose, peekChapterClosePrefetch } from "@/lib/librarian-client";
import type { SpotId } from "@/lib/types";
import { accentVar } from "@/components/accent";

export default function ForksPage() {
  const router = useRouter();
  const { session, update, hydrated } = useSession();
  const accent = accentVar("cheonhyangrang");
  const [acknowledgment, setAcknowledgment] = useState<string | null>(null);
  const [forkReasons, setForkReasons] = useState<Record<string, string>>({});

  useEffect(() => {
    if (hydrated && session.activeForkOptions.length === 0) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, session.activeForkOptions.length]);

  const lastChapter = session.chapters[session.chapters.length - 1];
  const lastSpotName = lastChapter ? SPOTS[lastChapter.spotId].name : null;
  const lastTurn = lastChapter?.dialogue[0];
  const question = lastTurn?.q ?? session.firstQuestion;
  const answer = lastTurn?.a ?? session.firstAnswer;
  const lastAccent = lastChapter ? accentVar(SPOTS[lastChapter.spotId].accent) : accent;

  useEffect(() => {
    // 하이드레이션 전에는 activeForkOptions가 항상 빈 배열이라, 하이드레이션이
    // 끝난 뒤에야 실제 세션 값으로 요청을 보낸다.
    if (!hydrated || session.activeForkOptions.length === 0) return;
    // 새 갈림길 화면으로 넘어올 때 이전 내용이 잠깐 보이지 않도록 먼저 비운다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAcknowledgment(null);
    setForkReasons({});
    let cancelled = false;
    const key = String(session.chapters.length);
    const request =
      peekChapterClosePrefetch(key) ??
      fetchChapterClose({
        thread: session.thread,
        spotName: lastSpotName,
        question,
        answer,
        forkOptions: session.activeForkOptions.map((id) => {
          const spot = SPOTS[id];
          return { spotId: id, name: spot.name, reading: spot.reading, voice: spot.voice };
        }),
      });
    request
      .then((result) => {
        if (cancelled) return;
        setAcknowledgment(result.acknowledgment);
        const map: Record<string, string> = {};
        for (const r of result.forkReasons) map[r.spotId] = r.reason;
        setForkReasons(map);
      })
      .catch(() => {
        // 길벗이 잠시 자리를 비웠다면, 카드는 원래의 고정 문구로 남는다.
        if (!cancelled) setAcknowledgment("그 마음을 담아, 다음 걸음을 골라볼까요?");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, session.chapters.length]);

  const handleSelect = (spotId: SpotId) => {
    update({
      activeSpotId: spotId,
      path: [...session.path, spotId],
    });
    router.push("/transit");
  };

  const chapterLabel =
    session.currentChapterNo === 1
      ? "承 · 감각을 열다"
      : session.currentChapterNo === 2
      ? "轉 · 고민과 대면하다"
      : "結을 향해 · 조망하다";

  return (
    <main className="flex flex-grow flex-col pb-10">
      <PageHeader step={session.currentChapterNo} accent={accent} />
      <BookSpineProgress chaptersCompleted={session.chapters.length} />
      <div className="px-6 pt-10">
        <p className="type-subtitle-en mb-2 text-muted">{chapterLabel}</p>

        <span className="type-subtitle-en mb-2 block" style={{ color: lastAccent }}>
          길벗
        </span>
        {acknowledgment ? (
          <h2 className="type-question mb-10 text-ink">{acknowledgment}</h2>
        ) : (
          <div className="mb-10 flex flex-col gap-3" aria-hidden>
            <div className="h-[22px] w-full animate-pulse rounded-sm bg-ink/10" />
            <div className="h-[22px] w-2/3 animate-pulse rounded-sm bg-ink/10" />
          </div>
        )}

        <div className="flex flex-col gap-4">
          {session.activeForkOptions.map((id) => (
            <ForkCard
              key={id}
              spot={SPOTS[id]}
              reason={forkReasons[id]}
              onSelect={() => handleSelect(id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
