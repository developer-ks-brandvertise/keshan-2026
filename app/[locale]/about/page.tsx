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

export const metadata: Metadata = {
  title: "About Keshan Industries | Copper Manufacturer | Made in India",
  description:
    "Keshan Industries is a precision copper and brass manufacturer based in India, and one of the country's largest exporters of copper ingots. ISO 9001 & ISO 14001 certified.",
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

      {/* Story */}
      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="lg:col-span-5">
            <div className="relative overflow-hidden border border-copper-base/20">
              <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[3/4]">
                <Image
                  src="/images/img-machining1.jpg"
                  alt="Keshan facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />
                <div className="absolute left-4 top-4 border border-copper-base/40 bg-dark-950/80 px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-base">
                    Plant · Hyderabad
                  </span>
                </div>
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
            <div className="mt-8 border-t border-copper-base/30">
              {storySheet.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[88px_1fr] gap-4 border-b border-dark-100/10 py-3.5 sm:grid-cols-[110px_1fr]"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-base">
                    {row.label}
                  </span>
                  <span className="text-body-sm text-text-primary">{row.value}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="bg-dark-950 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 border-b border-dark-100/10 pb-14 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection>
              <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
                02 — Vision
              </span>
              <h2 className="text-h2">{visionMission.visionHeadline}</h2>
              <p className="mt-5 text-body-lg text-text-secondary">
                {visionMission.visionBody}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
                Mission
              </span>
              <blockquote className="border-l-2 border-copper-base pl-6">
                <p className="font-heading text-xl leading-relaxed text-text-primary sm:text-2xl">
                  {visionMission.missionStatement}
                </p>
              </blockquote>
            </AnimatedSection>
          </div>

          <div className="mt-12 border-t border-copper-base/30">
            {visionMission.values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.04}>
                <div className="grid grid-cols-[48px_1fr] gap-4 border-b border-dark-100/10 py-6 sm:grid-cols-[64px_200px_1fr] sm:gap-8">
                  <span className="font-heading text-xs tracking-[0.2em] text-copper-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg text-text-primary sm:text-xl">{value.title}</h3>
                  <p className="text-body-sm text-text-secondary sm:pt-1">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership — editorial rows */}
      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 max-w-3xl">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
              03 — Leadership
            </span>
            <h2 className="text-h2">{leadership.headline}</h2>
            <p className="mt-5 text-body-lg text-text-secondary">
              {leadership.subheadline}
            </p>
          </AnimatedSection>

          <div className="border-t border-copper-base/30">
            {leadership.team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.05}>
                <article className="group grid gap-5 border-b border-dark-100/10 py-8 sm:grid-cols-[96px_1fr_auto] sm:gap-8">
                  <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden border border-copper-base/40 bg-[radial-gradient(circle_at_30%_20%,rgba(184,115,51,0.35),transparent_60%),linear-gradient(160deg,#1a120c,#0a0a0a)] font-heading text-3xl text-copper-base transition-colors group-hover:border-copper-base">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl text-text-primary sm:text-2xl">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-base">
                      {member.title}
                    </p>
                    <p className="mt-3 max-w-2xl text-body-sm text-text-secondary">
                      {member.bio}
                    </p>
                  </div>
                  <a
                    href={member.linkedIn}
                    className="self-start text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-copper-base sm:self-center"
                  >
                    LinkedIn →
                  </a>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Global reach */}
      <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
        <div
          className="pointer-events-none absolute right-0 top-1/2 h-[480px] w-[480px] -translate-y-1/2 translate-x-1/4 rounded-full border border-copper-base/20 bg-[radial-gradient(circle,rgba(184,115,51,0.12),transparent_65%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
                04 — Global Reach
              </span>
              <h2 className="text-h2">{globalReach.headline}</h2>
              <p className="mt-5 text-body-lg text-text-secondary">
                {globalReach.body}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-px border border-copper-base/30 bg-copper-base/30 sm:grid-cols-3">
                {globalReach.regions.map((region) => (
                  <div
                    key={region}
                    className="bg-dark-950 px-4 py-5 text-center text-sm text-text-primary transition-colors hover:bg-copper-base/10"
                  >
                    {region}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                Export capabilities
              </p>
              <div className="border-t border-copper-base/30">
                {globalReach.capabilities.map((capability, i) => (
                  <div
                    key={capability}
                    className="grid grid-cols-[48px_1fr] gap-4 border-b border-dark-100/10 py-4"
                  >
                    <span className="font-heading text-xs tracking-[0.16em] text-copper-base">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body-sm text-text-primary">
                      {capability}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Milestones conduit */}
      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
              05 — Milestones
            </span>
            <h2 className="text-h2">{milestones.headline}</h2>
          </AnimatedSection>

          <div className="relative">
            <div
              className="absolute bottom-4 left-[18px] top-4 hidden w-px bg-gradient-to-b from-copper-base via-copper-base/40 to-transparent md:block"
              aria-hidden
            />
            <ol>
              {milestones.events.map((event, index) => (
                <AnimatedSection key={event.year} delay={index * 0.06}>
                  <li className="relative grid gap-3 border-b border-dark-100/10 py-8 last:border-b-0 md:grid-cols-[36px_100px_1fr] md:gap-10">
                    <div className="relative z-10 hidden justify-center pt-1 md:flex">
                      <span className="flex h-9 w-9 items-center justify-center border border-copper-base/50 bg-dark-900 font-heading text-[10px] text-copper-base">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="font-heading text-2xl text-copper-base">
                      {event.year}
                    </div>
                    <div>
                      <h3 className="text-xl text-text-primary">{event.title}</h3>
                      <p className="mt-2 max-w-2xl text-body text-text-secondary">
                        {event.description}
                      </p>
                    </div>
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
