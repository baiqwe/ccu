'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { toolsConfig } from '@/lib/tools-config';

interface RelatedToolsProps {
    currentToolId: string;
    locale: string;
}

export function RelatedTools({ currentToolId, locale }: RelatedToolsProps) {
    const t = useTranslations('Metadata');
    const tCommon = useTranslations('Common');

    const currentTool = toolsConfig[currentToolId as keyof typeof toolsConfig];
    if (!currentTool || !currentTool.relatedTools) return null;

    const relatedTools = currentTool.relatedTools.map(toolId => {
        const tool = toolsConfig[toolId as keyof typeof toolsConfig];
        return {
            id: toolId,
            name: t(`${toolId}.h1`),
            slug: tool.slugs[locale as keyof typeof tool.slugs],
            description: t(`${toolId}.description`)
        };
    });

    if (relatedTools.length === 0) return null;

    return (
        <section className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {tCommon('relatedTools')}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                {relatedTools.map((tool) => (
                    <Link
                        key={tool.id}
                        href={`/${locale}/${tool.slug}`}
                        className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group"
                    >
                        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                            {tool.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
