"use client";

import {
  ThreadOutputSchema,
  DialogueOpenOutputSchema,
  ChapterCloseOutputSchema,
  BookOutputSchema,
  type LibrarianRequest,
} from "./librarian-schemas";
import type { z } from "zod";

async function callLibrarian(payload: LibrarianRequest): Promise<unknown> {
  const res = await fetch("/api/librarian", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`librarian_failed_${res.status}`);
  return res.json();
}

// 나무판 사진(data URL)을 순수 base64 + media type으로 분리한다.
export function splitDataUrl(
  dataUrl: string | null
): { base64: string; mediaType: string } | null {
  if (!dataUrl) return null;
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  return { mediaType: match[1], base64: match[2] };
}

export async function fetchThread(
  args: Omit<Extract<LibrarianRequest, { phase: "thread" }>, "phase">
): Promise<z.infer<typeof ThreadOutputSchema>> {
  const raw = await callLibrarian({ phase: "thread", ...args });
  return ThreadOutputSchema.parse(raw);
}

export async function fetchDialogueOpen(
  args: Omit<Extract<LibrarianRequest, { phase: "dialogueOpen" }>, "phase">
): Promise<z.infer<typeof DialogueOpenOutputSchema>> {
  const raw = await callLibrarian({ phase: "dialogueOpen", ...args });
  return DialogueOpenOutputSchema.parse(raw);
}

export async function fetchChapterClose(
  args: Omit<Extract<LibrarianRequest, { phase: "chapterClose" }>, "phase">
): Promise<z.infer<typeof ChapterCloseOutputSchema>> {
  const raw = await callLibrarian({ phase: "chapterClose", ...args });
  return ChapterCloseOutputSchema.parse(raw);
}

// 갈림길 화면 진입 전(답변 제출 시점)에 미리 요청을 띄워두는 캐시.
// forks 페이지가 마운트된 뒤에야 요청을 시작하면 그만큼 그대로 대기 시간이 되므로,
// "답변하기"를 누른 순간 미리 쏴 두고 forks 페이지는 그 진행 중인 요청을 그대로 받는다.
let pendingChapterClose: {
  key: string;
  promise: Promise<z.infer<typeof ChapterCloseOutputSchema>>;
} | null = null;

export function prefetchChapterClose(
  key: string,
  args: Omit<Extract<LibrarianRequest, { phase: "chapterClose" }>, "phase">
): void {
  pendingChapterClose = { key, promise: fetchChapterClose(args) };
}

// 소비하지 않고 그대로 둔다 — 개발 모드의 StrictMode는 effect를 두 번 실행하므로,
// 여기서 캐시를 비워버리면 두 번째 실행이 캐시를 놓쳐 요청을 중복으로 쏘게 된다.
// 다음 갈림길로 넘어갈 때 prefetchChapterClose가 새 값으로 덮어쓰므로 별도로 비울
// 필요가 없다.
export function peekChapterClosePrefetch(
  key: string
): Promise<z.infer<typeof ChapterCloseOutputSchema>> | null {
  return pendingChapterClose?.key === key ? pendingChapterClose.promise : null;
}

export async function fetchBook(
  args: Omit<Extract<LibrarianRequest, { phase: "book" }>, "phase">
): Promise<z.infer<typeof BookOutputSchema>> {
  const raw = await callLibrarian({ phase: "book", ...args });
  return BookOutputSchema.parse(raw);
}
