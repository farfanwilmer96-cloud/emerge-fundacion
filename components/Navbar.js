'use client'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/faq', label: 'FAQ' },
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
          <motion.span whileHover={{ rotate: 12, scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }} className="w-9 h-9 rounded-lg brand-gradient flex items-center justify-center text-white"><Sprout className="w-5 h-5" /></motion.span>
          <span className="brand-text-gradient">Funda Crecer</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => l.external ? (
            <a key={l.href} href={l.href} target="_blank" rel="noopener" className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors">{l.label}</a>
          ) : (
            <Link key={l.href} href={l.href} className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors">{l.label}</Link>
          ))}
          <Button asChild size="sm" className="ml-2 brand-gradient text-white hover:opacity-90"><Link href="/contacto">Donar</Link></Button>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={open ? 'x' : 'm'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="md:hidden border-t border-border bg-white overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="container mx-auto px-4 py-3 flex flex-col gap-1"
            >
              {links.map(l => (
                <motion.div key={l.href} variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/5 hover:text-primary">{l.label}</a>
                  ) : (
                    <Link href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/5 hover:text-primary">{l.label}</Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
