'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Loader, ArrowRight, Sprout, Images } from 'lucide-react'

const filters = [
  { key: 'todos', label: 'Todos' },
  { key: 'Activo', label: 'Activos', Icon: Loader },
  { key: 'Completado', label: 'Completados', Icon: CheckCircle2 },
]

export default function ProjectsGrid({ projects }) {
  const [f, setF] = useState('todos')
  const filtered = f === 'todos' ? projects : projects.filter(p => p.status === f)

  return (
    <>
      <div className="flex gap-2 flex-wrap mt-8">
        {filters.map(x => (
          <Button key={x.key} variant={f === x.key ? 'default' : 'outline'} size="sm" onClick={() => setF(x.key)} className={f === x.key ? 'brand-gradient text-white border-0' : ''}>
            {x.Icon && <x.Icon className="w-3.5 h-3.5 mr-1.5" />}{x.label}
            <span className="ml-2 opacity-70 text-xs">({x.key === 'todos' ? projects.length : projects.filter(p => p.status === x.key).length})</span>
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="border-dashed mt-8"><CardContent className="p-10 text-center text-muted-foreground">No hay proyectos en esta categoría.</CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map(p => (
            <Link key={p.id} href={`/proyectos/${p.slug}`} className="group">
              <Card className="overflow-hidden h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/10] relative bg-slate-200 overflow-hidden">
                  {p.cover_image ? (
                    <img src={p.cover_image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full brand-gradient flex items-center justify-center text-white"><Sprout className="w-10 h-10 opacity-60" /></div>
                  )}
                  <div className="absolute top-3 right-3">
                    {p.status === 'Activo' ? (
                      <Badge className="bg-emerald-500 text-white border-0 shadow-md"><Loader className="w-3 h-3 mr-1 animate-spin-slow" />Activo</Badge>
                    ) : (
                      <Badge className="bg-slate-700 text-white border-0 shadow-md"><CheckCircle2 className="w-3 h-3 mr-1" />Completado</Badge>
                    )}
                  </div>
                  {p.gallery && p.gallery.length > 0 && (
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-black/60 text-white border-0 backdrop-blur-sm"><Images className="w-3 h-3 mr-1" />{p.gallery.length}</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{p.short_description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4">Ver proyecto <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
