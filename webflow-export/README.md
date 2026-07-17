# Guía de Migración a Webflow — Funda Crecer

Este paquete contiene todo lo necesario para reconstruir el sitio en Webflow. Como Webflow es un editor visual, la migración requiere **recrear el diseño** en su Designer, pero el **contenido y assets ya están listos para importar**.

---

## 📦 Contenido del paquete

```
webflow-export/
├── README.md                    ← este archivo
├── webflow-noticias.csv         ← 3 noticias listas para importar
├── webflow-proyectos.csv        ← 3 proyectos listos para importar
├── webflow-faqs.csv             ← 6 preguntas frecuentes
├── BRAND_GUIDE.md               ← paleta de colores, tipografía, estilos
├── SITE_STRUCTURE.md            ← estructura página por página
└── export.js                    ← script para regenerar CSVs si agregás más contenido
```

---

## 🚀 Paso a paso para migrar

### Paso 1 — Crear el sitio en Webflow

1. Ingresá a https://webflow.com y creá una cuenta (o iniciá sesión)
2. Clic en **Create new site** → elegí **Blank site**
3. Nombre: `funda-crecer`

### Paso 2 — Configurar el diseño base

Abrí `BRAND_GUIDE.md` y aplicá los valores en Webflow Designer:

1. **Style Guide → Colors:** cargá los 6 colores de la paleta institucional
2. **Style Guide → Typography:** configurá Inter como fuente principal
3. **Style Guide → Rounded corners y sombras:** aplicá los valores indicados

### Paso 3 — Crear las 3 colecciones del CMS

En Webflow Designer → **CMS → Create Collection**:

**Colección 1: "Noticias"**

| Field Name        | Field Type        | Required |
|-------------------|-------------------|----------|
| Name              | Plain text (default)| ✅      |
| Slug              | Slug (default)    | ✅      |
| Post Summary      | Plain text (255)  | ✅      |
| Post Body         | Rich text         | ✅      |
| Main Image        | Image             | ✅      |
| Author            | Plain text        | ❌      |
| Published On      | Date/Time         | ✅      |
| Featured          | Switch (bool)     | ❌      |

**Colección 2: "Proyectos"**

| Field Name        | Field Type        | Required |
|-------------------|-------------------|----------|
| Name              | Plain text        | ✅      |
| Slug              | Slug              | ✅      |
| Short Description | Plain text        | ✅      |
| Body              | Rich text         | ❌      |
| Status            | Option: [Activo, Completado] | ✅      |
| Cover Image       | Image             | ❌      |
| Gallery           | Multi-image       | ❌      |

**Colección 3: "FAQs"**

| Field Name | Field Type                        | Required |
|------------|-----------------------------------|----------|
| Name       | Plain text (la pregunta)          | ✅      |
| Slug       | Slug                              | ✅      |
| Category   | Option: [General, Donaciones, Voluntariado, Proyectos] | ✅ |
| Order      | Number                            | ❌      |
| Answer     | Rich text                         | ✅      |

### Paso 4 — Importar los CSVs

Dentro de cada colección en Webflow:

1. Clic en **Import CSV** (botón arriba a la derecha)
2. Subí el CSV correspondiente:
   - `webflow-noticias.csv` → colección **Noticias**
   - `webflow-proyectos.csv` → colección **Proyectos**
   - `webflow-faqs.csv` → colección **FAQs**
3. Webflow te muestra el mapeo de columnas → verificá que cada columna del CSV mapee al campo correcto
4. Clic en **Import**

Webflow descargará automáticamente las imágenes de las URLs del CSV a tus Assets.

### Paso 5 — Reconstruir las páginas

Abrí `SITE_STRUCTURE.md` para ver:
- Qué páginas tiene el sitio
- Qué componentes contiene cada una
- Cómo se estructuran (Hero, Grid de tarjetas, CTA, etc.)

En Webflow Designer creá cada página y usá los CMS Collection Lists para mostrar el contenido dinámico.

### Paso 6 — Configurar dominio y publicar

1. Webflow → Site settings → Publishing → conectar dominio propio
2. Publish → tu sitio está online

---

## 🔄 Si querés agregar más contenido antes de migrar

El sitio actual sigue funcionando en Netlify. Si publicás noticias nuevas desde `/admin` antes de migrar, después regenerá los CSVs:

```bash
cd /app
node webflow-export/export.js
```

Esto actualiza los tres CSVs con TODO el contenido actualizado del sitio.

---

## ⚠️ Consideraciones importantes

1. **Costo:** Webflow CMS cuesta ~USD 29/mes (plan CMS) o USD 39/mes (plan Business para +10k items). El plan actual con Netlify + Decap es **gratis**.

2. **URLs cambiarán:** Los links de las noticias actuales (`/noticias/[slug]`) pasarán a ser `/blog/[slug]` en Webflow por defecto (depende de cómo nombres la colección). Podés configurar los slugs de cada item para preservar la SEO histórica.

3. **SEO:** El sitemap XML, robots.txt y JSON-LD que teníamos configurados los tenés que **reconfigurar en Webflow** (Site settings → SEO).

4. **Formularios:** El formulario de contacto actual (Next.js + MongoDB) NO se migra. Usá Webflow Forms nativo, que se integra con email automáticamente.

5. **Animaciones:** Las animaciones de Framer Motion (FAQ acordeón, scroll reveals, menú móvil) hay que **recrearlas** en Webflow Interactions.

---

## 💡 Alternativa: quedarte con el sitio actual

Antes de migrar, considerá esto:

| Item | Sitio actual (Next.js + Decap) | Webflow |
|---|---|---|
| Costo mensual | Gratis (Netlify free tier) | ~USD 29/mes |
| Panel para el cliente | `/admin` con Decap CMS | Webflow Editor |
| Aprendizaje del cliente | 5-10 min de tutorial | 15-30 min de tutorial |
| Personalización de diseño | Ilimitada (código) | Limitada al Designer visual |
| Velocidad del sitio | Muy rápida (SSG + CDN) | Rápida |
| SEO | Excelente (sitemap, JSON-LD, OG dinámicos) | Requiere configurar manualmente |

Si el problema del sitio actual era **solamente** el flujo de invitación de Netlify Identity, ya está arreglado en la última versión del código. Considerá probar una vez más antes de decidir.

---

¿Preguntas sobre la migración? Consultá los otros archivos del paquete.
