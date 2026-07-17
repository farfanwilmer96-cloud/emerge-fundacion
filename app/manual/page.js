import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, LogIn, PenSquare, Send } from 'lucide-react'

export const metadata = { title: 'Manual del Cliente — Funda Crecer' }

const steps = [
  {
    Icon: LogIn,
    n: '01',
    title: 'Entrá al panel',
    body: 'Abrí en tu navegador la dirección de tu sitio y agregá /admin al final. Por ejemplo: fundacrecer.org/admin. Se abrirá una ventanita donde ingresarás con el correo y contraseña que te enviaremos por email.',
  },
  {
    Icon: PenSquare,
    n: '02',
    title: 'Escribí tu noticia',
    body: 'Hacé clic en el botón “Nueva entrada” dentro de la sección Noticias. Completá el título, la fecha, subí una foto de portada y escribí tu texto usando los botones de negrita, listas o imágenes. Es como usar Word.',
  },
  {
    Icon: Send,
    n: '03',
    title: 'Publicala',
    body: 'Cuando termines, apretá el botón verde “Publicar” arriba a la derecha. Tu noticia aparecerá automáticamente en la página principal del sitio y en la sección de noticias, en menos de un minuto.',
  },
]

export default function ManualPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Badge className="brand-gradient text-white border-0">Guía rápida</Badge>
      <h1 className="text-4xl md:text-5xl font-bold mt-3">Publicá tu primera noticia en 3 pasos</h1>
      <p className="text-lg text-muted-foreground mt-3">Sin conocimientos técnicos. Sin instalar nada. Desde cualquier computadora.</p>

      <div className="mt-12 space-y-6">
        {steps.map(s => (
          <Card key={s.n} className="border-border/70 hover:shadow-lg transition-shadow">
            <CardContent className="p-8 flex gap-6 items-start">
              <div className="hidden md:flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl brand-gradient text-white flex items-center justify-center"><s.Icon className="w-6 h-6" /></div>
                <span className="text-3xl font-bold text-muted-foreground/40">{s.n}</span>
              </div>
              <div>
                <div className="flex items-center gap-3 md:hidden mb-3">
                  <div className="w-10 h-10 rounded-xl brand-gradient text-white flex items-center justify-center"><s.Icon className="w-5 h-5" /></div>
                  <span className="text-xl font-bold text-muted-foreground/60">Paso {s.n}</span>
                </div>
                <h2 className="text-2xl font-bold">{s.title}</h2>
                <p className="text-foreground/80 mt-2 leading-relaxed">{s.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-10 bg-emerald-50 border-emerald-200">
        <CardContent className="p-8">
          <h3 className="font-bold text-lg text-emerald-900">¿Lo probás ahora?</h3>
          <p className="text-emerald-900/80 mt-1 text-sm">Abrí el panel en modo demostración. Vas a ver la interfaz exacta que usarás cuando el sitio esté en el aire.</p>
          <Button asChild className="mt-4 brand-gradient text-white"><a href="/admin" target="_blank" rel="noopener">Abrir panel /admin <ArrowRight className="w-4 h-4 ml-2" /></a></Button>
        </CardContent>
      </Card>

      <div className="mt-10 p-6 rounded-xl bg-slate-50 border border-border">
        <p className="text-sm text-muted-foreground"><strong className="text-foreground">Consejo:</strong> guardá en tus marcadores la dirección <code className="bg-white px-2 py-0.5 rounded border">tusitio.org/admin</code> para acceder rápido siempre que quieras publicar.</p>
      </div>

      <div className="mt-8 text-center">
        <Button asChild variant="outline"><Link href="/">Volver al sitio</Link></Button>
      </div>
    </div>
  )
}
