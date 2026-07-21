import { createHandler } from './_db.js'
export default createHandler('payments')
export const config = { api: { bodyParser: true } }
