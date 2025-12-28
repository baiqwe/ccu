'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FAQSectionProps {
  toolId: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ toolId }) => {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: `${toolId}.q1`, a: `${toolId}.a1` },
    { q: `${toolId}.q2`, a: `${toolId}.a2` },
    { q: `${toolId}.q3`, a: `${toolId}.a3` }
  ];

  return (
    <section className="mt-16 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
            >
              <span className="font-semibold text-gray-700">{t(faq.q as any)}</span>
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
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600">{t(faq.a as any)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
