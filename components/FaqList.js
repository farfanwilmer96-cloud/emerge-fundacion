'use client'
import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CATEGORIES = ['Todas', 'General', 'Donaciones', 'Voluntariado', 'Proyectos']

export default function FaqList({ faqs }) {
  const [openId, setOpenId] = useState(null)
  const [cat, setCat] = useState('Todas')

  const filtered = cat === 'Todas' ? faqs : faqs.filter(f => f.category === cat)

  return (
    <>
      <div className="flex gap-2 flex-wrap mt-8">
        {CATEGORIES.map(c => {
          const count = c === 'Todas' ? faqs.length : faqs.filter(f => f.category === c).length
          if (count === 0 && c !== 'Todas') return null
          return (
            <Button key={c} size="sm" variant={cat === c ? 'default' : 'outline'} onClick={() => { setCat(c); setOpenId(null) }} className={cat === c ? 'brand-gradient text-white border-0' : ''}>
              {c} <span className="ml-1.5 opacity-70 text-xs">({count})</span>
            </Button>
          )
        })}
      </div>

      <LayoutGroup>
        <motion.div layout className="mt-8 space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map(f => {
              const isOpen = openId === f.id
              return (
                <motion.div
                  key={f.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={`rounded-xl border overflow-hidden ${isOpen ? 'border-primary/40 shadow-lg bg-white' : 'border-border bg-white/60 hover:border-primary/30'}`}
                >
                  <motion.button
                    layout
                    onClick={() => setOpenId(isOpen ? null : f.id)}
                    className="w-full flex items-center gap-4 text-left p-5 md:p-6"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'brand-gradient text-white' : 'bg-primary/10 text-primary'}`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground border-border">{f.category}</Badge>
                      </div>
                      <h3 className="font-semibold text-base md:text-lg leading-snug">{f.question}</h3>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 pl-[76px]">
                          <div className="article-body text-[0.98rem]">
                            <ReactMarkdown>{f.body || ''}</ReactMarkdown>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </>
  )
}
