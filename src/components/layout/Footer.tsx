'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer({ locale }: { locale: string }) {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-slate-50 to-slate-100 border-t border-gray-200 mt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* About Section */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">{t('aboutTitle')}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{t('aboutText')}</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">{t('quickLinksTitle')}</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={`/${locale}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                                    {t('home')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/about`} className="text-gray-600 hover:text-blue-600 transition-colors">
                                    {t('about')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">{t('legalTitle')}</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={`/${locale}/privacy`} className="text-gray-600 hover:text-blue-600 transition-colors">
                                    {t('privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/terms`} className="text-gray-600 hover:text-blue-600 transition-colors">
                                    {t('terms')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-200 pt-6 text-center">
                    <p className="text-sm text-gray-500">
                        © {currentYear} {t('copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
