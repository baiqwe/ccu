import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Metadata');

  const tools = [
    { id: 'inverse-matrix', name: t('inverse.h1'), slug: locale === 'en' ? 'inverse-matrix-calculator' : 'calculadora-matriz-inversa' },
    { id: 'rref', name: t('rref.h1'), slug: locale === 'en' ? 'rref-calculator' : 'calculadora-gauss-jordan' },
    { id: 'multiplication', name: t('multiplication.h1'), slug: locale === 'en' ? 'matrix-multiplication-calculator' : 'calculadora-multiplicacion-matrices' },
    { id: 'determinant', name: t('determinant.h1'), slug: locale === 'en' ? 'determinant-calculator' : 'calculadora-determinante' },
    { id: 'eigenvalue', name: t('eigenvalue.h1'), slug: locale === 'en' ? 'eigenvalue-calculator' : 'calculadora-valores-propios' },
    { id: 'rank', name: t('rank.h1'), slug: locale === 'en' ? 'rank-matrix-calculator' : 'calculadora-rango-matriz' }
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Free Matrix Calculators with Steps
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Solve linear algebra problems instantly with detailed step-by-step explanations.
          Perfect for students, engineers, and data scientists.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/${locale}/${tool.slug}`}
            className="block bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{tool.name}</h2>
            <p className="text-gray-600 text-sm">
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
