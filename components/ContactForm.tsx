"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      product: String(data.get("product") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setState("error");
      setError("Name, email, and message are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setState("error");
      setError("Enter a valid email address.");
      return;
    }

    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
      setError(
        "Could not send right now. Email sales.killp@keshanindustries.com directly.",
      );
    }
  }

  if (state === "success") {
    return (
      <div className="border border-copper-base/30 bg-dark-950 p-8 text-center lg:p-10">
        <CheckCircle2 className="mx-auto h-10 w-10 text-copper-base" />
        <h2 className="mt-4 text-h3">Inquiry received</h2>
        <p className="mx-auto mt-3 max-w-md text-body text-text-secondary">
          Our team will respond within 24 business hours with availability,
          pricing, and lead time.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-copper-base"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const fieldClass =
    "h-12 w-full border border-dark-100/15 bg-dark-900 px-4 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-copper-base";

  return (
    <form
      className="border border-copper-base/25 bg-dark-950 p-6 lg:p-8"
      onSubmit={onSubmit}
      noValidate
    >
      <h2 className="text-h3">Send an Inquiry</h2>
      <p className="mt-2 text-body-sm text-text-secondary">
        Specification, quantity, and delivery terms help us reply faster.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Full Name *
          </label>
          <input id="name" name="name" type="text" required placeholder="John Smith" className={fieldClass} />
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Company
          </label>
          <input id="company" name="company" type="text" placeholder="Company name" className={fieldClass} />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Email *
          </label>
          <input id="email" name="email" type="email" required placeholder="email@company.com" className={fieldClass} />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" placeholder="+1 234 567 890" className={fieldClass} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="product" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Product / Requirement
          </label>
          <input
            id="product"
            name="product"
            type="text"
            placeholder="e.g. Copper busbars, Cu-ETP, custom dimensions"
            className={fieldClass}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Tell us your specifications, quantities, delivery terms, and any standards required."
            className="w-full border border-dark-100/15 bg-dark-900 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-copper-base"
          />
        </div>
      </div>

      {state === "error" && error ? (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 bg-copper-gradient text-[11px] font-bold uppercase tracking-[0.12em] text-dark-900 transition-all hover:shadow-[0_0_24px_rgba(232,166,89,0.35)] disabled:opacity-60"
      >
        {state === "submitting" ? "Sending…" : "Submit Inquiry"}
        <span className="flex h-5 w-5 items-center justify-center border border-dark-900/30 transition-transform group-hover:rotate-45">
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </span>
      </button>
    </form>
  );
}
