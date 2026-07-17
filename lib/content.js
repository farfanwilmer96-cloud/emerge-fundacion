import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function readCollection(name) {
  const dir = path.join(CONTENT_DIR, name)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
  return files.map(fileName => {
    const fullPath = path.join(dir, fileName)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(raw)
    const id = fileName.replace(/\.md$/, '')
    return {
      id,
      slug: data.slug || id,
      ...data,
      body: content,
    }
  })
}

export function getAllNews() {
  return readCollection('news').sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

export function getNewsBySlug(slug) {
  return getAllNews().find(n => n.slug === slug || n.id === slug) || null
}

export function getAllProjects() {
  return readCollection('projects')
}

export function getProjectBySlug(slug) {
  return getAllProjects().find(p => p.slug === slug || p.id === slug) || null
}

export function getAllFaqs() {
  return readCollection('faqs').sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}
