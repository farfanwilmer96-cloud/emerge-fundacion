'use client'
import { Sprout, Download, Github, Cloud, ShieldCheck, GitBranch, Mail, Rocket, Globe, Users, Terminal, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function GuiaPage() {
  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de acción — NO se imprime */}
      <div className="print:hidden sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sprout className="w-4 h-4 text-primary" />
            <span>Guía de despliegue — Funda Crecer</span>
          </div>
          <Button onClick={handlePrint} className="brand-gradient text-white">
            <Download className="w-4 h-4 mr-2" /> Descargar PDF
          </Button>
        </div>
      </div>

      <div className="guia-doc container mx-auto px-4 md:px-8 py-10 max-w-4xl">
        {/* PORTADA */}
        <header className="mb-12 pb-8 border-b-2 border-primary/20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-14 h-14 rounded-2xl brand-gradient flex items-center justify-center text-white">
              <Sprout className="w-7 h-7" />
            </span>
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Manual de despliegue</div>
              <div className="text-2xl font-bold brand-text-gradient">Funda Crecer</div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Guía paso a paso para publicar tu sitio web en internet</h1>
          <p className="text-lg text-muted-foreground mt-4">Desde tu computadora hasta un sitio profesional en vivo. Sin conocimientos técnicos avanzados.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium"><Rocket className="w-3.5 h-3.5" />15–20 minutos</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary font-medium"><ShieldCheck className="w-3.5 h-3.5" />100% gratuito</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium">7 pasos</span>
          </div>
        </header>

        {/* PREREQUISITOS */}
        <section className="mb-10 break-inside-avoid">
          <h2 className="section-title">🎯 Antes de empezar (1 sola vez)</h2>
          <p>Necesitás tener tres cosas listas antes de comenzar. Todas son gratuitas:</p>
          <ol className="checklist">
            <li><strong>Cuenta de GitHub</strong> — Creala en <span className="url">https://github.com/signup</span></li>
            <li><strong>Cuenta de Netlify</strong> — Creala en <span className="url">https://app.netlify.com/signup</span> (te recomendamos entrar <em>con GitHub</em> para que se conecten automáticamente)</li>
            <li><strong>Git instalado en tu computadora</strong> — Descargalo desde <span className="url">https://git-scm.com</span> (siguiente-siguiente-terminar)</li>
          </ol>
        </section>

        {/* PASO 1 */}
        <section className="step-block">
          <div className="step-header"><span className="step-num">01</span><h2><Download className="inline w-6 h-6 mr-2 text-primary" />Descargar el código</h2></div>
          <p>En la plataforma donde construiste el sitio, buscá el botón <strong>"Download code"</strong> (arriba a la derecha) y descargá el ZIP.</p>
          <p>Descomprimí el archivo en una carpeta fácil de encontrar. Por ejemplo:</p>
          <pre className="code">Documentos/funda-crecer/</pre>
        </section>

        {/* PASO 2 */}
        <section className="step-block">
          <div className="step-header"><span className="step-num">02</span><h2><Github className="inline w-6 h-6 mr-2 text-primary" />Subir el código a GitHub</h2></div>

          <h3>2A. Crear el repositorio vacío</h3>
          <ol className="ordered">
            <li>Ingresá a <span className="url">https://github.com/new</span></li>
            <li>En <strong>Repository name</strong> escribí: <code>funda-crecer</code></li>
            <li>Dejá <strong>Public</strong> o <strong>Private</strong> (ambos funcionan igual)</li>
            <li><strong>NO tildes</strong> las casillas de "Add README", "Add .gitignore" ni "License"</li>
            <li>Clic en <strong>Create repository</strong></li>
            <li>GitHub te muestra una URL similar a esta — copiala:</li>
          </ol>
          <pre className="code">https://github.com/tu-usuario/funda-crecer.git</pre>

          <h3>2B. Subir el código desde tu computadora</h3>
          <p>Abrí una terminal:</p>
          <ul className="bullet">
            <li>En <strong>Windows:</strong> abrí <em>Git Bash</em> (se instaló junto con Git)</li>
            <li>En <strong>Mac:</strong> abrí <em>Terminal</em></li>
          </ul>
          <p>Ejecutá estos comandos <strong>uno por uno</strong>, cambiando <code>tu-usuario</code> por el tuyo real:</p>
          <pre className="code">cd Documentos/funda-crecer
git init
git add .
git commit -m "Sitio Funda Crecer - versión inicial"
git branch -M main
git remote add origin https://github.com/tu-usuario/funda-crecer.git
git push -u origin main</pre>
          <div className="info-box">
            💡 Si es la primera vez que usás Git, pedirá tu usuario y contraseña de GitHub (o abrirá el navegador para autenticarte). Es normal.
          </div>
          <p>Cuando termine, refrescá la página de GitHub. Vas a ver <strong>todos los archivos</strong> subidos. ✅</p>
        </section>

        {/* PASO 3 */}
        <section className="step-block">
          <div className="step-header"><span className="step-num">03</span><h2><Cloud className="inline w-6 h-6 mr-2 text-primary" />Conectar Netlify con GitHub</h2></div>
          <ol className="ordered">
            <li>Ingresá a <span className="url">https://app.netlify.com</span></li>
            <li>Clic en <strong>Add new site → Import an existing project</strong></li>
            <li>Elegí <strong>Deploy with GitHub</strong></li>
            <li>Autorizá a Netlify a leer tus repositorios (ventana emergente)</li>
            <li>Buscá <code>funda-crecer</code> en la lista y hacé clic</li>
            <li>Netlify detecta el archivo <code>netlify.toml</code> del proyecto y auto-configura:
              <ul className="bullet mt-1">
                <li>Build command: <code>yarn build</code> ✅</li>
                <li>Publish directory: <code>.next</code> ✅</li>
                <li>Plugin Next.js: activado ✅</li>
              </ul>
            </li>
            <li>Clic en <strong>Deploy funda-crecer</strong></li>
            <li>Esperá 2–3 minutos. Verás los logs en vivo</li>
          </ol>
          <div className="success-box">
            🎉 Al terminar aparece una URL tipo <strong>https://funda-crecer-abc123.netlify.app</strong>. ¡Tu sitio ya está online!
          </div>
        </section>

        {/* PASO 4 */}
        <section className="step-block">
          <div className="step-header"><span className="step-num">04</span><h2><ShieldCheck className="inline w-6 h-6 mr-2 text-primary" />Activar el acceso privado al panel (Netlify Identity)</h2></div>
          <p><strong>Este paso es crítico:</strong> asegura que solo vos (y quienes invites por email) puedan entrar al panel. Nadie más.</p>

          <h3>4A. Habilitar Identity</h3>
          <ol className="ordered">
            <li>En Netlify, dentro de tu sitio, entrá a <strong>Site configuration</strong> (menú lateral izquierdo)</li>
            <li>Bajá hasta <strong>Identity</strong> → clic en <strong>Enable Identity</strong></li>
            <li>Buscá <strong>Registration preferences</strong> → clic en <strong>Edit settings</strong></li>
            <li>Cambiá de "Open" a <strong>"Invite only"</strong></li>
            <li>Guardá</li>
          </ol>
          <div className="warning-box">
            ⚠️ <strong>Muy importante:</strong> este cambio (Open → Invite only) es lo que impide que cualquier persona en internet pueda registrarse. Si lo dejás en "Open", cualquiera podría crearse cuenta.
          </div>

          <h3>4B. Habilitar Git Gateway</h3>
          <p>Conecta el panel CMS con tu repositorio de GitHub. Netlify maneja los permisos automáticamente.</p>
          <ol className="ordered">
            <li>En la misma pantalla de Identity, bajá hasta <strong>Services → Git Gateway</strong></li>
            <li>Clic en <strong>Enable Git Gateway</strong></li>
          </ol>
        </section>

        {/* PASO 5 */}
        <section className="step-block">
          <div className="step-header"><span className="step-num">05</span><h2><Terminal className="inline w-6 h-6 mr-2 text-primary" />Configurar variable de entorno (recomendado)</h2></div>
          <p>Para que los links del sitemap, OpenGraph y JSON-LD apunten a tu dominio de Netlify:</p>
          <ol className="ordered">
            <li>Netlify → <strong>Site configuration → Environment variables</strong></li>
            <li>Clic en <strong>Add a variable</strong></li>
            <li>Nombre: <code>NEXT_PUBLIC_BASE_URL</code></li>
            <li>Valor: la URL completa de tu sitio, ej: <code>https://clinquant-phoenix-0754e5.netlify.app</code></li>
            <li>Guardá y trigger un nuevo deploy (Deploys → Trigger deploy → Clear cache and deploy site)</li>
          </ol>
          <div className="info-box">
            💡 <strong>El backend del CMS ya está configurado como <code>git-gateway</code> por defecto</strong> en el código. No necesitás modificar nada más para que funcione en producción.
          </div>
        </section>

        {/* PASO 6 */}
        <section className="step-block">
          <div className="step-header"><span className="step-num">06</span><h2><Users className="inline w-6 h-6 mr-2 text-primary" />Invitarte a vos mismo al panel</h2></div>
          <ol className="ordered">
            <li>En Netlify → <strong>Identity</strong> → clic en <strong>Invite users</strong></li>
            <li>Escribí tu email → <strong>Send</strong></li>
            <li>Revisá tu bandeja de entrada (puede caer en <strong>Spam</strong> la primera vez)</li>
            <li>En el email, clic en <strong>Accept the invite</strong></li>
            <li>Se abre tu sitio → establecé tu contraseña</li>
            <li>Serás redirigido automáticamente al panel. Vas a ver 3 colecciones:
              <ul className="bullet mt-1">
                <li>📰 <strong>Noticias</strong></li>
                <li>🎯 <strong>Proyectos</strong></li>
                <li>❓ <strong>Preguntas Frecuentes</strong></li>
              </ul>
            </li>
          </ol>
          <div className="success-box">
            ✅ <strong>¡Ya podés publicar!</strong> Cada cambio se refleja en el sitio en unos 90 segundos.
          </div>
        </section>

        {/* PASO 7 */}
        <section className="step-block">
          <div className="step-header"><span className="step-num">07</span><h2><Globe className="inline w-6 h-6 mr-2 text-primary" />(Opcional) Conectar tu dominio propio</h2></div>
          <p>Si tenés un dominio como <code>fundacrecer.org</code>:</p>
          <ol className="ordered">
            <li>Netlify → <strong>Domain management → Add custom domain</strong></li>
            <li>Escribí tu dominio</li>
            <li>Netlify te muestra los DNS que debés configurar en tu proveedor (donde compraste el dominio)</li>
            <li>Cambiá los DNS ahí. Tarda entre 10 minutos y 24 horas en propagarse</li>
            <li>SSL/HTTPS se activa gratis y automáticamente 🔒</li>
          </ol>
        </section>

        {/* USO DIARIO */}
        <section className="highlight-block">
          <h2 className="!mt-0"><Rocket className="inline w-6 h-6 mr-2" />📱 Uso diario después del deploy</h2>

          <h3>Para publicar una noticia nueva:</h3>
          <ol className="ordered">
            <li>Andá a <code>tusitio.netlify.app/admin</code> (o <code>fundacrecer.org/admin</code>)</li>
            <li>Iniciá sesión con tu email y contraseña</li>
            <li>Clic en <strong>📰 Noticias → Nueva Noticia</strong></li>
            <li>Completá título, fecha, subí imagen, escribí el texto con el editor visual</li>
            <li>Clic en <strong>Publish</strong> (arriba a la derecha)</li>
            <li>En ~90 segundos aparece en el sitio ✅</li>
          </ol>

          <h3>Para invitar a otra persona:</h3>
          <p>Netlify → Identity → <strong>Invite users</strong> → email → listo.</p>

          <h3>¿Alguien más puede entrar?</h3>
          <p><strong>NO.</strong> Si un visitante intenta abrir <code>/admin</code>, verá una pantalla de login. Sin invitación previa (Invite only), el sistema rechaza cualquier registro. Tu contenido está seguro.</p>
        </section>

        {/* ERRORES COMUNES */}
        <section className="mb-10">
          <h2 className="section-title"><AlertTriangle className="inline w-6 h-6 mr-2 text-amber-500" />Errores comunes y soluciones</h2>
          <table className="error-table">
            <thead>
              <tr><th>Problema</th><th>Solución</th></tr>
            </thead>
            <tbody>
              <tr><td>Build falla en Netlify</td><td>Revisá los logs. Suele ser problema del <code>yarn.lock</code>. Ejecutá <code>yarn install</code> local, commiteá y pusheá de nuevo.</td></tr>
              <tr><td>No recibí el email de invitación</td><td>Revisá <strong>Spam</strong>. Si no llega, borrá la invitación en Netlify y volvela a enviar.</td></tr>
              <tr><td>El /admin muestra "config.yml not found"</td><td>Verificá que <code>public/admin/config.yml</code> esté en el repo de GitHub.</td></tr>
              <tr><td>Publico pero no se actualiza el sitio</td><td>Netlify → Deploys → ver si hay error. El plan gratis permite 300 min/mes de build, más que suficiente.</td></tr>
              <tr><td>Perdí mi contraseña</td><td>En el login del panel clic en "Forgot password". Netlify te envía un email para restablecerla.</td></tr>
            </tbody>
          </table>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 pt-8 border-t-2 border-primary/20 text-center">
          <div className="flex items-center justify-center gap-2 text-primary font-bold text-lg mb-2">
            <Sprout className="w-5 h-5" /> Funda Crecer
          </div>
          <p className="text-sm text-muted-foreground">Sembramos oportunidades, cosechamos futuro.</p>
          <p className="text-xs text-muted-foreground/70 mt-4">Guía de despliegue · Documento interno</p>
        </footer>
      </div>

      {/* Estilos específicos del documento y para impresión */}
      <style jsx global>{`
        .guia-doc { color: #0f172a; }
        .guia-doc p { line-height: 1.75; margin: 0.8em 0; color: #334155; }
        .guia-doc .section-title { font-size: 1.75rem; font-weight: 700; margin: 1.5em 0 0.8em; color: hsl(217 91% 25%); border-bottom: 2px solid hsl(217 91% 32% / 0.15); padding-bottom: 0.4em; }
        .guia-doc .step-block { margin: 2em 0; padding-bottom: 1.5em; border-bottom: 1px dashed #e2e8f0; break-inside: avoid; page-break-inside: avoid; }
        .guia-doc .step-block:last-of-type { border-bottom: none; }
        .guia-doc .step-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1em; }
        .guia-doc .step-num { display: inline-flex; align-items: center; justify-content: center; width: 3.5rem; height: 3.5rem; border-radius: 1rem; background: linear-gradient(135deg, hsl(217 91% 32%) 0%, hsl(160 84% 39%) 100%); color: white; font-weight: 800; font-size: 1.4rem; flex-shrink: 0; box-shadow: 0 4px 12px rgba(30, 64, 175, 0.25); }
        .guia-doc .step-header h2 { font-size: 1.7rem; font-weight: 700; margin: 0; color: #0f172a; }
        .guia-doc h3 { font-size: 1.15rem; font-weight: 700; margin: 1.4em 0 0.5em; color: hsl(217 91% 25%); }
        .guia-doc code { background: #f1f5f9; padding: 0.15em 0.45em; border-radius: 0.35rem; font-size: 0.92em; color: hsl(217 91% 32%); font-family: 'Courier New', monospace; border: 1px solid #e2e8f0; }
        .guia-doc .code { background: #0f172a; color: #f1f5f9; padding: 1em 1.2em; border-radius: 0.6rem; font-family: 'Courier New', monospace; font-size: 0.88rem; line-height: 1.65; margin: 1em 0; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }
        .guia-doc .url { display: inline-block; background: hsl(217 91% 96%); color: hsl(217 91% 32%); padding: 0.1em 0.5em; border-radius: 0.35rem; font-family: 'Courier New', monospace; font-size: 0.9em; border: 1px solid hsl(217 91% 88%); }
        .guia-doc .ordered { list-style: decimal; padding-left: 1.6em; margin: 0.8em 0; }
        .guia-doc .ordered li { margin: 0.5em 0; line-height: 1.6; color: #334155; }
        .guia-doc .bullet { list-style: disc; padding-left: 1.4em; margin: 0.6em 0; }
        .guia-doc .bullet li { margin: 0.3em 0; color: #475569; }
        .guia-doc .checklist { list-style: none; padding: 0; margin: 1em 0; }
        .guia-doc .checklist li { position: relative; padding: 0.7em 0.7em 0.7em 2.5em; margin: 0.5em 0; background: #f8fafc; border-left: 3px solid hsl(160 84% 39%); border-radius: 0.4rem; }
        .guia-doc .checklist li::before { content: "✓"; position: absolute; left: 0.8em; top: 0.8em; width: 1.2em; height: 1.2em; background: hsl(160 84% 39%); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.75em; }
        .guia-doc .info-box { background: hsl(217 91% 97%); border-left: 4px solid hsl(217 91% 32%); padding: 0.9em 1.2em; border-radius: 0 0.5rem 0.5rem 0; margin: 1.2em 0; color: hsl(217 91% 20%); font-size: 0.95rem; }
        .guia-doc .success-box { background: hsl(160 84% 96%); border-left: 4px solid hsl(160 84% 39%); padding: 0.9em 1.2em; border-radius: 0 0.5rem 0.5rem 0; margin: 1.2em 0; color: hsl(160 84% 20%); font-size: 0.95rem; }
        .guia-doc .warning-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 0.9em 1.2em; border-radius: 0 0.5rem 0.5rem 0; margin: 1.2em 0; color: #78350f; font-size: 0.95rem; }
        .guia-doc .highlight-block { background: linear-gradient(135deg, hsl(217 91% 97%) 0%, hsl(160 84% 96%) 100%); padding: 2em; border-radius: 1rem; margin: 2em 0; border: 1px solid hsl(217 91% 88%); page-break-inside: avoid; break-inside: avoid; }
        .guia-doc .highlight-block h2 { font-size: 1.5rem; font-weight: 700; color: hsl(217 91% 25%); }
        .guia-doc .highlight-block h3 { margin-top: 1.2em; }
        .guia-doc .error-table { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 0.92rem; }
        .guia-doc .error-table th { background: hsl(217 91% 32%); color: white; padding: 0.75em 1em; text-align: left; font-weight: 600; }
        .guia-doc .error-table td { border: 1px solid #e2e8f0; padding: 0.75em 1em; vertical-align: top; }
        .guia-doc .error-table tr:nth-child(even) td { background: #f8fafc; }

        /* IMPRESIÓN OPTIMIZADA PARA PDF */
        @media print {
          @page { size: A4; margin: 1.5cm; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: white !important; }
          header, footer, nav, .sticky, [class*="Toaster"] { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; }
          .guia-doc { max-width: 100% !important; padding: 0 !important; margin: 0 !important; font-size: 10.5pt; }
          .guia-doc .step-num { width: 2.8rem; height: 2.8rem; font-size: 1.1rem; }
          .guia-doc .step-header h2 { font-size: 1.35rem; }
          .guia-doc .section-title { font-size: 1.4rem; }
          .guia-doc h1 { font-size: 1.9rem; }
          .guia-doc .code { background: #f1f5f9 !important; color: #0f172a !important; border: 1px solid #cbd5e1; font-size: 8.5pt; }
          .guia-doc .step-block { page-break-inside: avoid; break-inside: avoid; }
          .guia-doc .highlight-block { page-break-inside: avoid; break-inside: avoid; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  )
}
