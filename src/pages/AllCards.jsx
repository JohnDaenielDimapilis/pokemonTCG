import { useSelector } from 'react-redux'
import CatalogSection from '../components/CatalogSection'

function AllCards() {
  const filters = useSelector((state) => state.ui)

  return (
    <section className="page-shell">
      <section className="page-intro">
        <div>
          <p className="eyebrow">All Cards</p>
          <h1>Browse the complete PokeVault catalog</h1>
          <p>
            Move through the full Pokemon TCG lineup with live search, filters,
            pagination, and richer card descriptions.
          </p>
        </div>
      </section>

      <CatalogSection
        eyebrow="Full Catalog"
        title="Every card view"
        description="Use the filters to jump across sets, types, and rarity levels without leaving the collection browser."
        filters={filters}
      />
    </section>
  )
}

export default AllCards
