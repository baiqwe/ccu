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
    <main className="min-h-screen bg-slate-50 pb-20">
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
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav
            locale={locale}
            items={[
              { label: locale === 'en' ? 'Home' : 'Inicio', href: `/${locale}` },
              { label: t('h1'), href: `/${locale}/${tool}` }
            ]}
          />
          
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mt-8 mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {t('h1')}
            </h1>
            <p className="text-lg text-slate-600">
              {t('description')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Calculator Card - Floating effect */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-10 mb-16 relative z-10">
          <CalculatorWrapper toolId={toolId} />
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            {/* Article with better typography */}
            <div className="prose prose-slate prose-lg max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-12">
              <ArticleSection toolId={toolId} locale={locale} />
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <FAQSection toolId={toolId} locale={locale} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">
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
