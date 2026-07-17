import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MessagesSquare, Heart } from 'lucide-react'
import { getAllFaqs } from '@/lib/content'
import FaqList from '@/components/FaqList'

export const metadata = { title: 'Preguntas Frecuentes — Funda Crecer' }

export default function FaqPage() {
  const faqs = getAllFaqs()

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Badge variant="outline" className="border-secondary/40 text-secondary"><MessagesSquare className="w-3 h-3 mr-1" /> Ayuda</Badge>
      <h1 className="text-4xl md:text-5xl font-bold mt-3">Preguntas frecuentes</h1>
      <p className="text-muted-foreground mt-3 text-lg">Respuestas rápidas a lo que más nos preguntan.</p>

      {faqs.length === 0 ? (
        <Card className="border-dashed mt-8">
          <CardContent className="p-10 text-center text-muted-foreground">Aún no hay preguntas cargadas.</CardContent>
        </Card>
      ) : (
        <FaqList faqs={faqs} />
      )}

      <Card className="mt-12 brand-gradient text-white border-0 overflow-hidden relative">
        <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-white/10" />
        <CardContent className="p-8 md:p-10 relative z-10">
          <Heart className="w-8 h-8 mb-3" />
          <h3 className="text-2xl font-bold">¿No encontraste tu respuesta?</h3>
          <p className="text-white/85 mt-1 mb-5">Escribínos y respondemos en menos de 48 h.</p>
          <Button asChild variant="secondary" className="bg-white text-primary hover:bg-emerald-50"><Link href="/contacto">Ir al formulario</Link></Button>
        </CardContent>
      </Card>
    </div>
  )
}
