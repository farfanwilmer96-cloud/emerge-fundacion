import { getAllNews, getAllProjects, getAllFaqs } from '@/lib/content'

// Prioridad de URL:
// 1. NEXT_PUBLIC_BASE_URL (env explícita)
// 2. URL (auto-inyectada por Netlify en build time)
// 3. Fallback a URL real del sitio en Netlify
const SITE = process.env.NEXT_PUBLIC_BASE_URL
  || process.env.URL
  || 'https://clinquant-phoenix-0754e5.netlify.app'

export default function sitemap() {
  const now = new Date().toISOString()

  const staticRoutes = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/noticias`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/proyectos`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contacto`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]

  const newsRoutes = getAllNews().map(n => ({
    url: `${SITE}/noticias/${n.slug}`,
    lastModified: n.date ? new Date(n.date).toISOString() : now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const projectRoutes = getAllProjects().map(p => ({
    url: `${SITE}/proyectos/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...newsRoutes, ...projectRoutes]
}
