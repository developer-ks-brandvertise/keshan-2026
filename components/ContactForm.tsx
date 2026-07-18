"use client";

import { ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  return (
    <form
      className="border border-copper-base/25 bg-dark-950 p-6 lg:p-8"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-h3">Send an Inquiry</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Smith"
            className="h-12 w-full border border-dark-100/15 bg-dark-900 px-4 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-copper-base"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Company
          </label>
          <input
            type="text"
            placeholder="Company name"
            className="h-12 w-full border border-dark-100/15 bg-dark-900 px-4 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-copper-base"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Email
          </label>
          <input
            type="email"
            placeholder="email@company.com"
            className="h-12 w-full border border-dark-100/15 bg-dark-900 px-4 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-copper-base"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Phone
          </label>
          <input
            type="tel"
            placeholder="+1 234 567 890"
            className="h-12 w-full border border-dark-100/15 bg-dark-900 px-4 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-copper-base"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Product / Requirement
          </label>
          <input
            type="text"
            placeholder="e.g. Copper busbars, Cu-ETP, custom dimensions"
            className="h-12 w-full border border-dark-100/15 bg-dark-900 px-4 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-copper-base"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
            Message
          </label>
          <textarea
            rows={4}
            placeholder="Tell us your specifications, quantities, delivery terms, and any standards required."
            className="w-full border border-dark-100/15 bg-dark-900 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-copper-base"
          />
        </div>
      </div>
      <button
        type="submit"
        className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 bg-copper-gradient text-[11px] font-bold uppercase tracking-[0.12em] text-dark-900 transition-all hover:shadow-[0_0_24px_rgba(232,166,89,0.35)]"
      >
        Submit Inquiry
        <span className="flex h-5 w-5 items-center justify-center border border-dark-900/30 transition-transform group-hover:rotate-45">
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </span>
      </button>
    </form>
  );
}
