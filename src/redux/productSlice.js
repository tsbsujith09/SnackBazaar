import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api'

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await getProducts()
  return res.data
})

export const addProduct = createAsyncThunk('products/add', async (data) => {
  const res = await createProduct(data)
  return res.data
})

export const editProduct = createAsyncThunk('products/edit', async ({ id, data }) => {
  const res = await updateProduct(id, data)
  return res.data
})

export const removeProduct = createAsyncThunk('products/remove', async (id) => {
  await deleteProduct(id)
  return id
})

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload)
      })
  },
})

export default productSlice.reducer
