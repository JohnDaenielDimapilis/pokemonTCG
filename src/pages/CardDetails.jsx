import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage'
import { useGetCardByIdQuery } from '../features/api/pokemonApi'
import { toggleFavorite } from '../features/favorites/favoritesSlice'

function CardDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const favoriteItems = useSelector((state) => state.favorites.items)
  const { data, isLoading, isError, error, refetch } = useGetCardByIdQuery(id)

  if (isLoading) {
    return (
      <section className="state-card">
        <h2>Loading card details...</h2>
        <p>Please wait while we open the selected card.</p>
      </section>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Unable to load this card"
        message={error?.error || 'Please try again in a moment.'}
        onRetry={refetch}
      />
    )
  }

  const card = data?.data
  const isFavorite = favoriteItems.some((favoriteCard) => favoriteCard.id === card.id)
  const marketPrices = card.tcgplayer?.prices || card.cardmarket?.prices

  return (
    <section className="details-page">
      <Link className="back-link" to="/">
        Back to cards
      </Link>

      <div className="details-layout">
        <div className="details-image-panel">
          <img src={card.images.large} alt={card.name} />
        </div>

        <div className="details-content">
          <div className="details-header">
            <div>
              <p className="eyebrow">{card.set.name}</p>
              <h1>{card.name}</h1>
              <p className="details-subtitle">
                {card.supertype} {card.subtypes?.length ? `• ${card.subtypes.join(', ')}` : ''}
              </p>
            </div>
            <button
              className={isFavorite ? 'favorite-button favorite-active' : 'favorite-button'}
              onClick={() =>
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
              type="button"
            >
              {isFavorite ? 'Saved to favorites' : 'Add to favorites'}
            </button>
          </div>

          <div className="details-grid">
            <InfoCard label="HP" value={card.hp || 'N/A'} />
            <InfoCard label="Types" value={card.types?.join(', ') || 'N/A'} />
            <InfoCard label="Rarity" value={card.rarity || 'N/A'} />
            <InfoCard label="Artist" value={card.artist || 'N/A'} />
          </div>

          <section className="details-section">
            <h2>Attacks</h2>
            {card.attacks?.length ? (
              <div className="list-stack">
                {card.attacks.map((attack) => (
                  <article key={attack.name} className="detail-block">
                    <strong>{attack.name}</strong>
                    <p>{attack.text || 'No description available.'}</p>
                    <span>
                      Damage: {attack.damage || 'N/A'} • Cost: {attack.cost?.join(', ') || 'N/A'}
                    </span>
                  </article>
                ))}
              </div>
            ) : (
              <p className="muted-copy">No attack data available.</p>
            )}
          </section>

          <section className="details-section">
            <h2>Weaknesses</h2>
            {card.weaknesses?.length ? (
              <div className="list-stack">
                {card.weaknesses.map((weakness) => (
                  <article key={`${weakness.type}-${weakness.value}`} className="detail-block">
                    <strong>{weakness.type}</strong>
                    <span>{weakness.value}</span>
                  </article>
                ))}
              </div>
            ) : (
              <p className="muted-copy">No weakness data available.</p>
            )}
          </section>

          <section className="details-section">
            <h2>Market details</h2>
            {marketPrices ? (
              <div className="pricing-grid">
                {Object.entries(marketPrices)
                  .slice(0, 4)
                  .map(([priceKey, priceValue]) => (
                    <article key={priceKey} className="detail-block">
                      <strong>{priceKey}</strong>
                      <span>
                        {typeof priceValue === 'object'
                          ? Object.entries(priceValue)
                              .slice(0, 2)
                              .map(([nestedKey, nestedValue]) => `${nestedKey}: ${nestedValue}`)
                              .join(' • ')
                          : String(priceValue)}
                      </span>
                    </article>
                  ))}
              </div>
            ) : (
              <p className="muted-copy">Market prices are not available for this card.</p>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}

function InfoCard({ label, value }) {
  return (
    <article className="info-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

export default CardDetails
