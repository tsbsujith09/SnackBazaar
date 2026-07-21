import fs from 'fs'
import path from 'path'
const DB_PATH = path.join(process.cwd(), 'db.json')
export default async (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  const id = Number(req.query.id)
  const item = (db.products || []).find((p) => Number(p.id) === id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  return res.status(200).json(item)
}
