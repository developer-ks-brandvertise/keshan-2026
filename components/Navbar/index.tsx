"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { navLinks, topBar } from "@/lib/data";
import Logo from "@/components/Logo";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-100/5 bg-dark-900/90 backdrop-blur-md">
      <div className="hidden border-b border-dark-100/5 lg:block">
        <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between px-4 xl:px-8">
          <div className="flex items-center gap-5 text-[11px] tracking-wide text-text-secondary">
            <a
              href={`tel:${topBar.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-copper-base"
            >
              <Phone className="h-3 w-3 text-copper-base" strokeWidth={2} />
              <span>{topBar.phone}</span>
            </a>
            <a
              href="mailto:sales.killp@keshanindustries.com"
              className="flex items-center gap-2 transition-colors hover:text-copper-base"
            >
              <Mail className="h-3 w-3 text-copper-base" strokeWidth={2} />
              <span>{topBar.email}</span>
            </a>
            <div className="hidden items-center gap-2 xl:flex">
              <MapPin className="h-3 w-3 text-copper-base" strokeWidth={2} />
              <span>{topBar.address}</span>
            </div>
          </div>
          <div className="text-[11px] tracking-wide text-text-muted">
            ISO 9001:2015 · ISO 14001:2015
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 xl:px-8">
        <Logo className="my-1.5 h-[4.25rem]" />

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`group relative flex items-center px-3.5 py-5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors xl:px-5 ${
                  active
                    ? "text-text-primary"
                    : "text-text-primary/65 hover:text-text-primary"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-3 left-3.5 right-3.5 h-px origin-left bg-copper-gradient transition-transform duration-300 xl:left-5 xl:right-5 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="group hidden h-11 items-center gap-2.5 bg-copper-gradient px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-dark-900 transition-all duration-300 hover:shadow-[0_0_24px_rgba(232,166,89,0.35)] lg:flex"
          >
            Request a Quote
            <span className="flex h-5 w-5 items-center justify-center border border-dark-900/25 transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center text-text-primary lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-dark-100/10 bg-dark-900 lg:hidden">
          <div className="mx-auto max-w-[1600px] px-4 py-4">
            <nav className="flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`border-b border-dark-100/10 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                      active
                        ? "text-copper-base"
                        : "text-text-primary hover:text-copper-base"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 bg-copper-gradient text-sm font-bold uppercase tracking-wide text-dark-900"
            >
              Request a Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
