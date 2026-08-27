"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Maximize2, MessageCircle, Minimize2, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export function KeshanChatbot() {
  const t = useTranslations("chat");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open || messages.length) return;
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: t("welcome"),
      },
    ]);
  }, [open, messages.length, t]);

  useEffect(() => {
    if (!open) {
      setExpanded(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (expanded) setExpanded(false);
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, expanded]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, expanded]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = (await res.json()) as { answer: string | null };
      const answer = data.answer ?? t("fallback");
      await new Promise((r) => setTimeout(r, 350));
      setMessages((m) => [
        ...m,
        { id: `a-${Date.now()}`, role: "assistant", text: answer },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: `a-${Date.now()}`, role: "assistant", text: t("fallback") },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void ask(input);
  }

  const prompts = [
    t("prompts.products"),
    t("prompts.certs"),
    t("prompts.quote"),
    t("prompts.export"),
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2 lg:bottom-8 lg:right-8">
        {!open ? (
          <div className="max-w-[200px] border border-border bg-card px-3 py-2 shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
            <p className="text-[11px] font-semibold leading-snug text-text-primary">
              {t("bubbleTitle")}
            </p>
            <p className="mt-0.5 text-[10px] leading-snug text-text-muted">
              {t("bubbleBody")}
            </p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center bg-copper-gradient text-[#0a0a0a] shadow-[0_0_24px_rgba(232,166,89,0.35)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-base"
          aria-label={open ? t("close") : t("open")}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" strokeWidth={2.1} />
          )}
        </button>
      </div>

      {open ? (
        <div
          className={`fixed z-[60] flex flex-col border border-border bg-card text-text-primary shadow-[0_24px_60px_rgba(0,0,0,0.28)] ${
            expanded
              ? "bottom-3 right-3 top-3 w-[min(100%-1.5rem,420px)] sm:right-4 sm:top-4 sm:bottom-4"
              : "bottom-24 right-4 h-[min(560px,70vh)] w-[min(100%-2rem,400px)] sm:right-6 lg:bottom-28 lg:right-8"
          }`}
          role="dialog"
          aria-modal={expanded}
          aria-labelledby={titleId}
        >
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border bg-muted px-4 py-3">
            <div className="min-w-0">
              <p
                id={titleId}
                className="font-heading text-sm tracking-[-0.5px] text-copper-base"
              >
                {t("title")}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                {t("subtitle")}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex h-8 w-8 items-center justify-center border border-border text-copper-base transition-colors hover:border-copper-base hover:bg-copper-base/10"
                aria-label={expanded ? t("exitFull") : t("fullView")}
              >
                {expanded ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center border border-border text-text-secondary transition-colors hover:border-copper-base hover:text-copper-base"
                aria-label={t("close")}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div
            ref={listRef}
            className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[92%] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "self-end bg-copper-base/20 px-3 py-2 text-text-primary"
                    : "self-start border border-border bg-muted px-3 py-2 text-text-secondary"
                }`}
              >
                {msg.text}
                {msg.role === "assistant" && msg.id !== "welcome" ? (
                  <p className="mt-2 text-[10px] text-text-muted">
                    <Link href="/contact" className="text-copper-base hover:underline">
                      Contact
                    </Link>
                  </p>
                ) : null}
              </div>
            ))}
            {busy ? (
              <p className="text-[11px] text-text-muted">{t("typing")}</p>
            ) : null}
          </div>

          {messages.length <= 1 ? (
            <div className="shrink-0 border-t border-border px-4 py-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                {t("suggested")}
              </p>
              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void ask(prompt)}
                    className="border border-border bg-muted px-2.5 py-1.5 text-left text-[11px] text-text-secondary transition-colors hover:border-copper-base hover:text-copper-base"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <form
            onSubmit={onSubmit}
            className="flex shrink-0 items-center gap-2 border-t border-border bg-card p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              className="h-11 min-w-0 flex-1 border border-border bg-background px-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-copper-base"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center bg-copper-gradient text-[#0a0a0a] disabled:opacity-40"
              aria-label={t("send")}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
