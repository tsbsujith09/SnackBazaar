import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../../context/AuthContext'
import { clearCart } from '../../redux/cartSlice'
import {
  createOrder,
  createPayment,
} from '../../services/api'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth()
  const { items, totalPrice } = useSelector((state) => state.cart)

  const [step, setStep] = useState(1)
  const [address, setAddress] = useState(
    user?.address || { street: '', city: '', state: '', pincode: '', country: 'India' }
  )
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [placing, setPlacing] = useState(false)
  const [done, setDone] = useState(false)

  const total = totalPrice

  const handleAddressSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePlaceOrder = async () => {
    setPlacing(true)
    const orderPayload = {
      userId: user.id,
      products: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      totalAmount: total,
      paymentMethod,
      status: 'Pending',
      address,
    }
    const orderRes = await createOrder(orderPayload)
    await createPayment({
      orderId: orderRes.data.id,
      method: paymentMethod,
      amount: total,
      status: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
    })
    dispatch(clearCart())
    setDone(true)
    setPlacing(false)
  }

  if (items.length === 0 && !done) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty</h3>
      </div>
    )
  }

  if (done) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-success">
          <h4>🎉 Order Placed Successfully!</h4>
          <p>Thank you for shopping with SnackBazaar.</p>
          <button className="btn btn-danger me-2" onClick={() => navigate('/orders')}>
            View Orders
          </button>
          <button className="btn btn-outline-danger" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Checkout</h2>
      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <span className={`nav-link ${step >= 1 ? 'active bg-danger' : 'disabled'}`}>
            1. Address
          </span>
        </li>
        <li className="nav-item">
          <span className={`nav-link ${step >= 2 ? 'active bg-danger' : 'disabled'}`}>
            2. Payment
          </span>
        </li>
        <li className="nav-item">
          <span className={`nav-link ${step >= 3 ? 'active bg-danger' : 'disabled'}`}>
            3. Summary
          </span>
        </li>
      </ul>

      {/* Step 1: Address */}
      {step === 1 && (
        <form className="card shadow-sm p-4" onSubmit={handleAddressSubmit}>
          <h5>Shipping Address</h5>
          <div className="mb-3">
            <label className="form-label">Street</label>
            <input
              className="form-control"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              required
            />
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">City</label>
              <input
                className="form-control"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">State</label>
              <input
                className="form-control"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Pincode</label>
              <input
                className="form-control"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input
              className="form-control"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
            />
          </div>
          <button className="btn btn-danger" type="submit">Continue to Payment</button>
        </form>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div className="card shadow-sm p-4">
          <h5>Select Payment Method</h5>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="pay"
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={() => setPaymentMethod('Cash on Delivery')}
            />
            <label className="form-check-label">Cash on Delivery</label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="pay"
              checked={paymentMethod === 'UPI Payment'}
              onChange={() => setPaymentMethod('UPI Payment')}
            />
            <label className="form-check-label">UPI Payment</label>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="pay"
              checked={paymentMethod === 'Card Payment'}
              onChange={() => setPaymentMethod('Card Payment')}
            />
            <label className="form-check-label">Card Payment</label>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="btn btn-danger" onClick={() => setStep(3)}>
              Review Order
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Summary */}
      {step === 3 && (
        <div className="card shadow-sm p-4">
          <h5>Order Summary</h5>
          <ul className="list-group mb-3">
            {items.map((i) => (
              <li className="list-group-item d-flex justify-content-between" key={i.productId}>
                <span>{i.name} × {i.quantity}</span>
                <span>₹{i.price * i.quantity}</span>
              </li>
            ))}
          </ul>
          <p><strong>Address:</strong> {address.street}, {address.city}, {address.state} - {address.pincode}</p>
          <p><strong>Payment:</strong> {paymentMethod}</p>
          <h5 className="text-danger">Total: ₹{total}</h5>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-secondary" onClick={() => setStep(2)}>
              Back
            </button>
            <button
              className="btn btn-danger"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? 'Placing...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
