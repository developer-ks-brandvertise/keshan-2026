import { ReactNode } from "react";

interface CopperHighlightProps {
  children: ReactNode;
  className?: string;
}

export default function CopperHighlight({
  children,
  className = "",
}: CopperHighlightProps) {
  return (
    <span className={`text-copper-shimmer ${className}`}>{children}</span>
  );
}
