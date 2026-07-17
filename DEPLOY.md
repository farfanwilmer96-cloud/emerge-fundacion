# Despliegue a Producción — Funda Crecer

Este proyecto está listo para desplegarse en **Netlify** con **Decap CMS** administrado por el cliente.

---

## 🚀 De 0 a producción en 6 pasos

### 1. Subí el código a GitHub

```bash
cd /path/to/funda-crecer
git init
git add .
git commit -m "Initial commit — Funda Crecer"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/funda-crecer.git
git push -u origin main
```

### 2. Conectá el repo a Netlify

1. Ingresá a https://app.netlify.com → **Add new site → Import from Git**.
2. Autorizá GitHub y elegí el repo `funda-crecer`.
3. Netlify detectará automáticamente el `netlify.toml`. Confirmá **Deploy site**.
4. Esperá ~2 minutos. Netlify te dará una URL como `funda-crecer-abc123.netlify.app`.

### 3. Habilitá Netlify Identity (login de administradores)

1. En el panel de Netlify → **Site configuration → Identity → Enable Identity**.
2. En **Registration preferences** elegí **Invite only** (así sólo los invitados pueden entrar).
3. En **External providers** podés activar Google/GitHub si querés login social (opcional).

### 4. Habilitá Git Gateway (conecta Decap con GitHub)

1. Netlify → **Identity → Services → Git Gateway → Enable**.
2. Netlify se ocupa de todo: no necesitás crear tokens de GitHub manualmente.

### 5. Cambiá el backend del CMS a producción

Editá `public/admin/config.yml`:

```diff
 backend:
-  name: test-repo
+  name: git-gateway
+  branch: main
```

Commit y push. Netlify redeploya automáticamente.

### 6. Invitá al cliente

1. Netlify → **Identity → Invite users** → email del cliente.
2. El cliente recibirá un email con un link tipo `https://tusite.netlify.app/#invite_token=...`.
3. Al hacer clic será redirigido automáticamente al `/admin` y establecerá su contraseña.

Entregále al cliente el link `/manual` de tu propio sitio con la guía de 3 pasos. ✅

---

## 🔄 Flujo de publicación

```
 Cliente escribe noticia en /admin
           ↓
 Decap CMS commit al repo GitHub
           ↓
 Netlify detecta push → rebuild automático
           ↓
 Nueva noticia visible en el sitio (~90 segundos)
```

## 🖥️ Dominio propio

1. Netlify → **Domain management → Add custom domain** → `fundacrecer.org`.
2. Actualizá los DNS de tu proveedor apuntando a Netlify (te da las instrucciones).
3. SSL se activa gratis y automático (Let's Encrypt).

## 🛡️ Backups

Todo el contenido está en Git → tu repositorio de GitHub **ES** el backup. Cada publicación queda registrada con autor, fecha y diff.

---

## 🧪 Verificación local antes de subir

```bash
yarn build && yarn start
# Abrir http://localhost:3000
# Abrir http://localhost:3000/admin — Decap debe cargar
```

Para escribir realmente archivos `.md` en disco durante desarrollo local:

```bash
# Terminal 1
npx decap-server

# Terminal 2
yarn dev
```

Con `local_backend: true` en el config.yml, Decap escribe directamente en `content/news/*.md`.
