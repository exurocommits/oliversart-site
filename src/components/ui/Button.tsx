"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
}

const variantClasses: Record<string, string> = {
  primary: "bg-gold text-navy-deep hover:bg-gold-dim focus:ring-gold/50",
  secondary: "bg-border-light dark:bg-navy-mid text-gold hover:bg-surface-light-alt dark:hover:bg-navy-light focus:ring-navy-mid/50",
  outline: "bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-navy-deep focus:ring-gold/50",
  ghost: "bg-transparent text-text-muted-light dark:text-cream-muted hover:bg-surface-light-alt dark:hover:bg-navy-light hover:text-gold focus:ring-navy-mid/50",
  danger: "bg-error text-white hover:bg-error/80 focus:ring-error/50",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-semibold
        transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.97]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-navy-deep
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon && iconPosition === "left" ? (
        icon
      ) : null}
      {children}
      {!loading && icon && iconPosition === "right" ? icon : null}
    </button>
  );
}
