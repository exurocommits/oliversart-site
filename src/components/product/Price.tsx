export function Price({
  price,
  salePrice,
  currency = "GBP",
  size = "md",
  showFrom = false,
}: {
  price: number;
  salePrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  showFrom?: boolean;
}) {
  const fmt = (amount: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amount / 100);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-baseline gap-2 ${sizeClasses[size]}`}>
      {showFrom && <span className="text-text-muted text-xs uppercase tracking-wide">From</span>}
      {salePrice ? (
        <>
          <span className="text-error font-bold">{fmt(salePrice)}</span>
          <span className="text-text-muted line-through text-sm">{fmt(price)}</span>
        </>
      ) : (
        <span className="text-gold font-bold">{fmt(price)}</span>
      )}
    </div>
  );
}
