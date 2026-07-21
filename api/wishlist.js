import { createHandler } from './_db.js'
export default createHandler('wishlist')
export const config = { api: { bodyParser: true } }
