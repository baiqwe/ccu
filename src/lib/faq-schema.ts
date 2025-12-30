import { getCanonicalUrl } from './site-config';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchemaProps {
  faqs: FAQItem[];
  locale: string;
  pageUrl: string;
}

export function generateFAQSchema({ faqs, locale, pageUrl }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const mainEntity = faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
    inLanguage: locale,
    url: getCanonicalUrl(pageUrl),
  };
}

