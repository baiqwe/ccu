'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { generateFAQSchema, FAQItem } from '@/lib/faq-schema';

interface FAQSectionProps {
  toolId: string;
  locale: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ toolId, locale }) => {
  const t = useTranslations('FAQ');
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = useMemo(() => [
    { question: t(`${toolId}.q1`), answer: t(`${toolId}.a1`) },
    { question: t(`${toolId}.q2`), answer: t(`${toolId}.a2`) },
    { question: t(`${toolId}.q3`), answer: t(`${toolId}.a3`) }
  ], [toolId, t]);

  // Generate FAQ Schema
  useEffect(() => {
    const schema = generateFAQSchema({
      faqs,
      locale,
      pageUrl: pathname
    });

    if (schema) {
      const scriptId = 'faq-schema';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      
      script.textContent = JSON.stringify(schema);
    }
  }, [faqs, locale, pathname]);

  return (
    <section className="max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex justify-between items-center"
            >
              <span className="font-semibold text-gray-900">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
