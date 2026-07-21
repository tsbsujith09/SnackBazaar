import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getUsers } from '../../services/api'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [tab, setTab] = useState('view')
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
  })
  const [pwd, setPwd] = useState({ current: '', next: '' })
  const [msg, setMsg] = useState('')

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setMsg('')
    await updateProfile(user.id, {
      ...user,
      name: form.name,
      phone: form.phone,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        country: 'India',
      },
    })
    setMsg('Profile updated successfully!')
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      const res = await getUsers()
      const fullUser = res.data.find((u) => u.id === user.id)
      if (pwd.current !== fullUser?.password) {
        return setMsg('Current password is incorrect.')
      }
      await updateProfile(user.id, {
        ...user,
        password: pwd.next,
      })
      setMsg('Password changed successfully!')
      setPwd({ current: '', next: '' })
    } catch {
      setMsg('Failed to change password. Please try again.')
    }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Profile</h2>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === 'view' ? 'active' : ''}`}
            onClick={() => setTab('view')}
          >
            View Profile
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === 'edit' ? 'active' : ''}`}
            onClick={() => setTab('edit')}
          >
            Edit Profile
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === 'password' ? 'active' : ''}`}
            onClick={() => setTab('password')}
          >
            Change Password
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === 'address' ? 'active' : ''}`}
            onClick={() => setTab('address')}
          >
            Update Address
          </button>
        </li>
      </ul>

      {msg && <div className="alert alert-success">{msg}</div>}

      {tab === 'view' && (
        <div className="card shadow-sm">
          <div className="card-body">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p className="mb-0">
              <strong>Address:</strong> {user.address?.street}, {user.address?.city},
              {user.address?.state} - {user.address?.pincode}
            </p>
          </div>
        </div>
      )}

      {tab === 'edit' && (
        <form className="card shadow-sm p-4" onSubmit={handleProfileUpdate}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email (read-only)</label>
            <input className="form-control" value={form.email} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <button className="btn btn-danger" type="submit">Save Changes</button>
        </form>
      )}

      {tab === 'password' && (
        <form className="card shadow-sm p-4" onSubmit={handlePasswordChange}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input type="password" className="form-control" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} required />
          </div>
          <button className="btn btn-danger" type="submit">Change Password</button>
        </form>
      )}

      {tab === 'address' && (
        <form className="card shadow-sm p-4" onSubmit={handleProfileUpdate}>
          <div className="mb-3">
            <label className="form-label">Street</label>
            <input className="form-control" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">City</label>
              <input className="form-control" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">State</label>
              <input className="form-control" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Pincode</label>
              <input className="form-control" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
            </div>
          </div>
          <button className="btn btn-danger" type="submit">Update Address</button>
        </form>
      )}
    </div>
  )
}

export default Profile
