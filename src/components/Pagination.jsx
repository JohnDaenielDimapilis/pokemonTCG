function Pagination({ currentPage, totalPages, pageSize, totalCount, hasNextPage, onPageChange }) {
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : currentPage

  return (
    <div className="pagination">
      <button
        className="secondary-button"
        disabled={safeCurrentPage === 1}
        onClick={() => onPageChange(safeCurrentPage - 1)}
        type="button"
      >
        Previous
      </button>
      <div className="page-indicator-block">
        <p className="page-indicator">Page {safeCurrentPage}{totalPages ? ` of ${totalPages}` : ''}</p>
        <p className="page-meta">{pageSize} cards per page | {totalCount.toLocaleString()} total</p>
      </div>
      <button
        className="secondary-button"
        disabled={!hasNextPage || (totalPages > 0 && safeCurrentPage >= totalPages)}
        onClick={() => onPageChange(safeCurrentPage + 1)}
        type="button"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
