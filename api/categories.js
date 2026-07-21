import { createHandler } from './_db.js'
export default createHandler('categories')
export const config = { api: { bodyParser: true } }
