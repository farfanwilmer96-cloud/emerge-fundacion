import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'fundacrecer'

let cachedClient = null
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGO_URL)
    await cachedClient.connect()
  }
  return cachedClient.db(DB_NAME)
}

const clean = (doc) => { if (!doc) return doc; const { _id, ...rest } = doc; return rest }

const json = (data, status = 200) => NextResponse.json(data, { status })
const err = (msg, status = 400) => NextResponse.json({ error: msg }, { status })

async function handler(request, { params }) {
  const { path = [] } = (await params) || {}
  const method = request.method
  const [resource, id] = path

  try {
    const db = await getDb()

    // Health
    if (!resource) return json({ ok: true, service: 'Funda Crecer API', time: new Date().toISOString() })

    // ================= NEWS =================
    if (resource === 'news') {
      const news = db.collection('news')

      if (method === 'GET' && !id) {
        const url = new URL(request.url)
        const limit = parseInt(url.searchParams.get('limit') || '100')
        const docs = await news.find({}).sort({ date: -1, created_at: -1 }).limit(limit).toArray()
        return json({ news: docs.map(clean) })
      }

      if (method === 'GET' && id) {
        // id could be slug or uuid
        const doc = await news.findOne({ $or: [{ id }, { slug: id }] })
        if (!doc) return err('No encontrado', 404)
        return json({ news: clean(doc) })
      }

      if (method === 'POST') {
        const body = await request.json()
        if (!body.title || !body.body) return err('Título y contenido obligatorios')
        const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
        // ensure unique slug
        const exists = await news.findOne({ slug })
        const finalSlug = exists ? `${slug}-${Date.now().toString(36)}` : slug
        const doc = {
          id: uuidv4(),
          title: body.title,
          slug: finalSlug,
          cover_image: body.cover_image || '',
          date: body.date || new Date().toISOString().slice(0,10),
          author: body.author || '',
          body: body.body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        await news.insertOne(doc)
        return json({ news: clean(doc) }, 201)
      }

      if (method === 'PUT' && id) {
        const body = await request.json()
        const update = {
          ...(body.title && { title: body.title }),
          ...(body.slug && { slug: body.slug }),
          ...(body.cover_image !== undefined && { cover_image: body.cover_image }),
          ...(body.date && { date: body.date }),
          ...(body.author !== undefined && { author: body.author }),
          ...(body.body && { body: body.body }),
          updated_at: new Date().toISOString(),
        }
        const r = await news.findOneAndUpdate({ $or: [{ id }, { slug: id }] }, { $set: update }, { returnDocument: 'after' })
        const updated = r?.value || r
        if (!updated) return err('No encontrado', 404)
        return json({ news: clean(updated) })
      }

      if (method === 'DELETE' && id) {
        const r = await news.deleteOne({ $or: [{ id }, { slug: id }] })
        if (r.deletedCount === 0) return err('No encontrado', 404)
        return json({ ok: true })
      }
    }

    // ================= CONTACT =================
    if (resource === 'contact') {
      const contacts = db.collection('contacts')
      if (method === 'POST') {
        const body = await request.json()
        if (!body.name || !body.email || !body.message) return err('Campos obligatorios faltantes')
        const doc = { id: uuidv4(), name: body.name, email: body.email, phone: body.phone || '', message: body.message, created_at: new Date().toISOString() }
        await contacts.insertOne(doc)
        return json({ ok: true, contact: clean(doc) }, 201)
      }
      if (method === 'GET') {
        const docs = await contacts.find({}).sort({ created_at: -1 }).toArray()
        return json({ contacts: docs.map(clean) })
      }
    }

    return err('Ruta no encontrada', 404)
  } catch (e) {
    console.error('API error:', e)
    return err('Error interno del servidor: ' + e.message, 500)
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
export const PATCH = handler
