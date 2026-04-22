import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CatalogSection from '../components/CatalogSection'

function Home() {
  const navigate = useNavigate()
  const filters = useSelector((state) => state.ui)

  return (
    <section className="page-shell">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">PokeVault</p>
          <h1>Explore 1,000+ unique Pokemon TCG cards</h1>
          <p className="hero-description">
            A polished Pokemon card explorer built with React, Redux Toolkit,
            and RTK Query for responsive browsing, filtering, pagination, and
            full detail views.
          </p>
        </div>
        <div className="hero-actions">
          <button
            className="primary-button"
            onClick={() => navigate('/cards')}
            type="button"
          >
            Browse All Cards
          </button>
          <p className="hero-caption">
            Browse a large live catalog, search by name, filter by set or type,
            and open full card profiles without loading everything at once.
          </p>
        </div>
      </section>

      <CatalogSection
        eyebrow="Live Catalog"
        title="Featured Pokemon cards"
        description="Start with a fast paginated feed, then move into the full catalog, rare-only views, and dedicated card detail pages."
        filters={filters}
        showFeaturedRareStrip
      />
    </section>
  )
}

export default Home
