import { useEffect, useState } from 'react'
import { getUsers, updateUser } from '../services/api'

const UserManagement = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data))
  }, [])

  const toggleRole = async (u) => {
    const newRole = u.role === 'admin' ? 'user' : 'admin'
    const res = await updateUser(u.id, { ...u, role: newRole })
    setUsers((prev) => prev.map((x) => (x.id === u.id ? res.data : x)))
  }

  return (
    <div>
      <h2 className="mb-4">User Management</h2>
      <table className="table table-bordered table-hover bg-white">
        <thead className="table-dark">
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Action</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <span className={`badge bg-${u.role === 'admin' ? 'danger' : 'secondary'}`}>
                  {u.role}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-outline-danger" onClick={() => toggleRole(u)}>
                  Make {u.role === 'admin' ? 'User' : 'Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManagement
