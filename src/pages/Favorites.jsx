import { useSelector } from 'react-redux'
import CardGrid from '../components/CardGrid'

function Favorites() {
  const favoriteItems = useSelector((state) => state.favorites.items)

  return (
    <section className="page-shell">
      <section className="section-header">
        <div>
          <p className="eyebrow">Favorites</p>
          <h1>Build your deck</h1>
          <p>{favoriteItems.length} saved cards in your collection</p>
        </div>
      </section>

      {favoriteItems.length === 0 ? (
        <section className="state-card">
          <h2>No favorites yet</h2>
          <p>Save cards from the home page or details page to build your deck.</p>
        </section>
      ) : (
        <CardGrid cards={favoriteItems} />
      )}
    </section>
  )
}

export default Favorites
