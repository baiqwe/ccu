import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getCanonicalUrl } from '@/lib/site-config';
import { generateBreadcrumbSchema } from '@/lib/seo-schema';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'Terms' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: getCanonicalUrl(`/${locale}/terms`),
            languages: {
                en: getCanonicalUrl('/en/terms'),
                es: getCanonicalUrl('/es/terms'),
            },
        },
    };
}

export default async function TermsPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Terms' });
    
    const breadcrumbSchema = generateBreadcrumbSchema({
        locale,
        pageName: t('title'),
        pagePath: 'terms'
    });

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Header Section */}
            <div className="border-b border-gray-200 bg-gradient-to-b from-purple-50/30 to-white">
                <div className="container mx-auto px-4 py-16">
                    <BreadcrumbNav
                        locale={locale}
                        items={[
                            { label: locale === 'en' ? 'Home' : 'Inicio', href: `/${locale}` },
                            { label: t('title'), href: `/${locale}/terms` }
                        ]}
                    />
                    
                    <div className="max-w-3xl mx-auto text-center mt-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6 border border-purple-200">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {t('description')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 space-y-12">
                        <section className="border-b border-gray-200 pb-8 last:border-0">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center border border-emerald-200">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('section1Title')}</h2>
                                    <p className="text-gray-600 leading-relaxed">{t('section1Content')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="border-b border-gray-200 pb-8 last:border-0">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center border border-purple-200">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('section2Title')}</h2>
                                    <p className="text-gray-600 leading-relaxed">{t('section2Content')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="border-b border-gray-200 pb-8 last:border-0">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border border-amber-200">
                                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('section3Title')}</h2>
                                    <p className="text-gray-600 leading-relaxed">{t('section3Content')}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center border border-rose-200">
                                    <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('section4Title')}</h2>
                                    <p className="text-gray-600 leading-relaxed">{t('section4Content')}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
