# 🍿 SnackBazaar – Snacks & Food Products Store

A modern, responsive full-stack frontend eCommerce application for browsing and
buying snacks and food products. Built with **React JS**, **Redux Toolkit**,
**Context API**, **Axios**, **Bootstrap 5**, and **JSON Server** as a mock backend.

---

## 📋 Table of Contents

1. [Technologies](#technologies)
2. [Features](#features)
3. [Project Setup](#project-setup)
4. [Running the Application](#running-the-application)
5. [Folder Structure](#folder-structure)
6. [API Endpoints](#api-endpoints)
7. [Architecture](#architecture)
8. [Module Explanation](#module-explanation)
9. [Code Documentation](#code-documentation)
10. [Viva Preparation Questions](#viva-preparation-questions)

---

## 🛠 Technologies

| Layer | Technology |
|-------|------------|
| UI Library | React 18 (JSX) |
| Routing | React Router DOM v6 |
| State (global) | Redux Toolkit |
| State (auth/session) | Context API |
| HTTP Client | Axios |
| Styling | Bootstrap 5 + Custom CSS |
| Backend / DB | JSON Server (`db.json`) |
| Build Tool | Vite |

---

## ✨ Features

- 🔐 Authentication (Register, Login, Logout, Protected Routes)
- 🏠 Attractive Home page (Hero, Categories, Featured, Latest, Offers, Promos)
- 🛍 Product Listing & Product Details (gallery, reviews, related)
- 🔎 Real-time Search
- 🎚 Dynamic Filters (Category, Brand, Price, Rating)
- 🛒 Shopping Cart (add/remove/qty, total) via Redux
- ❤️ Wishlist (persisted in `db.json`)
- 💳 Checkout flow (Address → Payment → Summary → Place Order)
- 📦 Order History & Status (Pending/Confirmed/Shipped/Delivered/Cancelled)
- 👤 User Profile (view/edit/change password/address)
- 💰 Payment options (COD, UPI, Card) stored in `db.json`
- ⭐ Reviews & Ratings
- 📞 Contact form (saved in `db.json`)
- 🛠 Admin Dashboard (users, products, categories, orders management)

---

## 🚀 Project Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the mock backend (JSON Server) on port 3001
npm run server
# OR: json-server --watch db.json --port 3001

# 3. In a new terminal, start the React dev server
npm run dev
# OR: npm start (vite) -> opens http://localhost:5173
```

> ⚠️ **Important:** JSON Server must run on **port 3001** because
> `src/services/api.js` is configured with `BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@snackbazaar.com` | `admin123` |
| User | `rahul@example.com` | `user123` |

---

## 📁 Folder Structure

```
snackbazaar/
│
├── db.json                      # JSON Server database (mock backend)
├── package.json
├── vite.config.js
├── index.html
├── public/favicon.svg
│
└── src/
    ├── components/             # Reusable UI components
    │   ├── Navbar/
    │   ├── Footer/
    │   ├── ProductCard/
    │   ├── Loader/
    │   └── ProtectedRoute/
    │
    ├── pages/                 # User-facing pages
    │   ├── Home/
    │   ├── Login/
    │   ├── Register/
    │   ├── Products/
    │   ├── ProductDetails/
    │   ├── Cart/
    │   ├── Wishlist/
    │   ├── Checkout/
    │   ├── Orders/
    │   ├── Profile/
    │   └── Contact/
    │
    ├── admin/                # Admin panel pages
    │   ├── AdminLayout.jsx
    │   ├── Dashboard.jsx
    │   ├── ProductsManagement.jsx
    │   ├── CategoryManagement.jsx
    │   ├── UserManagement.jsx
    │   └── OrderManagement.jsx
    │
    ├── redux/               # Redux Toolkit store & slices
    │   ├── store.js
    │   ├── cartSlice.js
    │   ├── productSlice.js
    │   └── userSlice.js
    │
    ├── context/             # Context API
    │   └── AuthContext.jsx
    │
    ├── services/            # Axios API service layer
    │   └── api.js
    │
    ├── routes/             # Centralized routing
    │   └── AppRoutes.jsx
    │
    ├── App.jsx            # Root component (providers + router)
    ├── main.jsx           # React entry point
    └── index.css          # Custom styles
```

### Folder Structure Explanation

- **components/** – Small, reusable presentational components used across pages
  (navbar, footer, product card, loader, route guard).
- **pages/** – One folder per screen of the customer storefront.
- **admin/** – Separate admin panel with its own layout and management screens.
- **redux/** – Global state for cart, products, and wishlist/user slice.
- **context/** – `AuthContext` holds the authenticated user and session actions.
- **services/** – `api.js` centralizes all Axios calls to JSON Server.
- **routes/** – `AppRoutes.jsx` declares all routes and applies `ProtectedRoute`.

---

## 🌐 API Endpoints

All endpoints are served by JSON Server from `db.json`.

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List users |
| GET | `/users/:id` | Get single user |
| POST | `/users` | Register user |
| PUT | `/users/:id` | Update user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List products |
| GET | `/products/:id` | Get product |
| POST | `/products` | Create product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | List categories |
| POST | `/categories` | Create category |
| PUT | `/categories/:id` | Update category |
| DELETE | `/categories/:id` | Delete category |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | List cart items |
| POST | `/cart` | Add to cart |
| DELETE | `/cart/:id` | Remove from cart |

### Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wishlist` | List wishlist items |
| POST | `/wishlist` | Add to wishlist |
| DELETE | `/wishlist/:id` | Remove from wishlist |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | List orders |
| GET | `/orders?userId=:id` | Orders of a user |
| POST | `/orders` | Place order |
| PUT | `/orders/:id` | Update order status |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reviews` | List reviews |
| GET | `/reviews?productId=:id` | Reviews for product |
| POST | `/reviews` | Add review |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments` | Record payment |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/contact` | Save contact message |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────┐
│                React Frontend               │
│                                             │
│  Components / Pages / Admin                 │
│        │                      │             │
│        ▼                      ▼             │
│  Redux Toolkit          Context API         │
│  (cart, products,      (auth, session)      │
│   wishlist)                                  │
│        │                      │             │
│        └──────────┬───────────┘            │
│                   ▼                        │
│              Axios (api.js)                 │
└───────────────────┬─────────────────────────┘
                    │  HTTP (JSON over REST)
                    ▼
          JSON Server (http://localhost:3001)
                    │
                    ▼
              db.json (Database)
```

**Data Flow:** User action in UI → dispatch (Redux) / context call →
Axios request → JSON Server → `db.json` → response → UI re-render.

---

## 📦 Module Explanation

1. **Authentication** – `AuthContext` stores user in localStorage; `ProtectedRoute`
   guards private pages. Passwords are compared on login (mock).
2. **Home** – Composed sections: hero, categories, featured (rating ≥ 4.5),
   latest (reversed), special offers, promo cards.
3. **Product** – `Products` page lists & filters; `ProductDetails` shows gallery,
   description, related products, and reviews.
4. **Search** – Controlled input filters product names in real-time.
5. **Filter** – Category, Brand, Price range, and Rating filters combine via
   `useMemo` to produce the displayed list.
6. **Cart** – Redux `cartSlice` manages items, quantity, totals; `Cart.jsx`
   renders summary.
7. **Wishlist** – `userSlice` (Redux) mirrors `db.json` wishlist entries.
8. **Checkout** – 3-step wizard (Address → Payment → Summary) creates an order &
   payment record.
9. **Orders** – Users view their orders; statuses color-coded.
10. **Profile** – Tabs for view/edit/change password/address.
11. **Payment** – COD / UPI / Card options stored in `payments`.
12. **Review** – Users post ratings & comments on products.
13. **Contact** – Form posts to `/contact`.
14. **Admin** – Separate layout with dashboard stats and CRUD management.

---

## 📝 Code Documentation

Key files and their responsibilities:

- **`src/services/api.js`** – Exports all Axios functions; single `BASE_URL`.
- **`src/redux/store.js`** – Combines `cart`, `products`, `users` reducers.
- **`src/redux/cartSlice.js`** – `addToCart`, `removeFromCart`,
  `increaseQuantity`, `decreaseQuantity`, `clearCart` + auto total recalculation.
- **`src/redux/productSlice.js`** – Async thunks (`createAsyncThunk`) for
  fetching, adding, editing, deleting products.
- **`src/context/AuthContext.jsx`** – `login`, `register`, `logout`,
  `updateProfile`; persists session to `localStorage`.
- **`src/components/ProtectedRoute/ProtectedRoute.jsx`** – Redirects
  unauthenticated users to `/login`; `adminOnly` restricts admin area.
- **`src/routes/AppRoutes.jsx`** – Declares store routes (with Navbar/Footer)
  and admin routes (with `AdminLayout`).

---

## ❓ Viva Preparation Questions

1. **Why use both Redux Toolkit and Context API?**
   Redux manages frequent, global domain data (cart/products/wishlist);
   Context handles auth/session which changes less often and is needed app-wide.
2. **How does ProtectedRoute work?**
   It reads `user` from `AuthContext`; if absent it redirects to `/login`,
   optionally enforcing `role === 'admin'`.
3. **Where is cart state stored?**
   In Redux (`cartSlice`); it resets on logout via `clearCart`.
4. **How is wishlist persisted?**
   Added/removed both in Redux and `db.json` (`/wishlist`) keyed by `userId`.
5. **What is JSON Server and why use it?**
   A zero-code mock REST API that serves a JSON file, ideal for frontend
   prototypes and academic projects.
6. **How are filters implemented efficiently?**
   A `useMemo` derives the filtered list from multiple filter states so the
   component only recomputes when inputs change.
7. **How does checkout create an order?**
   It POSTs to `/orders` (with products, address, payment method, status
   "Pending") and records the payment in `/payments`, then clears the cart.
8. **How is the admin dashboard total revenue computed?**
   It sums `totalAmount` across all orders fetched from `/orders`.
9. **What HTTP client is used and why Axios?**
   Axios — promise-based, interceptors, simple CRUD, easy base-URL config.
10. **How is responsiveness achieved?**
    Bootstrap 5 grid (`container`, `row`, `col-md-*`) plus responsive `img`
    handling; navbar collapses on small screens.

---

## ✅ Evaluation Checklist (100 Marks)

| Criteria | Status |
|----------|--------|
| Project Setup & Folder Structure | ✅ |
| React Routing | ✅ |
| Authentication | ✅ |
| Product Module | ✅ |
| Search & Filter | ✅ |
| Cart Module | ✅ |
| Wishlist | ✅ |
| Checkout & Orders | ✅ |
| Redux Toolkit | ✅ |
| Context API & Axios | ✅ |
| JSON Server CRUD | ✅ |
| Attractive UI | ✅ |
| Responsive Design | ✅ |
| Documentation (Folder/API/Arch/Modules/Code) | ✅ |
| Presentation & Viva | ✅ |

---

## 📄 License

This project is created for academic / learning purposes.
