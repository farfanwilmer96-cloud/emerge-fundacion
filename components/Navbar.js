'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/manual', label: 'Manual' },
  { href: '/deploy', label: 'Deploy' },
  { href: '/admin', label: 'CMS', external: true },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="w-9 h-9 rounded-lg brand-gradient flex items-center justify-center text-white"><Sprout className="w-5 h-5" /></span>
          <span className="brand-text-gradient">Funda Crecer</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => l.external ? (
            <a key={l.href} href={l.href} target="_blank" rel="noopener" className="px-4 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors">{l.label}</a>
          ) : (
            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors">{l.label}</Link>
          ))}
          <Button asChild size="sm" className="ml-2 brand-gradient text-white hover:opacity-90"><Link href="/contacto">Donar</Link></Button>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map(l => l.external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noopener" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/5 hover:text-primary">{l.label}</a>
            ) : (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/5 hover:text-primary">{l.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
