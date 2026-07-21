import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../../context/AuthContext'
import {
  removeFromWishlist,
  setWishlist,
} from '../../redux/userSlice'
import {
  getWishlist,
  removeFromWishlist as apiRemoveWishlist,
} from '../../services/api'
import Loader from '../../components/Loader/Loader'

const Wishlist = () => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const wishlist = useSelector((state) => state.users.wishlist)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    getWishlist().then((res) => {
      const mine = res.data.filter((w) => w.userId === user.id)
      dispatch(setWishlist(mine))
      setLoading(false)
    })
  }, [user, dispatch])

  const handleRemove = async (item) => {
    dispatch(removeFromWishlist(item.productId))
    const res = await getWishlist()
    const entry = res.data.find((w) => w.productId === item.productId && w.userId === user.id)
    if (entry) await apiRemoveWishlist(entry.id)
  }

  if (loading) return <Loader />
  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h3>Please login to view your wishlist</h3>
        <Link to="/login" className="btn btn-danger mt-3">Login</Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <div className="alert alert-info text-center">
          Your wishlist is empty. <Link to="/products">Browse products</Link>
        </div>
      ) : (
        <div className="row g-3">
          {wishlist.map((item) => (
            <div className="col-6 col-md-3" key={item.id}>
              <div className="card h-100 shadow-sm">
                <Link to={`/product/${item.productId}`}>
                  <img
                    src={item.image}
                    className="card-img-top"
                    style={{ height: '160px', objectFit: 'cover' }}
                    alt={item.name}
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{item.name}</h6>
                  <p className="text-muted small mb-1">{item.brand}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-danger">₹{item.price}</span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
