import { useEffect, useState } from 'react'
import { getUsers, getProducts, getOrders, getCategories } from '../services/api'
import Loader from '../components/Loader/Loader'

const Dashboard = () => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    Promise.all([
      getUsers(),
      getProducts(),
      getOrders(),
      getCategories(),
    ]).then(([u, p, o, c]) => {
      const revenue = o.data.reduce((s, ord) => s + (ord.totalAmount || 0), 0)
      setStats({
        users: u.data.length,
        products: p.data.length,
        orders: o.data.length,
        categories: c.data.length,
        revenue,
      })
    })
  }, [])

  if (!stats) return <Loader />

  const cards = [
    { label: 'Total Users', value: stats.users, color: 'primary' },
    { label: 'Total Products', value: stats.products, color: 'success' },
    { label: 'Total Orders', value: stats.orders, color: 'info' },
    { label: 'Categories', value: stats.categories, color: 'warning' },
    { label: 'Revenue (₹)', value: stats.revenue, color: 'danger' },
  ]

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row g-3">
        {cards.map((c) => (
          <div className="col-md-4 col-lg-2" key={c.label}>
            <div className={`card bg-${c.color} text-white shadow-sm`}>
              <div className="card-body text-center">
                <h3>{c.value}</h3>
                <p className="mb-0 small">{c.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card mt-4 shadow-sm">
        <div className="card-body">
          <h5>Revenue Summary</h5>
          <p className="mb-0">
            Total revenue from {stats.orders} orders:{' '}
            <strong className="text-danger">₹{stats.revenue}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
