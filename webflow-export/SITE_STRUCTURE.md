# Estructura del Sitio — Referencia para Webflow

El sitio actual tiene 5 páginas públicas + varias privadas. Al migrar a Webflow, replicá la estructura de las 5 públicas.

---

## 🏠 1. Home (`/`)

### Secciones (en orden vertical):

1. **Navbar sticky** — logo + links (Inicio, Noticias, Proyectos, FAQ, Contacto) + botón Donar
2. **Hero** — gradient azul-esmeralda, título grande, subtítulo, 2 CTAs, 3 estadísticas
3. **Pilares** — 3 cards en grid: Educación, Comunidad, Bienestar
4. **Noticias recientes** — grid de 3 cards con las últimas 3 noticias (CMS Collection List, límite 3)
5. **FAQ preview** — sticky sidebar título + 4 preguntas resumidas linkeadas a /faq
6. **CTA final** — banner gradient con "Tu ayuda multiplica esperanza" + botón
7. **Footer** — 3 columnas: brand + navegación + contacto

### Elementos dinámicos (CMS Collection Lists):
- "Noticias recientes": Collection List de **Noticias**, sort by "Published On" DESC, limit 3
- "FAQ preview": Collection List de **FAQs**, sort by "Order" ASC, limit 4

---

## 📰 2. Noticias (`/noticias`)

### Estructura:
1. Navbar
2. **Header de sección** — Badge "Blog & Noticias" + título "Historias que inspiran" + subtítulo
3. **Grid completo** — CMS Collection List de **Noticias**, 3 columnas desktop / 2 tablet / 1 mobile
4. Footer

### Card de noticia (template dentro del Collection List):
- Imagen de portada (aspect 16:10)
- Fecha + autor (meta)
- Título (2 líneas máx, line-clamp)
- Resumen (3 líneas máx)
- "Leer más →"

---

## 📄 3. Noticia individual (`/noticias/[slug]`)

En Webflow: **Collection Page** de la colección Noticias.

### Estructura:
1. Navbar
2. **Hero de artículo** — imagen full-width con overlay oscuro:
   - Botón "← Volver" (arriba)
   - Título grande blanco
   - Fecha + autor (meta)
3. **Cuerpo del artículo** — max-width 720px, contenido Rich Text con estilos:
   - H2: azul institucional
   - Blockquote: borde izquierdo esmeralda + fondo verde suave
   - Listas: bullets/números
4. **Footer del artículo** — divisor + 2 botones: "Todas las noticias" y "Sumate a la causa"
5. Footer

---

## 🎯 4. Proyectos (`/proyectos`)

### Estructura:
1. Navbar
2. **Header** — Badge "Nuestro trabajo" + título "Proyectos y campañas"
3. **Filtros** — 3 botones: Todos · Activos · Completados (con contadores)
4. **Grid** — Collection List de **Proyectos**, cards con:
   - Imagen portada
   - Badge de estado (verde "Activo" / gris "Completado") arriba a la derecha
   - Badge de galería ("N imágenes") abajo a la izquierda si tiene gallery
   - Nombre + descripción corta
5. Footer

### En Webflow:
- Los filtros se hacen con **Tabs component** que muestran/ocultan diferentes Collection Lists con distintos filtros por Status

---

## 📁 5. Proyecto individual (`/proyectos/[slug]`)

**Collection Page** de Proyectos.

### Estructura:
1. Navbar
2. **Hero de proyecto** — igual que noticia pero con badge de estado y descripción corta
3. **Cuerpo** — Rich text del campo Body
4. **Galería** — grid 3 columnas con las imágenes del campo Gallery
   - Al hacer clic: lightbox (usar **Lightbox component** de Webflow)
5. **Footer del proyecto** — 2 botones: "Todos los proyectos" y "Sumate a este proyecto"
6. Footer

---

## ❓ 6. FAQ (`/faq`)

### Estructura:
1. Navbar
2. **Header** — Badge "Ayuda" + título "Preguntas frecuentes"
3. **Filtros por categoría** — Tabs component o botones que filtran el Collection List
4. **Acordeón** — CMS Collection List de **FAQs**, sort by Order:
   - Estado colapsado: pregunta + badge categoría + chevron
   - Estado expandido: se abre la respuesta debajo (Interaction Click)
5. **CTA final** — Card gradient "¿No encontraste tu respuesta?" + link a contacto
6. Footer

---

## 📧 7. Contacto (`/contacto`)

### Estructura:
1. Navbar
2. **Grid 2 columnas:**
   - Izquierda: Título + descripción + info de contacto (email, teléfono, dirección con íconos)
   - Derecha: **Formulario** con campos:
     - Nombre completo (requerido, min 2 caracteres)
     - Correo (requerido, formato email)
     - Teléfono (opcional)
     - Mensaje (requerido, min 10 caracteres)
     - Botón "Enviar mensaje" con estados loading/success/error
3. Footer

### En Webflow:
- Usá **Form Block** nativo — Webflow envía notificaciones por email automáticamente
- Estados de éxito/error se manejan con las **Success/Error messages** del Form Block
- Validación: usar `required`, `type="email"`, `minlength` en cada input

---

## 🌐 Rutas y Slugs

| Ruta actual (Next.js) | Ruta equivalente en Webflow |
|-----------------------|------------------------------|
| `/`                   | `/` (Home)                   |
| `/noticias`           | `/noticias` (Static page)    |
| `/noticias/[slug]`    | `/noticias/[slug]` (CMS Collection Page) |
| `/proyectos`          | `/proyectos`                 |
| `/proyectos/[slug]`   | `/proyectos/[slug]` (CMS Collection Page) |
| `/faq`                | `/faq`                       |
| `/contacto`           | `/contacto`                  |

En Webflow, para que las Collection Pages usen ese path: **Collection Settings → Collection URL** poné `noticias` (no `blog`).

---

## 📊 SEO — a reconfigurar en Webflow

En Webflow → Site settings → SEO:

1. **Título por defecto:** `Funda Crecer — Sembramos oportunidades, cosechamos futuro`
2. **Meta description:** `ONG dedicada al desarrollo comunitario, educación y esperanza para las nuevas generaciones.`
3. **Open Graph image:** subí una imagen 1200x630px
4. **Sitemap:** activado por defecto en Webflow
5. **Robots.txt:** editable en Site settings → SEO

Para SEO por página / por item CMS:
- En cada Collection Item (noticia/proyecto): pestaña **SEO** → Meta Title, Meta Description, Open Graph Image
- Usar el campo `Name` como Meta Title dinámico: `{{ wf { "path": "name" } }}`

---

## 🎨 Recursos incluidos en el paquete

- **CSVs con todo el contenido:** listos para importar
- **Guía de marca:** paleta, tipografía, componentes
- **Referencia estructural:** este archivo

Con esto tenés todo para reconstruir el sitio en Webflow en ~4-8 horas de trabajo del diseñador.
