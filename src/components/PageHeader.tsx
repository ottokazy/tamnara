export default function PageHeader({
  step,
  total = 4,
  accent,
}: {
  step: number;
  total?: number;
  accent?: string;
}) {
  return (
    <div className="flex w-full gap-1 px-6 pt-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-[2px] flex-1"
          style={{
            backgroundColor:
              i < step ? accent ?? "var(--color-ink)" : "var(--color-line)",
          }}
        />
      ))}
    </div>
  );
}
