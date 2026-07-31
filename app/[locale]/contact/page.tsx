import type { Metadata } from "next";
import { contact } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact Keshan Industries | Request a Quote | Copper & Brass Manufacturer",
  description:
    "Get in touch with Keshan Industries for copper and brass product inquiries, quotes, and export support. Hyderabad, India.",
};

const infoRows = [
  { label: "Address", value: contact.address },
  { label: "Phone", value: contact.phones.join(" / ") },
  { label: "Email", value: contact.emails.join(" | ") },
  { label: "Hours", value: contact.hours },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Contact"
        title="Request a Quote or Speak to Our Team."
        highlight="Request a Quote"
        description="Tell us your specification, quantity, and delivery terms. Our team will respond within 24 business hours with product availability, pricing, and lead time."
      />

      <section className="relative overflow-hidden bg-dark-900 py-section px-gutter">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(184,115,51,0.12),transparent_45%)]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-14">
          <AnimatedSection className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                Dispatch label
              </p>
              <div className="relative border border-copper-base/35 bg-dark-950">
                <div
                  className="pointer-events-none absolute -left-px top-8 h-16 w-2 bg-[repeating-linear-gradient(180deg,#b87333_0_4px,transparent_4px_8px)]"
                  aria-hidden
                />
                <div className="border-b border-copper-base/30 bg-copper-base/10 px-5 py-3.5">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-copper-base">
                    Keshan Industries
                  </span>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-text-muted">
                    Export · Domestic · Technical
                  </p>
                </div>
                {infoRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[72px_1fr] gap-3 border-b border-dark-100/10 px-5 py-4 last:border-b-0"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
                      {row.label}
                    </span>
                    <span className="text-body-sm text-text-primary">{row.value}</span>
                  </div>
                ))}
                <div className="flex h-2 w-full overflow-hidden border-t border-copper-base/20">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-full flex-1 ${
                        i % 3 === 0 ? "bg-copper-base/45" : "bg-copper-base/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-5 text-body-sm text-text-secondary">
                Prefer email? Write to{" "}
                <a
                  href={`mailto:${contact.emails[0]}`}
                  className="text-copper-base underline-offset-2 hover:underline"
                >
                  {contact.emails[0]}
                </a>
                {" | "}
                <a
                  href={`mailto:${contact.emails[1]}`}
                  className="text-copper-base underline-offset-2 hover:underline"
                >
                  {contact.emails[1]}
                </a>
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-8">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              Inquiry form
            </p>
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
