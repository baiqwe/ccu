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
    <main className="min-h-screen bg-white">
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

      {/* Header Section */}
      <div className="border-b border-gray-200 bg-gradient-to-b from-purple-50/30 to-white">
        <div className="container mx-auto px-4 py-12">
          <BreadcrumbNav
            locale={locale}
            items={[
              { label: locale === 'en' ? 'Home' : 'Inicio', href: `/${locale}` },
              { label: t('h1'), href: `/${locale}/${tool}` }
            ]}
          />
          
          <div className="max-w-3xl mx-auto text-center mt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {t('h1')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('description')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Calculator Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-10 mb-16">
          <CalculatorWrapper toolId={toolId} />
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-8">
            {/* Article Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <ArticleSection toolId={toolId} locale={locale} />
            </div>
            
            {/* FAQ Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <FAQSection toolId={toolId} locale={locale} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider text-gray-500">
                  {locale === 'en' ? 'Related Calculators' : 'Calculadoras Relacionadas'}
                </h3>
                <RelatedTools currentToolId={toolId} locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
