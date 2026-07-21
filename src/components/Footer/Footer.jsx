import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>🍿 SnackBazaar</h5>
            <p className="small">
              Your one-stop shop for snacks, namkeen, chocolates and more.
              Delivered fresh to your doorstep.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link className="text-light" to="/">Home</Link></li>
              <li><Link className="text-light" to="/products">Products</Link></li>
              <li><Link className="text-light" to="/cart">Cart</Link></li>
              <li><Link className="text-light" to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Contact Us</h6>
            <p className="small mb-1">Email: support@snackbazaar.com</p>
            <p className="small mb-1">Phone: +91 98765 43210</p>
            <p className="small mb-0">Address: 12 Snack Street, Mumbai, India</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center small mb-0">
          © {new Date().getFullYear()} SnackBazaar. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
