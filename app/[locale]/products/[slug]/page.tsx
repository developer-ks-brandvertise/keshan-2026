import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  products,
  getProductBySlug,
  productIndustriesMap,
  scrapGrades,
} from "@/lib/products";
import { brassHeaderImage, copperHeaderImage } from "@/lib/data";
import { Link, routing } from "@/i18n/routing";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageHero from "@/components/ui/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrapGradeCards } from "@/components/products/ScrapGradeCards";

interface ProductPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return products.flatMap((product) =>
    routing.locales.map((locale) => ({
      slug: product.slug,
      locale,
    })),
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  const t = await getTranslations({ locale });
  return {
    title: `${t(`catalog.${product.slug}.name`)} | Keshan Industries`,
    description: t(`catalog.${product.slug}.headline`),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  if (slug === "copper-1kg-bars" || slug === "copper-5kg-biscuits") {
    redirect(`/${locale}/products/copper-bar-1kg-5kg`);
  }
  if (slug === "copper-anodes") {
    redirect(`/${locale}/products/copper-anode-plates`);
  }
  const product = getProductBySlug(slug);
  if (!product) return notFound();
  const t = await getTranslations();
  const tp = await getTranslations("productsPage");
  const name = t(`catalog.${product.slug}.name`);
  const headline = t(`catalog.${product.slug}.headline`);
  const description = t(`catalog.${product.slug}.description`);
  const applications = t.raw(`catalog.${product.slug}.applications`) as string[];
  const industriesBlock = productIndustriesMap[product.slug];
  const gradeRows = scrapGrades[product.slug];

  const siblings = products.filter((p) => p.category === product.category);
  const currentIndex = siblings.findIndex((p) => p.slug === slug);
  const prev = siblings[currentIndex - 1];
  const next = siblings[currentIndex + 1];

  const infoRows = [
    {
      label: tp("category"),
      value: product.category === "copper" ? tp("copperLabel") : tp("brassLabel"),
    },
    { label: tp("purity"), value: "99.5% – 99.99%" },
    { label: tp("standards"), value: "IS, ASTM, EN, JIS" },
    { label: tp("origin"), value: tp("originValue") },
  ];

  return (
    <main>
      <PageHero
        label={product.category === "copper" ? tp("copperLabel") : tp("brassLabel")}
        title={name}
        description={headline}
        backgroundImage={
          product.category === "copper"
            ? copperHeaderImage
            : product.category === "brass"
              ? brassHeaderImage
              : undefined
        }
        backgroundPriority
      />

      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <AnimatedSection className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                    {tp("sheet")}
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

                <MagneticButton
                  href={`/contact?product=${encodeURIComponent(name)}`}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {tp("requestQuote")}
                </MagneticButton>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:col-span-8 space-y-12">
              {product.imageSrc ? (
                <div className="relative aspect-[16/10] overflow-hidden border border-copper-base/25 bg-dark-950">
                  <Image
                    src={product.imageSrc}
                    alt={name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : null}

              <div>
                <h2 className="text-h3">{tp("overview")}</h2>
                <p className="mt-4 text-body-lg text-text-secondary">
                  {description}
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {tp("applications")}
                </h3>
                <div className="border-t border-copper-base/30">
                  {applications.map((item, i) => (
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
                  {tp("industries")}
                </h3>
                {industriesBlock?.industries?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {industriesBlock.industries.map((industry) => (
                      <span
                        key={industry}
                        className="inline-flex border border-copper-base/30 bg-dark-950 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-primary"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                ) : null}
                {industriesBlock?.note ? (
                  <p className="mt-3 border-l-2 border-copper-base pl-3 text-body-sm text-text-secondary">
                    {industriesBlock.note}
                  </p>
                ) : null}
              </div>

              {gradeRows?.length ? (
                <div>
                  <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                    {tp("scrapGrades")}
                  </h3>
                  <ScrapGradeCards items={gradeRows} />
                </div>
              ) : null}

              <div>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {tp("specs")}
                </h3>
                <div className="overflow-hidden border border-copper-base/25">
                  <div className="grid grid-cols-[140px_1fr] border-b border-copper-base/30 bg-copper-base/15 sm:grid-cols-[180px_1fr]">
                    <span className="border-r border-copper-base/25 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-copper-base">
                      {tp("specProduct")}
                    </span>
                    <span className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-copper-base">
                      {tp("specRanges")}
                    </span>
                  </div>
                  {(product.specGroups?.length
                    ? product.specGroups
                    : [{ label: name, items: product.specs }]
                  ).map((group, groupIndex, groups) => (
                    <div
                      key={group.label}
                      className={`grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] ${
                        groupIndex < groups.length - 1
                          ? "border-b border-dark-100/10"
                          : ""
                      }`}
                    >
                      <div className="border-r border-dark-100/10 bg-dark-950/60 px-4 py-4 text-sm font-semibold text-text-primary">
                        {group.label}
                      </div>
                      <ul className="space-y-2.5 px-4 py-4">
                        {group.items.map((spec) => (
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
                  ))}
                </div>
              </div>

              <div className="border-l-2 border-copper-base pl-6">
                <h3 className="text-h3">{tp("whyTitle")}</h3>
                <p className="mt-3 text-body text-text-secondary">
                  {tp("whyBody")}
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
                {t(`catalog.${prev.slug}.name`)}
              </Link>
            ) : (
              <span />
            )}
            <Link
              href="/products"
              className="text-xs font-bold uppercase tracking-[0.14em] text-copper-base"
            >
              {tp("allProducts")}
            </Link>
            {next ? (
              <Link
                href={`/products/${next.slug}`}
                className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-text-primary transition-colors hover:text-copper-base"
              >
                {t(`catalog.${next.slug}.name`)}
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
