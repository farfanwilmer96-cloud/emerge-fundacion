const SITE = process.env.NEXT_PUBLIC_BASE_URL
  || process.env.URL
  || 'https://clinquant-phoenix-0754e5.netlify.app'

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
