"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/session-context";
import { SPOTS } from "@/lib/mock-data";
import { accentVar } from "@/components/accent";

export default function BookPreviewPage() {
  const router = useRouter();
  const { session, hydrated } = useSession();

  useEffect(() => {
    if (hydrated && !session.bookTitle) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, session.bookTitle]);

  if (!session.bookTitle) return null;

  return (
    <main className="flex flex-grow flex-col px-6 pt-16 pb-16">
      <span className="type-subtitle-en mb-3 text-muted">
        오늘의 책이 완성되었습니다
      </span>
      <h1 className="type-display-sm mb-10 break-keep text-ink">
        {session.bookTitle}
      </h1>

      {session.boardPhoto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={session.boardPhoto}
          alt="서문 — 나무판 사진"
          className="mb-4 aspect-[4/3] w-40 border border-line object-cover"
        />
      )}
      <div className="mb-10">
        {session.boardPhrase && (
          <p className="type-caption italic text-muted">
            &ldquo;{session.boardPhrase}&rdquo;
          </p>
        )}
        {session.prologueNote && (
          <p className="type-caption mt-3 text-muted">
            {session.prologueNote}
          </p>
        )}
      </div>

      <div className="mb-10 h-px w-full bg-line" />

      <p className="type-caption mb-4 text-muted">CHAPTERS</p>
      <ul className="flex flex-col gap-6">
        {session.chapters.map((ch) => {
          const spot = SPOTS[ch.spotId];
          const accent = accentVar(spot.accent);
          return (
            <li key={ch.no} className="border-l-2 pl-5" style={{ borderColor: accent }}>
              <span className="type-caption block text-muted">
                CHAPTER {ch.no === 1 ? "I" : ch.no === 2 ? "II" : "III"}
              </span>
              <span className="type-question block text-ink">{spot.name}</span>
              <span className="type-caption block text-muted">{spot.reading}</span>
            </li>
          );
        })}
        <li className="border-l-2 pl-5" style={{ borderColor: accentVar("alo") }}>
          <span className="type-caption block text-muted">EPILOGUE</span>
          <span className="type-question block text-ink">카페 알로</span>
          <span className="type-caption block text-muted">맛을 읽다</span>
        </li>
      </ul>

      {session.epilogueNote && (
        <p className="type-body mt-10 italic text-ink">{session.epilogueNote}</p>
      )}

      <p className="type-caption mt-4 text-muted">
        책을 {session.email || "입력하신 이메일"}(으)로 보냈습니다. 좋은
        여정이었길 바랍니다.
      </p>

      <Link href="/" className="type-caption mt-16 text-center text-muted underline">
        새로운 여정 다시 시작하기
      </Link>
    </main>
  );
}
