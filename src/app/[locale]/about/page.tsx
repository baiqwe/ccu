import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getCanonicalUrl } from '@/lib/site-config';
import { generateBreadcrumbSchema } from '@/lib/seo-schema';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'About' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: getCanonicalUrl(`/${locale}/about`),
            languages: {
                en: getCanonicalUrl('/en/about'),
                es: getCanonicalUrl('/es/about'),
            },
        },
    };
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'About' });
    
    const breadcrumbSchema = generateBreadcrumbSchema({
        locale,
        pageName: t('title'),
        pagePath: 'about'
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
                            { label: t('title'), href: `/${locale}/about` }
                        ]}
                    />
                    
                    <div className="max-w-3xl mx-auto text-center mt-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6 border border-purple-200">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center border border-purple-200">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('missionTitle')}</h2>
                                    <p className="text-gray-600 leading-relaxed">{t('missionContent')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="border-b border-gray-200 pb-8 last:border-0">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('storyTitle')}</h2>
                                    <p className="text-gray-600 leading-relaxed">{t('storyContent')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="border-b border-gray-200 pb-8 last:border-0">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center border border-emerald-200">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('whyFreeTitle')}</h2>
                                    <p className="text-gray-600 leading-relaxed">{t('whyFreeContent')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="border-b border-gray-200 pb-8 last:border-0">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('technologyTitle')}</h2>
                                    <p className="text-gray-600 leading-relaxed">{t('technologyContent')}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border border-amber-200">
                                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('contactTitle')}</h2>
                                    <p className="text-gray-600 leading-relaxed">{t('contactContent')}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
