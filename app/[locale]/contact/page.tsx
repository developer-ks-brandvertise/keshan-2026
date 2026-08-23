import { getTranslations, setRequestLocale } from "next-intl/server";
import { contactHeaderImage } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";
import { ContactPageSections } from "@/components/contact/ContactPageSections";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string | string[] }>;
};

export async function generateMetadata({ params }: Pick<Props, "params">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const query = await searchParams;
  const productParam = query.product;
  const defaultProduct = Array.isArray(productParam)
    ? productParam[0]
    : productParam;

  return (
    <main>
      <PageHero
        label={t("label")}
        title={t("title")}
        highlight={t("highlight")}
        description={t("description")}
        backgroundImage={contactHeaderImage}
        backgroundPriority
      />

      <ContactPageSections defaultProduct={defaultProduct} />
    </main>
  );
}
