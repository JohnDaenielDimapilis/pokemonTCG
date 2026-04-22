import { useSelector } from 'react-redux'
import CatalogSection from '../components/CatalogSection'

function AllCards() {
  const filters = useSelector((state) => state.ui)

  return (
    <section className="page-shell">
      <section className="page-intro">
        <div>
          <p className="eyebrow">All Cards</p>
          <h1>Browse the full Pokemon card catalog</h1>
          <p>
            Use API-driven pagination, live search, and filters to move through
            more than 1,000 unique cards without duplicates.
          </p>
        </div>
      </section>

      <CatalogSection
        eyebrow="Full Catalog"
        title="Every card view"
        description="Each page uses RTK Query and the Pokemon TCG API cards endpoint to keep the catalog responsive and scalable."
        filters={filters}
      />
    </section>
  )
}

export default AllCards
