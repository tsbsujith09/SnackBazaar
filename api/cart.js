import { createHandler } from './_db.js'
export default createHandler('cart')
export const config = { api: { bodyParser: true } }
