import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import { ProductsSilkBackground } from "@/components/products/ProductsSilkBackground";
import { ProductsListing } from "@/components/products/ProductsListing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.products" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("productsPage");

  return (
    <main>
      <PageHero
        label={t("label")}
        title={t("title")}
        highlight={t("highlight")}
        description={t("description")}
        background={<ProductsSilkBackground />}
      />
      <ProductsListing />
    </main>
  );
}
