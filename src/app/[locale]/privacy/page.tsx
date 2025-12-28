import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'Privacy' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'Privacy' });

    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">{t('title')}</h1>

            <div className="prose prose-slate max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('section1Title')}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{t('section1Content')}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('section2Title')}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{t('section2Content')}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('section3Title')}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{t('section3Content')}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('section4Title')}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{t('section4Content')}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('section5Title')}</h2>
                    <p className="text-gray-600 leading-relaxed">{t('section5Content')}</p>
                </section>
            </div>
        </main>
    );
}
