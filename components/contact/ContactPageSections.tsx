"use client";

import {
  Anchor,
  FileCheck,
  Globe2,
  MapPin,
  Ship,
} from "lucide-react";
import { brand, contact, globalReach } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { IconFeatureCard } from "@/components/ui/IconFeatureCard";

const capabilityIcons = [Ship, FileCheck, Anchor, Globe2, MapPin];

const dispatchRows = [
  {
    label: "Office",
    value: contact.locations[0].address,
  },
  {
    label: "Phone",
    value: contact.phones.join(" | "),
    href: `tel:${contact.phones[0].replace(/\s/g, "")}`,
  },
  {
    label: "Email",
    value: contact.emails.join(" | "),
  },
  {
    label: "Hours",
    value: contact.hours,
  },
];

export function ContactPageSections() {
  return (
    <>
      <section className="relative overflow-hidden bg-dark-900 py-section px-gutter">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(202,94,46,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <AnimatedSection className="lg:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-copper-base">
                Dispatch Label
              </p>

              <div className="relative mt-4 border border-copper-base/40 bg-dark-950">
                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(90deg,#ca5e2e_0,#ca5e2e_12px,transparent_12px,transparent_20px)] opacity-80"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute bottom-0 left-0 top-0 w-px border-l border-dashed border-copper-base/50"
                  aria-hidden
                />

                <div className="border-b border-copper-base/25 px-6 py-5 pl-8">
                  <p className="font-heading text-lg tracking-[0.08em] text-copper-base">
                    {brand.name.toUpperCase()}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-text-muted">
                    Export · Domestic · Technical
                  </p>
                </div>

                <div className="divide-y divide-copper-base/20">
                  {dispatchRows.map((row) => (
                    <div key={row.label} className="px-6 py-4 pl-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
                        {row.label}
                      </p>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="mt-2 block text-body-sm leading-relaxed text-text-primary transition-colors hover:text-copper-base"
                        >
                          {row.value}
                        </a>
                      ) : row.label === "Email" ? (
                        <p className="mt-2 text-body-sm leading-relaxed text-text-primary">
                          {contact.emails.map((email, i) => (
                            <span key={email}>
                              {i > 0 ? (
                                <span className="text-text-muted"> | </span>
                              ) : null}
                              <a
                                href={`mailto:${email}`}
                                className="transition-colors hover:text-copper-base"
                              >
                                {email}
                              </a>
                            </span>
                          ))}
                        </p>
                      ) : (
                        <p className="mt-2 text-body-sm leading-relaxed text-text-primary">
                          {row.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-body-sm text-text-secondary">
                Prefer email? Write to{" "}
                <a
                  href={`mailto:${contact.emails[0]}`}
                  className="text-copper-base transition-colors hover:text-copper-light"
                >
                  {contact.emails[0]}
                </a>
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-copper-base">
                Inquiry Form
              </p>
              <div className="relative mt-4 overflow-hidden border border-copper-base/35 bg-dark-950">
                <div className="h-1 w-full bg-copper-gradient" aria-hidden />
                <div className="p-6 sm:p-8">
                  <h2 className="text-h3">Send an Inquiry</h2>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    Specification, quantity, and delivery terms help us reply faster.
                  </p>
                  <ContactForm embedded />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-base/40 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-copper-base">
              Global Reach
            </p>
            <h2 className="mt-3 text-h2">{globalReach.headline}</h2>
            <p className="mt-5 text-body-lg text-text-secondary">{globalReach.body}</p>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {globalReach.regions.map((region, i) => (
              <AnimatedSection key={region} delay={Math.min(i * 0.05, 0.2)}>
                <IconFeatureCard
                  icon={Globe2}
                  title={region}
                  description="Active supply routes and distributor partnerships."
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.12} className="mt-10">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {globalReach.capabilities.map((capability, i) => {
                const Icon = capabilityIcons[i % capabilityIcons.length];
                return (
                  <li
                    key={capability}
                    className="flex items-start gap-3 border border-copper-base/20 bg-dark-900 px-4 py-3.5"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-copper-base/40 bg-copper-base/10 text-copper-base">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-body-sm text-text-primary">{capability}</span>
                  </li>
                );
              })}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-10">
            <h2 className="text-h2">Our Locations</h2>
            <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">
              Corporate office and manufacturing units across Telangana.
            </p>
          </AnimatedSection>
          <div className="grid gap-8 lg:grid-cols-3">
            {contact.locations.map((location, index) => (
              <AnimatedSection key={location.label} delay={Math.min(index * 0.06, 0.18)}>
                <article className="overflow-hidden border border-copper-base/25 bg-dark-950">
                  <div className="flex items-center gap-2 border-b border-copper-base/25 px-4 py-3">
                    <MapPin className="h-4 w-4 text-copper-base" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
                      {location.label}
                    </p>
                  </div>
                  <p className="px-4 py-4 text-body-sm text-text-primary">{location.address}</p>
                  <iframe
                    title={`${location.label} map`}
                    src={location.mapEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-56 w-full border-0"
                  />
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
