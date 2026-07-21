const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">{text}</p>
    </div>
  )
}

export default Loader
