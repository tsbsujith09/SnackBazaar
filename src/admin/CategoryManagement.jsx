import { useEffect, useState } from 'react'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/api'

const CategoryManagement = () => {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ categoryName: '', image: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      const res = await updateCategory(editingId, form)
      setCategories((prev) =>
        prev.map((c) => (c.id === editingId ? res.data : c))
      )
      setEditingId(null)
    } else {
      const res = await createCategory(form)
      setCategories((prev) => [...prev, res.data])
    }
    setForm({ categoryName: '', image: '' })
  }

  const handleEdit = (c) => {
    setEditingId(c.id)
    setForm({ categoryName: c.categoryName, image: c.image })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return
    await deleteCategory(id)
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div>
      <h2 className="mb-4">Category Management</h2>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5>{editingId ? 'Edit Category' : 'Add Category'}</h5>
          <form onSubmit={handleSubmit} className="row g-2">
            <div className="col-md-5">
              <input className="form-control" placeholder="Category Name" value={form.categoryName} onChange={(e) => setForm({ ...form, categoryName: e.target.value })} required />
            </div>
            <div className="col-md-5">
              <input className="form-control" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <div className="col-md-2">
              <button className="btn btn-danger w-100" type="submit">{editingId ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      </div>

      <table className="table table-bordered table-hover bg-white">
        <thead className="table-dark">
          <tr><th>ID</th><th>Name</th><th>Image</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.categoryName}</td>
              <td><img src={c.image} alt="" style={{ width: '60px' }} /></td>
              <td>
                <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(c)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoryManagement
