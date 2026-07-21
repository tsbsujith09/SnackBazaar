import { createHandler } from './_db.js'
export default createHandler('products')
export const config = { api: { bodyParser: true } }
