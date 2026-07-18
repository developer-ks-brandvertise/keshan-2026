"use client";

import { ReactNode } from "react";
import { Reveal } from "./Reveal";
import CopperHighlight from "./CopperHighlight";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Optional index like "01" shown before or instead of eyebrow styling */
  index?: string;
  title: ReactNode;
  /** Word or phrase inside title to copper-highlight when title is a string */
  highlight?: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

function renderTitle(title: ReactNode, highlight?: string) {
  if (!highlight || typeof title !== "string") return title;

  const idx = title.indexOf(highlight);
  if (idx === -1) return title;

  const before = title.slice(0, idx);
  const after = title.slice(idx + highlight.length);

  return (
    <>
      {before}
      <CopperHighlight>{highlight}</CopperHighlight>
      {after}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  highlight,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignClass} ${className}`}>
      {(eyebrow || index) && (
        <Reveal variant="fade" delay={0}>
          <div
            className={`mb-4 flex items-center gap-3 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            {index && (
              <span className="font-heading text-xs font-medium tracking-[0.25em] text-copper-base">
                {index}
              </span>
            )}
            {index && eyebrow && (
              <span className="h-px w-6 bg-copper-base/40" aria-hidden />
            )}
            {eyebrow && (
              <p className="text-xs font-semibold tracking-widest text-copper-base uppercase">
                {eyebrow}
              </p>
            )}
          </div>
        </Reveal>
      )}

      <Reveal variant="slide" delay={0.1}>
        <h2 className="text-h2 text-balance">{renderTitle(title, highlight)}</h2>
      </Reveal>

      {subtitle && (
        <Reveal variant="fade" delay={0.2}>
          <div
            className={`mt-4 text-body-lg text-text-secondary max-w-2xl ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </div>
        </Reveal>
      )}
    </div>
  );
}
