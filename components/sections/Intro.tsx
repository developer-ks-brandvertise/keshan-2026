import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { intro } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatTile } from "@/components/ui/StatTile";
import { Card } from "@/components/ui/Card";
import { containerVariants, itemVariants } from "@/lib/motion";

const highlights = [
  "Metallurgical control on every batch",
  "Batch-tested quality before dispatch",
  "On-time delivery to 30+ countries",
  "ISO 9001 & ISO 14001 & ISO 45001 certified",
];

const statValues = [
  { value: 7, suffix: "+", label: "Years of Manufacturing Excellence" },
  { value: 30, suffix: "+", label: "Countries Supplied" },
  { value: 20000, suffix: "+", label: "MT Annual Production Capacity" },
  { value: 100, suffix: "%", label: "Quality Tested Before Dispatch" },
];

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-dark-900 py-section px-gutter">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-copper-base/5 blur-[120px]" />
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal variant="slide" className="relative">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/img-about1.jpg"
                  alt="Keshan manufacturing facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden border border-copper-base/30 bg-dark-900 p-6 lg:block">
                <div className="text-h2 font-display font-bold text-copper-base">
                  {intro.stats[0].value}
                </div>
                <div className="text-sm text-text-secondary">Years of Excellence</div>
              </div>
            </div>
          </Reveal>

          <div className="lg:pl-8">
            <SectionHeading
              eyebrow="About Keshan"
              title={intro.headline}
              subtitle={intro.body}
              align="left"
              className="mb-8"
            />

            <motion.ul
              className="space-y-3 mb-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {highlights.map((item) => (
                <motion.li key={item} variants={itemVariants} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-copper-base flex-shrink-0 mt-0.5" />
                  <span className="text-body text-text-primary">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="grid grid-cols-2 gap-6 border-t border-dark-100/10 pt-8 sm:grid-cols-4">
              {statValues.map((stat) => (
                <Card key={stat.label} variant="dark" withGlow={false} className="p-4">
                  <StatTile
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
