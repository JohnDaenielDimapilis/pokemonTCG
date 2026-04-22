function Loader({ count = 8 }) {
  return (
    <section className="card-grid">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-line skeleton-line-wide"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line skeleton-line-short"></div>
        </div>
      ))}
    </section>
  )
}

export default Loader
