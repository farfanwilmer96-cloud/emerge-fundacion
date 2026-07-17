const SITE = process.env.NEXT_PUBLIC_BASE_URL || 'https://fundacrecer.org'

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
