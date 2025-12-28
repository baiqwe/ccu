import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/seo-schema';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Metadata');
  const breadcrumbSchema = generateBreadcrumbSchema({ locale });

  const tools = [
    { id: 'inverse', name: t('inverse.h1'), slug: locale === 'en' ? 'inverse-matrix-calculator' : 'calculadora-matriz-inversa' },
    { id: 'rref', name: t('rref.h1'), slug: locale === 'en' ? 'rref-calculator' : 'calculadora-gauss-jordan' },
    { id: 'multiplication', name: t('multiplication.h1'), slug: locale === 'en' ? 'matrix-multiplication-calculator' : 'calculadora-multiplicacion-matrices' },
    { id: 'determinant', name: t('determinant.h1'), slug: locale === 'en' ? 'determinant-calculator' : 'calculadora-determinante' },
    { id: 'eigenvalue', name: t('eigenvalue.h1'), slug: locale === 'en' ? 'eigenvalue-calculator' : 'calculadora-valores-propios' },
    { id: 'rank', name: t('rank.h1'), slug: locale === 'en' ? 'rank-matrix-calculator' : 'calculadora-rango-matriz' }
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-3xl -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
          Free Matrix Calculators with Steps
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Solve linear algebra problems instantly with detailed step-by-step explanations.
          <span className="block mt-2 text-lg text-gray-500">Perfect for students, engineers, and data scientists.</span>
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/${locale}/${tool.slug}`}
            className="group block glass-card p-6 hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-md">
                {tool.id.charAt(0).toUpperCase()}
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{tool.name}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Calculate with detailed step-by-step solutions
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Our Calculators?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">📐</div>
            <h3 className="font-semibold text-gray-800 mb-2">Step-by-Step Solutions</h3>
            <p className="text-gray-600 text-sm">
              Understand every calculation with detailed explanations
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">100% Free</h3>
            <p className="text-gray-600 text-sm">
              No registration required, use unlimited times
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
            <p className="text-gray-600 text-sm">
              Custom keypad for easy input on any device
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
