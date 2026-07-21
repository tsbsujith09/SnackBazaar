import axios from 'axios'

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? 'https://snackbazaar.onrender.com' : 'http://localhost:3001')

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Friendly message when the mock backend (JSON Server) is not running
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.message =
        'Cannot reach the backend. Please try again in a moment (Render free instances may take ~30s to wake up).'
    }
    return Promise.reject(error)
  }
)

export default api

/* ---------------- USERS ---------------- */
export const getUsers = () => api.get('/users')
export const getUserById = (id) => api.get(`/users/${id}`)
export const registerUser = (data) => api.post('/users', data)
export const updateUser = (id, data) => api.put(`/users/${id}`, data)

/* ---------------- PRODUCTS ---------------- */
export const getProducts = () => api.get('/products')
export const getProductById = (id) => api.get(`/products/${id}`)
export const createProduct = (data) => api.post('/products', data)
export const updateProduct = (id, data) => api.put(`/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/products/${id}`)

/* ---------------- CATEGORIES ---------------- */
export const getCategories = () => api.get('/categories')
export const createCategory = (data) => api.post('/categories', data)
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

/* ---------------- CART ---------------- */
export const getCart = () => api.get('/cart')
export const addToCart = (data) => api.post('/cart', data)
export const removeFromCart = (id) => api.delete(`/cart/${id}`)
export const updateCartItem = (id, data) => api.put(`/cart/${id}`, data)

/* ---------------- WISHLIST ---------------- */
export const getWishlist = () => api.get('/wishlist')
export const addToWishlist = (data) => api.post('/wishlist', data)
export const removeFromWishlist = (id) => api.delete(`/wishlist/${id}`)

/* ---------------- ORDERS ---------------- */
export const getOrders = () => api.get('/orders')
export const getOrdersByUser = (userId) =>
  api.get(`/orders?userId=${userId}`)
export const createOrder = (data) => api.post('/orders', data)
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data)

/* ---------------- REVIEWS ---------------- */
export const getReviews = () => api.get('/reviews')
export const getReviewsByProduct = (productId) =>
  api.get(`/reviews?productId=${productId}`)
export const createReview = (data) => api.post('/reviews', data)

/* ---------------- PAYMENTS ---------------- */
export const createPayment = (data) => api.post('/payments', data)

/* ---------------- CONTACT ---------------- */
export const sendContactMessage = (data) => api.post('/contact', data)
