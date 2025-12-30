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
        <div className="space-y-3">
            {relatedTools.map((tool) => (
                <Link
                    key={tool.id}
                    href={`/${locale}/${tool.slug}`}
                    className="block p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group"
                >
                    <h3 className="font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors text-sm">
                        {tool.name}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2">
                        {tool.description}
                    </p>
                </Link>
            ))}
        </div>
    );
}
