import { ArrowRight } from "lucide-react";

interface TextButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  light?: boolean;
}

export default function TextButton({
  children,
  href = "#",
  className = "",
  light = false,
}: TextButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
        light ? "text-white hover:text-primary" : "text-dark hover:text-primary"
      } ${className}`}
    >
      <span className="relative flex h-10 items-center overflow-hidden rounded-full bg-white px-5 text-dark shadow-sm transition-colors group-hover:bg-primary group-hover:text-white">
        <span className="transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute left-5 top-full flex h-full items-center transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
      </span>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dark text-white transition-transform duration-300 group-hover:rotate-45 group-hover:bg-primary">
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}
