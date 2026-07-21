import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wishlist: [], // array of product objects
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload
    },
    addToWishlist: (state, action) => {
      const exists = state.wishlist.find((w) => w.id === action.payload.id)
      if (!exists) state.wishlist.push(action.payload)
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((w) => w.id !== action.payload)
    },
  },
})

export const { setWishlist, addToWishlist, removeFromWishlist } = userSlice.actions
export default userSlice.reducer
