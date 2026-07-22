"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { LibrarianLine } from "@/components/ScriptChat";
import { UnderlineInput } from "@/components/UnderlineField";
import OutlineButton from "@/components/OutlineButton";
import { useSession } from "@/lib/session-context";
import { SPOTS, generateBookTitle } from "@/lib/mock-data";
import { fetchBook } from "@/lib/librarian-client";
import { accentVar } from "@/components/accent";

export default function EpiloguePage() {
  const router = useRouter();
  const { session, update, hydrated } = useSession();
  const [answer, setAnswer] = useState(session.epilogueAnswer);
  const [email, setEmail] = useState(session.email);
  const [loading, setLoading] = useState(false);
  const accent = accentVar("alo");

  useEffect(() => {
    if (hydrated && session.chapters.length < 3) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, session.chapters.length]);

  const handleFinish = async () => {
    setLoading(true);
    let bookTitle: string;
    let prologueNote = "";
    let epilogueNote = "";
    try {
      const result = await fetchBook({
        thread: session.thread,
        boardPhrase: session.boardPhrase,
        chapters: session.chapters.map((ch) => ({
          no: ch.no,
          spotName: SPOTS[ch.spotId].name,
          spotReading: SPOTS[ch.spotId].reading,
          mission: ch.mission,
          question: ch.dialogue[0]?.q ?? "",
          answer: ch.dialogue[0]?.a ?? "",
        })),
        epilogueAnswer: answer,
      });
      bookTitle = result.title;
      prologueNote = result.prologueNote;
      epilogueNote = result.epilogueNote;
    } catch {
      // 길벗이 잠시 자리를 비웠다면, 미리 적어둔 말로 이어간다.
      bookTitle = generateBookTitle(session.thread);
    }
    update({ epilogueAnswer: answer, email, bookTitle, prologueNote, epilogueNote });
    router.push("/book");
  };

  return (
    <main className="flex flex-grow flex-col pb-10">
      <PageHeader step={4} accent={accent} />
      <div className="flex flex-grow flex-col px-6 pt-16">
        <h2 className="type-question mb-1 text-ink">한 잔을 고르는 동안</h2>
        <p className="type-subtitle-en mb-12 text-muted">
          WHILE YOU CHOOSE A CUP
        </p>

        <LibrarianLine accent={accent}>{session.epilogueQuestion}</LibrarianLine>

        <div className="mt-4 mb-16">
          <UnderlineInput
            accent="alo"
            placeholder="마음을 적어주세요..."
            value={answer}
            onChange={setAnswer}
          />
        </div>

        <div className="mt-auto">
          <label className="type-caption mb-2 block text-muted">
            책을 받을 이메일
          </label>
          <UnderlineInput
            accent="alo"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
          />
          <p className="type-caption mt-3 text-muted">
            책을 보낸 뒤 주소는 바로 지워집니다.
          </p>

          <div className="mt-8">
            <OutlineButton
              accent="alo"
              disabled={email.trim().length === 0 || loading}
              onClick={handleFinish}
            >
              {loading ? "책을 엮는 중…" : "내 책 받기"}
            </OutlineButton>
          </div>
        </div>
      </div>
    </main>
  );
}
