import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getCanonicalUrl } from '@/lib/site-config';
import { generateBreadcrumbSchema } from '@/lib/seo-schema';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'Privacy' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: getCanonicalUrl(`/${locale}/privacy`),
            languages: {
                en: getCanonicalUrl('/en/privacy'),
                es: getCanonicalUrl('/es/privacy'),
            },
        },
    };
}

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Privacy' });
    const tCommon = await getTranslations({ locale, namespace: 'Footer' });
    
    const breadcrumbSchema = generateBreadcrumbSchema({
        locale,
        pageName: t('title'),
        pagePath: 'privacy'
    });

    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Header Section */}
            <div className="border-b border-white/5 bg-[#0f0f15]">
                <div className="container mx-auto px-4 py-16">
                    <BreadcrumbNav
                        locale={locale}
                        items={[
                            { label: locale === 'en' ? 'Home' : 'Inicio', href: `/${locale}` },
                            { label: t('title'), href: `/${locale}/privacy` }
                        ]}
                    />
                    
                    <div className="max-w-3xl mx-auto text-center mt-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500/10 rounded-2xl mb-6 border border-rose-500/20">
                            <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                            {t('description')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#12121a] rounded-2xl border border-white/5 p-8 md:p-12 space-y-12">
                        <section className="border-b border-white/5 pb-8 last:border-0">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-3">{t('section1Title')}</h2>
                                    <p className="text-zinc-400 leading-relaxed">{t('section1Content')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="border-b border-white/5 pb-8 last:border-0">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center border border-violet-500/20">
                                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-3">{t('section2Title')}</h2>
                                    <p className="text-zinc-400 leading-relaxed">{t('section2Content')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="border-b border-white/5 pb-8 last:border-0">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-3">{t('section3Title')}</h2>
                                    <p className="text-zinc-400 leading-relaxed">{t('section3Content')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="border-b border-white/5 pb-8 last:border-0">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-3">{t('section4Title')}</h2>
                                    <p className="text-zinc-400 leading-relaxed">{t('section4Content')}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20">
                                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-3">{t('section5Title')}</h2>
                                    <p className="text-zinc-400 leading-relaxed">{t('section5Content')}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
