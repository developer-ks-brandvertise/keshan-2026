import type { Metadata } from "next";
import Image from "next/image";
import {
  about,
  visionMission,
  leadership,
  globalReach,
  milestones,
  intro,
} from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CopperHighlight from "@/components/ui/CopperHighlight";
import PageHero from "@/components/ui/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import TeamGrid from "@/components/about/TeamGrid";
import { ClientsSection } from "@/components/home/Clients";

export const metadata: Metadata = {
  title: "About Keshan Industries | Copper Manufacturer | Made in India",
  description:
    "Keshan Industries is a precision copper and brass manufacturer based in India, and one of the country's largest exporters of copper ingots. ISO 9001, ISO 14001 & ISO 45001 certified.",
};

const storySheet = [
  { label: "Model", value: "Manufacturing partner, not a commodity supplier" },
  { label: "Network", value: "Long-term partnerships with global metallurgical companies" },
  { label: "Plant", value: "Modern melting, rolling, and testing infrastructure" },
  { label: "Range", value: "Full copper & brass range to international specs" },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        label="About Keshan"
        title="Built on the Belief That Quality Is Not Negotiable."
        highlight="Quality Is Not Negotiable"
      />

      {/* 01 — Story */}
      <section className="relative overflow-hidden bg-dark-900 py-section px-gutter">
        <div
          className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(184,115,51,0.14),transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="lg:col-span-5">
            <div className="relative h-full min-h-[420px] overflow-hidden border border-copper-base/25 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:min-h-[480px] lg:min-h-[560px]">
              <Image
                src="https://res.cloudinary.com/p4nrvzvp/image/upload/v1786037495/About-Keshan-Image_kw1bkw.png"
                alt="Keshan facility"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
              <div className="absolute bottom-[5.25rem] left-5 right-5 sm:bottom-24">
                <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-copper-base">
                  Since 2019
                </p>
                <p className="mt-1 text-lg text-text-primary">
                  Precision copper. Made in India.
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 border-t border-copper-base/40 bg-dark-950/92">
                <div className="grid grid-cols-2 sm:grid-cols-4">
                  {intro.stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`px-3 py-3.5 text-center ${
                        i > 0 ? "border-l border-copper-base/25" : ""
                      }`}
                    >
                      <div className="font-heading text-lg text-copper-base">
                        {stat.value}
                      </div>
                      <div className="mt-0.5 line-clamp-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                        {stat.label.split(" ").slice(0, 2).join(" ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="flex flex-col justify-center lg:col-span-7">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
              01 — Company Story
            </span>
            <h2 className="text-h2">
              From a Single Conviction to a{" "}
              <CopperHighlight>Global Manufacturing Partner.</CopperHighlight>
            </h2>
            <p className="mt-6 whitespace-pre-line text-body-lg text-text-secondary">
              {about.body}
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {storySheet.map((row) => (
                <div
                  key={row.label}
                  className="group relative overflow-hidden border border-copper-base/20 bg-dark-950/80 p-5 transition-colors hover:border-copper-base/45"
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(184,115,51,0.2),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
                    {row.label}
                  </p>
                  <p className="mt-2 text-body-sm text-text-primary">{row.value}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 02 — Vision / Mission / Values */}
      <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-base/50 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <AnimatedSection className="relative overflow-hidden border border-copper-base/25 bg-dark-900 p-8 sm:p-10 lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
                02 — Vision
              </span>
              <h2 className="mt-4 text-h2">{visionMission.visionHeadline}</h2>
              <p className="mt-5 text-body-lg text-text-secondary">
                {visionMission.visionBody}
              </p>
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-copper-gradient opacity-80"
                aria-hidden
              />
            </AnimatedSection>

            <AnimatedSection
              delay={0.08}
              className="relative flex flex-col justify-center overflow-hidden border border-copper-base/25 bg-[linear-gradient(145deg,rgba(184,115,51,0.14),transparent_55%),#0a0a0a] p-8 sm:p-10 lg:col-span-7"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
                Mission
              </span>
              <p className="mt-6 font-heading text-2xl leading-snug text-text-primary sm:text-3xl lg:text-[2.1rem] lg:leading-[1.25]">
                {visionMission.missionStatement}
              </p>
              <div
                className="mt-8 h-px w-24 bg-copper-base/60"
                aria-hidden
              />
            </AnimatedSection>
          </div>

          {/* Values — stamped metal plates, not a numbered list */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visionMission.values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.05}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden border border-copper-base/20 bg-dark-900 p-6 transition-all duration-300 hover:border-copper-base/50 hover:shadow-[0_0_40px_rgba(184,115,51,0.12)] sm:p-7 ${
                    i === 0 ? "lg:col-span-1" : ""
                  }`}
                >
                  <span
                    className="pointer-events-none absolute -right-2 -top-4 font-heading text-7xl text-copper-base/[0.07] transition-colors group-hover:text-copper-base/15"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mb-4 h-1 w-10 bg-copper-gradient" />
                  <h3 className="text-xl text-text-primary">{value.title}</h3>
                  <p className="mt-3 flex-1 text-body-sm text-text-secondary">
                    {value.description}
                  </p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Partners / Clients */}
      <ClientsSection index="03" tone="dark-900" />

      {/* 04 — Leadership */}
      <section className="bg-dark-950 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 max-w-3xl">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
              04 — Leadership
            </span>
            <h2 className="text-h2">{leadership.headline}</h2>
            <p className="mt-5 text-body-lg text-text-secondary">
              {leadership.subheadline}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <TeamGrid />
          </AnimatedSection>
        </div>
      </section>

      {/* 05 — Global reach */}
      <section className="relative overflow-hidden bg-dark-900 py-section px-gutter">
        <div
          className="pointer-events-none absolute right-0 top-1/2 h-[520px] w-[520px] -translate-y-1/2 translate-x-1/4 rounded-full border border-copper-base/15 bg-[radial-gradient(circle,rgba(184,115,51,0.14),transparent_65%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <AnimatedSection className="mb-10 max-w-3xl">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
              05 — Global Reach
            </span>
            <h2 className="text-h2">{globalReach.headline}</h2>
            <p className="mt-5 text-body-lg text-text-secondary">
              {globalReach.body}
            </p>
          </AnimatedSection>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <AnimatedSection className="lg:col-span-7">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                Regions we supply
              </p>
              <div className="flex flex-wrap gap-3">
                {globalReach.regions.map((region) => (
                  <span
                    key={region}
                    className="inline-flex items-center gap-2 border border-copper-base/35 bg-dark-950/80 px-4 py-3 text-sm text-text-primary transition-all hover:border-copper-base hover:bg-copper-base/10 hover:shadow-[0_0_20px_rgba(184,115,51,0.15)]"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-copper-base"
                      aria-hidden
                    />
                    {region}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:col-span-5">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                Export capabilities
              </p>
              <div className="relative space-y-0 pl-6">
                <div
                  className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-copper-base via-copper-base/40 to-transparent"
                  aria-hidden
                />
                {globalReach.capabilities.map((capability) => (
                  <div key={capability} className="relative pb-6 last:pb-0">
                    <span
                      className="absolute -left-6 top-1.5 h-3 w-3 border border-copper-base bg-dark-900"
                      aria-hidden
                    />
                    <p className="text-body-sm text-text-primary">{capability}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 06 — Milestones — copper rail timeline */}
      <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-base/40 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 max-w-2xl">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
              06 — Milestones
            </span>
            <h2 className="text-h2">{milestones.headline}</h2>
          </AnimatedSection>

          <div className="relative">
            {/* Desktop copper rail */}
            <div
              className="absolute left-0 right-0 top-[2.25rem] hidden h-px bg-gradient-to-r from-copper-base/10 via-copper-base/60 to-copper-base/10 lg:block"
              aria-hidden
            />
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {milestones.events.map((event, index) => (
                <AnimatedSection key={event.year} delay={index * 0.07}>
                  <li className="group relative flex h-full flex-col border border-copper-base/20 bg-dark-900 p-6 pt-8 transition-colors hover:border-copper-base/50">
                    <span className="absolute left-6 top-0 -translate-y-1/2 flex h-9 w-9 items-center justify-center border border-copper-base bg-dark-950 font-heading text-[10px] text-copper-base shadow-[0_0_20px_rgba(184,115,51,0.25)] lg:left-1/2 lg:-translate-x-1/2">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-heading text-3xl text-copper-base">
                      {event.year}
                    </p>
                    <h3 className="mt-3 text-lg text-text-primary">{event.title}</h3>
                    <p className="mt-2 flex-1 text-body-sm text-text-secondary">
                      {event.description}
                    </p>
                  </li>
                </AnimatedSection>
              ))}
            </ol>
          </div>

          <AnimatedSection className="mt-12">
            <MagneticButton href="/contact" variant="primary">
              Work With Keshan
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
