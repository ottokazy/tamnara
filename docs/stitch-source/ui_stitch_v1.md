# UI 디자인 요구사항 — 「책이 되어 걷다」

**용도:** Google Stitch(및 기타 UI 생성 도구) 입력용 디자인 명세 **기준:** 탐나라공화국 LOOK & LINK LIBRARY 보드와 시각적 통일 **작성일:** 2026-07-20

---

## 0\. 이 문서의 사용법

Stitch는 텍스트 프롬프트로 화면을 생성한다. 좋은 결과를 위해:

- §1\~3의 디자인 언어를 **모든 화면 프롬프트 앞에 공통으로 붙인다** (스타일 고정).  
- §5의 화면별 프롬프트를 하나씩 생성한다.  
- 보드 이미지가 있으면 참조 이미지로 함께 넣으면 통일성이 크게 올라간다.  
- 생성 후 폰트·색은 Stitch에서 미세 조정한다.

---

## 1\. 디자인 원칙 (보드에서 추출)

LOOK & LINK 보드의 시각 DNA를 앱으로 옮긴다:

1. **여백이 주인공이다.** 요소를 꽉 채우지 않는다. 화면의 40% 이상은 비운다. 사유의 앱이므로 화면도 숨 쉴 자리를 준다.  
2. **한 화면에 한 가지 일.** 질문 하나, 행위 하나. 여러 정보를 동시에 쌓지 않는다.  
3. **장소마다 색이 바뀐다.** 배경·구조는 고정, 포인트 컬러 하나만 그 장소의 색으로. 걸을수록 색이 달라지는 책.  
4. **타이포그래피가 곧 그래픽이다.** 장식 이미지 대신 큰 글자의 크기·굵기 대비로 화면을 구성한다.  
5. **고딕(산세리프)만.** 명조·손글씨체 쓰지 않는다. 보드와 동일하게 깔끔한 산세리프.  
6. **정적이고 조용하게.** 그림자·그라디언트·화려한 애니메이션 배제. 종이 위 인쇄물처럼 평평하게.

---

## 2\. 디자인 토큰

### 색상

| 토큰 | 값 | 용도 |
| :---- | :---- | :---- |
| 배경 (paper) | `#F2F1EC` | 전 화면 기본 배경 (크림/아이보리) |
| 먹색 (ink) | `#1A1A1A` | 본문·제목 기본 텍스트 |
| 회색 (muted) | `#6B6B6B` | 보조 텍스트, 영문 소제목, 캡션 |
| 얇은 선 (line) | `#D8D6CE` | 구분선, 카드 테두리 |
| 흰색 (card) | `#FFFFFF` | 카드·입력 필드 배경 (배경 위에 살짝 뜨는 층) |

**장소별 포인트 컬러** (보드에서 확인/추정):

| 장소 | 읽기 | 포인트 컬러 |
| :---- | :---- | :---- |
| 미러리움 | 나를 읽다 | `#B5892E` (머스타드) |
| 천향랑 음악정원 | 소리를 읽다 | `#2E5A3E` (딥그린) |
| 하늘등대 | 상상을 읽다 | `#2F5D8A` (블루) |
| 어머니방 | 기억을 읽다 | `#9C5B3B` (테라코타/브라운) |
| 카페 알로 | 맛을 읽다 | `#6B4E37` (커피브라운) |
| 노자예술관 | 비움을 읽다 | `#4A4A48` (먹빛 그레이) *제안* |
| 헌책도서관 | 흔적을 읽다 | `#7A6A55` (오래된 종이빛) *제안* |
| 와룡 | 관점을 읽다 | `#8A3A2E` (용암 레드브라운) *제안* |
| 나이야가라 | 시간을 읽다 | `#3E7A7A` (물빛 청록) *제안* |
| 도자마을 | 변형을 읽다 | `#5A5048` (현무암 그레이) *제안* |

> 포인트 컬러는 화면당 **한 곳에만** 강하게 쓴다: 영문 소제목, 강조 단어, 버튼 테두리, 진행 표시 중 하나.

### 타이포그래피

- **한글 서체:** 산세리프. Noto Sans KR 또는 Pretendard 계열. (보드의 굵은 고딕과 동일 인상)  
- **영문 서체:** 산세리프. 소제목은 **대문자 \+ 넓은 자간(letter-spacing)** — 보드의 "READING SOUND" 스타일.

| 스타일 | 크기(모바일) | 굵기 | 비고 |
| :---- | :---- | :---- | :---- |
| 대제목 (화면 타이틀) | 34\~44px | Bold | 보드처럼 두 줄로 쪼개 굵기 대비 가능 |
| 영문 소제목 | 12\~13px | Medium | 대문자, 자간 \+2\~3px, muted 또는 포인트색 |
| 질문/본문 강조 | 20\~24px | Regular\~Medium | 사서의 질문은 이 크기 |
| 본문 | 15\~16px | Regular | 행간 넉넉히 (1.6\~1.7) |
| 캡션/보조 | 12\~13px | Regular | muted |

### 간격·형태

- 화면 좌우 여백: 24px 이상  
- 요소 간 수직 간격: 넉넉하게(16\~32px), 답답하지 않게  
- 모서리: 카드·버튼 **거의 각지게**(radius 0\~4px). 둥근 버블 지양 — 인쇄물 느낌 유지  
- 그림자: 없음 또는 극히 미세하게. 평평하게  
- 구분선: 1px, line 색, 짧게

---

## 3\. 컴포넌트 규칙

- **버튼:** 배경 채우기보다 **테두리 선 버튼(outline)** 우선. 포인트색 테두리 \+ 먹색 텍스트. 눌렀을 때만 살짝 채워짐.  
- **입력 필드:** 흰 배경, 얇은 하단 선(underline) 스타일 또는 얇은 테두리. 플레이스홀더는 muted. 야외 가독성 위해 충분히 큼.  
- **카드(갈림길 선택):** 흰 배경, 얇은 테두리, 각진 모서리. 안에 장소명(대) \+ 한 줄 이유(muted) \+ 도보시간 캡션.  
- **진행 표시:** 화려한 프로그레스바 대신 **책이 두꺼워지는 은유** — 페이지/챕터가 쌓이는 얇은 표시. 상단에 조용히.  
- **로딩:** 스피너 대신 "페이지를 넘기는 중…" 같은 컨셉 문구 \+ 미세한 페이드.

---

## 4\. 화면 목록 (프로토타입 기준)

| \# | 화면 | 핵심 요소 |
| :---- | :---- | :---- |
| S1 | 진입/표지 | 컨셉 한 줄, "시작하기" |
| S2 | 서문 — 나무판 촬영·입력 | 카메라, 나이대/성별 선택, 고민 자유입력 |
| S3 | 사서의 첫 질문 | 질문 하나 \+ 답 입력 |
| S4 | 갈림길 선택 | 장소 카드 2\~3개 |
| S5 | 이동 모드 | 경로 안내 \+ 이동 중 행위 \+ 생각거리 |
| S6 | 장소 도착 | 장소의 목소리(보드 인용) \+ 미션 |
| S7 | 문답 | 채팅형 질문·답변 |
| S8 | 에필로그 — 카페알로 | 회고 질문 \+ 이메일 입력 |
| S9 | 책 미리보기 | 완성된 책(표지·챕터) |

---

## 5\. 화면별 Stitch 프롬프트

> 아래 각 프롬프트 앞에 이 **공통 스타일 문장**을 붙여 넣는다:  
>   
> *"Minimalist contemplative mobile app screen, cream ivory background (\#F2F1EC), clean sans-serif typography (like Noto Sans KR), generous white space (40%+ empty), flat design with no shadows or gradients, sharp/near-square corners, one accent color used sparingly, editorial print-like layout inspired by a museum reading card. Korean text."*

**S1 · 진입/표지**

> Opening screen. Large bold Korean title "책이 되어 걷다" occupying upper-left, small uppercase English subtitle "WALK, BECOME A BOOK" with wide letter-spacing above it in muted gray. One line of subtitle text below. A single outline button "시작하기" near the bottom. Vast empty space. Deep green accent (\#2E5A3E).

**S2 · 서문 (나무판 촬영·입력)**

> Input screen titled "오늘의 첫 페이지". A camera capture area (dashed thin border, camera icon, label "고른 나무판을 찍어주세요") in the upper portion. Below: a set of small pill-style selectors for age range, an optional gender selector including "밝히지 않음", and a multi-line text field with underline style and placeholder "지금의 고민, 또는 오늘 읽고 싶은 것". Outline "다음" button. Mustard accent (\#B5892E).

**S3 · 사서의 첫 질문**

> A single large question in the center-upper area, 22px medium weight Korean text, e.g. "오늘 당신이 읽고 싶은 것은 답일까요, 아니면 잠시 멈출 자리일까요?". Small uppercase label "사서" above it in accent color. A minimal underline text field below for the answer, and a subtle "보내기" text button. Mostly empty screen, calm. Deep green accent.

**S4 · 갈림길 선택**

> Screen titled with a small prompt "어느 길로 걸으시겠어요?". Two to three vertically stacked cards, each: white background, thin border, sharp corners, containing a place name in bold (e.g. "천향랑 · 소리를 읽다"), one muted line of reason below, and a small caption "도보 5분". No images inside cards. Generous spacing between cards. One accent color for card border highlight.

**S5 · 이동 모드**

> Walking-mode screen designed to be glanced at while walking. Large friendly instruction for a small action, e.g. "걷는 동안, 스쳐가는 소리 중 가장 작은 소리 하나를 찾아보세요." A thin dotted path/route hint. A secondary muted line "생각하며 걸어요: 나는 무엇을 기다리고 있었나". A large easy-to-tap "도착했어요" outline button at the bottom. Very airy. Blue accent (\#2F5D8A).

**S6 · 장소 도착 (장소의 목소리 \+ 미션)**

> Arrival screen mimicking a museum reading card. Top: small uppercase English label "READING SOUND" with wide spacing, then a very large two-line Korean title split by weight, e.g. "소리를 " (bold) / "읽다" (lighter). A short italic-feel quote line "소리는 귀로 읽는 책이다". A thin divider. Below, a "MISSION" label and one short mission sentence. Deep green accent (\#2E5A3E). This screen should look almost identical in spirit to the LOOK & LINK LIBRARY board.

**S7 · 문답 (채팅형)**

> Minimal chat interface, NOT typical messenger bubbles. The librarian's questions appear as plain left-aligned text in ink color with a tiny "사서" label; the visitor's answers appear in a lighter/indented block. No colored bubbles, no avatars. Calm, book-like reading rhythm. A slim input field at the bottom with underline style. One accent color only for the small send action.

**S8 · 에필로그 (카페알로)**

> Quiet closing screen titled softly "한 잔을 고르는 동안". One gentle final question in medium Korean text. Below, an email input field (underline style, placeholder "책을 받을 이메일") and a note in muted gray "책을 보낸 뒤 주소는 바로 지워집니다". An outline button "내 책 받기". Coffee-brown accent (\#6B4E37). Warm, restful, lots of space.

**S9 · 책 미리보기**

> A preview of the finished personal book. Shows a book "cover" rendered in flat editorial style: an AI-generated title in large bold Korean (e.g. 《기다리지 않는 악기들에게》), the visitor's board photo as a small framed image, and a table of chapters listed as place names with their "읽다" themes. Below, a thin list preview of chapters. Muted, keepsake-like, print quality feel. Neutral dark accent.

---

## 6\. Stitch 사용 팁

- 화면을 **하나씩** 생성한다. 한 프롬프트에 여러 화면을 요구하면 품질이 떨어진다.  
- 첫 화면(S6 도착 화면)을 먼저 만들어 **보드와의 통일성을 확정**한 뒤, 그 결과를 기준으로 나머지 화면의 톤을 맞춘다. S6이 이 앱 디자인의 앵커다.  
- 색이 과하게 나오면 "use the accent color only in one small element, keep everything else ink and cream"을 덧붙인다.  
- 버블·그림자가 나오면 "flat, no shadows, no rounded message bubbles, print-like"를 강조한다.  
- 생성물은 시작점일 뿐 — 폰트(Noto Sans KR/Pretendard)와 정확한 hex 색은 Stitch 편집에서 고정한다.

---

## 7\. 미결/확인

1. 장소별 포인트 컬러 중 *제안* 표시된 5개는 보드 미제작 장소 — 보드가 나오면 실제 색으로 교체.  
2. 로고/워드마크 유무 — 있으면 표지(S1)와 책 표지(S9)에 반영.  
3. 다국어(영/중/일) 시 타이포 스케일 재점검 필요.

