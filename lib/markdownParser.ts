import { marked } from 'marked';

/**
 * Configure marked options for proper rendering
 */
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Convert Markdown to HTML
 * Properly handles headings (#, ##, ###, etc)
 * 
 * @param markdown - Markdown text to convert
 * @returns HTML string
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  try {
    const html = marked(markdown);
    return typeof html === 'string' ? html : html.toString();
  } catch (error) {
    console.error('Markdown parsing error:', error);
    // Fallback: return markdown with basic newline handling
    return markdown.replace(/\n/g, '<br/>');
  }
}
