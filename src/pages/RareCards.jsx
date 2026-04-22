import { useSelector } from 'react-redux'
import CatalogSection from '../components/CatalogSection'

function RareCards() {
  const filters = useSelector((state) => state.ui)

  return (
    <section className="page-shell">
      <section className="page-intro">
        <div>
          <p className="eyebrow">Rare Vault</p>
          <h1>Explore rare cards only</h1>
          <p>
            This page keeps the catalog focused on rare pulls while still letting
            you browse by set, type, search term, and sort order.
          </p>
        </div>
      </section>

      <CatalogSection
        eyebrow="Rare Cards"
        title="Rare collection spotlight"
        description="A focused view of rare cards for collectors who want faster browsing without common entries."
        filters={filters}
        lockedRarity="Rare"
        emptyTitle="No rare cards matched this view"
        emptyMessage="Try a different search term, type, or set to surface more rare cards."
      />
    </section>
  )
}

export default RareCards
