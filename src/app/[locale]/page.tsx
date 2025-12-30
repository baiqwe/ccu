import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/seo-schema';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
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

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {locale === 'en' ? 'Comprehensive Linear Algebra Tools' : 'Herramientas Completas de Álgebra Lineal'}
        </h2>
        <div className="prose prose-lg mx-auto text-gray-600 space-y-4">
          <p>
            {locale === 'en' 
              ? 'Our suite of online matrix calculators is designed to help you verify your manual calculations and understand the underlying concepts. Unlike simple calculators, we focus on the learning process.'
              : 'Nuestro conjunto de calculadoras de matrices en línea está diseñado para ayudarte a verificar tus cálculos manuales y comprender los conceptos subyacentes. A diferencia de las calculadoras simples, nos enfocamos en el proceso de aprendizaje.'}
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {locale === 'en' ? 'Matrix Operations' : 'Operaciones de Matrices'}
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>{locale === 'en' ? 'Inverse Matrix:' : 'Matriz Inversa:'}</strong>{' '}
                  {locale === 'en' 
                    ? 'Find the inverse using Adjoint method or Gauss-Jordan elimination.'
                    : 'Encuentra la inversa usando el método Adjunto o eliminación de Gauss-Jordan.'}
                </li>
                <li>
                  <strong>{locale === 'en' ? 'Multiplication:' : 'Multiplicación:'}</strong>{' '}
                  {locale === 'en' 
                    ? 'Compute dot products for matrices of any compatible size.'
                    : 'Calcula productos punto para matrices de cualquier tamaño compatible.'}
                </li>
                <li>
                  <strong>{locale === 'en' ? 'Determinant:' : 'Determinante:'}</strong>{' '}
                  {locale === 'en' 
                    ? 'Calculate determinants using cofactor expansion.'
                    : 'Calcula determinantes usando expansión de cofactores.'}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {locale === 'en' ? 'Advanced Algorithms' : 'Algoritmos Avanzados'}
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>{locale === 'en' ? 'RREF (Gaussian Elimination):' : 'RREF (Eliminación Gaussiana):'}</strong>{' '}
                  {locale === 'en' 
                    ? 'Transform matrices to Reduced Row Echelon Form step-by-step.'
                    : 'Transforma matrices a Forma Escalonada Reducida paso a paso.'}
                </li>
                <li>
                  <strong>{locale === 'en' ? 'Rank & Nullity:' : 'Rango y Nulidad:'}</strong>{' '}
                  {locale === 'en' 
                    ? 'Determine the dimension of column and row spaces.'
                    : 'Determina la dimensión de los espacios de columnas y filas.'}
                </li>
                <li>
                  <strong>{locale === 'en' ? 'Eigenvalues:' : 'Valores Propios:'}</strong>{' '}
                  {locale === 'en' 
                    ? 'Find characteristic polynomials and roots.'
                    : 'Encuentra polinomios característicos y raíces.'}
                </li>
              </ul>
            </div>
          </div>
        </div>
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
