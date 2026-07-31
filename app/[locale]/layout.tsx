import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { LMECopperSidebar } from "@/components/ui/LMECopperSidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LocaleHtmlAttrs } from "@/components/providers/LocaleHtmlAttrs";
import { KeshanChatbot } from "@/components/chat/KeshanChatbot";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <LocaleHtmlAttrs />
        <SmoothScrollProvider>
          <LMECopperSidebar />
          <KeshanChatbot />
          <div className="relative z-10 flex min-h-full flex-col">
            <Navbar />
            {children}
            <Footer />
          </div>
        </SmoothScrollProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
