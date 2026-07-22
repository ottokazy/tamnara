"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import ForkCard from "@/components/ForkCard";
import BookSpineProgress from "@/components/BookSpineProgress";
import { useSession } from "@/lib/session-context";
import { SPOTS } from "@/lib/mock-data";
import type { SpotId } from "@/lib/types";
import { accentVar } from "@/components/accent";

export default function ForksPage() {
  const router = useRouter();
  const { session, update, hydrated } = useSession();
  const accent = accentVar("cheonhyangrang");

  useEffect(() => {
    if (hydrated && session.activeForkOptions.length === 0) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, session.activeForkOptions.length]);

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
        <h2 className="type-question mb-10 text-ink">
          어느 길로 걸으시겠어요?
        </h2>

        <div className="flex flex-col gap-4">
          {session.activeForkOptions.map((id) => (
            <ForkCard key={id} spot={SPOTS[id]} onSelect={() => handleSelect(id)} />
          ))}
        </div>
      </div>
    </main>
  );
}
