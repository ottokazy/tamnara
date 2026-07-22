import { z } from "zod";
import { AFFINITY_TAGS } from "./types";

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
  affinityTags: z
    .array(z.enum(AFFINITY_TAGS))
    .min(2)
    .max(3)
    .describe(
      "방문객의 여정의 실과 가장 맞닿은 성향 태그 2~3개(관련도 높은 순). " +
        "갈림길에서 어느 장소를 먼저 보여줄지 정하는 데 내부적으로 쓴다."
    ),
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

// ── Phase: chapterClose ──────────────────────────────────────────────────
// 방문객이 답변(또는 침묵)을 남긴 직후, 다음 갈림길 카드로 이어지는 한 흐름의
// 문장 + 그 갈림길 각각의 이유를 새로 쓴다. 여정의 실과 방금 답을 조용히
// 엮어 "길 안내"를 하되, 진단문을 입 밖에 내지는 않는다.
const ForkOptionInputSchema = z.object({
  spotId: z.string(),
  name: z.string(),
  reading: z.string(),
  voice: z.string(),
});

export const ChapterCloseRequestSchema = z.object({
  phase: z.literal("chapterClose"),
  thread: z.string(),
  spotName: z.string().nullable(), // null이면 아직 스팟 방문 전(서문 직후)
  question: z.string(),
  answer: z.string(), // 빈 문자열이면 침묵(그냥 지나가기)
  forkOptions: z.array(ForkOptionInputSchema),
});

// 모델이 실제로 만들어내는 것: spotId는 모델이 지어내면 원본과 어긋날 수 있으므로
// 아예 맡기지 않는다 — forkOptions와 같은 순서의 이유 배열만 받는다.
export const ChapterCloseGenerationSchema = z.object({
  acknowledgment: z
    .string()
    .describe(
      "답변을 받아주고 자연스럽게 다음 갈림길로 이어지는 한두 문장. " +
        "방문객 마음 상태를 해석·진단하지 않는다(예: '~하고 싶으신가봐요' 금지). " +
        "방문객의 말을 되받아쓰고, 그 흐름 그대로 다음 걸음을 향한 초대로 마무리한다."
    ),
  forkReasons: z
    .array(
      z
        .string()
        .describe(
          "이 장소가 왜 다음 걸음으로 어울릴 수 있는지, 여정의 실과 방금 답을 " +
            "조용히 엮어 쓴 한 줄. 방문객의 마음을 안다고 단정하는 진단문은 " +
            "쓰지 않는다(예: '~하시는군요', '~한 마음이시네요' 금지). " +
            "그 장소의 실제 특징도 함께 담는다."
        )
    )
    .describe(
      "forkOptions와 정확히 같은 개수, 같은 순서로 하나씩. spotId는 쓰지 않는다."
    ),
});

// 클라이언트에 실제로 내려주는 것: spotId는 서버가 forkOptions 순서로 직접 붙인다.
export const ChapterCloseOutputSchema = z.object({
  acknowledgment: z.string(),
  forkReasons: z.array(
    z.object({
      spotId: z.string(),
      reason: z.string(),
    })
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
  ChapterCloseRequestSchema,
  BookRequestSchema,
]);

export type LibrarianRequest = z.infer<typeof LibrarianRequestSchema>;
