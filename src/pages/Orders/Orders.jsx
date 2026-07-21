import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getOrdersByUser } from '../../services/api'
import Loader from '../../components/Loader/Loader'

const statusColor = {
  Pending: 'warning',
  Confirmed: 'info',
  Shipped: 'primary',
  Delivered: 'success',
  Cancelled: 'danger',
}

const Orders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    getOrdersByUser(user.id).then((res) => {
      setOrders(res.data)
      setLoading(false)
    })
  }, [user])

  if (loading) return <Loader />
  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h3>Please login to view orders</h3>
        <Link to="/login" className="btn btn-danger mt-3">Login</Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          You have no orders yet. <Link to="/products">Shop now</Link>
        </div>
      ) : (
        orders.map((o) => (
          <div className="card shadow-sm mb-3" key={o.id}>
            <div className="card-header d-flex justify-content-between">
              <span>Order #{o.id}</span>
              <span className={`badge bg-${statusColor[o.status] || 'secondary'}`}>
                {o.status}
              </span>
            </div>
            <div className="card-body">
              {o.products.map((p, i) => (
                <div className="d-flex justify-content-between border-bottom py-1" key={i}>
                  <span>{p.name} × {p.quantity}</span>
                  <span>₹{p.price * p.quantity}</span>
                </div>
              ))}
              <div className="d-flex justify-content-between mt-2 fw-bold">
                <span>Total</span>
                <span className="text-danger">₹{o.totalAmount}</span>
              </div>
              <p className="text-muted small mb-0 mt-1">
                Payment: {o.paymentMethod}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Orders
