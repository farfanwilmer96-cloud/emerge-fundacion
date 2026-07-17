# Guía de Marca — Funda Crecer

Aplicá estos valores exactos en Webflow Designer → **Style Guide** para preservar la identidad visual.

---

## 🎨 Paleta de Colores

Usá el formato HSL para mayor precisión. Webflow acepta HEX y HSL indistintamente.

| Nombre | HSL | HEX aproximado | Uso |
|--------|-----|----------------|-----|
| **Primary (Azul institucional)** | `hsl(217, 91%, 32%)` | `#1E40AF` | Botones primarios, enlaces, títulos destacados |
| **Secondary (Esmeralda)** | `hsl(160, 84%, 39%)` | `#10B981` | Acentos, badges de éxito, hover states |
| **Background** | `hsl(0, 0%, 100%)` | `#FFFFFF` | Fondo del sitio |
| **Foreground (Texto)** | `hsl(222, 47%, 11%)` | `#0F172A` | Texto principal |
| **Muted** | `hsl(210, 40%, 96%)` | `#F1F5F9` | Fondos suaves, cards |
| **Muted Foreground** | `hsl(215, 16%, 47%)` | `#64748B` | Texto secundario, subtítulos |
| **Border** | `hsl(214, 32%, 91%)` | `#E2E8F0` | Bordes de tarjetas y elementos |
| **Destructive (Error)** | `hsl(0, 84%, 60%)` | `#EF4444` | Mensajes de error, validaciones |

### Gradiente Institucional (Hero, CTAs, botones destacados)

```css
background: linear-gradient(135deg, hsl(217, 91%, 32%) 0%, hsl(160, 84%, 39%) 100%);
```

En Webflow: clic derecho sobre el color de fondo → **Add Gradient** → 135° → primer stop `#1E40AF` en 0% → segundo stop `#10B981` en 100%.

---

## 🔤 Tipografía

**Fuente:** Inter (Google Fonts)

En Webflow:
1. Project settings → Fonts → **Add Google Font**
2. Buscar `Inter`
3. Seleccionar pesos: **400, 500, 600, 700**

### Escala tipográfica

| Elemento | Tamaño desktop | Tamaño mobile | Weight | Line-height |
|----------|----------------|---------------|--------|-------------|
| H1 (Hero) | 72px (4.5rem) | 40px (2.5rem) | 700 | 1.05 |
| H2 (Section) | 36px (2.25rem) | 28px (1.75rem) | 700 | 1.15 |
| H3 (Card) | 20px (1.25rem) | 18px (1.125rem) | 700 | 1.3 |
| Body Large | 20px (1.25rem) | 18px | 400 | 1.6 |
| Body | 16px (1rem) | 16px | 400 | 1.6 |
| Small | 14px (0.875rem) | 14px | 400 | 1.5 |
| XS (Meta) | 12px (0.75rem) | 12px | 500 | 1.4 |

---

## 📐 Espaciado y Radios

**Border Radius:**
- Botones: `8px` (rounded-md)
- Tarjetas: `12px` (rounded-xl)
- Badges pequeños: `6px` (rounded-sm)
- Botones grandes / hero: `12px`

**Sombras:**
- Card hover: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)` (shadow-xl)
- Card default: sin sombra, solo borde
- Botón floating: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

**Contenedor:**
- Max-width: `1400px`
- Padding lateral: `2rem` (desktop), `1rem` (mobile)

---

## 🔘 Componentes Clave — Especificación Visual

### Botón Primario (Donar / CTA principal)
- Fondo: gradiente 135° azul → esmeralda
- Texto: `#FFFFFF`, weight 600
- Padding: `12px 24px`
- Border-radius: `8px`
- Hover: opacity 0.9

### Botón Outline
- Fondo: transparente
- Borde: `1px solid #E2E8F0`
- Texto: `#0F172A`, weight 500
- Hover: fondo `#F1F5F9`

### Card de Noticia
- Fondo: `#FFFFFF`
- Borde: `1px solid #E2E8F0`
- Border-radius: `12px`
- Padding: `24px`
- Imagen: aspect-ratio 16:10, cover, arriba de la card
- Hover: `transform: translateY(-4px)` + shadow-xl

### Badge (categoría, estado)
- Fondo: color/10 (color con 10% opacidad)
- Texto: color completo
- Padding: `4px 10px`
- Border-radius: `9999px` (pill)
- Font-size: `12px`, weight 500

### Hero Section
- Fondo: gradiente 135° azul → esmeralda
- Overlay: imagen con `mix-blend-mode: overlay; opacity: 0.4`
- Padding vertical: `128px` (desktop), `96px` (mobile)
- Texto blanco, título 72px/40px

---

## 🖼️ Iconografía

El sitio actual usa **Lucide Icons** (biblioteca gratuita, similar a Feather).

En Webflow no hay integración nativa pero podés:
1. Descargar SVGs desde https://lucide.dev
2. Subirlos a Assets
3. Usar el componente Image o el elemento SVG

Íconos más usados en el sitio:
- `Sprout` (logo)
- `Heart` (donar, causas)
- `Users` (comunidad)
- `BookOpen` (educación)
- `Sparkles` (nuevas)
- `Calendar` (fechas)
- `ArrowRight` (CTAs, links)
- `HelpCircle` (FAQ)
- `CheckCircle2` (completado)
- `Loader` (activo)

---

## ✨ Animaciones que usaba el sitio original

En Webflow → **Interactions** podés recrear:

1. **Fade-in-up al hacer scroll** (secciones del home)
   - Trigger: Element trigger → Scroll into view
   - Action: Move (Y: 24px → 0) + Opacity (0 → 1) + Duration 550ms

2. **Card hover lift**
   - Trigger: Mouse hover
   - Action: Move (Y: 0 → -4px) + Shadow

3. **Acordeón FAQ**
   - Trigger: Click
   - Action: Height auto animation + rotate chevron 180°

4. **Menú móvil**
   - Trigger: Click hamburger
   - Action: Slide-in del panel + stagger de items
