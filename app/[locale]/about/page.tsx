import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  Building2,
  Calendar,
  Factory,
  Globe2,
  Leaf,
  Shield,
  Target,
  TrendingUp,
  Truck,
} from "lucide-react";
import {
  about,
  visionMission,
  leadership,
  milestones,
  intro,
} from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CopperHighlight from "@/components/ui/CopperHighlight";
import PageHero from "@/components/ui/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import TeamGrid from "@/components/about/TeamGrid";
import { ClientsSection } from "@/components/home/Clients";
import { IconFeatureCard } from "@/components/ui/IconFeatureCard";

export const metadata: Metadata = {
  title: "About Keshan Industries | Copper Manufacturer | Made in India",
  description:
    "Keshan Industries is a precision copper and brass manufacturer based in India, and one of the country's largest exporters of copper ingots. ISO 9001, ISO 14001 & ISO 45001 certified.",
};

const statIcons = [Calendar, Globe2, Factory, Shield];

const valueIcons = [Target, Shield, Truck, Leaf, TrendingUp];

const milestoneIcons = [Building2, Award, TrendingUp, Globe2];

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
          className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(202,94,46,0.14),transparent_70%)]"
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
              {intro.stats.map((stat, i) => (
                <IconFeatureCard
                  key={stat.label}
                  icon={statIcons[i] ?? Calendar}
                  highlight={stat.value}
                  title={stat.label.split(" ").slice(0, 2).join(" ")}
                  description={stat.label}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 02 — Leadership */}
      <section className="bg-dark-950 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 max-w-3xl">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
              02 — Leadership
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

      {/* 03 — Vision / Mission / Values */}
      <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-base/50 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <AnimatedSection className="relative overflow-hidden border border-copper-base/25 bg-dark-900 p-8 sm:p-10 lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
                03 — Vision
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
              className="relative flex flex-col justify-center overflow-hidden border border-copper-base/25 bg-[linear-gradient(145deg,rgba(202,94,46,0.14),transparent_55%),#0a0a0a] p-8 sm:p-10 lg:col-span-7"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
                Mission
              </span>
              <p
                className="mt-6 font-heading text-2xl leading-snug text-text-primary sm:text-3xl lg:text-[2.1rem] lg:leading-[1.25]"
                style={{ letterSpacing: "2px" }}
              >
                {visionMission.missionStatement}
              </p>
              <div className="mt-8 h-px w-24 bg-copper-base/60" aria-hidden />
            </AnimatedSection>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visionMission.values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.05}>
                <IconFeatureCard
                  icon={valueIcons[i] ?? Target}
                  title={value.title}
                  description={value.description}
                  index={i}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Partners / Clients */}
      <ClientsSection index="04" tone="dark-900" />

      {/* 05 — Milestones — arrow timeline */}
      <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-base/40 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 max-w-2xl">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
              05 — Milestones
            </span>
            <h2 className="text-h2">{milestones.headline}</h2>
          </AnimatedSection>

          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {milestones.events.map((event, index) => {
              const Icon = milestoneIcons[index] ?? Building2;
              return (
                <AnimatedSection key={event.year} delay={index * 0.07}>
                  <li className="group relative flex h-full flex-col border border-copper-base/25 bg-dark-900 p-6 transition-colors hover:border-copper-base/55">
                    <span className="mb-4 inline-flex h-9 w-9 items-center justify-center border border-copper-base bg-dark-950 text-copper-base">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <p className="font-heading text-3xl text-copper-base">
                      {event.year}
                    </p>
                    <h3 className="mt-3 text-lg text-text-primary">{event.title}</h3>
                    <p className="mt-2 flex-1 text-body-sm text-text-secondary">
                      {event.description}
                    </p>
                    {index < milestones.events.length - 1 ? (
                      <span
                        className="pointer-events-none absolute -right-4 top-1/2 hidden h-0 w-0 -translate-y-1/2 border-b-[12px] border-l-[18px] border-t-[12px] border-b-transparent border-l-copper-base/70 border-t-transparent lg:block"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                </AnimatedSection>
              );
            })}
          </ol>

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
