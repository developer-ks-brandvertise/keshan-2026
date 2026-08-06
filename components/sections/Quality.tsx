import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Shield, Leaf } from "lucide-react";
import { quality } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { containerVariants, itemVariants } from "@/lib/motion";

const pillars = [
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Purity",
    description: "99.9%+ copper purity on all electrolytic grades.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Certification",
    description: "ISO 9001:2015, ISO 14001:2015, and ISO 45001 certified.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Testing",
    description: "Chemical composition, conductivity, and tensile testing per batch.",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Standards",
    description: "Compliance with IS, ASTM, DIN, JIS, and BS standards.",
  },
];

export default function Quality() {
  return (
    <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-copper-base/5 blur-[150px]" />
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal variant="slide" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/img-accordion1.jpg"
                alt="Quality testing laboratory"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden border border-copper-base/30 bg-dark-900 p-6 lg:block">
              <div className="text-h2 font-display font-bold text-copper-base">
                99.9%+
              </div>
              <div className="text-sm text-text-secondary">Copper Purity</div>
            </div>
          </Reveal>

          <div className="lg:pl-8">
            <SectionHeading
              eyebrow="Quality Assurance"
              title="Quality is Not a Department at Keshan. It is the Standard."
              align="left"
              className="mb-6"
            />
            <Reveal variant="fade" delay={0.2}>
              <p className="text-body-lg text-text-secondary mb-10">
                {quality.body}
              </p>
            </Reveal>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {pillars.map((pillar) => (
                <motion.div key={pillar.title} variants={itemVariants}>
                  <Card variant="gradient" withGlow>
                    <div className="text-copper-base mb-3">{pillar.icon}</div>
                    <h4 className="text-h3 font-display font-bold text-text-primary mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-body-sm text-text-secondary">
                      {pillar.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <Reveal variant="fade" delay={0.3}>
              <MagneticButton href="/contact" variant="secondary">
                {quality.cta}
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
