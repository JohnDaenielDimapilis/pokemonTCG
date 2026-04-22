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
          <h1>Discover Pokemon Trading Cards</h1>
          <p className="hero-description">
            Search, explore, and save standout cards in a polished collection
            experience powered by Redux Toolkit and RTK Query.
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
            Open the full catalog, jump into rare-only browsing, and compare cards
            with unique names, descriptions, and artwork.
          </p>
        </div>
      </section>

      <CatalogSection
        eyebrow="Live Catalog"
        title="Featured Pokemon cards"
        description="Jump into the live feed, then open dedicated pages to browse the full catalog or a rare-only collection."
        filters={filters}
        showFeaturedRareStrip
      />
    </section>
  )
}

export default Home
