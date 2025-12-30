'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { toolsConfig, getSlugByToolId } from '@/lib/tools-config';

interface ArticleSectionProps {
  toolId: string;
  locale: string;
}

export function ArticleSection({ toolId, locale }: ArticleSectionProps) {
  const t = useTranslations('Article');
  const tMetadata = useTranslations('Metadata');

  // Get related tools for contextual linking
  const currentTool = toolsConfig[toolId as keyof typeof toolsConfig];
  const relatedToolIds = currentTool?.relatedTools || [];

  // Helper function to create contextual links
  const createLink = (text: string, targetToolId: string) => {
    const slug = getSlugByToolId(targetToolId, locale);
    if (!slug) return <span>{text}</span>;
    
    return (
      <Link
        href={`/${locale}/${slug}`}
        className="text-purple-600 hover:text-purple-700 underline font-medium"
      >
        {text}
      </Link>
    );
  };

  // Helper function to render content with contextual links
  const renderContent = (contentKey: string) => {
    try {
      const content = t(`${toolId}.${contentKey}`) as string;
      
      // Split by double line breaks to get paragraphs
      return content.split('\n\n').map((paragraph, idx) => {
        // Process each paragraph to replace [toolId] placeholders with links
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        const regex = /\[(\w+)\]/g;
        let match;

        while ((match = regex.exec(paragraph)) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            parts.push(paragraph.substring(lastIndex, match.index));
          }
          
          // Add link if it's a related tool
          const matchedToolId = match[1];
          if (relatedToolIds.includes(matchedToolId)) {
            const toolName = tMetadata(`${matchedToolId}.h1`);
            parts.push(createLink(toolName, matchedToolId));
          } else {
            // If not a related tool, just show the text without brackets
            parts.push(match[0]);
          }
          
          lastIndex = regex.lastIndex;
        }
        
        // Add remaining text
        if (lastIndex < paragraph.length) {
          parts.push(paragraph.substring(lastIndex));
        }

        return (
          <p key={idx} className="mb-4 text-gray-600 leading-relaxed">
            {parts.length > 0 ? parts : paragraph}
          </p>
        );
      });
    } catch (error) {
      return null;
    }
  };

  try {
    const title = t(`${toolId}.title`);
    const definitionTitle = t(`${toolId}.definitionTitle`);
    const calculationTitle = t(`${toolId}.calculationTitle`);
    const applicationsTitle = t(`${toolId}.applicationsTitle`);
    const formula = t(`${toolId}.formula`, { defaultValue: '' });
    const formulaTitle = t(`${toolId}.formulaTitle`, { defaultValue: '' });

    return (
      <article className="max-w-none">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {title}
        </h2>

        {/* Introduction */}
        <section className="mb-10">
          <div className="text-gray-600 leading-relaxed space-y-4">
            {renderContent('introduction')}
          </div>
        </section>

        {/* Definition */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {definitionTitle}
          </h3>
          <div className="text-gray-600 leading-relaxed space-y-4">
            {renderContent('definition')}
          </div>
        </section>

        {/* Manual Calculation Steps */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {calculationTitle}
          </h3>
          <div className="text-gray-600 leading-relaxed space-y-4">
            {renderContent('calculation')}
          </div>
        </section>

        {/* Applications */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {applicationsTitle}
          </h3>
          <div className="text-gray-600 leading-relaxed space-y-4">
            {renderContent('applications')}
          </div>
        </section>

        {/* Mathematical Formula (if exists) */}
        {formula && (
          <section className="mb-8 bg-purple-50 p-6 rounded-lg border border-purple-200">
            {formulaTitle && (
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {formulaTitle}
              </h3>
            )}
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: formula }}
            />
          </section>
        )}
      </article>
    );
  } catch (error) {
    // If translations are missing, return null (graceful degradation)
    return null;
  }
}

