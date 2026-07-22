import { NextResponse } from "next/server";
import { z } from "zod";
import { gemini, FLASH_MODEL } from "@/lib/gemini-client";
import { LIBRARIAN_SYSTEM_PROMPT } from "@/lib/persona-prompt";
import {
  LibrarianRequestSchema,
  ThreadOutputSchema,
  DialogueOpenOutputSchema,
  BookOutputSchema,
} from "@/lib/librarian-schemas";

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
        const promptText = [
          `나무판 문구: "${input.boardPhrase}"`,
          `연령대: ${input.ageBand} / 성별: ${input.gender}`,
          `방문객이 적은 고민·읽고 싶은 것: "${input.introText}"`,
          "위 내용을 바탕으로 여정의 실과 첫 질문을 만들어주세요.",
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
