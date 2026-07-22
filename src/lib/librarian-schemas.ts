import { z } from "zod";

// ── Phase: thread ─────────────────────────────────────────────────────────
// 서문 입력(나무판 문구+고민)을 읽고 여정의 실과 첫 질문을 생성한다.
export const ThreadRequestSchema = z.object({
  phase: z.literal("thread"),
  boardPhrase: z.string(),
  boardPhotoBase64: z.string().nullable(), // data URL 없이 순수 base64
  boardPhotoMediaType: z.string().nullable(), // 예: "image/jpeg" — 없으면 jpeg로 간주
  introText: z.string(),
  ageBand: z.string(),
  gender: z.string(),
});

export const ThreadOutputSchema = z.object({
  thread: z
    .string()
    .describe('내부용 한 줄. "~을 읽고 싶어한다" 형식. 방문객에게 노출하지 않음.'),
  firstQuestion: z
    .string()
    .describe("길벗이 서문에서 던지는 첫 질문. 열어두는 질문형."),
});

// ── Phase: dialogueOpen ──────────────────────────────────────────────────
// 도착+미션 이후, 그 행위에 대한 구체적 후속 질문을 생성한다.
export const DialogueOpenRequestSchema = z.object({
  phase: z.literal("dialogueOpen"),
  thread: z.string(),
  spotName: z.string(),
  spotReading: z.string(),
  spotVoice: z.string(),
  spotMission: z.string(),
  transitThought: z.string(),
  chapterNo: z.union([z.literal(1), z.literal(2), z.literal(3)]),
});

export const DialogueOpenOutputSchema = z.object({
  question: z
    .string()
    .describe(
      "미션 직후 길벗이 던지는 질문. 이동 중 생각과 미션 행위를 자연스럽게 잇는다."
    ),
});

// ── Phase: book ───────────────────────────────────────────────────────────
// 여정 전체를 엮어 제목과 짧은 서문/에필로그 문장을 짓는다.
// 방문객이 직접 쓴 답변은 고쳐 쓰지 않으므로 이 단계의 출력에는 포함하지 않는다.
const ChapterInputSchema = z.object({
  no: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  spotName: z.string(),
  spotReading: z.string(),
  mission: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const BookRequestSchema = z.object({
  phase: z.literal("book"),
  thread: z.string(),
  boardPhrase: z.string(),
  chapters: z.array(ChapterInputSchema),
  epilogueAnswer: z.string(),
});

export const BookOutputSchema = z.object({
  title: z.string().describe("《 》로 감싼 책 제목. 여정의 실에서 우러난 것."),
  prologueNote: z.string().describe("서문에 붙는 한 줄, 무겁지 않게."),
  epilogueNote: z.string().describe("에필로그에 붙는 회고 한 줄."),
});

export const LibrarianRequestSchema = z.discriminatedUnion("phase", [
  ThreadRequestSchema,
  DialogueOpenRequestSchema,
  BookRequestSchema,
]);

export type LibrarianRequest = z.infer<typeof LibrarianRequestSchema>;
