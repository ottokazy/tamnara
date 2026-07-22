import "server-only";
import { GoogleGenAI } from "@google/genai";

// 서버 전용 싱글턴. GEMINI_API_KEY 환경변수를 자동으로 읽는다 —
// 절대 키를 하드코딩하지 말고, 클라이언트 컴포넌트에서 이 파일을 import하지 말 것.
export const gemini = new GoogleGenAI({});

// 문답(자주 호출, 짧은 생성)은 저렴한 flash, 책 편집(세션당 1회)은 pro.
// 버전을 못 박지 않고 "-latest" 별칭을 써서, 구버전이 신규 사용자에게
// 차단되는 문제(예: gemini-2.5-flash 404)를 자동으로 피한다.
export const FLASH_MODEL = "gemini-flash-latest";
export const PRO_MODEL = "gemini-pro-latest";
