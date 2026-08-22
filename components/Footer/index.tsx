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

      <Container className="relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo className="my-2 h-[4.8rem]" />
            <p className="mt-6 max-w-sm text-body-sm leading-relaxed text-text-secondary">
              {footer.description}
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-copper-base/20 pt-6">
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
              Products
            </h4>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-copper-base">
                  Copper
                </p>
                <ul className="mt-3 space-y-2 text-body-sm text-text-secondary">
                  {copperProducts.slice(0, 8).map((product) => (
                    <li key={product.slug}>
                      <Link
                        href={`/products/${product.slug}`}
                        className="transition-colors hover:text-copper-base"
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/products#copper"
                      className="text-copper-base hover:text-copper-bright"
                    >
                      All copper
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-copper-base">
                  Brass
                </p>
                <ul className="mt-3 space-y-2 text-body-sm text-text-secondary">
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
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">
              Company
            </h4>
            <ul className="mt-5 space-y-2.5 text-body-sm text-text-secondary">
              {navLinks.map((link) => (
                <li key={link.label}>
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

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">
              Locations
            </h4>
            <ul className="mt-5 space-y-5 text-body-sm text-text-secondary">
              {contact.locations.map((location) => (
                <li key={location.label}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-copper-base">
                    {location.label}
                  </p>
                  <p className="mt-1.5 leading-relaxed text-text-primary/85">
                    {location.address}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-dark-100/10 pt-5">
              <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">
                Contact
              </h4>
              <ul className="mt-3 space-y-2 text-body-sm text-text-secondary">
                <li>{contact.phones.join(" / ")}</li>
                <li>{contact.emails.join(" | ")}</li>
                <li>{contact.hours}</li>
              </ul>
            </div>
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
