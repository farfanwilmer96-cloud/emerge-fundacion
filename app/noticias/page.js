import Link from 'next/link'
import { Calendar, ArrowRight, Sprout } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

async function getAllNews() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || ''
    const res = await fetch(`${base}/api/news`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return data.news || []
  } catch { return [] }
}

export default async function NoticiasPage() {
  const news = await getAllNews()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl">
        <Badge variant="outline" className="border-primary/30 text-primary">Blog & Noticias</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-3">Historias que inspiran</h1>
        <p className="text-muted-foreground mt-3 text-lg">Novedades de nuestros proyectos, campañas y comunidad.</p>
      </div>

      {news.length === 0 ? (
        <Card className="border-dashed mt-10">
          <CardContent className="p-12 text-center">
            <h3 className="font-semibold text-lg">Sin noticias todavía</h3>
            <p className="text-muted-foreground text-sm mt-1">Publicá desde <Link className="text-primary underline" href="/admin">/admin</Link> y aparecerán acá al instante.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {news.map(n => (
            <Link key={n.id} href={`/noticias/${n.slug}`} className="group">
              <Card className="overflow-hidden h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/10] relative bg-slate-200 overflow-hidden">
                  {n.cover_image ? (
                    <img src={n.cover_image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full brand-gradient flex items-center justify-center text-white"><Sprout className="w-10 h-10 opacity-60" /></div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(n.date).toLocaleDateString('es-ES',{year:'numeric',month:'long',day:'numeric'})}</span>
                    {n.author && <span>· {n.author}</span>}
                  </div>
                  <h3 className="font-bold text-lg mt-2 group-hover:text-primary transition-colors line-clamp-2">{n.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{(n.body || '').replace(/<[^>]+>/g,'').slice(0,160)}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4">Leer más <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
