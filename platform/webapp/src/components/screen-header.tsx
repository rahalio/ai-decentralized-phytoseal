export function ScreenHeader({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {kicker ? (
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-steel">
            {kicker}
          </p>
        ) : null}
        <h1 className="font-display text-3xl text-ink md:text-4xl">{title}</h1>
      </div>
      {children}
    </div>
  );
}
