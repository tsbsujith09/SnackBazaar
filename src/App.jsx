import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <div className="d-flex flex-column min-vh-100">
              <AppRoutes />
            </div>
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  )
}

export default App
