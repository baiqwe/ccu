import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/seo-schema';

// Simple SVG icon components
const Icons = {
  Calculator: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
  ),
  Lightning: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  Book: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  Check: () => (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
  )
};

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Metadata');
  const breadcrumbSchema = generateBreadcrumbSchema({ locale });

  const tools = [
    { id: 'inverse', name: t('inverse.h1'), slug: locale === 'en' ? 'inverse-matrix-calculator' : 'calculadora-matriz-inversa', icon: 'Calculator' },
    { id: 'rref', name: t('rref.h1'), slug: locale === 'en' ? 'rref-calculator' : 'calculadora-gauss-jordan', icon: 'Lightning' },
    { id: 'multiplication', name: t('multiplication.h1'), slug: locale === 'en' ? 'matrix-multiplication-calculator' : 'calculadora-multiplicacion-matrices', icon: 'Calculator' },
    { id: 'determinant', name: t('determinant.h1'), slug: locale === 'en' ? 'determinant-calculator' : 'calculadora-determinante', icon: 'Calculator' },
    { id: 'eigenvalue', name: t('eigenvalue.h1'), slug: locale === 'en' ? 'eigenvalue-calculator' : 'calculadora-valores-propios', icon: 'Lightning' },
    { id: 'rank', name: t('rank.h1'), slug: locale === 'en' ? 'rank-matrix-calculator' : 'calculadora-rango-matriz', icon: 'Calculator' }
  ];

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Decorative Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {locale === 'en' ? 'New: RREF Steps Available' : 'Nuevo: Pasos RREF Disponibles'}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            {locale === 'en' ? (
              <>
                Master Linear Algebra with <br/>
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Step-by-Step Solutions
                </span>
              </>
            ) : (
              <>
                Domina el Álgebra Lineal con <br/>
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Soluciones Paso a Paso
                </span>
              </>
            )}
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {locale === 'en' 
              ? 'Stop struggling with matrix calculations. Get instant, detailed explanations for inverses, determinants, and more.'
              : 'Deja de luchar con los cálculos de matrices. Obtén explicaciones instantáneas y detalladas para inversas, determinantes y más.'}
            <span className="block mt-2 text-slate-500">
              {locale === 'en' ? 'Free forever. No signup required.' : 'Gratis para siempre. No se requiere registro.'}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#tools" className="btn-primary flex items-center gap-2">
              {locale === 'en' ? 'Start Calculating' : 'Comenzar a Calcular'}
              <Icons.ArrowRight />
            </a>
            <a href="#features" className="btn-secondary">
              {locale === 'en' ? 'Learn How It Works' : 'Aprende Cómo Funciona'}
            </a>
          </div>
        </div>

        {/* Tools Grid */}
        <div id="tools" className="mb-32">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {locale === 'en' ? 'Popular Tools' : 'Herramientas Populares'}
            </h2>
            <span className="text-sm text-slate-500 hidden sm:block">
              {locale === 'en' ? 'Select a calculator to begin' : 'Selecciona una calculadora para comenzar'}
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/${locale}/${tool.slug}`}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon === 'Lightning' ? <Icons.Lightning /> : <Icons.Calculator />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {locale === 'en' ? 'View step-by-step solution' : 'Ver solución paso a paso'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {locale === 'en' ? 'Try Calculator' : 'Probar Calculadora'} <Icons.ArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section (Why Choose Us) */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { 
              title: locale === 'en' ? 'Step-by-Step Logic' : 'Lógica Paso a Paso', 
              desc: locale === 'en' 
                ? "Don't just get the answer. See exactly how row operations and cofactor expansions work."
                : 'No solo obtengas la respuesta. Ve exactamente cómo funcionan las operaciones de fila y las expansiones de cofactores.',
              icon: <Icons.Book />
            },
            { 
              title: locale === 'en' ? '100% Client-Side' : '100% Del Lado del Cliente', 
              desc: locale === 'en' 
                ? 'Your data never leaves your browser. Calculations are instant and completely private.'
                : 'Tus datos nunca salen de tu navegador. Los cálculos son instantáneos y completamente privados.',
              icon: <Icons.Lightning />
            },
            { 
              title: locale === 'en' ? 'Export to LaTeX' : 'Exportar a LaTeX', 
              desc: locale === 'en' 
                ? 'Copy the solution steps directly into your homework or research papers.'
                : 'Copia los pasos de la solución directamente en tus tareas o trabajos de investigación.',
              icon: <Icons.Calculator />
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600 mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* SEO Content Section (Rich Text) */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            {locale === 'en' ? 'Why Use Our Matrix Tools?' : '¿Por qué usar nuestras herramientas?'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-slate-600">
              <p className="leading-relaxed">
                {locale === 'en' 
                  ? 'Linear algebra is the backbone of modern data science, engineering, and physics. Whether you are inverting a 4x4 matrix or finding eigenvalues, manual calculations are prone to errors.'
                  : 'El álgebra lineal es la columna vertebral de la ciencia de datos moderna, la ingeniería y la física. Ya sea que estés invirtiendo una matriz 4x4 o encontrando valores propios, los cálculos manuales son propensos a errores.'}
              </p>
              <p className="leading-relaxed">
                {locale === 'en' 
                  ? 'Our suite of online matrix calculators is designed not just to solve problems, but to teach. We break down complex algorithms like Gaussian Elimination and Cofactor Expansion into digestible steps.'
                  : 'Nuestro conjunto de calculadoras de matrices en línea está diseñado no solo para resolver problemas, sino para enseñar. Desglosamos algoritmos complejos como la Eliminación Gaussiana y la Expansión de Cofactores en pasos digeribles.'}
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">
                {locale === 'en' ? 'Supported Operations' : 'Operaciones Soportadas'}
              </h3>
              <ul className="space-y-3">
                {(locale === 'en' ? [
                  'Matrix Multiplication (Dot Product)',
                  'Inverse Matrix (Adjoint & Gauss-Jordan)',
                  'Determinant (2x2 to 5x5)',
                  'Reduced Row Echelon Form (RREF)',
                  'Matrix Rank & Nullity',
                  'Eigenvalues & Eigenvectors'
                ] : [
                  'Multiplicación de Matrices (Producto Punto)',
                  'Matriz Inversa (Adjunto y Gauss-Jordan)',
                  'Determinante (2x2 a 5x5)',
                  'Forma Escalonada Reducida (RREF)',
                  'Rango y Nulidad de Matriz',
                  'Valores Propios y Vectores Propios'
                ]).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <Icons.Check /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
