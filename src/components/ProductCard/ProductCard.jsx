import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../../context/AuthContext'
import { addToCart } from '../../redux/cartSlice'
import { addToWishlist, removeFromWishlist } from '../../redux/userSlice'
import { addToWishlist as apiAddWishlist, getWishlist, removeFromWishlist as apiRemoveWishlist } from '../../services/api'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const wishlist = useSelector((state) => state.users.wishlist)
  const inWishlist = wishlist.find((w) => w.productId === product.id)

  const handleAddToCart = () => {
    if (!user) return window.location.assign('/login')
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

  const toggleWishlist = async () => {
    if (!user) return (window.location.assign('/login'))
    if (inWishlist) {
      dispatch(removeFromWishlist(product.id))
      const res = await getWishlist()
      const entry = res.data.find((w) => w.productId === product.id && w.userId === user.id)
      if (entry) await apiRemoveWishlist(entry.id)
    } else {
      const payload = { ...product, productId: product.id, userId: user.id }
      dispatch(addToWishlist(payload))
      await apiAddWishlist(payload)
    }
  }

  return (
    <div className="card h-100 shadow-sm product-card">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: '180px', objectFit: 'cover' }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start">
          <h6 className="card-title mb-1">
            <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">
              {product.name}
            </Link>
          </h6>
          <button
            className="btn btn-sm p-0 border-0"
            onClick={toggleWishlist}
            title="Wishlist"
          >
            {inWishlist ? '❤️' : '🤍'}
          </button>
        </div>
        <p className="text-muted small mb-1">{product.brand}</p>
        <div className="mb-2">
          <span className="badge bg-warning text-dark">
            ★ {product.rating}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="fw-bold text-danger">₹{product.price}</span>
          <button className="btn btn-danger btn-sm" onClick={handleAddToCart}>
            Add Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
