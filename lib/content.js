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
      title: data.title || '',
      name: data.name || '',
      cover_image: data.cover_image || '',
      date: data.date || '',
      author: data.author || '',
      short_description: data.short_description || '',
      status: data.status || '',
      gallery: data.gallery || [],
      body: content,
    }
  })
}

export function getAllNews() {
  const items = readCollection('news')
  return items.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

export function getNewsBySlug(slug) {
  return getAllNews().find(n => n.slug === slug || n.id === slug) || null
}

export function getAllProjects() {
  return readCollection('projects')
}
