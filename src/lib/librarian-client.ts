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

export async function fetchBook(
  args: Omit<Extract<LibrarianRequest, { phase: "book" }>, "phase">
): Promise<z.infer<typeof BookOutputSchema>> {
  const raw = await callLibrarian({ phase: "book", ...args });
  return BookOutputSchema.parse(raw);
}
