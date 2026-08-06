"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { navLinks, topBar } from "@/lib/data";
import { getProductsByCategory } from "@/lib/products";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const copperProducts = getProductsByCategory("copper");
const brassProducts = getProductsByCategory("brass");

const productGroups = [
  { id: "copper" as const, labelKey: "copperProducts" as const, items: copperProducts },
  { id: "brass" as const, labelKey: "brassProducts" as const, items: brassProducts },
];

const navLabelKey: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/products": "products",
  "/industries": "industries",
  "/knowledge-centre": "knowledge",
  "/media-certificates": "media",
  "/contact": "contact",
};

function ProductsDropdown({
  active,
  pathname,
}: {
  active: boolean;
  pathname: string;
}) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => clearClose(), []);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`group relative flex items-center gap-1.5 px-3.5 py-5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors xl:px-4 ${
          active || open
            ? "text-text-primary"
            : "text-text-primary/65 hover:text-text-primary"
        }`}
      >
        {t("products")}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2.5}
        />
        <span
          className={`absolute bottom-3 left-3.5 right-3.5 h-px origin-left bg-copper-gradient transition-transform duration-300 ${
            active || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </button>

      {open ? (
        <div
          className="absolute left-1/2 top-full z-50 w-[min(92vw,560px)] -translate-x-1/2 pt-2"
          onMouseEnter={clearClose}
          onMouseLeave={scheduleClose}
        >
          <div className="border border-dark-100/10 bg-dark-900/95 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-dark-100/10 px-5 py-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-base">
                {t("productRange")}
              </p>
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-copper-base"
              >
                {t("viewAllProducts")} →
              </Link>
            </div>

            <div className="grid gap-0 sm:grid-cols-2">
              {productGroups.map((group, groupIndex) => (
                <div
                  key={group.id}
                  className={`px-5 py-4 ${
                    groupIndex > 0
                      ? "border-t border-dark-100/10 sm:border-l sm:border-t-0"
                      : ""
                  }`}
                >
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                    {t(group.labelKey)}
                  </p>
                  <ul className="space-y-0.5">
                    {group.items.map((product) => {
                      const href = `/products/${product.slug}` as const;
                      const itemActive = pathname === href;
                      return (
                        <li key={product.slug}>
                          <Link
                            href={href}
                            onClick={() => setOpen(false)}
                            className={`block px-2 py-2 text-[12px] transition-colors hover:bg-copper-base/[0.07] hover:text-copper-base ${
                              itemActive
                                ? "bg-copper-base/[0.07] text-copper-base"
                                : "text-text-secondary"
                            }`}
                          >
                            {product.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileProductsAccordion({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(() => pathname.startsWith("/products"));
  const productsActive = pathname.startsWith("/products");

  return (
    <div className="border-b border-dark-100/10">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
          productsActive ? "text-copper-base" : "text-text-primary"
        }`}
      >
        {t("products")}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="pb-4 pl-1">
          <Link
            href="/products"
            onClick={onNavigate}
            className={`mb-3 block text-xs font-bold uppercase tracking-[0.14em] ${
              pathname === "/products"
                ? "text-copper-base"
                : "text-text-muted hover:text-copper-base"
            }`}
          >
            {t("allProducts")}
          </Link>

          {productGroups.map((group) => (
            <div key={group.id} className="mb-4 last:mb-0">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base/80">
                {t(group.labelKey)}
              </p>
              <ul className="space-y-0.5 border-l border-dark-100/15 pl-3">
                {group.items.map((product) => {
                  const href = `/products/${product.slug}` as const;
                  const active = pathname === href;
                  return (
                    <li key={product.slug}>
                      <Link
                        href={href}
                        onClick={onNavigate}
                        className={`block py-1.5 text-sm transition-colors ${
                          active
                            ? "text-copper-base"
                            : "text-text-secondary hover:text-copper-base"
                        }`}
                      >
                        {product.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
          <div className="flex items-center gap-2 text-[11px] tracking-wide text-text-muted">
            <span className="hidden xl:inline">ISO 9001:2015 · ISO 14001:2015 · ISO 45001</span>
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 xl:px-8">
        <Logo className="my-1.5 h-[4.25rem]" />

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            if (link.href === "/products") {
              return (
                <ProductsDropdown
                  key={link.label}
                  active={isActive(pathname, "/products")}
                  pathname={pathname}
                />
              );
            }

            const active = isActive(pathname, link.href);
            const key = navLabelKey[link.href] ?? "home";
            return (
              <Link
                key={link.label}
                href={link.href as "/"}
                className={`group relative flex items-center px-3.5 py-5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors xl:px-4 ${
                  active
                    ? "text-text-primary"
                    : "text-text-primary/65 hover:text-text-primary"
                }`}
              >
                {t(key as "home")}
                <span
                  className={`absolute bottom-3 left-3.5 right-3.5 h-px origin-left bg-copper-gradient transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 lg:hidden">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
          <Link
            href="/contact"
            className="group hidden h-11 items-center gap-2.5 bg-copper-gradient px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-dark-900 transition-all duration-300 hover:shadow-[0_0_24px_rgba(232,166,89,0.35)] lg:flex"
          >
            {t("requestQuote")}
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
                if (link.href === "/products") {
                  return (
                    <MobileProductsAccordion
                      key={link.label}
                      pathname={pathname}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  );
                }

                const active = isActive(pathname, link.href);
                const key = navLabelKey[link.href] ?? "home";
                return (
                  <Link
                    key={link.label}
                    href={link.href as "/"}
                    onClick={() => setMobileOpen(false)}
                    className={`border-b border-dark-100/10 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                      active
                        ? "text-copper-base"
                        : "text-text-primary hover:text-copper-base"
                    }`}
                  >
                    {t(key as "home")}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 bg-copper-gradient text-sm font-bold uppercase tracking-wide text-dark-900"
            >
              {t("requestQuote")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
