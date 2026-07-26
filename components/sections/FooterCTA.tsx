import { footerCta, contact } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

export default function FooterCTA() {
  return (
    <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/bg-contact1.jpg')" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-base/10 blur-[160px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Start a Conversation"
              title={footerCta.headline}
              subtitle={footerCta.subheadline}
              align="left"
              className="mb-8"
            />
            <Reveal variant="fade" delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <MagneticButton href="/contact" variant="primary">
                  {footerCta.primaryCta}
                </MagneticButton>
                <MagneticButton href="/products" variant="secondary">
                  {footerCta.secondaryCta}
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <Reveal variant="slide" delay={0.15} className="lg:pl-8">
            <Card variant="default" withGlow={false} className="p-6 lg:p-8">
              <h3 className="text-h3 font-display font-bold text-text-primary mb-6">
                Contact Information
              </h3>
              <div className="space-y-4 text-sm text-text-secondary">
                <p>{contact.address}</p>
                <p>
                  <span className="text-text-primary">Phone:</span>{" "}
                  {contact.phones.join(" / ")}
                </p>
                <p>
                  <span className="text-text-primary">Email:</span>{" "}
                  {contact.emails.join(" | ")}
                </p>
                <p>
                  <span className="text-text-primary">Hours:</span> {contact.hours}
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
