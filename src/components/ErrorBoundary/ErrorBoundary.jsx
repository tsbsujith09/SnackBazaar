import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container py-5">
          <div className="alert alert-danger">
            <h4>Something went wrong</h4>
            <p className="mb-0">{this.state.error.message}</p>
            <button className="btn btn-danger mt-3" onClick={() => window.location.reload()}>
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
