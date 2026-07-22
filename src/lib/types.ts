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
