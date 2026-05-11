export function ScarcityIndicator({ remaining, total }: { remaining: number; total: number }) {
  const percentage = Math.round((remaining / total) * 100);
  const isLow = remaining <= 5;
  const isGone = remaining === 0;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className={isGone ? "text-text-muted" : isLow ? "text-warning font-semibold" : "text-text-muted"}>
          {isGone ? "Sold out" : `${remaining} of ${total} remaining`}
        </span>
        <span className="text-text-muted">{percentage}% available</span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isGone ? "bg-border" : isLow ? "bg-warning" : "bg-gold"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
