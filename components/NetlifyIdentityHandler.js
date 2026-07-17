'use client'
import { useEffect, useState } from 'react'
import { LogIn, PanelsTopLeft, LogOut } from 'lucide-react'

/**
 * Widget de Netlify Identity — robusto:
 * - Espera activamente a que el script global cargue (polling)
 * - Registra el handler de login ANTES de que se dispare
 * - Redirige automáticamente a /admin/ tras aceptar el invite
 * - Muestra un banner flotante si el usuario ya está logueado
 * - Provee un botón "Entrar al panel" si detecta el token en la URL
 */
export default function NetlifyIdentityHandler() {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let attempts = 0
    const maxAttempts = 100 // 10 segundos máximo

    const setup = () => {
      const ni = window.netlifyIdentity
      if (!ni) {
        attempts++
        if (attempts < maxAttempts) return setTimeout(setup, 100)
        console.warn('Netlify Identity no cargó')
        return
      }

      // Handler que se dispara AL COMPLETAR el invite / login
      ni.on('login', (loggedUser) => {
        setUser(loggedUser)
        // Solo redirigimos si el usuario acaba de loguearse (no ya venía logueado)
        const inviteToken = /invite_token=|recovery_token=|confirmation_token=/.test(window.location.hash)
        const onHome = window.location.pathname === '/' || window.location.pathname === ''
        if (inviteToken || onHome) {
          setTimeout(() => { window.location.href = '/admin/' }, 800)
        }
      })

      ni.on('logout', () => setUser(null))
      ni.on('init', (initUser) => {
        setUser(initUser || null)
        setReady(true)
      })

      // Fuerza init si aún no lo hizo
      if (!ni.currentUser()) {
        ni.init()
      } else {
        setUser(ni.currentUser())
        setReady(true)
      }
    }

    setup()
  }, [])

  const openLogin = () => window.netlifyIdentity?.open('login')
  const goToPanel = () => { window.location.href = '/admin/' }
  const logout = () => window.netlifyIdentity?.logout()

  if (!ready || !user) return null

  // Banner flotante cuando el usuario está logueado
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
