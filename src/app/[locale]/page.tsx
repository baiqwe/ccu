import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/seo-schema';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Metadata');
  const breadcrumbSchema = generateBreadcrumbSchema({ locale });

  const tools = [
    { id: 'inverse', name: t('inverse.h1'), slug: locale === 'en' ? 'inverse-matrix-calculator' : 'calculadora-matriz-inversa', desc: 'Adjoint & Gauss-Jordan methods' },
    { id: 'rref', name: t('rref.h1'), slug: locale === 'en' ? 'rref-calculator' : 'calculadora-gauss-jordan', desc: 'Row echelon form transformation' },
    { id: 'multiplication', name: t('multiplication.h1'), slug: locale === 'en' ? 'matrix-multiplication-calculator' : 'calculadora-multiplicacion-matrices', desc: 'Dot product computation' },
    { id: 'determinant', name: t('determinant.h1'), slug: locale === 'en' ? 'determinant-calculator' : 'calculadora-determinante', desc: 'Cofactor expansion method' },
    { id: 'eigenvalue', name: t('eigenvalue.h1'), slug: locale === 'en' ? 'eigenvalue-calculator' : 'calculadora-valores-propios', desc: 'Characteristic polynomial roots' },
    { id: 'rank', name: t('rank.h1'), slug: locale === 'en' ? 'rank-matrix-calculator' : 'calculadora-rango-matriz', desc: 'Linear independence analysis' }
  ];

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Subtle texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }}></div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 bg-gradient-to-b from-purple-50/30 to-white">
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-[128px]"></div>
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-100/20 rounded-full blur-[100px]"></div>
        
        <div className="max-w-6xl mx-auto relative">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-100 border border-purple-200">
              <span className="text-xs font-mono text-purple-700">v2.0</span>
              <span className="w-px h-4 bg-purple-300"></span>
              <span className="text-sm text-purple-600">Fraction-based precision arithmetic</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-center mb-8">
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-4">
              Matrix Calculator
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-gray-600">
              with step-by-step mathematical proofs
            </span>
        </h1>

          {/* Description */}
          <p className="text-center text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Built for students learning linear algebra. Every calculation shows the complete 
            derivation process—exactly like your textbook, but computed in milliseconds.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 font-mono">6</div>
              <div className="text-sm text-gray-600 mt-1">Core Operations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 font-mono">∞</div>
              <div className="text-sm text-gray-600 mt-1">Precision (Fractions)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 font-mono">&lt;50ms</div>
              <div className="text-sm text-gray-600 mt-1">Computation Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 font-mono">0</div>
              <div className="text-sm text-gray-600 mt-1">Data Collected</div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#tools" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg">
              Start Calculating
            </a>
            <a href="#methodology" className="px-8 py-4 text-gray-700 border-2 border-gray-300 rounded-lg hover:border-purple-400 hover:text-purple-600 transition-colors">
              View Methodology
            </a>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-24 px-4 border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Calculators</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Each tool implements textbook algorithms with complete step visualization. 
              Select one to see the mathematical derivation process.
        </p>
      </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/${locale}/${tool.slug}`}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-mono">{tool.desc}</p>
              </div>

                <div className="flex items-center text-sm font-medium text-purple-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <span>Open calculator</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
        </div>
      </section>

      {/* Methodology Section (E-E-A-T) */}
      <section id="methodology" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Methodology</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We don&apos;t just give you answers—we show you how mathematicians actually derive them. 
              Every step follows established linear algebra textbook conventions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Algorithm Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-mono text-sm font-bold">
                  01
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Fraction-Based Arithmetic</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Unlike floating-point calculators that introduce rounding errors, we represent 
                all numbers as exact fractions. When you see <code className="px-2 py-1 bg-gray-100 rounded text-purple-600 font-mono text-sm">1/3</code>, 
                it&apos;s truly 1/3—not 0.333333.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm border border-gray-200">
                <div className="text-gray-500">{'// Internal representation'}</div>
                <div className="text-gray-700">
                  <span className="text-purple-600">class</span> Fraction {'{'}
                  <br />
                  <span className="ml-4 text-gray-500">numerator: BigInt</span>
                  <br />
                  <span className="ml-4 text-gray-500">denominator: BigInt</span>
                  <br />
                  {'}'}
                </div>
              </div>
            </div>

            {/* Algorithm Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-mono text-sm font-bold">
                  02
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Textbook Algorithms</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                We implement the same methods taught in university courses. For inverse matrices, 
                we use the Adjoint Method (cofactor expansion + transpose). For RREF, we use 
                Gaussian-Jordan elimination with complete row operation logging.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  <span className="text-gray-700 text-sm">Cofactor Expansion for determinants</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  <span className="text-gray-700 text-sm">Adjugate matrix for inverses</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  <span className="text-gray-700 text-sm">Characteristic polynomial for eigenvalues</span>
                </div>
              </div>
            </div>

            {/* Step Visualization Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-mono text-sm font-bold">
                  03
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Step-by-Step Derivation</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Each calculation generates a complete derivation trail. For a 3×3 inverse, you&apos;ll see: 
                determinant calculation → cofactor matrix → adjugate (transpose) → final multiplication. 
                Every step includes the mathematical reasoning.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg font-mono border border-purple-200">LaTeX output</div>
                <div className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg font-mono border border-gray-200">Copy to clipboard</div>
              </div>
            </div>

            {/* Privacy Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-mono text-sm font-bold">
                  04
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Client-Side Computation</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                All calculations run in your browser using JavaScript. We don&apos;t send your matrices to 
                any server. Check the Network tab in DevTools—you&apos;ll see zero API calls during computation. 
                Your data stays on your device.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No tracking • No cookies • No data collection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section (E-E-A-T) */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built For Real Math Problems</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you&apos;re solving homework problems, verifying research calculations, 
              or teaching linear algebra concepts, these tools adapt to your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Use Case 1 */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Homework Verification</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Solve problems by hand first, then verify each step matches our derivation. 
                Identify exactly where you made mistakes in row operations or cofactor signs.
              </p>
            </div>

            {/* Use Case 2 */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Computation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get exact fractional results for theoretical work. Export LaTeX directly 
                into your papers. No need to manually typeset matrix operations.
              </p>
            </div>

            {/* Use Case 3 */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Teaching Tool</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Project step-by-step solutions during lectures. Students see the complete 
                algorithm execution, not just the final answer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs (E-E-A-T) */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <p className="text-gray-600">
              Under the hood: what powers these calculators.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-gray-500 font-mono text-sm w-32 flex-shrink-0">Matrix Size</div>
              <div className="text-gray-700">Up to 5×5 for step-by-step derivation (O(n!) complexity for determinants). Larger matrices computed without full step visualization.</div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-gray-500 font-mono text-sm w-32 flex-shrink-0">Number Format</div>
              <div className="text-gray-700">Exact fractions with GCD reduction. Supports integers, decimals (converted to fractions), and negative numbers.</div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-gray-500 font-mono text-sm w-32 flex-shrink-0">Algorithms</div>
              <div className="text-gray-700">Cofactor expansion (determinants), Adjugate method (inverse), Gaussian-Jordan elimination (RREF), Characteristic polynomial (eigenvalues).</div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-gray-500 font-mono text-sm w-32 flex-shrink-0">Output Format</div>
              <div className="text-gray-700">Interactive step viewer with LaTeX rendering (KaTeX), copy-to-clipboard for all steps, fraction/decimal toggle.</div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-gray-500 font-mono text-sm w-32 flex-shrink-0">Runtime</div>
              <div className="text-gray-700">100% client-side JavaScript. No server requests during computation. Works offline after initial page load.</div>
            </div>
          </div>
        </div>
      </section>

      {/* All Tools List (SEO) */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Complete Calculator Index</h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
            <div>
              <h3 className="text-gray-500 font-semibold mb-4 uppercase tracking-wider text-xs">Basic Operations</h3>
              <ul className="space-y-3">
                <li>
                  <Link href={`/${locale}/${locale === 'en' ? 'matrix-multiplication-calculator' : 'calculadora-multiplicacion-matrices'}`} className="text-gray-700 hover:text-purple-600 transition-colors">
                    Matrix Multiplication — compute A × B with dot product steps
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/${locale === 'en' ? 'determinant-calculator' : 'calculadora-determinante'}`} className="text-gray-700 hover:text-purple-600 transition-colors">
                    Determinant — cofactor expansion for 2×2, 3×3, 4×4, 5×5 matrices
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-semibold mb-4 uppercase tracking-wider text-xs">Advanced Operations</h3>
              <ul className="space-y-3">
                <li>
                  <Link href={`/${locale}/${locale === 'en' ? 'inverse-matrix-calculator' : 'calculadora-matriz-inversa'}`} className="text-gray-700 hover:text-purple-600 transition-colors">
                    Inverse Matrix — adjugate method with singularity detection
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/${locale === 'en' ? 'eigenvalue-calculator' : 'calculadora-valores-propios'}`} className="text-gray-700 hover:text-purple-600 transition-colors">
                    Eigenvalues — characteristic polynomial roots and eigenvectors
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-semibold mb-4 uppercase tracking-wider text-xs">Row Operations</h3>
              <ul className="space-y-3">
                <li>
                  <Link href={`/${locale}/${locale === 'en' ? 'rref-calculator' : 'calculadora-gauss-jordan'}`} className="text-gray-700 hover:text-purple-600 transition-colors">
                    RREF — Gaussian-Jordan elimination with row operation log
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/${locale === 'en' ? 'rank-matrix-calculator' : 'calculadora-rango-matriz'}`} className="text-gray-700 hover:text-purple-600 transition-colors">
                    Matrix Rank — linear independence via pivot counting
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-semibold mb-4 uppercase tracking-wider text-xs">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href={`/${locale}/about`} className="text-gray-700 hover:text-purple-600 transition-colors">
                    About — methodology, team, and development story
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/privacy`} className="text-gray-700 hover:text-purple-600 transition-colors">
                    Privacy — no data collection policy explained
                  </Link>
                </li>
              </ul>
          </div>
        </div>
      </div>
      </section>
    </main>
  );
}
