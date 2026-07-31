"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
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
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

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
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center bg-copper-gradient text-dark-900 shadow-[0_0_28px_rgba(232,166,89,0.35)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-base lg:bottom-8 lg:right-8"
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open ? (
        <div
          className="fixed bottom-24 right-4 z-[60] flex w-[min(100%-2rem,380px)] flex-col border border-copper-base/30 bg-dark-950 shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:right-6 lg:bottom-28 lg:right-8"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
        >
          <div className="border-b border-copper-base/25 bg-copper-base/10 px-4 py-3">
            <p
              id={titleId}
              className="font-heading text-sm tracking-[-1px] text-copper-base"
            >
              {t("title")}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              {t("subtitle")}
            </p>
          </div>

          <div ref={listRef} className="flex max-h-[42vh] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[92%] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "self-end bg-copper-base/20 px-3 py-2 text-text-primary"
                    : "self-start border border-dark-100/10 bg-dark-900 px-3 py-2 text-text-secondary"
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
            <div className="border-t border-dark-100/10 px-4 py-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                {t("suggested")}
              </p>
              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void ask(prompt)}
                    className="border border-dark-100/15 px-2.5 py-1.5 text-left text-[11px] text-text-secondary transition-colors hover:border-copper-base hover:text-copper-base"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-dark-100/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              className="h-11 min-w-0 flex-1 border border-dark-100/15 bg-dark-900 px-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-copper-base"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center bg-copper-gradient text-dark-900 disabled:opacity-40"
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
