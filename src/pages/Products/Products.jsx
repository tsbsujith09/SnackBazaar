import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/productSlice'
import { getCategories } from '../../services/api'
import Loader from '../../components/Loader/Loader'
import ProductCard from '../../components/ProductCard/ProductCard'

const Products = () => {
  const dispatch = useDispatch()
  const { items: products, loading } = useSelector((state) => state.products)
  const [searchParams] = useSearchParams()
  const [categories, setCategories] = useState([])

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  )
  const [selectedBrand, setSelectedBrand] = useState('')
  const [maxPrice, setMaxPrice] = useState(500)
  const [minRating, setMinRating] = useState(0)

  useEffect(() => {
    dispatch(fetchProducts())
    getCategories().then((res) => setCategories(res.data))
  }, [dispatch])

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setSelectedCategory(cat)
  }, [searchParams])

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))],
    [products]
  )

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchCategory = selectedCategory
        ? p.category === selectedCategory
        : true
      const matchBrand = selectedBrand ? p.brand === selectedBrand : true
      const matchPrice = p.price <= maxPrice
      const matchRating = p.rating >= minRating
      return (
        matchSearch && matchCategory && matchBrand && matchPrice && matchRating
      )
    })
  }, [products, search, selectedCategory, selectedBrand, maxPrice, minRating])

  const resetFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedBrand('')
    setMaxPrice(500)
    setMinRating(0)
  }

  if (loading) return <Loader />

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">All Products</h2>
      <div className="row">
        {/* Filters */}
        <aside className="col-md-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Filters</h5>
              <div className="mb-3">
                <label className="form-label">Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.categoryName}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Brand</label>
                <select
                  className="form-select"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">All</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Max Price: ₹{maxPrice}
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="10"
                  max="500"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Minimum Rating</label>
                <select
                  className="form-select"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                >
                  <option value="0">All</option>
                  <option value="3">3★ & up</option>
                  <option value="4">4★ & up</option>
                  <option value="4.5">4.5★ & up</option>
                </select>
              </div>
              <button className="btn btn-outline-danger w-100" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="col-md-9">
          {filtered.length === 0 ? (
            <div className="alert alert-warning text-center">
              No Products Found
            </div>
          ) : (
            <div className="row g-3">
              {filtered.map((p) => (
                <div className="col-6 col-lg-3" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
