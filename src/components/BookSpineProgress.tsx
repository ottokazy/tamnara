export default function BookSpineProgress({
  chaptersCompleted,
  total = 3,
}: {
  chaptersCompleted: number;
  total?: number;
}) {
  return (
    <div className="flex w-full flex-col gap-[3px] px-6 pt-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: i < chaptersCompleted ? 3 : 1,
            backgroundColor:
              i < chaptersCompleted ? "var(--color-ink)" : "var(--color-line)",
          }}
        />
      ))}
    </div>
  );
}
