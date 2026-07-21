import { Link, Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-dark sidebar py-3 min-vh-100">
          <div className="text-white text-center mb-4">
            <h5>🍿 SnackBazaar</h5>
            <small className="text-secondary">Admin Panel</small>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to="/admin" end className="nav-link text-light">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/products" className="nav-link text-light">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/categories" className="nav-link text-light">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/users" className="nav-link text-light">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/orders" className="nav-link text-light">
                Orders
              </NavLink>
            </li>
            <li className="nav-item mt-3">
              <Link to="/" className="nav-link text-warning">← Back to Store</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link text-light btn btn-link text-start" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <main className="col-md-10 ms-sm-auto px-md-4 py-4 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span></span>
            <span className="text-secondary">Welcome, {user?.name}</span>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
