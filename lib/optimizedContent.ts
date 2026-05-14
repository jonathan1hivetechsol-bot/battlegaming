import fs from 'fs';
import path from 'path';

/**
 * Loads optimized 1500+ word content for an account from generated markdown files
 */
export function getOptimizedAccountContent(slug: string): string | null {
  try {
    const contentDir = path.join(process.cwd(), 'account_content');
    const filePath = path.join(contentDir, `${slug}-1500-words.md`);

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return content;
    }

    return null;
  } catch (error) {
    console.error(`Error loading optimized content for ${slug}:`, error);
    return null;
  }
}

/**
 * Loads the accounts index page content
 */
export function getAccountsIndexContent(): string | null {
  try {
    const contentDir = path.join(process.cwd(), 'account_content');
    const filePath = path.join(contentDir, 'accounts-index-seo.md');

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return content;
    }

    return null;
  } catch (error) {
    console.error('Error loading accounts index content:', error);
    return null;
  }
}

/**
 * Extracts H1 title from markdown content
 */
export function extractTitleFromContent(content: string): string | null {
  const h1Match = content.match(/^# (.+)$/m);
  return h1Match ? h1Match[1] : null;
}

/**
 * Extracts word count from markdown content
 */
export function getContentWordCount(content: string): number {
  const text = content
    .replace(/^#+\s+.+$/gm, '') // Remove headings
    .replace(/^-\s+.+$/gm, '') // Remove bullet points
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1'); // Remove italics

  const words = text
    .split(/\s+/)
    .filter(word => word.length > 0);

  return words.length;
}
