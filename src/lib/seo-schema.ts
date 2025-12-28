import { toolsConfig } from './tools-config';

export interface JsonLdProps {
  toolId: string;
  locale: string;
  description?: string;
}

export function generateJsonLd({ toolId, locale, description }: JsonLdProps) {
  const config = toolsConfig[toolId as keyof typeof toolsConfig];
  if (!config) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: description || '',
    inLanguage: locale,
    url: `https://domain.com/${locale}/${config.slugs[locale as keyof typeof config.slugs]}`
  };

  return jsonLd;
}
