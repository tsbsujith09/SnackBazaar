import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/productSlice'
import { getCategories } from '../../services/api'
import Loader from '../../components/Loader/Loader'
import ProductCard from '../../components/ProductCard/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const { items: products, loading } = useSelector((state) => state.products)
  const [categories, setCategories] = useState([])
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    dispatch(fetchProducts()).unwrap().catch((err) => setApiError(err.message))
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => setApiError(err.message))
  }, [dispatch])

  if (loading) return <Loader />

  if (apiError) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          <h5>⚠️ Backend not available</h5>
          <p className="mb-0">{apiError}</p>
          <p className="small mt-2 mb-0">
            Run <code>npm run server</code> in another terminal to start JSON Server on port 3001.
          </p>
        </div>
      </div>
    )
  }

  const featured = products.filter((p) => p.rating >= 4.5)
  const latest = [...products].reverse().slice(0, 4)

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <div className="container">
            <h1 className="display-4 fw-bold">Craving Something Tasty?</h1>
            <p className="lead mb-3">
              Discover a world of snacks, namkeen, chocolates and beverages —
              delivered fresh to your door.
            </p>
            <Link to="/products" className="btn btn-light btn-lg me-2">
              Shop Now
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container my-5">
        <h3 className="mb-4 fw-bold">🍩 Shop by Category</h3>
        <div className="row g-3">
          {categories.map((c) => (
            <div className="col-6 col-md-2" key={c.id}>
              <Link
                to={`/products?category=${encodeURIComponent(c.categoryName)}`}
                className="text-decoration-none"
              >
                <div className="card category-pill text-center border-0 shadow-sm">
                  <img
                    src={c.image}
                    className="card-img-top"
                    style={{ height: '100px', objectFit: 'cover' }}
                    alt={c.categoryName}
                  />
                  <div className="card-body p-2">
                    <small className="fw-semibold text-dark">{c.categoryName}</small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container my-5">
        <h3 className="mb-4 fw-bold">⭐ Featured Products</h3>
        <div className="row g-3">
          {featured.map((p) => (
            <div className="col-6 col-md-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="container my-5">
        <h3 className="mb-4 fw-bold">🆕 Latest Products</h3>
        <div className="row g-3">
          {latest.map((p) => (
            <div className="col-6 col-md-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="container my-5">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="card offer-card p-4 h-100">
              <h4>🔥 Special Offer</h4>
              <p>Get 20% off on all beverages this week. Use code SNACK20.</p>
              <Link to="/products" className="btn btn-light w-50">Grab Now</Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card promo-card p-4 h-100">
              <h4>🎁 Festive Combo</h4>
              <p>Buy any 2 namkeen packs and get a free chocolate bar.</p>
              <Link to="/products" className="btn btn-dark w-50">Explore</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Cards */}
      <section className="container my-5">
        <div className="row text-center g-3">
          <div className="col-md-3 col-6">
            <div className="border rounded p-3 bg-white shadow-sm">
              <h5>🚚 Free Delivery</h5>
              <small className="text-muted">On orders above ₹499</small>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="border rounded p-3 bg-white shadow-sm">
              <h5>💰 Best Prices</h5>
              <small className="text-muted">Everyday low prices</small>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="border rounded p-3 bg-white shadow-sm">
              <h5>🔄 Easy Returns</h5>
              <small className="text-muted">7-day return policy</small>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="border rounded p-3 bg-white shadow-sm">
              <h5>📞 24/7 Support</h5>
              <small className="text-muted">We are here to help</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
