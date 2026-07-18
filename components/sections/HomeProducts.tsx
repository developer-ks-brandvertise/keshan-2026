import Image from "next/image";
import { motion } from "framer-motion";
import { productCategories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { containerVariants, itemVariants } from "@/lib/motion";

const images = ["/images/service1.jpg", "/images/service2.jpg"];

export default function HomeProducts() {
  return (
    <section className="bg-dark-950 py-section px-gutter">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Product Range"
          title={productCategories.headline}
          subtitle={productCategories.subheadline}
          align="center"
          className="mb-16"
        />

        <motion.div
          className="grid gap-6 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {productCategories.categories.map((category, index) => (
            <motion.div key={category.title} variants={itemVariants}>
              <div className="group relative overflow-hidden rounded-lg border border-copper-base/10 bg-dark-900 transition-all duration-500 hover:border-copper-base/40 hover:shadow-copper-glow">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={images[index]}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-copper-base">
                      Category 0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-h3 font-display font-bold text-text-primary transition-colors group-hover:text-copper-base">
                    {category.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-body text-text-secondary">
                    {category.description}
                  </p>
                  <div className="mt-5">
                    <MagneticButton href={category.href} variant="secondary" size="sm">
                      Find out more
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
