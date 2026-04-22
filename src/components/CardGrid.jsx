import { startTransition, useEffect, useMemo, useState } from 'react'
import PokemonCard from './PokemonCard'
import { dedupeCardsById } from '../utils/cardFormatters'

function CardGrid({ cards }) {
  const initialVisibleCount = 8
  const uniqueCards = useMemo(() => dedupeCardsById(cards), [cards])
  const [visibleCount, setVisibleCount] = useState(
    uniqueCards.length <= initialVisibleCount ? uniqueCards.length : initialVisibleCount,
  )

  useEffect(() => {
    if (uniqueCards.length <= initialVisibleCount) {
      return undefined
    }

    const frameId = window.requestAnimationFrame(() => {
      startTransition(() => {
        setVisibleCount(uniqueCards.length)
      })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [uniqueCards.length])

  const visibleCards = useMemo(
    () => uniqueCards.slice(0, visibleCount),
    [uniqueCards, visibleCount],
  )

  return (
    <section className="card-grid">
      {visibleCards.map((card) => (
        <PokemonCard key={card.id} card={card} />
      ))}
    </section>
  )
}

export default CardGrid
