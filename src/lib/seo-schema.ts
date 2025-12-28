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

export interface BreadcrumbProps {
  locale: string;
  toolId?: string;
  toolSlug?: string;
  toolName?: string;
}

export function generateBreadcrumbSchema({ locale, toolId, toolSlug, toolName }: BreadcrumbProps) {
  const baseUrl = 'https://domain.com';
  const homeLabel = locale === 'en' ? 'Home' : 'Inicio';
  
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: homeLabel,
      item: `${baseUrl}/${locale}`
    }
  ];

  // Add tool page as second breadcrumb item if provided
  if (toolId && toolSlug && toolName) {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: toolName,
      item: `${baseUrl}/${locale}/${toolSlug}`
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
}
