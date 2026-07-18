"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { footer, contact, navLinks } from "@/lib/data";
import Container from "@/components/ui/Container";
import Logo from "@/components/Logo";

const socials = [
  {
    name: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "Twitter",
    path: "M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 8v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  },
  {
    name: "Instagram",
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M7.5 3h9a4.5 4.5 0 0 1 4.5 4.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3z",
  },
  {
    name: "Linkedin",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark-950 text-text-primary">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-copper-base/15 via-copper-dark/5 to-transparent"
        aria-hidden
      />
      <p
        className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 select-none font-heading text-[18vw] font-medium leading-none tracking-tighter text-dark-100/[0.04] whitespace-nowrap lg:bottom-20 lg:text-[12rem]"
        aria-hidden
      >
        KESHAN
      </p>

      <Container className="relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="my-2 h-[4.8rem]" />
            <p className="mt-6 max-w-sm text-body-sm leading-relaxed text-text-secondary">
              {footer.description}
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center border border-dark-100/10 text-text-secondary transition-colors hover:border-copper-base hover:text-copper-base"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-body-sm text-text-secondary">
              <li className="max-w-xs">{contact.address}</li>
              <li>{contact.phones.join(" / ")}</li>
              <li>{contact.emails.join(" / ")}</li>
              <li>{contact.hours}</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">
              Navigate
            </h4>
            <ul className="mt-5 space-y-2.5 text-body-sm text-text-secondary">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 transition-colors hover:text-copper-base"
                  >
                    <ArrowRight className="h-3 w-3 text-copper-base/70" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">
              Stay informed
            </h4>
            <p className="mt-5 text-body-sm text-text-secondary">
              Market updates and technical notes from the Keshan team.
            </p>
            <form className="mt-5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex border border-dark-100/15 focus-within:border-copper-base/50">
                <input
                  type="email"
                  placeholder="Email address"
                  className="h-12 min-w-0 flex-1 bg-transparent px-4 text-sm text-text-primary placeholder:text-text-muted outline-none"
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 bg-copper-gradient px-4 text-xs font-bold uppercase tracking-wide text-dark-900 transition-opacity hover:opacity-90"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>

      <div className="relative z-10 border-t border-dark-100/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-text-secondary sm:flex-row">
          <p>
            Copyright © 2026{" "}
            <Link href="/" className="text-copper-base hover:underline">
              Keshan Industries
            </Link>
            . All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text-primary">
              Privacy policy
            </a>
            <a href="#" className="hover:text-text-primary">
              Terms of use
            </a>
            <a href="#" className="hover:text-text-primary">
              Site map
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
