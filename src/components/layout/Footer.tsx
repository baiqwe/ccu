'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer({ locale }: { locale: string }) {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a0a0f] text-zinc-400 border-t border-white/5 mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <h3 className="font-bold text-white text-lg mb-4">{t('aboutTitle')}</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed mb-4 max-w-md">
                            {t('aboutText')}
                        </p>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>100% Free • No Registration • Client-Side Only</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('quickLinksTitle')}</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href={`/${locale}`} className="text-zinc-500 hover:text-white transition-colors">
                                    {t('home')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/about`} className="text-zinc-500 hover:text-white transition-colors">
                                    {t('about')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('legalTitle')}</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href={`/${locale}/privacy`} className="text-zinc-500 hover:text-white transition-colors">
                                    {t('privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/terms`} className="text-zinc-500 hover:text-white transition-colors">
                                    {t('terms')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/5 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-zinc-600">
                            © {currentYear} {t('copyright')}
                        </p>
                        <div className="flex items-center gap-2 text-zinc-600 text-sm font-mono">
                            <span>Built with TypeScript • Next.js • Tailwind CSS</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
