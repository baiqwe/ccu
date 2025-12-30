/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-actual-domain.com';

module.exports = {
    siteUrl: siteUrl.replace(/\/$/, ''),
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
    exclude: [],
    alternateRefs: [
        {
            href: `${siteUrl.replace(/\/$/, '')}/en`,
            hreflang: 'en',
        },
        {
            href: `${siteUrl.replace(/\/$/, '')}/es`,
            hreflang: 'es',
        },
    ],
}
