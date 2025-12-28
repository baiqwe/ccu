/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://domain.com',
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
            href: 'https://domain.com/en',
            hreflang: 'en',
        },
        {
            href: 'https://domain.com/es',
            hreflang: 'es',
        },
    ],
}
