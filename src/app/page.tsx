"use client";

import { useRouter } from "next/navigation";
import OutlineButton from "@/components/OutlineButton";
import { useSession } from "@/lib/session-context";

export default function CoverPage() {
  const router = useRouter();
  const { resetSession } = useSession();

  const handleStart = () => {
    resetSession();
    router.push("/start");
  };

  return (
    <main className="flex flex-grow flex-col px-6 pt-16 pb-16">
      <header className="mb-8">
        <span className="type-subtitle-en mb-2 block text-muted">
          WALK, BECOME A BOOK
        </span>
        <h1 className="type-display-sm break-keep text-ink">
          책이 되어 걷다
        </h1>
        <p className="type-body mt-6 max-w-[280px] break-keep text-muted">
          당신의 발걸음이 문장이 되고,
          <br />
          풍경은 한 권의 서사가 됩니다.
        </p>
      </header>

      <div className="flex flex-grow items-center justify-center">
        <div className="h-32 w-px bg-line opacity-60" />
      </div>

      <footer className="mt-auto">
        <p className="type-caption mb-3 text-muted">
          새로운 여정을 시작할 준비가 되셨나요?
        </p>
        <OutlineButton
          accent="cheonhyangrang"
          onClick={handleStart}
          icon={<span aria-hidden>↗</span>}
        >
          시작하기
        </OutlineButton>
      </footer>
    </main>
  );
}
