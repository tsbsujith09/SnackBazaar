import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../../redux/cartSlice'
import { useAuth } from '../../context/AuthContext'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart)
  const { user } = useAuth()

  const handleCheckout = () => {
    if (!user) return navigate('/login')
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty 🛒</h3>
        <Link to="/products" className="btn btn-danger mt-3">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {items.map((item) => (
            <div className="card mb-3 shadow-sm" key={item.productId}>
              <div className="row g-0 align-items-center">
                <div className="col-3 col-md-2">
                  <img
                    src={item.image}
                    className="img-fluid rounded-start"
                    alt={item.name}
                    style={{ height: '90px', objectFit: 'cover', width: '100%' }}
                  />
                </div>
                <div className="col-9 col-md-10">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h6 className="card-title mb-1">{item.name}</h6>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => dispatch(removeFromCart(item.productId))}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-muted small mb-2">{item.brand}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            dispatch(decreaseQuantity(item.productId))
                          }
                        >
                          -
                        </button>
                        <span className="btn btn-light btn-sm disabled">
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            dispatch(increaseQuantity(item.productId))
                          }
                        >
                          +
                        </button>
                      </div>
                      <span className="fw-bold text-danger">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>

        {/* Summary */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Cart Summary</h5>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Items:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery:</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span className="text-danger">₹{totalPrice}</span>
              </div>
              <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
