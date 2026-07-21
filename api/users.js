import { createHandler } from './_db.js'
export default createHandler('users')
export const config = { api: { bodyParser: true } }
