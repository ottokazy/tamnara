"use client";

import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type { AccentToken } from "@/lib/types";
import { accentVar } from "./accent";

interface UnderlineInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "className"> {
  accent?: AccentToken;
  onChange: (value: string) => void;
  className?: string;
}

export function UnderlineInput({
  accent,
  onChange,
  className = "",
  style,
  ...props
}: UnderlineInputProps) {
  return (
    <input
      {...props}
      onChange={(e) => onChange(e.target.value)}
      style={{ ["--focus-c" as string]: accentVar(accent), ...style }}
      className={`type-body w-full border-0 border-b border-line bg-transparent py-3 text-ink placeholder-muted outline-none transition-all focus:border-b-2 focus:border-[var(--focus-c)] ${className}`}
    />
  );
}

interface UnderlineTextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "className"
  > {
  accent?: AccentToken;
  onChange: (value: string) => void;
  className?: string;
}

export function UnderlineTextarea({
  accent,
  onChange,
  className = "",
  style,
  ...props
}: UnderlineTextareaProps) {
  return (
    <textarea
      {...props}
      onChange={(e) => onChange(e.target.value)}
      style={{ ["--focus-c" as string]: accentVar(accent), ...style }}
      className={`type-body w-full resize-none border-0 border-b border-line bg-transparent py-3 text-ink placeholder-muted outline-none transition-all focus:border-b-2 focus:border-[var(--focus-c)] ${className}`}
    />
  );
}
