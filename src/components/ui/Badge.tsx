interface BadgeProps {
  variant: "new" | "sale" | "limited" | "sold-out" | "low-stock";
  count?: number;
}

const variantClasses: Record<string, string> = {
  new: "bg-gold text-surface",
  sale: "bg-error text-white",
  limited: "bg-surface-alt text-gold border border-gold/30",
  "sold-out": "bg-surface-alt text-text-muted",
  "low-stock": "bg-warning text-surface",
};

const labels: Record<string, string> = {
  new: "New",
  sale: "Sale",
  limited: "Limited Edition",
  "sold-out": "Sold Out",
  "low-stock": "",
};

export function Badge({ variant, count }: BadgeProps) {
  const label = variant === "low-stock" && count ? `Only ${count} left` : labels[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
