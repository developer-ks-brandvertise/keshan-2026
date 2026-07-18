import { ArrowRight } from "lucide-react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

export default function PrimaryButton({
  children,
  href,
  type = "button",
  className = "",
  onClick,
}: PrimaryButtonProps) {
  const base =
    "group inline-flex h-[56px] items-center gap-3 overflow-hidden bg-copper-gradient px-6 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,115,51,0.35)]";
  const inner = (
    <>
      <span className="relative flex h-full items-center overflow-hidden">
        <span className="transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute left-0 top-full flex h-full items-center transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
      </span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#0a0a0a]/30 transition-transform duration-300 group-hover:rotate-45 group-hover:border-[#0a0a0a]">
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${className}`}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${base} ${className}`}>
      {inner}
    </button>
  );
}
