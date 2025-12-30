/**
 * Site configuration utilities
 * Centralizes site URL management using environment variables
 */

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.your-actual-domain.com';
  
  // Remove trailing slash if present
  return url.replace(/\/$/, '');
}

export function getCanonicalUrl(path: string): string {
  const baseUrl = getSiteUrl();
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

