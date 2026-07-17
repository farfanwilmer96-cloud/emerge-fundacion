import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, CheckCircle2, Loader, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllProjects, getProjectBySlug } from '@/lib/content'
import Gallery from '@/components/Gallery'

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = getProjectBySlug(slug)
  if (!p) return { title: 'Proyecto no encontrado — Funda Crecer' }
  return { title: `${p.name} — Funda Crecer`, description: p.short_description }
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params
  const p = getProjectBySlug(slug)
  if (!p) notFound()

  return (
    <article>
      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden bg-slate-200">
        {p.cover_image ? (
          <img src={p.cover_image} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full brand-gradient flex items-center justify-center"><Sprout className="w-16 h-16 text-white/60" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10 text-white">
            <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 mb-4 -ml-3"><Link href="/proyectos"><ArrowLeft className="w-4 h-4 mr-2" /> Volver a proyectos</Link></Button>
            <div className="flex items-center gap-3 mb-3">
              {p.status === 'Activo' ? (
                <Badge className="bg-emerald-500 text-white border-0"><Loader className="w-3 h-3 mr-1" />En curso</Badge>
              ) : (
                <Badge className="bg-slate-700 text-white border-0"><CheckCircle2 className="w-3 h-3 mr-1" />Completado</Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold max-w-4xl leading-tight">{p.name}</h1>
            <p className="text-white/85 mt-3 max-w-3xl text-lg">{p.short_description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="article-body">
          <ReactMarkdown>{p.body || ''}</ReactMarkdown>
        </div>

        {p.gallery && p.gallery.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold">Galería</h2>
            <p className="text-muted-foreground text-sm mt-1">{p.gallery.length} imágenes — hacé clic para ampliar.</p>
            <Gallery images={p.gallery} />
          </div>
        )}

        <div className="mt-14 border-t border-border pt-8 flex justify-between flex-wrap gap-4">
          <Button asChild variant="outline"><Link href="/proyectos"><ArrowLeft className="w-4 h-4 mr-2" /> Todos los proyectos</Link></Button>
          <Button asChild className="brand-gradient text-white"><Link href="/contacto">Sumate a este proyecto</Link></Button>
        </div>
      </div>
    </article>
  )
}
