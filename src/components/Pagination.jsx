function Pagination({ currentPage, hasNextPage, onPageChange }) {
  return (
    <div className="pagination">
      <button
        className="secondary-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        Previous
      </button>
      <p className="page-indicator">Page {currentPage}</p>
      <button
        className="secondary-button"
        disabled={!hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
