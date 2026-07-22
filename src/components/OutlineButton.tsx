"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { AccentToken } from "@/lib/types";
import { accentVar } from "./accent";

interface OutlineButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: ReactNode;
  accent?: AccentToken;
  icon?: ReactNode;
  className?: string;
}

export default function OutlineButton({
  children,
  accent,
  icon,
  className = "",
  style,
  ...props
}: OutlineButtonProps) {
  const c = accentVar(accent);
  return (
    <button
      {...props}
      style={{
        borderColor: c,
        color: c,
        ["--btn-c" as string]: c,
        ...style,
      }}
      className={`type-button flex w-full items-center justify-between border px-8 py-5 tracking-widest transition-all duration-200 active:scale-[0.98] active:bg-[color-mix(in_srgb,var(--btn-c)_6%,transparent)] disabled:opacity-40 ${className}`}
    >
      <span>{children}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
}
