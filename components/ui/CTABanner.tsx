import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Container from "./Container";

interface CTABannerProps {
  headline: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
  };
}

export default function CTABanner({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  contact,
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/bg-contact1.jpg')" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-base/10 blur-[160px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatedSection>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-copper-base">
              Start a Conversation
            </span>
            <h2>
              {headline}
            </h2>
            {subheadline && (
              <p className="mt-5 max-w-xl text-body-lg text-text-secondary">{subheadline}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="group inline-flex h-14 items-center gap-3 bg-copper-gradient px-7 text-sm font-bold uppercase tracking-wider text-dark-900 transition-all duration-300 hover:shadow-[0_0_40px_rgba(232,166,89,0.35)]"
                >
                  {primaryCta.label}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-dark-900/30 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="group inline-flex h-14 items-center gap-3 border border-dark-100/20 px-7 text-sm font-bold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-copper-base hover:text-copper-base"
                >
                  {secondaryCta.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              )}
            </div>
          </AnimatedSection>

          {contact && (
            <AnimatedSection delay={0.15} className="lg:pl-8">
              <div className="border border-dark-100/10 bg-dark-950 p-6 lg:p-8">
                <h3 className="text-h3">
                  Contact Information
                </h3>
                <div className="mt-6 space-y-4 text-body-sm text-text-secondary">
                  {contact.address && <p>{contact.address}</p>}
                  {contact.phone && (
                    <p>
                      <span className="text-text-primary">Phone:</span> {contact.phone}
                    </p>
                  )}
                  {contact.email && (
                    <p>
                      <span className="text-text-primary">Email:</span> {contact.email}
                    </p>
                  )}
                  {contact.hours && (
                    <p>
                      <span className="text-text-primary">Hours:</span> {contact.hours}
                    </p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
