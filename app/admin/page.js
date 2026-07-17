'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit3, Save, X, Sparkles, Calendar, User, ImageIcon, Link2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').slice(0,80)

const emptyForm = { title:'', slug:'', cover_image:'', date: new Date().toISOString().slice(0,10), author:'', body:'' }

export default function AdminPage() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/news')
      const data = await res.json()
      setNews(data.news || [])
    } catch { toast.error('Error cargando noticias') }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleTitleChange = (v) => setForm(f => ({ ...f, title: v, slug: editingId ? f.slug : slugify(v) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.body.trim()) { toast.error('Título y contenido son obligatorios'); return }
    setSaving(true)
    try {
      const url = editingId ? `/api/news/${editingId}` : '/api/news'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type':'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      toast.success(editingId ? 'Noticia actualizada' : '¡Noticia publicada!')
      setForm(emptyForm); setEditingId(null); setShowForm(false)
      load()
    } catch { toast.error('Error al guardar') }
    setSaving(false)
  }

  const handleEdit = (n) => { setForm({ title:n.title, slug:n.slug, cover_image:n.cover_image||'', date:n.date?.slice(0,10)||'', author:n.author||'', body:n.body||'' }); setEditingId(n.id); setShowForm(true); window.scrollTo({top:0, behavior:'smooth'}) }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta noticia?')) return
    try {
      await fetch(`/api/news/${id}`, { method:'DELETE' })
      toast.success('Noticia eliminada'); load()
    } catch { toast.error('Error al eliminar') }
  }

  const cancel = () => { setForm(emptyForm); setEditingId(null); setShowForm(false) }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <Badge className="brand-gradient text-white border-0"><Sparkles className="w-3 h-3 mr-1" /> Panel CMS</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mt-3">Gestión de Noticias</h1>
          <p className="text-muted-foreground mt-1">Publicá, editá y eliminá el contenido de tu web. Todo se refleja en vivo.</p>
        </div>
        {!showForm && <Button onClick={() => setShowForm(true)} className="brand-gradient text-white"><Plus className="w-4 h-4 mr-2" /> Nueva noticia</Button>}
      </div>

      {showForm && (
        <Card className="border-primary/20 mb-10 shadow-lg">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">{editingId ? <><Edit3 className="w-5 h-5" /> Editar noticia</> : <><Plus className="w-5 h-5" /> Nueva noticia</>}</CardTitle>
              <Button variant="ghost" size="sm" onClick={cancel}><X className="w-4 h-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>Título *</Label>
                <Input value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Ej: Inauguramos la biblioteca comunitaria" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-1"><Link2 className="w-3 h-3" /> Slug (URL amigable)</Label>
                  <Input value={form.slug} onChange={e => setForm({...form, slug: slugify(e.target.value)})} placeholder="inauguramos-biblioteca" />
                  <p className="text-xs text-muted-foreground mt-1">Ruta: /noticias/{form.slug || 'tu-slug'}</p>
                </div>
                <div>
                  <Label className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Fecha</Label>
                  <Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-1"><User className="w-3 h-3" /> Autor</Label>
                  <Input value={form.author} onChange={e => setForm({...form, author: e.target.value})} placeholder="Equipo Funda Crecer" />
                </div>
                <div>
                  <Label className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Imagen de portada (URL)</Label>
                  <Input value={form.cover_image} onChange={e => setForm({...form, cover_image: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              {form.cover_image && (
                <div className="rounded-lg overflow-hidden border border-border aspect-[16/6] bg-slate-100">
                  <img src={form.cover_image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                </div>
              )}
              <div>
                <Label>Contenido *</Label>
                <Textarea rows={10} value={form.body} onChange={e => setForm({...form, body: e.target.value})} placeholder="Escribí el cuerpo de la noticia. Podés usar HTML básico: <p>, <strong>, <em>, <a href='...'>, <h2>, <ul><li>..." className="font-mono text-sm" />
                <p className="text-xs text-muted-foreground mt-1">Admite HTML enriquecido. Ej: <code className="bg-muted px-1 rounded">&lt;p&gt;texto&lt;/p&gt;</code></p>
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={saving} className="brand-gradient text-white">
                  {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...</> : <><Save className="w-4 h-4 mr-2" /> {editingId ? 'Actualizar' : 'Publicar'}</>}
                </Button>
                <Button type="button" variant="outline" onClick={cancel}>Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        <h2 className="font-semibold text-lg">Publicaciones ({news.length})</h2>
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : news.length === 0 ? (
          <Card className="border-dashed"><CardContent className="p-10 text-center text-muted-foreground">No hay noticias todavía. Creá la primera.</CardContent></Card>
        ) : news.map(n => (
          <Card key={n.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden">
                {n.cover_image ? <img src={n.cover_image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full brand-gradient" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{n.title}</h3>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-3 flex-wrap">
                  <span>/{n.slug}</span>
                  <span>{new Date(n.date).toLocaleDateString('es-ES')}</span>
                  {n.author && <span>· {n.author}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(n)}><Edit3 className="w-4 h-4" /></Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(n.id)} className="text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
