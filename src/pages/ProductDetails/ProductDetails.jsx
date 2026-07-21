import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../services/api'
import { getReviewsByProduct, createReview } from '../../services/api'
import { fetchProducts } from '../../redux/productSlice'
import { addToCart } from '../../redux/cartSlice'
import { useAuth } from '../../context/AuthContext'
import Loader from '../../components/Loader/Loader'
import ProductCard from '../../components/ProductCard/ProductCard'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items: allProducts } = useSelector((state) => state.products)

  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [activeImg, setActiveImg] = useState('')
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })

  useEffect(() => {
    dispatch(fetchProducts())
    getProductById(id)
      .then((res) => {
        setProduct(res.data)
        setActiveImg(res.data.image)
      })
      .catch(() => setProduct(null))
    getReviewsByProduct(id)
      .then((res) => setReviews(res.data))
      .catch(() => {})
  }, [id, dispatch])

  if (!product) return <div className="container py-5 text-center"><h3>Product not found</h3><Link to="/products" className="btn btn-danger mt-3">Browse Products</Link></div>

  const related = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  )

  const handleAddToCart = () => {
    if (!user) return navigate('/login')
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        quantity: 1,
      })
    )
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/login')
    const payload = {
      userId: user.id,
      productId: product.id,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
    }
    const res = await createReview(payload)
    setReviews((prev) => [...prev, res.data])
    setReviewForm({ rating: 5, comment: '' })
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-5">
          <img
            src={activeImg}
            className="img-fluid rounded shadow-sm mb-3"
            alt={product.name}
            style={{ height: '320px', objectFit: 'cover', width: '100%' }}
          />
          <div className="d-flex gap-2 flex-wrap">
            {(product.gallery || [product.image]).map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                className="img-thumbnail"
                style={{ width: '70px', cursor: 'pointer' }}
                onClick={() => setActiveImg(img)}
              />
            ))}
          </div>
        </div>
        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.brand}</p>
          <div className="mb-2">
            <span className="badge bg-warning text-dark">★ {product.rating}</span>
            <span className="badge bg-secondary ms-2">{product.category}</span>
          </div>
          <h3 className="text-danger">₹{product.price}</h3>
          <p>{product.description}</p>
          <p className="small text-muted">In stock: {product.stock}</p>
          <button className="btn btn-danger me-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-outline-danger">
            Go to Cart
          </Link>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-5">
        <h4>Customer Reviews ({reviews.length})</h4>
        {reviews.length === 0 && (
          <p className="text-muted">No reviews yet. Be the first!</p>
        )}
        {reviews.map((r) => (
          <div className="border rounded p-3 mb-2" key={r.id}>
            <strong>User #{r.userId}</strong>
            <span className="badge bg-warning text-dark ms-2">★ {r.rating}</span>
            <p className="mb-0 mt-1">{r.comment}</p>
          </div>
        ))}

        <form className="border rounded p-3 mt-3" onSubmit={handleReviewSubmit}>
          <h6>Write a Review</h6>
          <div className="mb-2">
            <label className="form-label">Rating</label>
            <select
              className="form-select w-auto"
              value={reviewForm.rating}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, rating: e.target.value })
              }
            >
              <option value="5">5 ★</option>
              <option value="4">4 ★</option>
              <option value="3">3 ★</option>
              <option value="2">2 ★</option>
              <option value="1">1 ★</option>
            </select>
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Your comment..."
              value={reviewForm.comment}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, comment: e.target.value })
              }
              required
            ></textarea>
          </div>
          <button className="btn btn-danger btn-sm" type="submit">
            Submit Review
          </button>
        </form>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-5">
          <h4>Related Products</h4>
          <div className="row g-3">
            {related.map((p) => (
              <div className="col-6 col-md-3" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetails
