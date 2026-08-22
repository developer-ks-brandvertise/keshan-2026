import Link from "next/link";
import { footer, contact, navLinks, intro } from "@/lib/data";
import { getProductsByCategory } from "@/lib/products";
import Container from "@/components/ui/Container";
import Logo from "@/components/Logo";

const copperProducts = getProductsByCategory("copper");
const brassProducts = getProductsByCategory("brass");

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark-950 text-text-primary">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-base/40 to-transparent"
        aria-hidden
      />

      <Container className="relative z-10 py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5">
            <Logo className="my-2 h-[4.8rem]" />
            <p className="mt-5 max-w-md text-body-sm leading-relaxed text-text-secondary">
              {footer.description}
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-copper-base/20 pt-5">
              {intro.stats.slice(1, 4).map((stat) => (
                <div key={stat.label}>
                  <dt className="font-heading text-lg text-copper-base sm:text-xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-[11px] leading-snug text-text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">
              Company
            </h4>
            <ul className="mt-4 columns-2 gap-x-6 space-y-2 text-sm text-text-secondary">
              {navLinks.map((link) => (
                <li key={link.label} className="break-inside-avoid">
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-copper-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>{contact.phones.join(" / ")}</li>
              <li className="break-all">{contact.emails.join(" | ")}</li>
              <li>{contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-4 border-t border-dark-100/10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {contact.locations.map((location) => (
            <div
              key={location.label}
              className="border border-copper-base/20 bg-dark-900/60 p-4"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-copper-base">
                {location.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-primary/90">
                {location.address}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 border-t border-dark-100/10 pt-8 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-copper-base">
              Copper
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary">
              {copperProducts.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="transition-colors hover:text-copper-base"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-copper-base">
              Brass
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary">
              {brassProducts.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="transition-colors hover:text-copper-base"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
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
            <Link href="/" className="hover:text-text-primary">
              Site map
            </Link>
            <Link href="/contact" className="hover:text-text-primary">
              Contact
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
