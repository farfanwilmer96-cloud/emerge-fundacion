'use client'
import { useEffect, useState } from 'react'
import { PanelsTopLeft, LogOut } from 'lucide-react'

/**
 * NetlifyIdentityHandler v2 — resistente a fallos comunes:
 * - Fuerza apertura del modal correcto según token en URL (invite/recovery/confirmation)
 * - Polling activo hasta 10s esperando al script del widget
 * - Preserva el hash si el widget aún no cargó
 * - Redirige a /admin/ tras login exitoso
 * - Banner flotante permanente para usuarios logueados
 */
export default function NetlifyIdentityHandler() {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // 1. Detectar tokens en URL INMEDIATAMENTE y preservarlos
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    const hasInvite = /[#&]invite_token=/.test(hash)
    const hasRecovery = /[#&]recovery_token=/.test(hash)
    const hasConfirmation = /[#&]confirmation_token=/.test(hash)
    const hasAnyToken = hasInvite || hasRecovery || hasConfirmation

    let attempts = 0
    const maxAttempts = 100 // 10 segundos

    const setup = () => {
      const ni = typeof window !== 'undefined' ? window.netlifyIdentity : null
      if (!ni) {
        attempts++
        if (attempts < maxAttempts) return setTimeout(setup, 100)
        console.warn('[Netlify Identity] widget no cargó tras 10s')
        return
      }

      // Handlers ANTES de init
      ni.on('login', (loggedUser) => {
        setUser(loggedUser)
        // Redirigir al panel si viene de un flujo de invite o si está en home
        const onPublicPage = typeof window !== 'undefined' && (
          window.location.pathname === '/' || window.location.pathname === ''
        )
        if (hasAnyToken || onPublicPage) {
          setTimeout(() => { window.location.href = '/admin/' }, 900)
        }
      })

      ni.on('logout', () => {
        setUser(null)
        setTimeout(() => { window.location.href = '/' }, 300)
      })

      ni.on('init', (initUser) => {
        setUser(initUser || null)
        setReady(true)

        // CRÍTICO: forzar apertura del modal correcto según el token detectado.
        // El widget lo hace solo la mayoría de las veces, pero acá lo garantizamos
        // por si el script cargó tarde y perdió la detección automática.
        if (hasInvite) {
          setTimeout(() => ni.open('signup'), 100)
        } else if (hasRecovery) {
          setTimeout(() => ni.open('login'), 100)
        } else if (hasConfirmation && !initUser) {
          setTimeout(() => ni.open('login'), 100)
        }
      })

      // Ejecutar init explícito
      try {
        ni.init()
      } catch (e) {
        console.warn('[Netlify Identity] init warning:', e)
      }
    }

    setup()
  }, [])

  const goToPanel = () => { window.location.href = '/admin/' }
  const logout = () => window.netlifyIdentity?.logout()

  // No renderizar nada si no hay usuario logueado
  if (!ready || !user) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-white shadow-2xl border border-primary/20 rounded-2xl p-3 pl-4 print:hidden">
      <div className="w-9 h-9 rounded-full brand-gradient flex items-center justify-center text-white text-sm font-bold">
        {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
      </div>
      <div className="text-sm">
        <div className="font-semibold leading-tight">Sesión iniciada</div>
        <div className="text-xs text-muted-foreground truncate max-w-[180px]">{user.email}</div>
      </div>
      <button onClick={goToPanel} className="ml-2 brand-gradient text-white px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 inline-flex items-center gap-1.5">
        <PanelsTopLeft className="w-4 h-4" /> Ir al panel
      </button>
      <button onClick={logout} className="p-2 text-muted-foreground hover:text-destructive" title="Cerrar sesión">
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  )
}
