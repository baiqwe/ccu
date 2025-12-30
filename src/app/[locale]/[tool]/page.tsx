import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { toolsConfig, findToolIdBySlug } from '@/lib/tools-config';
import { generateJsonLd, generateBreadcrumbSchema } from '@/lib/seo-schema';
import { getCanonicalUrl } from '@/lib/site-config';
import { CalculatorWrapper } from '@/components/calculators/CalculatorWrapper';
import { FAQSection } from '@/components/seo/FAQSection';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { ArticleSection } from '@/components/seo/ArticleSection';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';

export async function generateStaticParams() {
  const params: Array<{ locale: string; tool: string }> = [];
  const locales = ['en', 'es'] as const;
  const toolKeys = Object.keys(toolsConfig) as Array<keyof typeof toolsConfig>;

  for (const locale of locales) {
    for (const toolKey of toolKeys) {
      const slug = toolsConfig[toolKey].slugs[locale];
      params.push({ locale, tool: slug });
    }
  }
  return params;
}

export async function generateMetadata({ params: { locale, tool } }: { params: { locale: string; tool: string } }) {
  const toolId = findToolIdBySlug(tool, locale);
  if (!toolId) return {};

  const t = await getTranslations({ locale, namespace: `Metadata.${toolId}` });
  const config = toolsConfig[toolId as keyof typeof toolsConfig];

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getCanonicalUrl(`/${locale}/${tool}`),
      languages: {
        en: getCanonicalUrl(`/en/${config.slugs.en}`),
        es: getCanonicalUrl(`/es/${config.slugs.es}`),
      },
    },
  };
}

export default async function ToolPage({ params: { locale, tool } }: { params: { locale: string; tool: string } }) {
  unstable_setRequestLocale(locale);
  const toolId = findToolIdBySlug(tool, locale);
  if (!toolId) notFound();

  const t = await getTranslations({ locale, namespace: `Metadata.${toolId}` });
  const jsonLd = generateJsonLd({ toolId, locale, description: t('description') });
  const breadcrumbSchema = generateBreadcrumbSchema({
    locale,
    toolId,
    toolSlug: tool,
    toolName: t('h1')
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BreadcrumbNav
        locale={locale}
        items={[
          { label: locale === 'en' ? 'Home' : 'Inicio', href: `/${locale}` },
          { label: t('h1'), href: `/${locale}/${tool}` }
        ]}
      />

      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-gray-800">
        {t('h1')}
      </h1>

      <CalculatorWrapper toolId={toolId} />

      <ArticleSection toolId={toolId} locale={locale} />

      <FAQSection toolId={toolId} />

      <RelatedTools currentToolId={toolId} locale={locale} />
    </main>
  );
}
