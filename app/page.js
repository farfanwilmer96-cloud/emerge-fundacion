import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { ArrowRight, Heart, Users, BookOpen, Sparkles, Calendar, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllNews } from '@/lib/content'

export default function HomePage() {
  const news = getAllNews().slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 brand-gradient opacity-95" />
          <Image src="https://images.unsplash.com/photo-1614710791641-4cd7a5c855f2" alt="" fill className="object-cover mix-blend-overlay opacity-40" priority />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-32 text-white">
          <Badge className="bg-white/15 hover:bg-white/20 text-white border-white/20 mb-6"><Sparkles className="w-3 h-3 mr-1" /> ONG con impacto real desde 2015</Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-[1.05]">
            Sembramos oportunidades, <span className="text-emerald-300">cosechamos futuro.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl">Acompañamos a niñas, niños y comunidades vulnerables con educación, nutrición y programas que transforman realidades.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-emerald-50 font-semibold">
              <Link href="/contacto"><Heart className="w-4 h-4 mr-2" /> Quiero donar</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
              <Link href="/noticias">Ver noticias <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-3 max-w-lg gap-6">
            {[{n:'12K+',l:'Vidas alcanzadas'},{n:'38',l:'Proyectos activos'},{n:'450+',l:'Voluntarios'}].map(s => (
              <div key={s.l}>
                <div className="text-3xl md:text-4xl font-bold">{s.n}</div>
                <div className="text-xs md:text-sm text-white/70 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="border-primary/30 text-primary">Nuestros pilares</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">Trabajamos donde más se necesita</h2>
          <p className="text-muted-foreground mt-3">Tres líneas de acción, un mismo compromiso: dignidad, educación y comunidad.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {Icon: BookOpen, title: 'Educación', desc: 'Becas, refuerzo escolar y bibliotecas comunitarias en zonas rurales.', color: 'from-blue-500 to-blue-600'},
            {Icon: Users, title: 'Comunidad', desc: 'Fortalecemos redes vecinales y liderazgos locales sostenibles.', color: 'from-emerald-500 to-emerald-600'},
            {Icon: Heart, title: 'Bienestar', desc: 'Nutrición, salud básica y contención emocional para las familias.', color: 'from-rose-500 to-rose-600'},
          ].map(p => (
            <Card key={p.title} className="border-border/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center mb-5`}>
                  <p.Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* LATEST NEWS - DYNAMIC FROM CMS */}
      <section className="bg-slate-50 py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <Badge variant="outline" className="border-secondary/40 text-secondary">Últimas publicaciones</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">Noticias recientes</h2>
              <p className="text-muted-foreground mt-2">Actualizadas desde el panel <Link href="/admin" className="text-primary underline">/admin</Link> — Decap CMS.</p>
            </div>
            <Button asChild variant="outline"><Link href="/noticias">Ver todas <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
          </div>

          {news.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <h3 className="font-semibold text-lg">Aún no hay noticias publicadas</h3>
                <p className="text-muted-foreground text-sm mt-1">Publicá desde <Link href="/admin" className="text-primary underline">/admin</Link>.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
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
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(n.date).toLocaleDateString('es-ES', {year:'numeric',month:'long',day:'numeric'})}</span>
                        {n.author && <span>· {n.author}</span>}
                      </div>
                      <h3 className="font-bold text-lg mt-2 group-hover:text-primary transition-colors line-clamp-2">{n.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{(n.body || '').replace(/[#*_>`]/g,'').slice(0,140)}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4">Leer más <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl brand-gradient p-10 md:p-16 text-white">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold">Tu ayuda multiplica esperanza.</h2>
            <p className="mt-3 text-white/85">Con tu aporte mensual sostenés programas educativos y comedores en 6 comunidades.</p>
            <Button asChild size="lg" className="mt-6 bg-white text-primary hover:bg-emerald-50 font-semibold"><Link href="/contacto">Sumate hoy</Link></Button>
          </div>
          <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -right-24 top-8 w-56 h-56 rounded-full bg-white/5" />
        </div>
      </section>
    </>
  )
}
