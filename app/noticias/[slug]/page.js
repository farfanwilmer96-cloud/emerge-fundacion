import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, User, ArrowLeft, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'

async function getNews(slug) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || ''
    const res = await fetch(`${base}/api/news/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.news || null
  } catch { return null }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const n = await getNews(slug)
  if (!n) return { title: 'Noticia no encontrada — Funda Crecer' }
  return { title: `${n.title} — Funda Crecer`, description: (n.body || '').replace(/<[^>]+>/g,'').slice(0,150) }
}

export default async function NoticiaDetail({ params }) {
  const { slug } = await params
  const n = await getNews(slug)
  if (!n) notFound()

  return (
    <article>
      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden bg-slate-200">
        {n.cover_image ? (
          <img src={n.cover_image} alt={n.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full brand-gradient flex items-center justify-center"><Sprout className="w-16 h-16 text-white/60" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10 text-white">
            <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 mb-4 -ml-3"><Link href="/noticias"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</Link></Button>
            <h1 className="text-3xl md:text-5xl font-bold max-w-4xl leading-tight">{n.title}</h1>
            <div className="flex items-center gap-4 mt-4 text-sm text-white/85">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(n.date).toLocaleDateString('es-ES',{year:'numeric',month:'long',day:'numeric'})}</span>
              {n.author && <span className="flex items-center gap-1"><User className="w-4 h-4" /> {n.author}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-primary" dangerouslySetInnerHTML={{ __html: n.body || '' }} />

        <div className="mt-14 border-t border-border pt-8 flex justify-between flex-wrap gap-4">
          <Button asChild variant="outline"><Link href="/noticias"><ArrowLeft className="w-4 h-4 mr-2" /> Todas las noticias</Link></Button>
          <Button asChild className="brand-gradient text-white"><Link href="/contacto">Sumate a la causa</Link></Button>
        </div>
      </div>
    </article>
  )
}
