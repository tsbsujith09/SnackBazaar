import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // { productId, name, price, image, quantity, brand, category }
  totalQuantity: 0,
  totalPrice: 0,
}

const recalc = (state) => {
  state.totalQuantity = state.items.reduce((s, i) => s + i.quantity, 0)
  state.totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existing = state.items.find((i) => i.productId === item.productId)
      if (existing) {
        existing.quantity += item.quantity || 1
      } else {
        state.items.push({
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          brand: item.brand,
          category: item.category,
          quantity: item.quantity || 1,
        })
      }
      recalc(state)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload)
      recalc(state)
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload)
      if (item) item.quantity += 1
      recalc(state)
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload)
      if (item) {
        item.quantity -= 1
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.productId !== action.payload)
        }
      }
      recalc(state)
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
