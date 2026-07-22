"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { LibrarianLine } from "@/components/ScriptChat";
import { UnderlineInput } from "@/components/UnderlineField";
import { useSession } from "@/lib/session-context";
import { accentVar } from "@/components/accent";
import { pickForkOptions, SPOTS } from "@/lib/mock-data";
import { prefetchChapterClose } from "@/lib/librarian-client";

export default function FirstQuestionPage() {
  const router = useRouter();
  const { session, update, hydrated } = useSession();
  const [answer, setAnswer] = useState(session.firstAnswer);
  const accent = accentVar("cheonhyangrang");

  useEffect(() => {
    if (hydrated && !session.firstQuestion) {
      router.replace("/start");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, session.firstQuestion]);

  const proceed = (finalAnswer: string) => {
    const options = pickForkOptions(0, session.affinityTags, session.path, session.thread);
    // forks 페이지가 뜨기 전에 미리 요청을 시작해 체감 대기 시간을 줄인다.
    prefetchChapterClose("0", {
      thread: session.thread,
      spotName: null,
      question: session.firstQuestion,
      answer: finalAnswer,
      forkOptions: options.map((id) => {
        const spot = SPOTS[id];
        return { spotId: id, name: spot.name, reading: spot.reading, voice: spot.voice };
      }),
    });
    update({
      firstAnswer: finalAnswer,
      activeForkOptions: options,
      currentChapterNo: 1,
    });
    router.push("/forks");
  };

  const handleSend = () => proceed(answer);
  const handleSkip = () => proceed("");

  return (
    <main className="flex flex-grow flex-col pb-10">
      <PageHeader step={1} accent={accent} />
      <div className="flex flex-grow flex-col px-6 pt-16">
        <LibrarianLine accent={accent}>{session.firstQuestion}</LibrarianLine>

        <div className="mt-16">
          <UnderlineInput
            accent="cheonhyangrang"
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
