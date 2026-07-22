"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { SessionState } from "./types";

const STORAGE_KEY = "walk-book-session-v1";

function emptySession(): SessionState {
  return {
    sessionId: "",
    boardPhoto: null,
    boardPhrase: "",
    profile: { ageBand: "", gender: "" },
    introText: "",
    thread: "",
    affinityTags: [],
    firstQuestion: "",
    firstAnswer: "",
    path: [],
    chapters: [],
    currentChapterNo: 1,
    activeForkOptions: [],
    activeSpotId: null,
    epilogueQuestion: "",
    epilogueAnswer: "",
    email: "",
    bookTitle: "",
    prologueNote: "",
    epilogueNote: "",
  };
}

interface SessionContextValue {
  session: SessionState;
  update: (patch: Partial<SessionState>) => void;
  resetSession: () => void;
  hydrated: boolean;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionState>(emptySession);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        // One-time hydration from localStorage after mount — must run in an
        // effect since localStorage isn't available during SSR.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSession(JSON.parse(raw));
      } catch {
        // ignore corrupt persisted state
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session, hydrated]);

  const update = (patch: Partial<SessionState>) =>
    setSession((prev) => ({ ...prev, ...patch }));

  const resetSession = () => {
    const fresh = emptySession();
    fresh.sessionId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now());
    setSession(fresh);
  };

  return (
    <SessionContext.Provider
      value={{ session, update, resetSession, hydrated }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
