import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'About' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'About' });

    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">{t('title')}</h1>

            <div className="prose prose-slate max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('missionTitle')}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{t('missionContent')}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('storyTitle')}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{t('storyContent')}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('whyFreeTitle')}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{t('whyFreeContent')}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('technologyTitle')}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{t('technologyContent')}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('contactTitle')}</h2>
                    <p className="text-gray-600 leading-relaxed">{t('contactContent')}</p>
                </section>
            </div>
        </main>
    );
}
