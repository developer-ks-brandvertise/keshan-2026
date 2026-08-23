import type { Metadata } from "next";
import { contactHeaderImage } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";
import { ContactPageSections } from "@/components/contact/ContactPageSections";

export const metadata: Metadata = {
  title: "Contact Keshan Industries | Request a Quote | Copper & Brass Manufacturer",
  description:
    "Get in touch with Keshan Industries for copper and brass product inquiries, quotes, and export support. Hyderabad, India.",
};

interface ContactPageProps {
  searchParams: Promise<{ product?: string | string[] }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const productParam = params.product;
  const defaultProduct = Array.isArray(productParam)
    ? productParam[0]
    : productParam;

  return (
    <main>
      <PageHero
        label="Contact"
        title="Request a Quote or Speak to Our Team."
        highlight="Request a Quote"
        description="Tell us your specification, quantity, and delivery terms. Our team will respond within 24 business hours with product availability, pricing, and lead time."
        backgroundImage={contactHeaderImage}
        backgroundPriority
      />

      <ContactPageSections defaultProduct={defaultProduct} />
    </main>
  );
}
