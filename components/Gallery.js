'use client'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Gallery({ images }) {
  const [open, setOpen] = useState(null)
  if (!images || images.length === 0) return null

  const next = () => setOpen((open + 1) % images.length)
  const prev = () => setOpen((open - 1 + images.length) % images.length)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
        {images.map((img, i) => (
          <button key={i} onClick={() => setOpen(i)} className="aspect-square rounded-xl overflow-hidden bg-slate-200 group">
            <img src={typeof img === 'string' ? img : img.image} alt={`Imagen ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20" onClick={(e) => { e.stopPropagation(); setOpen(null) }}><X className="w-5 h-5" /></button>
          <button className="absolute left-4 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20" onClick={(e) => { e.stopPropagation(); prev() }}><ChevronLeft className="w-6 h-6" /></button>
          <button className="absolute right-4 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20" onClick={(e) => { e.stopPropagation(); next() }}><ChevronRight className="w-6 h-6" /></button>
          <img src={typeof images[open] === 'string' ? images[open] : images[open].image} alt="" className="max-h-[85vh] max-w-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <div className="absolute bottom-4 text-white/80 text-sm">{open+1} / {images.length}</div>
        </div>
      )}
    </>
  )
}
