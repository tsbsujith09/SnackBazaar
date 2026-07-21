import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Products from '../pages/Products/Products'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Cart from '../pages/Cart/Cart'
import Wishlist from '../pages/Wishlist/Wishlist'
import Checkout from '../pages/Checkout/Checkout'
import Orders from '../pages/Orders/Orders'
import Profile from '../pages/Profile/Profile'
import Contact from '../pages/Contact/Contact'

import AdminLayout from '../admin/AdminLayout'
import Dashboard from '../admin/Dashboard'
import ProductsManagement from '../admin/ProductsManagement'
import CategoryManagement from '../admin/CategoryManagement'
import UserManagement from '../admin/UserManagement'
import OrderManagement from '../admin/OrderManagement'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Store (with navbar/footer) */}
      <Route
        element={
          <>
            <Navbar />
            <div className="flex-grow-1">
              <Outlet />
            </div>
            <Footer />
          </>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected user routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin (no store navbar/footer) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductsManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="orders" element={<OrderManagement />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
