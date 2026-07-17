import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, Cloud, ShieldCheck, GitBranch, Mail, Rocket, ArrowRight, CheckCircle2, ExternalLink, Terminal, Users } from 'lucide-react'

export const metadata = { title: 'Guía de despliegue — Funda Crecer' }

const steps = [
  { n: 1, Icon: Github, title: 'Subí a GitHub', desc: 'Un `git push` inicial de tu repositorio.', code: 'git init && git add . && git commit -m "Initial"\ngit remote add origin https://github.com/tu-usuario/funda-crecer.git\ngit push -u origin main' },
  { n: 2, Icon: Cloud, title: 'Conectá a Netlify', desc: 'Import from Git → elegir tu repo. Netlify detecta el netlify.toml y despliega solo.', link: { href: 'https://app.netlify.com/start', label: 'Abrir Netlify Deploy' } },
  { n: 3, Icon: ShieldCheck, title: 'Activá Identity', desc: 'En Netlify → Site configuration → Identity → Enable. Registro: Invite only.' },
  { n: 4, Icon: GitBranch, title: 'Activá Git Gateway', desc: 'Identity → Services → Git Gateway → Enable. Netlify se ocupa de los tokens.' },
  { n: 5, Icon: Terminal, title: 'Cambiá el backend del CMS', desc: 'Editá public/admin/config.yml y reemplaçá test-repo por git-gateway.', code: 'backend:\n  name: git-gateway   # antes: test-repo\n  branch: main' },
  { n: 6, Icon: Users, title: 'Invitá al cliente', desc: 'Identity → Invite users → email. El cliente recibe un enlace por email para crear su contraseña.' },
]

export default function DeployPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <Badge className="brand-gradient text-white border-0"><Rocket className="w-3 h-3 mr-1" /> Deploy Guide</Badge>
      <h1 className="text-4xl md:text-5xl font-bold mt-3">De cero a producción en <span className="brand-text-gradient">15 minutos</span></h1>
      <p className="text-lg text-muted-foreground mt-4 max-w-3xl">Todo lo necesario para llevar el sitio a un dominio real con panel de administración Git-based y despliegue automático en cada publicación.</p>

      <div className="mt-12 grid gap-5">
        {steps.map(s => (
          <Card key={s.n} className="border-border/70 hover:shadow-lg transition-shadow overflow-hidden">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
              <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 md:w-32 flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl brand-gradient text-white flex items-center justify-center flex-shrink-0"><s.Icon className="w-6 h-6" /></div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Paso</div>
                  <div className="text-3xl font-bold text-foreground/80">{String(s.n).padStart(2,'0')}</div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold">{s.title}</h2>
                <p className="text-foreground/75 mt-2 leading-relaxed">{s.desc}</p>
                {s.code && (
                  <pre className="mt-4 bg-slate-950 text-slate-100 rounded-lg p-4 text-xs overflow-x-auto"><code>{s.code}</code></pre>
                )}
                {s.link && (
                  <Button asChild variant="outline" size="sm" className="mt-4"><a href={s.link.href} target="_blank" rel="noopener">{s.link.label} <ExternalLink className="w-3 h-3 ml-2" /></a></Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Flujo de publicación */}
      <div className="mt-16 rounded-3xl bg-slate-950 text-white p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full brand-gradient opacity-30 blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold">Flujo de publicación automático</h2>
          <p className="text-slate-300 mt-2">Una vez configurado, esto ocurre solo:</p>
          <div className="grid md:grid-cols-4 gap-3 mt-8">
            {[
              { Icon: Users, l: 'Cliente escribe en /admin' },
              { Icon: GitBranch, l: 'Decap hace commit a GitHub' },
              { Icon: Cloud, l: 'Netlify rebuild automático' },
              { Icon: CheckCircle2, l: 'Noticia pública en ~90s' },
            ].map((x, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 relative">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center backdrop-blur-sm"><x.Icon className="w-6 h-6" /></div>
                <span className="text-sm text-slate-200">{x.l}</span>
                {i < 3 && <div className="hidden md:block absolute top-7 -right-2 text-white/30"><ArrowRight className="w-4 h-4" /></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bonuses */}
      <div className="mt-12 grid md:grid-cols-2 gap-5">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg text-emerald-900 flex items-center gap-2"><Mail className="w-5 h-5" /> Bonus: Contact form</h3>
            <p className="text-sm text-emerald-900/80 mt-2">Reemplazá el POST a /api/contact por <code className="bg-white/60 px-1.5 py-0.5 rounded">Netlify Forms</code> agregando <code className="bg-white/60 px-1.5 py-0.5 rounded">data-netlify="true"</code> al {'<form>'}. Recibís los mensajes por email sin backend.</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg text-blue-900 flex items-center gap-2"><Cloud className="w-5 h-5" /> Bonus: Dominio propio</h3>
            <p className="text-sm text-blue-900/80 mt-2">Netlify → Domain management → Add custom domain. SSL gratis automático con Let's Encrypt. Guiado y sin dolores.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Button asChild variant="outline"><Link href="/">Volver al sitio</Link></Button>
      </div>
    </div>
  )
}
