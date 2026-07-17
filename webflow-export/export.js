// Script para exportar contenido markdown a CSVs importables en Webflow CMS
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const CONTENT_DIR = path.join(__dirname, '..', 'content')
const OUT_DIR = path.join(__dirname)

// CSV escaping según RFC 4180 (Webflow lo acepta)
function csvEscape(val) {
  if (val === null || val === undefined) return ''
  const s = String(val)
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

function toCsv(rows) {
  if (rows.length === 0) return ''
  const headers = Object.keys(rows[0])
  const lines = [headers.join(',')]
  for (const row of rows) {
    lines.push(headers.map(h => csvEscape(row[h])).join(','))
  }
  return lines.join('\r\n')
}

// Convertir markdown básico a HTML simple (Webflow Rich Text acepta HTML)
function mdToHtml(md) {
  if (!md) return ''
  let html = md
  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/_(.+?)_/g, '<em>$1</em>')
  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
  // Lists
  const lines = html.split('\n')
  const out = []
  let inUl = false
  let inOl = false
  for (const line of lines) {
    const ulMatch = /^[-*] (.+)$/.exec(line)
    const olMatch = /^\d+\. (.+)$/.exec(line)
    if (ulMatch) {
      if (!inUl) { out.push('<ul>'); inUl = true }
      out.push(`<li>${ulMatch[1]}</li>`)
    } else if (olMatch) {
      if (!inOl) { out.push('<ol>'); inOl = true }
      out.push(`<li>${olMatch[1]}</li>`)
    } else {
      if (inUl) { out.push('</ul>'); inUl = false }
      if (inOl) { out.push('</ol>'); inOl = false }
      if (line.trim()) out.push(`<p>${line}</p>`)
    }
  }
  if (inUl) out.push('</ul>')
  if (inOl) out.push('</ol>')
  return out.join('\n')
}

function readCollection(name) {
  const dir = path.join(CONTENT_DIR, name)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
  return files.map(fileName => {
    const raw = fs.readFileSync(path.join(dir, fileName), 'utf8')
    const { data, content } = matter(raw)
    return { ...data, body: content }
  })
}

// ============ 1. NOTICIAS ============
const news = readCollection('news').map(n => ({
  'Name': n.title || '',
  'Slug': n.slug || '',
  'Post Summary': (n.body || '').replace(/[#*_>`]/g, '').replace(/\n+/g, ' ').trim().slice(0, 155),
  'Post Body': mdToHtml(n.body || ''),
  'Main Image': n.cover_image || '',
  'Author': n.author || 'Equipo Funda Crecer',
  'Published On': n.date || new Date().toISOString().slice(0, 10),
  'Featured': 'false',
}))
fs.writeFileSync(path.join(OUT_DIR, 'webflow-noticias.csv'), toCsv(news), 'utf8')
console.log(`✓ webflow-noticias.csv (${news.length} noticias)`)

// ============ 2. PROYECTOS ============
const projects = readCollection('projects').map(p => ({
  'Name': p.name || '',
  'Slug': p.slug || '',
  'Short Description': p.short_description || '',
  'Body': mdToHtml(p.body || ''),
  'Status': p.status || 'Activo',
  'Cover Image': p.cover_image || '',
  'Gallery': (p.gallery || []).map(g => typeof g === 'string' ? g : g.image).join(' ; '),
}))
fs.writeFileSync(path.join(OUT_DIR, 'webflow-proyectos.csv'), toCsv(projects), 'utf8')
console.log(`✓ webflow-proyectos.csv (${projects.length} proyectos)`)

// ============ 3. FAQs ============
const faqs = readCollection('faqs').map(f => ({
  'Name': f.question || '',
  'Slug': f.slug || '',
  'Category': f.category || 'General',
  'Order': f.order || 1,
  'Answer': mdToHtml(f.body || ''),
}))
fs.writeFileSync(path.join(OUT_DIR, 'webflow-faqs.csv'), toCsv(faqs), 'utf8')
console.log(`✓ webflow-faqs.csv (${faqs.length} preguntas)`)

console.log('\n✅ Exportación completa. Los CSVs están en /app/webflow-export/')
