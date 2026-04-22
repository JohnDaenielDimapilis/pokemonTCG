import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { pokemonApi } from '../features/api/pokemonApi'
import { toggleFavorite } from '../features/favorites/favoritesSlice'
import CardArtwork from './CardArtwork'
import { getCardDisplayName } from '../utils/cardContent'

function PokemonCard({ card }) {
  const dispatch = useDispatch()
  const favoriteItems = useSelector((state) => state.favorites.items)
  const isFavorite = favoriteItems.some((favoriteCard) => favoriteCard.id === card.id)
  const prefetchCard = pokemonApi.usePrefetch('getCardById')

  const handleToggleFavorite = () => {
    dispatch(
      toggleFavorite({
        id: card.id,
        name: card.name,
        images: card.images,
        hp: card.hp,
        rarity: card.rarity,
        types: card.types,
        set: card.set,
      }),
    )
  }

  return (
    <article
      className="pokemon-card"
      onMouseEnter={() => prefetchCard(card.id, { ifOlderThan: 120 })}
      onFocus={() => prefetchCard(card.id, { ifOlderThan: 120 })}
    >
      <div className="card-image-shell">
        <CardArtwork card={card} />
      </div>

      <div className="pokemon-card-body">
        <div className="card-meta-row">
          <span>{card.rarity || 'Unknown rarity'}</span>
          <span>{card.hp ? `${card.hp} HP` : 'HP N/A'}</span>
        </div>
        <h3>{getCardDisplayName(card)}</h3>
        <p>{card.types?.join(', ') || 'Type not listed'}</p>
        <p className="card-set-name">{card.set?.name || 'Set not listed'}</p>

        <div className="card-actions">
          <Link className="primary-link" to={`/card/${card.id}`}>
            View Details
          </Link>
          <button
            className={isFavorite ? 'favorite-button favorite-active' : 'favorite-button'}
            onClick={handleToggleFavorite}
            type="button"
          >
            {isFavorite ? 'Saved' : 'Favorite'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default memo(PokemonCard)
