import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, FileText } from "lucide-react";
import { products, getProductBySlug } from "@/lib/products";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageHero from "@/components/ui/PageHero";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.metaTitle,
    description: product.metaDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const siblings = products.filter((p) => p.category === product.category);
  const currentIndex = siblings.findIndex((p) => p.slug === slug);
  const prev = siblings[currentIndex - 1];
  const next = siblings[currentIndex + 1];

  const infoRows = [
    {
      label: "Category",
      value: product.category.charAt(0).toUpperCase() + product.category.slice(1),
    },
    { label: "Purity", value: "99.5% – 99.99%" },
    { label: "Standards", value: "IS, ASTM, EN, JIS" },
    { label: "Origin", value: "Made in India" },
  ];

  return (
    <main>
      <PageHero
        label={product.category}
        title={product.name}
        description={product.headline}
      />

      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <AnimatedSection className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                    Product sheet
                  </p>
                  <div className="border-t border-copper-base/30">
                    {infoRows.map((row) => (
                      <div
                        key={row.label}
                        className="grid grid-cols-[100px_1fr] gap-3 border-b border-dark-100/10 py-3.5"
                      >
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
                          {row.label}
                        </span>
                        <span className="text-body-sm text-text-primary">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                    Downloads
                  </p>
                  <div className="space-y-2">
                    {["Product Datasheet", "Quality Certificate"].map((label) => (
                      <button
                        key={label}
                        type="button"
                        className="flex w-full items-center justify-between border border-dark-100/15 px-4 py-3.5 text-left text-sm text-text-primary transition-colors hover:border-copper-base hover:text-copper-base"
                      >
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-copper-base" />
                          {label}
                        </span>
                        <Download className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2.5 bg-copper-gradient text-[11px] font-bold uppercase tracking-[0.12em] text-dark-900 transition-all hover:shadow-[0_0_24px_rgba(232,166,89,0.35)]"
                >
                  {product.cta}
                  <span className="flex h-5 w-5 items-center justify-center border border-dark-900/30 transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:col-span-8 space-y-12">
              <div>
                <h2 className="text-h3">Product Overview</h2>
                <p className="mt-4 text-body-lg text-text-secondary">
                  {product.description}
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Applications
                </h3>
                <div className="border-t border-copper-base/30">
                  {product.applications.map((item, i) => (
                    <div
                      key={item}
                      className="grid grid-cols-[48px_1fr] gap-4 border-b border-dark-100/10 py-3.5"
                    >
                      <span className="font-heading text-xs tracking-[0.16em] text-copper-base">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-body-sm text-text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Technical Specifications — Ranges / Types
                </h3>
                <div className="overflow-hidden border border-copper-base/25">
                  <div className="grid grid-cols-[140px_1fr] border-b border-copper-base/30 bg-copper-base/15 sm:grid-cols-[180px_1fr]">
                    <span className="border-r border-copper-base/25 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-copper-base">
                      Product
                    </span>
                    <span className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-copper-base">
                      Specification — Ranges / Types
                    </span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr]">
                    <div className="border-r border-dark-100/10 bg-dark-950/60 px-4 py-4 text-sm font-semibold text-text-primary">
                      {product.name}
                    </div>
                    <ul className="space-y-2.5 px-4 py-4">
                      {product.specs.map((spec) => (
                        <li
                          key={spec}
                          className="flex gap-2.5 text-body-sm text-text-secondary"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper-base"
                            aria-hidden
                          />
                          <span className="text-text-primary">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-copper-base pl-6">
                <h3 className="text-h3">Why Source From Keshan?</h3>
                <p className="mt-3 text-body text-text-secondary">
                  Every batch is traceable, every certificate is verifiable, and
                  every delivery is backed by our technical team. We support
                  custom dimensions, international standards, and complete export
                  documentation.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-copper-base/25 pt-8 sm:flex-row sm:items-center">
            {prev ? (
              <Link
                href={`/products/${prev.slug}`}
                className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-text-primary transition-colors hover:text-copper-base"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {prev.name}
              </Link>
            ) : (
              <span />
            )}
            <Link
              href="/products"
              className="text-xs font-bold uppercase tracking-[0.14em] text-copper-base"
            >
              All Products
            </Link>
            {next ? (
              <Link
                href={`/products/${next.slug}`}
                className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-text-primary transition-colors hover:text-copper-base"
              >
                {next.name}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
