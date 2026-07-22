export type SpotId =
  | "mirroreum"
  | "cheonhyangrang"
  | "lighthouse"
  | "mother"
  | "artmuseum"
  | "library"
  | "waryong"
  | "niagara"
  | "pottery"
  | "alo";

// 방문객의 실(thread)과 각 장소를 잇는 데 쓰는 성향 어휘.
// 각 장소의 reading 양태(나를/소리를/상상을/기억을/비움을/흔적을/관점을/시간을/변형을 읽다)에서
// 그대로 따왔다 — 별도 태그 체계를 새로 만들지 않고 이미 있는 장소 성격을 재사용한다.
export const AFFINITY_TAGS = [
  "자기응시",
  "감각과소리",
  "상상과기대",
  "기억과그리움",
  "비움과여백",
  "흔적과타인",
  "관점전환",
  "시간과속도",
  "변형과성장",
] as const;

export type AffinityTag = (typeof AFFINITY_TAGS)[number];

export type AccentToken =
  | "mirroreum"
  | "cheonhyangrang"
  | "lighthouse"
  | "mother"
  | "alo"
  | "artmuseum"
  | "library"
  | "waryong"
  | "niagara"
  | "pottery";

export interface Spot {
  id: SpotId;
  name: string;
  reading: string; // e.g. "소리를 읽다"
  readingEn: string; // e.g. "READING SOUND"
  accent: AccentToken;
  walkMin: number;
  voice: string; // quote in the spot's own voice
  mission: string; // physical action invitation shown on arrival
  missionFollowUp: string; // 길벗's first dialogue question about that action
  forkReason: string; // one-line reason shown on the fork card
  transitAction: string;
  transitThought: string;
  fits: AffinityTag[]; // 이 장소가 어울리는 성향 — 갈림길 매칭에 쓴다
  stage: 1 | 2 | 3; // 承轉結 중 어느 막에 어울리는 장소인지
}

export interface Profile {
  ageBand: string;
  gender: string;
}

export interface Board {
  id: string;
  phrase: string;
  direction: string; // internal hint: what direction of thought this phrase opens
}

export interface DialogueTurn {
  q: string;
  a: string;
}

export interface ChapterLog {
  no: 1 | 2 | 3;
  spotId: SpotId;
  transitAction: string;
  transitThought: string;
  arrivalQuote: string;
  mission: string;
  dialogue: DialogueTurn[];
}

export interface SessionState {
  sessionId: string;
  boardPhoto: string | null;
  boardPhrase: string;
  profile: Profile;
  introText: string;
  thread: string;
  affinityTags: AffinityTag[];
  firstQuestion: string;
  firstAnswer: string;
  path: SpotId[];
  chapters: ChapterLog[];
  currentChapterNo: 1 | 2 | 3;
  activeForkOptions: SpotId[];
  activeSpotId: SpotId | null;
  epilogueQuestion: string;
  epilogueAnswer: string;
  email: string;
  bookTitle: string;
  prologueNote: string;
  epilogueNote: string;
}
