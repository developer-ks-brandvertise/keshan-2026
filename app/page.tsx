import Hero from "@/components/sections/Hero";
import { ValuePropSection } from "@/components/home/ValueProp";
import { ProductCategoriesSection } from "@/components/home/ProductCategories";
import { ProcessSection } from "@/components/home/Process";
import { QualitySection } from "@/components/home/Quality";
import { IndustriesSection } from "@/components/home/Industries";
import { ClientsSection } from "@/components/home/Clients";
import { KnowledgeSection } from "@/components/home/Knowledge";
import { FooterCTASection } from "@/components/home/FooterCTA";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <ValuePropSection />
      <ProductCategoriesSection />
      <ProcessSection />
      <QualitySection />
      <IndustriesSection />
      <ClientsSection />
      <KnowledgeSection />
      <FooterCTASection />
    </main>
  );
}
