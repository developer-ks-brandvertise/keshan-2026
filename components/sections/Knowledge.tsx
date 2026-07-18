import Image from "next/image";
import { motion } from "framer-motion";
import { knowledge } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Card } from "@/components/ui/Card";
import { containerVariants, itemVariants } from "@/lib/motion";

const articleImages = [
  "/images/blog-img1.jpg",
  "/images/blog-img2.jpg",
  "/images/blog-img3.jpg",
];

export default function Knowledge() {
  return (
    <section className="bg-dark-900 py-section px-gutter">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Knowledge Centre"
            title={knowledge.headline}
            subtitle={knowledge.subheadline}
            align="left"
          />
          <MagneticButton href="/knowledge-centre" variant="secondary" size="sm">
            {knowledge.cta}
          </MagneticButton>
        </div>

        <motion.div
          className="grid gap-5 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {knowledge.articles.map((article, index) => (
            <motion.div key={article.title} variants={itemVariants}>
              <Card variant="default" withGlow className="group h-full p-0 overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={articleImages[index % articleImages.length]}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute left-4 top-4 flex flex-col items-center justify-center bg-copper-gradient px-3 py-2 text-center text-dark-900">
                    <span className="font-display text-lg font-medium leading-none">
                      {article.date.split(" ")[0]}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {article.date.split(" ")[1]}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-copper-base">
                    {article.category}
                  </span>
                  <h3 className="mt-2 text-h3 font-display font-bold text-text-primary transition-colors group-hover:text-copper-base">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-body-sm text-text-secondary">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-copper-base transition-all group-hover:gap-3">
                    Read More
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
