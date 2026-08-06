"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { leadership } from "@/lib/data";

type TeamMember = (typeof leadership.team)[number];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MemberPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter((part) => !/^(CA|Dr\.?|Mr\.?|Mrs\.?)$/i.test(part))
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(184,115,51,0.4),transparent_55%),linear-gradient(160deg,#1a120c,#0a0a0a)]"
      aria-hidden
    >
      <span className="font-heading text-5xl tracking-wide text-copper-base/90 sm:text-6xl">
        {initials}
      </span>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(232,166,89,0.08)_100%)]" />
    </div>
  );
}

function TeamMemberModal({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
        aria-label="Close profile"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-copper-base/30 bg-dark-900 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-copper-base/20 px-6 py-5 sm:px-8">
          <div>
            <h3 id={titleId} className="text-xl text-text-primary sm:text-2xl">
              {member.name}
            </h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
              {member.title}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-dark-100/15 text-text-muted transition-colors hover:border-copper-base hover:text-copper-base"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <div className="space-y-4">
            {member.fullBio.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-body text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
          <a
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 border border-copper-base/40 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-copper-base transition-colors hover:bg-copper-base hover:text-dark-900"
          >
            <LinkedInIcon className="h-3.5 w-3.5" />
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
}

function TeamCard({
  member,
  onKnowMore,
}: {
  member: TeamMember;
  onKnowMore: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <article className="group relative flex flex-col overflow-hidden border border-copper-base/25 bg-dark-950 transition-colors hover:border-copper-base/50">
      <div className="relative aspect-[4/5] overflow-hidden">
        <MemberPlaceholder name={member.name} />

        {/* Hover / focus overlay */}
        <div
          className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-dark-950 via-dark-950/90 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 ${
            reduceMotion ? "duration-0" : ""
          }`}
        >
          <p
            className={`mb-4 text-sm leading-relaxed text-text-secondary ${
              reduceMotion
                ? ""
                : "translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
            }`}
          >
            {member.shortBio}
          </p>
          <div
            className={`flex flex-wrap gap-2 ${
              reduceMotion
                ? ""
                : "translate-y-3 opacity-0 transition-all delay-75 duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
            }`}
          >
            <button
              type="button"
              onClick={onKnowMore}
              className="inline-flex h-10 items-center bg-copper-gradient px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-dark-900 transition-shadow hover:shadow-[0_0_20px_rgba(232,166,89,0.35)]"
            >
              Know More
            </button>
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 border border-copper-base/50 px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-copper-base transition-colors hover:border-copper-base hover:bg-copper-base/10"
            >
              <LinkedInIcon className="h-3 w-3" />
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-copper-base/20 px-5 py-4">
        <h3 className="text-lg text-text-primary sm:text-xl">{member.name}</h3>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
          {member.title}
        </p>
        {/* Mobile: always-visible actions (hover limited on touch) */}
        <div className="mt-4 flex flex-wrap gap-2 sm:hidden">
          <button
            type="button"
            onClick={onKnowMore}
            className="inline-flex h-9 items-center bg-copper-gradient px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-dark-900"
          >
            Know More
          </button>
          <a
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 border border-copper-base/50 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-copper-base"
          >
            <LinkedInIcon className="h-3 w-3" />
            LinkedIn Profile
          </a>
        </div>
      </div>
    </article>
  );
}

export default function TeamGrid() {
  const [active, setActive] = useState<TeamMember | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {leadership.team.map((member) => (
          <TeamCard
            key={member.name}
            member={member}
            onKnowMore={() => setActive(member)}
          />
        ))}
      </div>
      {active ? <TeamMemberModal member={active} onClose={close} /> : null}
    </>
  );
}
