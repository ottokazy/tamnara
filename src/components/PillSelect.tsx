"use client";

export function PillSelect({
  label,
  options,
  value,
  onChange,
  accent = "var(--color-ink)",
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  accent?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="type-caption mb-1 block w-full text-muted">
        {label}
      </span>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={
              active
                ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
                : undefined
            }
            className={`type-button border px-4 py-2 transition-all ${
              active ? "" : "border-line bg-card text-muted"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
