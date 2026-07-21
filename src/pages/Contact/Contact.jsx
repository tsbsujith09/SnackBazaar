import { useState } from 'react'
import { sendContactMessage } from '../../services/api'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sendContactMessage(form)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Contact Us</h2>
      <div className="row">
        <div className="col-md-6">
          {sent && (
            <div className="alert alert-success">
              Thank you! Your message has been sent.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              ></textarea>
            </div>
            <button className="btn btn-danger" type="submit">Send Message</button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>Customer Support</h5>
              <p className="mb-1"><strong>Email:</strong> support@snackbazaar.com</p>
              <p className="mb-1"><strong>Phone:</strong> +91 98765 43210</p>
              <p className="mb-1"><strong>Hours:</strong> 9 AM – 9 PM, Mon–Sat</p>
              <hr />
              <h6>Head Office</h6>
              <p className="mb-0">
                12 Snack Street,<br />
                Andheri West, Mumbai,<br />
                Maharashtra - 400053, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
