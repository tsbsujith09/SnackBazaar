import { useEffect, useState } from 'react'
import { getOrders, updateOrder } from '../services/api'

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']

  useEffect(() => {
    getOrders().then((res) => setOrders(res.data))
  }, [])

  const changeStatus = async (o, status) => {
    const res = await updateOrder(o.id, { ...o, status })
    setOrders((prev) => prev.map((x) => (x.id === o.id ? res.data : x)))
  }

  const statusColor = {
    Pending: 'warning',
    Confirmed: 'info',
    Shipped: 'primary',
    Delivered: 'success',
    Cancelled: 'danger',
  }

  return (
    <div>
      <h2 className="mb-4">Order Management</h2>
      <table className="table table-bordered table-hover bg-white">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th><th>User</th><th>Items</th>
            <th>Amount</th><th>Payment</th><th>Status</th><th>Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.userId}</td>
              <td>{o.products?.length || 0}</td>
              <td>₹{o.totalAmount}</td>
              <td>{o.paymentMethod}</td>
              <td>
                <span className={`badge bg-${statusColor[o.status] || 'secondary'}`}>
                  {o.status}
                </span>
              </td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={o.status}
                  onChange={(e) => changeStatus(o, e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderManagement
