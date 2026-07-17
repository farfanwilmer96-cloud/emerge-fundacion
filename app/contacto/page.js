'use client'
import { useState } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function ContactoPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Ingresá tu nombre (mín. 2 caracteres)'
    if (!form.email.trim()) e.email = 'El correo es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo inválido'
    if (form.phone && !/^[\d\s+()-]{6,}$/.test(form.phone)) e.phone = 'Teléfono inválido'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'El mensaje debe tener al menos 10 caracteres'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('fail')
      setStatus('success')
      toast.success('¡Mensaje enviado! Te responderemos pronto.')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
      toast.error('No pudimos enviar tu mensaje. Intentá de nuevo.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <Badge variant="outline" className="border-secondary/40 text-secondary">Escribinos</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">Hagamos crecer algo juntos</h1>
          <p className="text-muted-foreground mt-4 text-lg">Sea para donar, ofrecer voluntariado o proponer una alianza, tu mensaje llega directo a nuestro equipo.</p>
          <div className="mt-8 space-y-4">
            {[{Icon:Mail,l:'hola@fundacrecer.org'},{Icon:Phone,l:'+00 000 000 000'},{Icon:MapPin,l:'Av. Solidaridad 123, Ciudad'}].map((it,i)=>(
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><it.Icon className="w-5 h-5" /></div>
                <span className="text-foreground/80">{it.l}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="border-border/60 shadow-lg">
          <CardContent className="p-8">
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4"><CheckCircle2 className="w-8 h-8" /></div>
                <h3 className="text-2xl font-bold">¡Mensaje enviado!</h3>
                <p className="text-muted-foreground mt-2">Gracias por escribirnos. Te responderemos en menos de 48 h.</p>
                <Button className="mt-6" variant="outline" onClick={() => setStatus('idle')}>Enviar otro mensaje</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input id="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="María Pérez" className={errors.name ? 'border-destructive' : ''} />
                  {errors.name && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Correo *</Label>
                    <Input id="email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="maria@correo.com" className={errors.email ? 'border-destructive' : ''} />
                    {errors.email && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono (opcional)</Label>
                    <Input id="phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+00 000 000 000" className={errors.phone ? 'border-destructive' : ''} />
                    {errors.phone && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea id="message" rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Contanos en qué te podemos ayudar..." className={errors.message ? 'border-destructive' : ''} />
                  {errors.message && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                </div>
                {status === 'error' && (
                  <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Ocurrió un error. Intentá nuevamente.</div>
                )}
                <Button type="submit" disabled={status==='loading'} className="w-full brand-gradient text-white hover:opacity-90" size="lg">
                  {status === 'loading' ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...</>) : (<><Send className="w-4 h-4 mr-2" /> Enviar mensaje</>)}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
