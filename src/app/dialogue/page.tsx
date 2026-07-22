"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { LibrarianLine } from "@/components/ScriptChat";
import { UnderlineInput } from "@/components/UnderlineField";
import { useSession } from "@/lib/session-context";
import { SPOTS, arrivalOpeningQuestion, pickForkOptions } from "@/lib/mock-data";
import { fetchDialogueOpen, prefetchChapterClose } from "@/lib/librarian-client";
import { accentVar } from "@/components/accent";
import type { ChapterLog } from "@/lib/types";

export default function DialoguePage() {
  const router = useRouter();
  const { session, update, hydrated } = useSession();
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState<string | null>(null);

  const spot = session.activeSpotId ? SPOTS[session.activeSpotId] : null;
  const accent = accentVar(spot?.accent);

  useEffect(() => {
    if (hydrated && !spot) {
      router.replace("/forks");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, spot]);

  useEffect(() => {
    if (!spot) return;
    let cancelled = false;
    // 새 스팟으로 넘어올 때 이전 질문이 잠깐 보이지 않도록 먼저 비운다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestion(null);
    fetchDialogueOpen({
      thread: session.thread,
      spotName: spot.name,
      spotReading: spot.reading,
      spotVoice: spot.voice,
      spotMission: spot.mission,
      transitThought: spot.transitThought,
      chapterNo: session.currentChapterNo,
    })
      .then((result) => {
        if (!cancelled) setQuestion(result.question);
      })
      .catch(() => {
        // 길벗이 잠시 자리를 비웠다면, 미리 적어둔 말로 이어간다.
        if (!cancelled) setQuestion(arrivalOpeningQuestion(spot, spot.transitThought));
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spot?.id]);

  if (!spot) return null;

  if (!question) {
    return (
      <main className="flex flex-grow flex-col pb-10">
        <PageHeader step={session.currentChapterNo} accent={accent} />
        <div className="flex flex-grow items-center justify-center px-6">
          <p className="type-caption text-muted">페이지를 넘기는 중…</p>
        </div>
      </main>
    );
  }

  const proceed = (givenAnswer: string) => {
    const chapterLog: ChapterLog = {
      no: session.currentChapterNo,
      spotId: spot.id,
      transitAction: spot.transitAction,
      transitThought: spot.transitThought,
      arrivalQuote: spot.voice,
      mission: spot.mission,
      dialogue: [{ q: question, a: givenAnswer }],
    };
    const chapters = [...session.chapters, chapterLog];

    if (session.currentChapterNo < 3) {
      const nextChapterNo = (session.currentChapterNo + 1) as 1 | 2 | 3;
      const options = pickForkOptions(
        nextChapterNo - 1,
        session.affinityTags,
        session.path,
        session.thread
      );
      // forks 페이지가 뜨기 전에 미리 요청을 시작해 체감 대기 시간을 줄인다.
      prefetchChapterClose(String(chapters.length), {
        thread: session.thread,
        spotName: spot.name,
        question,
        answer: givenAnswer,
        forkOptions: options.map((id) => {
          const s = SPOTS[id];
          return { spotId: id, name: s.name, reading: s.reading, voice: s.voice };
        }),
      });
      update({
        chapters,
        currentChapterNo: nextChapterNo,
        activeForkOptions: options,
      });
      router.push("/forks");
    } else {
      update({
        chapters,
        epilogueQuestion:
          "오늘 걸으며 쓴 책에서, 가장 오래 머물고 싶은 한 문장은 무엇이었나요?",
      });
      router.push("/epilogue");
    }
  };

  const handleSend = () => {
    if (answer.trim().length === 0) return;
    proceed(answer);
  };
  const handleSkip = () => proceed("");

  return (
    <main className="flex flex-grow flex-col pb-10">
      <PageHeader step={session.currentChapterNo} accent={accent} />
      <div className="flex flex-grow flex-col px-6 pt-12">
        <LibrarianLine accent={accent}>{question}</LibrarianLine>

        <div className="mt-8">
          <UnderlineInput
            accent={spot.accent}
            placeholder="마음을 적어주세요..."
            value={answer}
            onChange={setAnswer}
          />
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handleSkip}
              className="type-caption text-muted underline underline-offset-2"
            >
              그냥 지나가기
            </button>
            <button
              type="button"
              disabled={answer.trim().length === 0}
              onClick={handleSend}
              style={{ borderColor: accent, color: accent }}
              className="type-button border px-4 py-2 transition-colors active:bg-[color-mix(in_srgb,currentColor_8%,transparent)] disabled:opacity-30"
            >
              답변하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
