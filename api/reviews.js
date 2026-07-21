import { createHandler } from './_db.js'
export default createHandler('reviews')
export const config = { api: { bodyParser: true } }
