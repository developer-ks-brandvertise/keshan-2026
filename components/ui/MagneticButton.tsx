"use client";

import { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  icon?: ReactNode;
}

const sizeStyles = {
  sm: "h-10 px-4 text-[11px] gap-2",
  md: "h-11 px-5 text-[11px] gap-2.5",
  lg: "h-12 px-6 text-xs gap-3",
};

const variantStyles = {
  primary:
    "bg-copper-gradient text-dark-900 hover:shadow-[0_0_24px_rgba(232,166,89,0.35)]",
  secondary:
    "border border-copper-base/60 bg-transparent text-copper-base hover:border-copper-base hover:bg-copper-base/10",
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  icon,
}: MagneticButtonProps) {
  const classes = [
    "group inline-flex items-center justify-center",
    "font-bold uppercase tracking-[0.12em]",
    "transition-all duration-300",
    sizeStyles[size],
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconBox =
    variant === "primary"
      ? "border-dark-900/30"
      : "border-copper-base/40 group-hover:border-copper-base";

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      <span
        className={`flex h-5 w-5 items-center justify-center border transition-transform duration-300 group-hover:rotate-45 ${iconBox}`}
      >
        <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
      </span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href as "/"} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
