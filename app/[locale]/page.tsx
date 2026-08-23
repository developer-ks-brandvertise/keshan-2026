import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import { ValuePropSection } from "@/components/home/ValueProp";
import { ProductCategoriesSection } from "@/components/home/ProductCategories";
import { ProcessSection } from "@/components/home/Process";
import { QualitySection } from "@/components/home/Quality";
import { IndustriesSection } from "@/components/home/Industries";
import { ClientsSection } from "@/components/home/Clients";
import { KnowledgeSection } from "@/components/home/Knowledge";
import { FooterCTASection } from "@/components/home/FooterCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative">
      <Hero />
      <ValuePropSection />
      <ClientsSection index="02" />
      <ProductCategoriesSection />
      <ProcessSection />
      <QualitySection />
      <IndustriesSection />
      <KnowledgeSection />
      <FooterCTASection />
    </main>
  );
}
