"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  onChange?: (value: string) => void;
}

export function Input({
  label,
  error,
  helperText,
  icon,
  onChange,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[#1a1a2e] dark:text-cream">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-cream-muted">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`
            w-full bg-white dark:bg-navy-light border rounded-lg px-4 py-2.5 text-[#1a1a2e] dark:text-cream text-sm
            placeholder:text-text-muted-light/50 dark:placeholder:text-cream-muted/50
            focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? "pl-10" : ""}
            ${error ? "border-error focus:ring-error/50 focus:border-error" : "border-border-light dark:border-navy-mid"}
          `}
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        />
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
      {helperText && !error && <p className="text-text-muted-light dark:text-cream-muted text-xs">{helperText}</p>}
    </div>
  );
}
