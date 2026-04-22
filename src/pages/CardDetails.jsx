import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CardArtwork from '../components/CardArtwork'
import ErrorMessage from '../components/ErrorMessage'
import { useGetCardByIdQuery } from '../features/api/pokemonApi'
import { toggleFavorite } from '../features/favorites/favoritesSlice'
import { getCardDescription, getCardDisplayName } from '../utils/cardContent'
import { formatKeyValueObject, formatValue } from '../utils/cardFormatters'

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
  const tcgPlayerEntries = formatKeyValueObject(card.tcgplayer)
  const cardMarketEntries = formatKeyValueObject(card.cardmarket)
  const setEntries = formatKeyValueObject(card.set)
  const legalityEntries = formatKeyValueObject(card.legalities)

  return (
    <section className="details-page">
      <Link className="back-link" to="/cards">
        Back to cards
      </Link>

      <div className="details-layout">
        <div className="details-image-panel">
          <CardArtwork card={card} large eager />
        </div>

        <div className="details-content">
          <div className="details-header">
            <div>
              <p className="eyebrow">{card.set?.name || 'Pokemon TCG card'}</p>
              <h1>{getCardDisplayName(card)}</h1>
              <p className="details-subtitle">
                {formatValue(card.supertype, 'Card')} {card.subtypes?.length ? `| ${card.subtypes.join(', ')}` : ''}
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
            <InfoCard label="ID" value={formatValue(card.id)} />
            <InfoCard label="HP" value={formatValue(card.hp)} />
            <InfoCard label="Types" value={formatValue(card.types)} />
            <InfoCard label="Rarity" value={formatValue(card.rarity)} />
            <InfoCard label="Artist" value={formatValue(card.artist)} />
            <InfoCard label="Regulation Mark" value={formatValue(card.regulationMark)} />
          </div>

          <section className="details-section">
            <h2>Card overview</h2>
            <article className="detail-block">
              <p className="detail-copy">{getCardDescription(card)}</p>
            </article>
          </section>

          <section className="details-section">
            <h2>Pokemon details</h2>
            <div className="details-grid">
              <InfoCard label="Name" value={formatValue(card.name)} />
              <InfoCard label="Supertype" value={formatValue(card.supertype)} />
              <InfoCard label="Subtypes" value={formatValue(card.subtypes)} />
              <InfoCard label="Level" value={formatValue(card.level)} />
              <InfoCard label="Evolves From" value={formatValue(card.evolvesFrom)} />
              <InfoCard label="Evolves To" value={formatValue(card.evolvesTo)} />
              <InfoCard label="Retreat Cost" value={formatValue(card.retreatCost)} />
              <InfoCard label="Converted Retreat" value={formatValue(card.convertedRetreatCost)} />
              <InfoCard label="National Pokedex" value={formatValue(card.nationalPokedexNumbers)} />
              <InfoCard label="Flavor Text" value={formatValue(card.flavorText)} />
            </div>
          </section>

          <section className="details-section">
            <h2>Abilities</h2>
            {card.abilities?.length ? (
              <div className="list-stack">
                {card.abilities.map((ability) => (
                  <article key={ability.name} className="detail-block">
                    <strong>{ability.name}</strong>
                    <span>{formatValue(ability.type)}</span>
                    <p>{formatValue(ability.text)}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="muted-copy">No ability data available.</p>
            )}
          </section>

          <section className="details-section">
            <h2>Attacks</h2>
            {card.attacks?.length ? (
              <div className="list-stack">
                {card.attacks.map((attack) => (
                  <article key={attack.name} className="detail-block">
                    <strong>{attack.name}</strong>
                    <p>{attack.text || 'No description available.'}</p>
                    <span>Damage: {attack.damage || 'N/A'} | Cost: {attack.cost?.join(', ') || 'N/A'}</span>
                    <span>Converted energy cost: {formatValue(attack.convertedEnergyCost)}</span>
                  </article>
                ))}
              </div>
            ) : (
              <p className="muted-copy">No attack data available.</p>
            )}
          </section>

          <section className="details-section">
            <h2>Battle modifiers</h2>
            <div className="details-grid">
              <InfoListCard
                label="Weaknesses"
                items={card.weaknesses?.map((item) => `${item.type} ${item.value}`)}
              />
              <InfoListCard
                label="Resistances"
                items={card.resistances?.map((item) => `${item.type} ${item.value}`)}
              />
            </div>
          </section>

          <section className="details-section">
            <h2>Set information</h2>
            {setEntries.length ? (
              <div className="details-grid">
                {setEntries.map(([entryLabel, entryValue]) => (
                  <InfoCard key={entryLabel} label={entryLabel} value={formatValue(entryValue)} />
                ))}
              </div>
            ) : (
              <p className="muted-copy">No set information available.</p>
            )}
          </section>

          <section className="details-section">
            <h2>Printing and legality</h2>
            <div className="details-grid">
              <InfoCard label="Number" value={formatValue(card.number)} />
              <InfoCard label="Rarity" value={formatValue(card.rarity)} />
              <InfoCard label="Legalities" value={legalityEntries.map(([key, value]) => `${key}: ${value}`).join(', ') || 'Not available'} />
              <InfoCard label="Images" value={formatValue(card.images ? Object.keys(card.images) : [])} />
            </div>
          </section>

          <section className="details-section">
            <h2>TCGplayer data</h2>
            {tcgPlayerEntries.length ? (
              <div className="pricing-grid">
                {tcgPlayerEntries.map(([entryLabel, entryValue]) => (
                  <article key={entryLabel} className="detail-block">
                    <strong>{entryLabel}</strong>
                    <span>
                      {typeof entryValue === 'object'
                        ? Object.entries(entryValue)
                            .map(([nestedKey, nestedValue]) => `${nestedKey}: ${nestedValue}`)
                            .join(' | ')
                        : String(entryValue)}
                    </span>
                  </article>
                ))}
              </div>
            ) : (
              <p className="muted-copy">TCGplayer data is not available for this card.</p>
            )}
          </section>

          <section className="details-section">
            <h2>Cardmarket data</h2>
            {cardMarketEntries.length ? (
              <div className="pricing-grid">
                {cardMarketEntries.map(([entryLabel, entryValue]) => (
                  <article key={entryLabel} className="detail-block">
                    <strong>{entryLabel}</strong>
                    <span>
                      {typeof entryValue === 'object'
                        ? Object.entries(entryValue)
                            .map(([nestedKey, nestedValue]) => `${nestedKey}: ${nestedValue}`)
                            .join(' | ')
                        : String(entryValue)}
                    </span>
                  </article>
                ))}
              </div>
            ) : (
              <p className="muted-copy">Cardmarket data is not available for this card.</p>
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

function InfoListCard({ label, items = [] }) {
  return (
    <article className="info-card">
      <span>{label}</span>
      <strong>{items.length ? items.join(', ') : 'Not available'}</strong>
    </article>
  )
}

export default CardDetails
