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

// --------- validaciones server-side (defensa en profundidad) ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s+()-]{6,}$/

function validateContact(body) {
  if (!body || typeof body !== 'object') return 'Cuerpo inválido'
  const { name, email, phone, message } = body
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 120) return 'Nombre inválido'
  if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 200) return 'Email inválido'
  if (phone && (typeof phone !== 'string' || !PHONE_RE.test(phone) || phone.length > 40)) return 'Teléfono inválido'
  if (typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) return 'Mensaje inválido'
  return null
}

async function handler(request, { params }) {
  const { path = [] } = (await params) || {}
  const method = request.method
  const [resource] = path

  try {
    // Health
    if (!resource) return json({ ok: true, service: 'Funda Crecer API', time: new Date().toISOString() })

    // ================= CONTACT — único endpoint expuesto =================
    if (resource === 'contact') {
      // ⚠️ NOTA DE SEGURIDAD: solo POST está permitido públicamente.
      // GET/PUT/DELETE se eliminaron por AppSec (data leak PII).
      // Para acceder a los mensajes usar el CMS / dashboard interno con auth.
      if (method !== 'POST') return err('Método no permitido', 405)

      let body
      try { body = await request.json() } catch { return err('JSON inválido') }

      const validationErr = validateContact(body)
      if (validationErr) return err(validationErr)

      const db = await getDb()
      const contacts = db.collection('contacts')
      const doc = {
        id: uuidv4(),
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: (body.phone || '').trim(),
        message: body.message.trim(),
        ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
        user_agent: request.headers.get('user-agent') || null,
        created_at: new Date().toISOString(),
      }
      await contacts.insertOne(doc)
      // No devolvemos el documento completo (evita filtrar IP/UA al cliente)
      return json({ ok: true, id: doc.id }, 201)
    }

    return err('Ruta no encontrada', 404)
  } catch (e) {
    // Nunca filtrar e.message al cliente — solo al log del servidor
    console.error('[API] error:', e)
    return err('Error interno del servidor', 500)
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
export const PATCH = handler
