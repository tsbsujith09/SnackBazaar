import { createHandler } from './_db.js'
export default createHandler('orders')
export const config = { api: { bodyParser: true } }
