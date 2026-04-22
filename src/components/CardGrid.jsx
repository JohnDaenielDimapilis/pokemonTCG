import { startTransition, useEffect, useMemo, useState } from 'react'
import PokemonCard from './PokemonCard'

function CardGrid({ cards }) {
  const initialVisibleCount = 8
  const [visibleCount, setVisibleCount] = useState(
    cards.length <= initialVisibleCount ? cards.length : initialVisibleCount,
  )

  useEffect(() => {
    if (cards.length <= initialVisibleCount) {
      return undefined
    }

    const frameId = window.requestAnimationFrame(() => {
      startTransition(() => {
        setVisibleCount(cards.length)
      })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [cards.length])

  const visibleCards = useMemo(
    () => cards.slice(0, visibleCount),
    [cards, visibleCount],
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
