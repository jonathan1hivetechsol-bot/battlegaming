'use client';

import React from 'react';

interface OptimizedContentProps {
  slug: string;
  content?: string;
}

/**
 * Renders optimized account content with proper heading hierarchy (H2, H3, H4)
 * Converts markdown to HTML-like structure with semantic keywords
 */
export default function OptimizedAccountContent({ slug, content }: OptimizedContentProps) {
  // Simple markdown to JSX converter
  const renderMarkdownContent = (text: string) => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let buffer = '';

    const flushBuffer = (key: string | number) => {
      if (buffer.trim()) {
        elements.push(
          <p key={key} className="text-gray-300 leading-relaxed mb-4">
            {buffer.trim()}
          </p>
        );
        buffer = '';
      }
    };

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="space-y-2 mb-4 list-disc list-inside">
            {currentList.map((item, idx) => (
              <li key={idx} className="text-gray-300 ml-4">
                {item}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // H2 Headings
      if (line.startsWith('## ')) {
        flushBuffer(`p-${i}`);
        flushList();
        elements.push(
          <h2 key={`h2-${i}`} className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4">
            {line.replace('## ', '')}
          </h2>
        );
      }
      // H3 Headings
      else if (line.startsWith('### ')) {
        flushBuffer(`p-${i}`);
        flushList();
        elements.push(
          <h3 key={`h3-${i}`} className="text-xl font-bold text-[#FF7828] mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // H4 Headings
      else if (line.startsWith('#### ')) {
        flushBuffer(`p-${i}`);
        flushList();
        elements.push(
          <h4 key={`h4-${i}`} className="text-lg font-semibold text-white/90 mt-4 mb-2">
            {line.replace('#### ', '')}
          </h4>
        );
      }
      // Bullet Points
      else if (line.startsWith('- ')) {
        if (buffer.trim()) {
          flushBuffer(`p-${i}`);
        }
        currentList.push(line.replace(/^-\s+/, ''));
      }
      // Empty lines
      else if (line.trim() === '') {
        flushBuffer(`p-${i}`);
        flushList();
      }
      // Regular paragraph text
      else {
        if (currentList.length > 0) {
          flushList();
        }
        buffer += (buffer ? ' ' : '') + line;
      }
    }

    // Flush remaining buffer and list
    if (buffer.trim()) {
      flushBuffer('final-buffer');
    }
    if (currentList.length > 0) {
      flushList();
    }

    return elements;
  };

  if (!content) {
    return null;
  }

  return (
    <article className="prose prose-invert max-w-none space-y-6">
      {renderMarkdownContent(content)}
    </article>
  );
}
