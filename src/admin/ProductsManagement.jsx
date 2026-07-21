import { useEffect, useState } from 'react'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api'

const ProductsManagement = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: '',
    image: '',
    category: '',
    brand: '',
    price: '',
    rating: 0,
    description: '',
    stock: 0,
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock), rating: Number(form.rating) }
    if (editingId) {
      const res = await updateProduct(editingId, payload)
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? res.data : p))
      )
      setEditingId(null)
    } else {
      const res = await createProduct(payload)
      setProducts((prev) => [...prev, res.data])
    }
    setForm({ name: '', image: '', category: '', brand: '', price: '', rating: 0, description: '', stock: 0 })
  }

  const handleEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      image: p.image,
      category: p.category,
      brand: p.brand,
      price: p.price,
      rating: p.rating,
      description: p.description,
      stock: p.stock,
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    await deleteProduct(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div>
      <h2 className="mb-4">Product Management</h2>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5>{editingId ? 'Edit Product' : 'Add Product'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-2">
                <input className="form-control" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="col-md-6 mb-2">
                <input className="form-control" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>
              <div className="col-md-4 mb-2">
                <input className="form-control" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </div>
              <div className="col-md-4 mb-2">
                <input className="form-control" placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              </div>
              <div className="col-md-4 mb-2">
                <input type="number" className="form-control" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="col-md-4 mb-2">
                <input type="number" step="0.1" className="form-control" placeholder="Rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
              </div>
              <div className="col-md-4 mb-2">
                <input type="number" className="form-control" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </div>
              <div className="col-md-12 mb-2">
                <textarea className="form-control" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
              </div>
            </div>
            <button className="btn btn-danger" type="submit">
              {editingId ? 'Update' : 'Add'} Product
            </button>
            {editingId && (
              <button
                className="btn btn-secondary ms-2"
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setForm({ name: '', image: '', category: '', brand: '', price: '', rating: 0, description: '', stock: 0 })
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      <table className="table table-bordered table-hover bg-white">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Brand</th><th>Price</th><th>Stock</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.brand}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsManagement
