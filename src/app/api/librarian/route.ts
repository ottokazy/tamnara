import { NextResponse } from "next/server";
import { z } from "zod";
import { gemini, FLASH_MODEL } from "@/lib/gemini-client";
import { LIBRARIAN_SYSTEM_PROMPT } from "@/lib/persona-prompt";
import {
  LibrarianRequestSchema,
  ThreadOutputSchema,
  DialogueOpenOutputSchema,
  ChapterCloseGenerationSchema,
  BookOutputSchema,
} from "@/lib/librarian-schemas";

// AFFINITY_TAGS(성향 어휘) 각각이 무엇을 뜻하는지 모델에게 설명하는 짧은 풀이.
// 장소 고르기(pickForkOptions)가 이 태그로 채점하므로, 모델이 정확히 분류해야 한다.
const AFFINITY_GLOSS: Record<string, string> = {
  자기응시: "반복되는 자신, 정체성을 들여다보고 싶음",
  감각과소리: "듣는 것, 감각으로 알아차리는 것에 마음이 감",
  상상과기대: "아직 오지 않은 것, 앞일을 그려보고 싶음",
  기억과그리움: "지나온 시절, 두고 온 사람이나 장면이 떠오름",
  비움과여백: "채우기보다 내려놓고 여백을 두고 싶음",
  흔적과타인: "나보다 먼저 있던 것, 타인의 자취에 마음이 감",
  관점전환: "보던 자리·시각을 한 번 바꿔보고 싶음",
  시간과속도: "나이·속도·서두름에 대한 감각",
  변형과성장: "지금의 내가 어떻게 빚어져 왔는지 궁금함",
};

type ImageMimeType = "image/jpeg" | "image/png" | "image/gif" | "image/webp";

function normalizeImageMimeType(mimeType: string | null): ImageMimeType {
  const allowed: ImageMimeType[] = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  return (allowed as string[]).includes(mimeType ?? "")
    ? (mimeType as ImageMimeType)
    : "image/jpeg";
}

// Gemini의 responseSchema에 zod 스키마를 그대로 넘기고, 응답을 다시
// 같은 스키마로 검증한다 — 단일 출처(zod)를 요청/응답 양쪽에 재사용.
async function generateStructured<T extends z.ZodType>(
  model: string,
  contents: string | Array<{ text: string } | { inlineData: { mimeType: string; data: string } }>,
  outputSchema: T
): Promise<z.infer<T>> {
  const response = await gemini.models.generateContent({
    model,
    contents:
      typeof contents === "string"
        ? contents
        : [{ role: "user", parts: contents }],
    config: {
      systemInstruction: LIBRARIAN_SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: z.toJSONSchema(outputSchema),
    },
  });
  const raw = JSON.parse(response.text ?? "{}");
  return outputSchema.parse(raw);
}

// 서버 전용 — 이 파일은 Gemini API 키를 쓴다. 클라이언트 번들에 들어가지 않는다.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = LibrarianRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_request", detail: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const input = parsed.data;

  try {
    switch (input.phase) {
      case "thread": {
        const affinityGlossText = Object.entries(AFFINITY_GLOSS)
          .map(([tag, gloss]) => `- ${tag}: ${gloss}`)
          .join("\n");

        const promptText = [
          `나무판 문구: "${input.boardPhrase}"`,
          `연령대: ${input.ageBand} / 성별: ${input.gender}`,
          `방문객이 적은 고민·읽고 싶은 것: "${input.introText}"`,
          "위 내용을 바탕으로 여정의 실과 첫 질문을 만들어주세요.",
          "",
          "그리고 아래 성향 어휘 중, 이 방문객의 실과 가장 맞닿는 2~3개를",
          "관련도 높은 순으로 골라주세요(이 어휘는 방문객에게 노출되지 않고,",
          "다음 갈림길에서 어느 장소를 먼저 보여줄지 정하는 데만 쓰입니다):",
          affinityGlossText,
        ].join("\n");

        const parts: Array<
          { text: string } | { inlineData: { mimeType: string; data: string } }
        > = [{ text: promptText }];
        if (input.boardPhotoBase64) {
          parts.unshift({
            inlineData: {
              mimeType: normalizeImageMimeType(input.boardPhotoMediaType),
              data: input.boardPhotoBase64,
            },
          });
        }

        const output = await generateStructured(
          FLASH_MODEL,
          parts,
          ThreadOutputSchema
        );
        return NextResponse.json(output);
      }

      case "dialogueOpen": {
        const promptText = [
          `여정의 실(내부용, 노출 금지): "${input.thread}"`,
          `장소: ${input.spotName} (${input.spotReading})`,
          `장소의 목소리: "${input.spotVoice}"`,
          `이번 미션: "${input.spotMission}"`,
          `이동 중 품고 온 생각: "${input.transitThought}"`,
          `현재 챕터: ${input.chapterNo} / 3`,
          "미션 직후 길벗이 던질 질문을 하나만 만들어주세요.",
        ].join("\n");

        const output = await generateStructured(
          FLASH_MODEL,
          promptText,
          DialogueOpenOutputSchema
        );
        return NextResponse.json(output);
      }

      case "chapterClose": {
        const contextLines = input.spotName
          ? [
              `장소: ${input.spotName}`,
              `길벗의 질문: "${input.question}"`,
              input.answer.trim().length === 0
                ? "방문객은 이 질문에 답하지 않고 그냥 지나갔습니다(침묵)."
                : `방문객의 답: "${input.answer}"`,
            ]
          : [
              // 아직 스팟을 방문하기 전, 서문에서의 첫 질문에 대한 답변.
              `길벗의 첫 질문: "${input.question}"`,
              input.answer.trim().length === 0
                ? "방문객은 이 질문에 답하지 않고 그냥 지나갔습니다(침묵)."
                : `방문객의 답: "${input.answer}"`,
            ];

        const forkOptionsText = input.forkOptions
          .map(
            (f, i) => `${i + 1}. ${f.name}(${f.reading}) — "${f.voice}"`
          )
          .join("\n");

        const promptText = [
          `여정의 실(내부용, 노출 금지): "${input.thread}"`,
          ...contextLines,
          "",
          "1) 위 답을(또는 침묵을) 받아주는 한 문장에, 다음 갈림길을 향한 초대를",
          "자연스럽게 이어 붙여 한 흐름의 문장으로 만들어주세요(1~2문장).",
          "받아주는 부분과 초대하는 부분이 따로 노는 두 문단처럼 보이면 안 됩니다.",
          "",
          `2) 다음 갈림길 후보 ${input.forkOptions.length}곳입니다(번호 순서):`,
          forkOptionsText,
          `각 후보마다, 여정의 실과 방금 답을 그 장소의 실제 특징과 조용히 엮어`,
          "왜 다음 걸음으로 어울릴 수 있는지 한 줄씩 새로 써서, 위 번호와 같은",
          `순서로 정확히 ${input.forkOptions.length}개를 배열로 주세요.`,
          "",
          "두 경우 모두: 해석하거나 조언하거나 마음 상태를 진단하지 마세요",
          "(예: '~하고 싶으신가봐요', '~한 마음이군요', '~하시는군요' 금지).",
          "방문객의 말이나 그 장소의 특징을 은근히 엮을 뿐, 방문객의 속마음을",
          "안다고 단정하지 않습니다.",
        ].join("\n");

        const generation = await generateStructured(
          FLASH_MODEL,
          promptText,
          ChapterCloseGenerationSchema
        );
        // spotId는 모델이 지어내지 않도록, 원래 요청한 순서 그대로 우리가 직접 붙인다.
        const forkReasons = input.forkOptions.map((opt, i) => ({
          spotId: opt.spotId,
          reason: generation.forkReasons[i] ?? `${opt.name} — ${opt.voice}`,
        }));
        return NextResponse.json({
          acknowledgment: generation.acknowledgment,
          forkReasons,
        });
      }

      case "book": {
        const chaptersText = input.chapters
          .map(
            (ch) =>
              `챕터 ${ch.no} — ${ch.spotName}(${ch.spotReading})\n` +
              `미션: ${ch.mission}\n질문: ${ch.question}\n방문객의 답: ${ch.answer}`
          )
          .join("\n\n");
        const promptText = [
          `여정의 실(내부용, 노출 금지): "${input.thread}"`,
          `나무판 문구: "${input.boardPhrase}"`,
          "",
          chaptersText,
          "",
          `에필로그 회고 답변: "${input.epilogueAnswer}"`,
          "",
          "위 여정을 바탕으로 책 제목과 서문/에필로그에 붙일 짧은 문장을 지어주세요.",
          "방문객이 쓴 문장은 고쳐 쓰지 않습니다 — 이 단계에서는 제목과 두 문장만 짓습니다.",
        ].join("\n");

        // PRO_MODEL은 이 계정의 무료 티어에서 할당량이 0이라(결제수단 필요)
        // 당장은 FLASH_MODEL로 통일해 무료로 돌린다. 나중에 결제를 연결하면
        // PRO_MODEL로 바꿔서 책 편집 품질을 올릴 수 있다.
        const output = await generateStructured(
          FLASH_MODEL,
          promptText,
          BookOutputSchema
        );
        return NextResponse.json(output);
      }
    }
  } catch (err) {
    console.error("[librarian] generation failed", err);
    return NextResponse.json({ error: "generation_failed" }, { status: 502 });
  }
}
