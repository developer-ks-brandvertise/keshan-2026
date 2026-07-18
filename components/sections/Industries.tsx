import { motion } from "framer-motion";
import { industries } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Card } from "@/components/ui/Card";
import { containerVariants, itemVariants } from "@/lib/motion";
import {
  Zap,
  PanelTop,
  Sun,
  BatteryCharging,
  Cable,
  Building2,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6" />,
  PanelTop: <PanelTop className="w-6 h-6" />,
  Sun: <Sun className="w-6 h-6" />,
  BatteryCharging: <BatteryCharging className="w-6 h-6" />,
  Cable: <Cable className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
};

export default function Industries() {
  return (
    <section className="bg-dark-900 py-section px-gutter">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Industries Served"
          title={industries.headline}
          subtitle={industries.subheadline}
          align="center"
          className="mb-16"
        />

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {industries.featured.map((item, index) => (
            <motion.div key={item.name} variants={itemVariants}>
              <Card variant="default" withGlow className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-copper-base">{iconMap[item.icon]}</div>
                    <span className="font-display text-3xl font-bold text-white/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-h3 font-display font-bold text-text-primary mb-2">
                    {item.name}
                  </h3>
                  <p className="text-body text-text-secondary flex-1">
                    {item.application}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <MagneticButton href="/industries" variant="secondary">
            {industries.cta}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
