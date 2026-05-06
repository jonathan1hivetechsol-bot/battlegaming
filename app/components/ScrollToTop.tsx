'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls to the top of the page (Hero section)
 * whenever the pathname changes (page navigation occurs).
 * 
 * This ensures users always start at the top of a new page,
 * not at the footer position from the previous page.
 * 
 * Usage:
 * Import in app/layout.tsx and place inside <body>
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top whenever pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render anything
  return null;
}
