"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { CameraCapture } from "@/components/CameraCapture";
import { PillSelect } from "@/components/PillSelect";
import { UnderlineTextarea } from "@/components/UnderlineField";
import OutlineButton from "@/components/OutlineButton";
import { useSession } from "@/lib/session-context";
import {
  AGE_BANDS,
  GENDERS,
  BOARDS,
  generateThread,
  generateFirstQuestion,
  generateAffinityTags,
} from "@/lib/mock-data";
import type { AffinityTag } from "@/lib/types";
import { fetchThread, splitDataUrl } from "@/lib/librarian-client";
import { accentVar } from "@/components/accent";

export default function StartPage() {
  const router = useRouter();
  const { session, update } = useSession();
  const [boardPhoto, setBoardPhoto] = useState<string | null>(session.boardPhoto);
  const [boardPhrase, setBoardPhrase] = useState(session.boardPhrase);
  const [ageBand, setAgeBand] = useState(session.profile.ageBand);
  const [gender, setGender] = useState(session.profile.gender);
  const [introText, setIntroText] = useState(session.introText);
  const [loading, setLoading] = useState(false);

  const accent = accentVar("mirroreum");
  const canProceed =
    ageBand !== "" && introText.trim().length > 0 && boardPhrase !== "";

  const handleNext = async () => {
    setLoading(true);
    const image = splitDataUrl(boardPhoto);
    let thread: string;
    let affinityTags: AffinityTag[];
    let firstQuestion: string;
    try {
      const result = await fetchThread({
        boardPhrase,
        boardPhotoBase64: image?.base64 ?? null,
        boardPhotoMediaType: image?.mediaType ?? null,
        introText,
        ageBand,
        gender,
      });
      thread = result.thread;
      affinityTags = result.affinityTags;
      firstQuestion = result.firstQuestion;
    } catch {
      // 길벗이 잠시 자리를 비웠다면, 미리 적어둔 말들로 이어간다.
      thread = generateThread(introText, boardPhrase);
      affinityTags = generateAffinityTags(introText, boardPhrase);
      firstQuestion = generateFirstQuestion(thread);
    }
    update({
      boardPhoto,
      boardPhrase,
      profile: { ageBand, gender },
      introText,
      thread,
      affinityTags,
      firstQuestion,
    });
    router.push("/question");
  };

  return (
    <main className="flex flex-grow flex-col pb-10">
      <PageHeader step={1} accent={accent} />
      <div className="px-6 pt-8">
        <h2 className="type-question mb-2 text-ink">오늘의 첫 페이지</h2>
        <p className="type-subtitle-en mb-8 text-muted">
          THE FIRST PAGE OF TODAY
        </p>

        <div className="mb-8">
          <CameraCapture accent={accent} onCapture={setBoardPhoto} />
        </div>

        <div className="mb-8">
          <label className="type-caption mb-1 block text-muted">
            고른 나무판의 문구
          </label>
          <p className="type-caption mb-3 text-muted opacity-70">
            사진 속 문구를 자동으로 읽는 기능은 준비 중이라, 지금은 직접
            골라주세요.
          </p>
          <div className="flex flex-col gap-2">
            {BOARDS.map((b) => {
              const selected = boardPhrase === b.phrase;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBoardPhrase(b.phrase)}
                  style={selected ? { borderColor: accent } : undefined}
                  className={`type-body border px-4 py-3 text-left transition-colors ${
                    selected
                      ? "bg-card text-ink"
                      : "border-line bg-transparent text-muted"
                  }`}
                >
                  {b.phrase}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4">
          <PillSelect
            label="연령대"
            options={AGE_BANDS}
            value={ageBand}
            onChange={setAgeBand}
            accent={accent}
          />
          <PillSelect
            label="성별 (선택사항)"
            options={GENDERS}
            value={gender}
            onChange={setGender}
            accent={accent}
          />
        </div>

        <div className="mb-10">
          <label className="type-caption mb-2 block text-muted">
            내면의 목소리
          </label>
          <UnderlineTextarea
            accent="mirroreum"
            rows={3}
            placeholder="지금의 고민, 또는 오늘 읽고 싶은 것"
            value={introText}
            onChange={setIntroText}
          />
        </div>

        <OutlineButton
          accent="mirroreum"
          disabled={!canProceed || loading}
          onClick={handleNext}
        >
          {loading ? "페이지를 넘기는 중…" : "다음"}
        </OutlineButton>
      </div>
    </main>
  );
}
