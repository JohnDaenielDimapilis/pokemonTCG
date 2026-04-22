function Pagination({ currentPage, totalPages, pageSize, totalCount, hasNextPage, onPageChange }) {
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
      <div className="page-indicator-block">
        <p className="page-indicator">Page {currentPage}{totalPages ? ` of ${totalPages}` : ''}</p>
        <p className="page-meta">{pageSize} cards per page | {totalCount.toLocaleString()} total</p>
      </div>
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
