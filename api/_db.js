import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'db.json')

export function readDb() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(raw)
}

export function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

// Generic collection handler supporting GET (all / ?field=value), POST, PUT, DELETE
export function createHandler(collection) {
  return async (req, res) => {
    const db = readDb()
    const items = db[collection] || []

    if (req.method === 'GET') {
      const keys = Object.keys(req.query || {})
      if (keys.length === 0) {
        return res.status(200).json(items)
      }
      // simple ?field=value filter (support one filter)
      const field = keys[0]
      const value = req.query[field]
      const filtered = items.filter(
        (it) => String(it[field]) === String(value)
      )
      return res.status(200).json(filtered)
    }

    if (req.method === 'POST') {
      const newItem = req.body
      // auto-increment id
      const maxId = items.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0)
      newItem.id = maxId + 1
      db[collection] = [...items, newItem]
      writeDb(db)
      return res.status(201).json(newItem)
    }

    if (req.method === 'PUT') {
      const { id, ...rest } = req.body
      const idx = items.findIndex((it) => Number(it.id) === Number(id))
      if (idx === -1) return res.status(404).json({ error: 'Not found' })
      db[collection][idx] = { ...items[idx], ...rest, id: items[idx].id }
      writeDb(db)
      return res.status(200).json(db[collection][idx])
    }

    if (req.method === 'DELETE') {
      const id = Number(req.query.id || (req.body && req.body.id))
      db[collection] = items.filter((it) => Number(it.id) !== id)
      writeDb(db)
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  }
}
