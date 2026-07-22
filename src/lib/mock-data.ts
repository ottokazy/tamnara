import { AFFINITY_TAGS, type AffinityTag, type Board, type Spot, type SpotId } from "./types";

export const SPOTS: Record<SpotId, Spot> = {
  mirroreum: {
    id: "mirroreum",
    name: "미러리움",
    reading: "나를 읽다",
    readingEn: "READING MYSELF",
    accent: "mirroreum",
    walkMin: 6,
    voice: "여기서 당신은 답을 얻지 않는다. 다만 무한히 되비칠 뿐이다.",
    mission: "사방 거울 앞에 서서, 반복되는 나를 한 번 바라볼까요?",
    missionFollowUp: "몇 번째의 나에게 가장 눈이 갔나요?",
    forkReason: "자신을 무한히 비추어 볼 준비가 되었다면, 이 길로.",
    transitAction: "걷는 동안, 자신의 그림자를 한 번 밟아볼까요?",
    transitThought: "나는 지금 누구의 얼굴로 걷고 있나",
    fits: ["자기응시", "변형과성장"],
    stage: 1,
  },
  cheonhyangrang: {
    id: "cheonhyangrang",
    name: "음악정원",
    reading: "소리를 읽다",
    readingEn: "READING SOUND",
    accent: "cheonhyangrang",
    walkMin: 5,
    voice: "악기는 소리를 내지 않아도, 소리를 품고 있다.",
    mission: "가장 긴 악기와 가장 짧은 악기를 찾아볼까요?",
    missionFollowUp: "그 둘은 각각 어떤 소리를 낼 것 같았나요?",
    forkReason: "들리지 않는 소리에 귀 기울이고 싶다면, 이 길로.",
    transitAction: "걷는 동안 스쳐가는 소리들 중, 가장 작은 소리는 어디에 있을까요?",
    transitThought: "나는 무엇이 들리기를 기다리고 있었나",
    fits: ["감각과소리", "비움과여백"],
    stage: 1,
  },
  lighthouse: {
    id: "lighthouse",
    name: "하늘등대",
    reading: "상상을 읽다",
    readingEn: "READING IMAGINATION",
    accent: "lighthouse",
    walkMin: 7,
    voice: "빛은 멀리 있는 것을 가깝게 만들지 않는다. 다만 보이게 할 뿐이다.",
    mission: "등대의 빛이 닿는 가장 먼 곳을 바라볼까요?",
    missionFollowUp: "그곳엔 무엇이 있을 것 같았나요?",
    forkReason: "아직 오지 않은 것을 상상하고 싶다면, 이 길로.",
    transitAction: "걷는 동안 고개를 들면, 하늘은 몇 가지 색으로 나뉘어 있을까요?",
    transitThought: "내가 기다리는 빛은 어디서 오는가",
    fits: ["상상과기대", "시간과속도"],
    stage: 1,
  },
  mother: {
    id: "mother",
    name: "어머니방",
    reading: "기억을 읽다",
    readingEn: "READING MEMORY",
    accent: "mother",
    walkMin: 8,
    voice: "가장 늦게 읽는 책은, 가장 먼저 쓰인 책이다.",
    mission: "이 방의 조용함 속에, 잠시 머물러볼까요?",
    missionFollowUp: "누군가 나를 부르는 것 같았다면, 그건 누구의 목소리였나요?",
    forkReason: "오래된 기억을 마주할 준비가 되었다면, 이 길로.",
    transitAction: "걷는 동안, 어린 시절 걸음의 속도로 열 걸음만 걸어볼까요?",
    transitThought: "내가 두고 온 것은 무엇이었을까",
    fits: ["기억과그리움", "자기응시"],
    stage: 2,
  },
  artmuseum: {
    id: "artmuseum",
    name: "노자예술관",
    reading: "비움을 읽다",
    readingEn: "READING EMPTINESS",
    accent: "artmuseum",
    walkMin: 5,
    voice: "가장 쓸모 있는 것은 종종 비어 있는 자리다.",
    mission: "전시된 노자·장자의 글귀들을 천천히 둘러볼까요?",
    missionFollowUp: "지금 가장 눈에 들어온 한 구절은 무엇이었나요?",
    forkReason: "채우기보다 비우고 싶다면, 이 길로.",
    transitAction: "걷는 동안, 손에 쥔 것 없이 두 손을 그냥 늘어뜨려볼까요?",
    transitThought: "나는 무엇을 자꾸 채우려 하는가",
    fits: ["비움과여백", "관점전환"],
    stage: 2,
  },
  library: {
    id: "library",
    name: "헌책도서관",
    reading: "흔적을 읽다",
    readingEn: "READING TRACES",
    accent: "library",
    walkMin: 4,
    voice: "낡은 페이지에는 먼저 읽은 사람의 체온이 남는다.",
    mission: "책 한 권을 뽑아, 아무 페이지나 펼쳐볼까요?",
    missionFollowUp: "펼친 페이지의 첫 문장은, 무엇을 말하고 있었나요?",
    forkReason: "누군가 먼저 남긴 흔적을 만나고 싶다면, 이 길로.",
    transitAction: "걷는 동안, 땅에 남은 다른 사람의 발자국을 하나 따라가볼까요?",
    transitThought: "나보다 먼저 이 길을 걸은 것은 누구였을까",
    fits: ["흔적과타인", "기억과그리움"],
    stage: 2,
  },
  waryong: {
    id: "waryong",
    name: "와룡",
    reading: "관점을 읽다",
    readingEn: "READING PERSPECTIVE",
    accent: "waryong",
    walkMin: 6,
    voice: "용은 눈을 얻어야, 비로소 하늘로 오른다.",
    mission: "바위에 새겨진 용의 눈과, 마주 보아볼까요?",
    missionFollowUp: "지금 무엇이 보였나요?",
    forkReason: "보던 자리를 바꾸고 싶다면, 이 길로.",
    transitAction: "걷는 동안, 평소보다 낮은 자세로 주변을 한 번 살펴볼까요?",
    transitThought: "내가 늘 같은 자리에서만 보고 있던 것은 무엇인가",
    fits: ["관점전환", "흔적과타인"],
    stage: 3,
  },
  niagara: {
    id: "niagara",
    name: "나이야가라",
    reading: "시간을 읽다",
    readingEn: "READING TIME",
    accent: "niagara",
    walkMin: 5,
    voice: "이 폭포 앞에서는, 나이를 세지 않는다.",
    mission: "폭포 앞에, 잠시 서볼까요?",
    missionFollowUp: "지금 나는 몇 살처럼 느껴졌나요?",
    forkReason: "나이를 잠시 내려놓고 싶다면, 이 길로.",
    transitAction: "걷는 동안, 걸음의 속도를 평소보다 반 박자 늦춰볼까요?",
    transitThought: "나는 무엇을 그렇게 서두르고 있었나",
    fits: ["시간과속도", "상상과기대"],
    stage: 3,
  },
  pottery: {
    id: "pottery",
    name: "도자마을",
    reading: "변형을 읽다",
    readingEn: "READING TRANSFORMATION",
    accent: "pottery",
    walkMin: 6,
    voice: "그릇이 되지 못한 것들도, 여기 조각으로 남아 있다.",
    mission: "여기 남은 도자기 파편 하나를, 골라볼까요?",
    missionFollowUp: "그건 원래 무엇이었을까요?",
    forkReason: "지금의 자신이 어떻게 빚어졌는지 보고 싶다면, 이 길로.",
    transitAction: "걷는 동안, 발밑의 흙과 돌은 어떻게 다른 감촉일까요?",
    transitThought: "나는 무엇으로 빚어지고 있는 중인가",
    fits: ["변형과성장", "흔적과타인"],
    stage: 3,
  },
  alo: {
    id: "alo",
    name: "카페 알로",
    reading: "맛을 읽다",
    readingEn: "READING TASTE",
    accent: "alo",
    walkMin: 10,
    voice: "한 잔을 고르는 동안, 하루가 정리된다.",
    mission: "",
    missionFollowUp: "",
    forkReason: "",
    transitAction: "",
    transitThought: "",
    fits: [],
    stage: 3,
  },
};

// 막(承轉結)별 후보 풀 — 코스 흐름(감각을 여는 곳 → 고민과 마주하는 곳 → 조망하는 곳)은
// 그대로 두되, 그 안에서 어느 곳을 갈림길로 내밀지는 방문객의 성향에 따라 갈린다.
const STAGE_POOLS: Record<1 | 2 | 3, SpotId[]> = {
  1: ["mirroreum", "cheonhyangrang", "lighthouse"],
  2: ["mother", "artmuseum", "library"],
  3: ["waryong", "niagara", "pottery"],
};

// 방문객의 성향(affinityTags)과 이 막 후보들의 fits가 얼마나 겹치는지로 채점해
// 상위 2곳을 갈림길로 내민다. 겹침이 없거나 동점이면 실(thread) 텍스트로 만든
// 안정적인(같은 방문객은 늘 같은 결과) 타이브레이커로 순서를 정해, 방문객마다
// 다른 조합이 나오게 한다.
export function pickForkOptions(
  chapterIndex: number,
  affinityTags: AffinityTag[],
  visited: SpotId[],
  tiebreakSeed: string
): SpotId[] {
  const stage = ((chapterIndex % 3) + 1) as 1 | 2 | 3;
  const pool = STAGE_POOLS[stage].filter((id) => !visited.includes(id));
  const candidates = pool.length > 0 ? pool : STAGE_POOLS[stage];

  const scored = candidates.map((id) => {
    const spot = SPOTS[id];
    const score = spot.fits.filter((tag) => affinityTags.includes(tag)).length;
    return { id, score, tiebreak: Math.abs(hashCode(tiebreakSeed + id)) };
  });
  scored.sort((a, b) => b.score - a.score || a.tiebreak - b.tiebreak);

  return scored.slice(0, 2).map((s) => s.id);
}

// 실(thread)을 만들 API 호출이 실패했을 때 쓰는 대체 성향 — introText/boardPhrase를
// 씨앗으로 안정적으로(같은 입력엔 같은 결과) 두 개를 고른다.
export function generateAffinityTags(
  introText: string,
  boardPhrase?: string
): AffinityTag[] {
  const seed = boardPhrase ? `${introText}::${boardPhrase}` : introText;
  const first = Math.abs(hashCode(seed)) % AFFINITY_TAGS.length;
  const second = (first + 1 + (Math.abs(hashCode(seed + "2")) % (AFFINITY_TAGS.length - 1))) % AFFINITY_TAGS.length;
  return [AFFINITY_TAGS[first], AFFINITY_TAGS[second]];
}

const THREAD_TEMPLATES = [
  "멈추는 법을 알고 싶어한다",
  "누군가와의 침묵을 읽고 싶어한다",
  "지나온 선택을 다시 읽고 싶어한다",
  "지금의 나를 조금 다르게 읽고 싶어한다",
  "아직 이름 붙이지 못한 마음을 읽고 싶어한다",
];

export function generateThread(introText: string, boardPhrase?: string): string {
  const seed = boardPhrase ? `${introText}::${boardPhrase}` : introText;
  const idx = Math.abs(hashCode(seed)) % THREAD_TEMPLATES.length;
  return THREAD_TEMPLATES[idx];
}

export function generateFirstQuestion(thread: string): string {
  return `오늘 당신이 ${thread.replace(
    /고 싶어한다$/,
    "고 싶어 한다면"
  )}, 지금 가장 먼저 떠오르는 장면은 무엇인가요?`;
}

export function arrivalOpeningQuestion(
  spot: Spot,
  transitThought: string
): string {
  return `걸어오며 품었던 "${transitThought}"라는 물음을 안고, ${spot.missionFollowUp}`;
}

const BOOK_TITLES = [
  "기다리지 않는 악기들에게",
  "멈춰야 보이는 것들의 목록",
  "아직 부르지 않은 이름",
  "가장 늦게 도착한 페이지",
  "흙으로 돌아가는 문장들",
];

export function generateBookTitle(thread: string): string {
  const idx = Math.abs(hashCode(thread)) % BOOK_TITLES.length;
  return `《${BOOK_TITLES[idx]}》`;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export const AGE_BANDS = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
export const GENDERS = ["여성", "남성", "밝히지 않음"];

// 나무판 문구 목록 — 실서비스에서는 사진을 찍으면 비전 모델이 문구를 읽어내지만,
// 이 정적 프로토타입에는 비전 연동이 없어 방문객이 직접 골라 시뮬레이션한다.
export const BOARDS: Board[] = [
  {
    id: "who",
    phrase: "나는 누구지? 그리고 너는 누구지?",
    direction: "정체성과 관계 — 나와 너의 경계를 묻는다",
  },
  {
    id: "hole",
    phrase: "구멍 속에 또다른 세상이 있다",
    direction: "작은 것 안에 숨은 큰 세계",
  },
  {
    id: "andthen",
    phrase: "하늘 구름 꽃 들 흙 그리고",
    direction: "끝나지 않고 이어지는 것, 아직 말하지 않은 것",
  },
  {
    id: "stars",
    phrase: "하늘에 별자리",
    direction: "흩어진 것들 사이를 잇는 것, 이야기를 짓는 일",
  },
  {
    id: "age",
    phrase: "환갑이 넘으면 나이를 세지마라. 왜?",
    direction: "나이·시간에 대한 통념을 뒤집는 질문",
  },
];
