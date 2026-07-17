import Link from 'next/link'
import { Sprout, Mail, MapPin, Phone, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950 text-slate-200 mt-16">
      <div className="container mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-bold text-lg text-white">
            <span className="w-9 h-9 rounded-lg brand-gradient flex items-center justify-center"><Sprout className="w-5 h-5" /></span>
            Funda Crecer
          </div>
          <p className="mt-4 text-sm text-slate-400 max-w-md">Sembramos oportunidades, cosechamos futuro. Trabajamos por comunidades más justas, educadas y resilientes.</p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors"><Icon className="w-4 h-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-secondary">Inicio</Link></li>
            <li><Link href="/noticias" className="hover:text-secondary">Noticias</Link></li>
            <li><Link href="/proyectos" className="hover:text-secondary">Proyectos</Link></li>
            <li><Link href="/faq" className="hover:text-secondary">Preguntas frecuentes</Link></li>
            <li><Link href="/contacto" className="hover:text-secondary">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-secondary" /> Av. Solidaridad 123, Ciudad</li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-secondary" /> hola@fundacrecer.org</li>
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-secondary" /> +00 000 000 000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-5 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Funda Crecer — Todos los derechos reservados.</span>
          <span>Hecho con propósito.</span>
        </div>
      </div>
    </footer>
  )
}
