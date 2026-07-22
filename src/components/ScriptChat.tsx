import type { ReactNode } from "react";

export function LibrarianLine({
  children,
  accent,
}: {
  children: ReactNode;
  accent?: string;
}) {
  return (
    <div className="mb-6">
      <div
        className="type-subtitle-en mb-2 tracking-normal normal-case"
        style={{ color: accent }}
      >
        길벗
      </div>
      <p className="type-question text-ink">{children}</p>
    </div>
  );
}
