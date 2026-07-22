"use client";

import { useRef, useState } from "react";

export function CameraCapture({
  onCapture,
  accent = "var(--color-ink)",
}: {
  onCapture: (dataUrl: string) => void;
  accent?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      onCapture(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        style={{ borderColor: "var(--color-line)" }}
        className="flex aspect-[4/3] w-full cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed bg-card transition-colors active:bg-[color-mix(in_srgb,var(--color-line)_30%,transparent)]"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="나무판 사진"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accent}
              strokeWidth="1.2"
              className="mb-3 opacity-60"
            >
              <path d="M4 8a2 2 0 0 1 2-2h1.2a1 1 0 0 0 .86-.5l.68-1.13A1 1 0 0 1 9.6 4h4.8a1 1 0 0 1 .86.37l.68 1.13a1 1 0 0 0 .86.5H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
              <circle cx="12" cy="13" r="3.2" />
            </svg>
            <span className="type-caption text-muted">
              고른 나무판을 찍어주세요
            </span>
          </>
        )}
      </button>
    </div>
  );
}
