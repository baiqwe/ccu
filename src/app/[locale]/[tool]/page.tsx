import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { toolsConfig, findToolIdBySlug } from '@/lib/tools-config';
import { generateJsonLd } from '@/lib/seo-schema';
import { CalculatorWrapper } from '@/components/calculators/CalculatorWrapper';
import { FAQSection } from '@/components/seo/FAQSection';

export async function generateStaticParams() {
  const params = [];
  const locales = ['en', 'es'];

  for (const locale of locales) {
    for (const toolKey of Object.keys(toolsConfig)) {
      const slug = toolsConfig[toolKey as keyof typeof toolsConfig].slugs[locale as keyof typeof toolsConfig[typeof toolKey]['slugs']];
      params.push({ locale, tool: slug });
    }
  }
  return params;
}

export async function generateMetadata({ params: { locale, tool } }: { params: { locale: string; tool: string } }) {
  const toolId = findToolIdBySlug(tool, locale);
  if (!toolId) return {};

  const t = await getTranslations({ locale, namespace: `Metadata.${toolId}` });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://domain.com/${locale}/${tool}`,
      languages: {
        en: `https://domain.com/en/${toolsConfig[toolId as keyof typeof toolsConfig].slugs.en}`,
        es: `https://domain.com/es/${toolsConfig[toolId as keyof typeof toolsConfig].slugs.es}`,
      },
    },
  };
}

export default async function ToolPage({ params: { locale, tool } }: { params: { locale: string; tool: string } }) {
  const toolId = findToolIdBySlug(tool, locale);
  if (!toolId) notFound();

  const t = await getTranslations({ locale, namespace: `Metadata.${toolId}` });
  const jsonLd = generateJsonLd({ toolId, locale, description: t('description') });

  return (
    <main className="container mx-auto px-4 py-8">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-gray-800">
        {t('h1')}
      </h1>

      <CalculatorWrapper toolId={toolId} />

      <FAQSection toolId={toolId} />
    </main>
  );
}
