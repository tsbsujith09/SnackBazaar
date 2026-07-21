import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../redux/cartSlice'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartCount = useSelector((state) => state.cart.totalQuantity)
  const wishlistCount = useSelector((state) => state.users.wishlist.length)

  const handleLogout = () => {
    logout()
    dispatch(clearCart())
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🍿 SnackBazaar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/wishlist">
                ❤️ Wishlist
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">👤 {user.name.split(' ')[0]}</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-light btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm me-1" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning btn-sm" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
