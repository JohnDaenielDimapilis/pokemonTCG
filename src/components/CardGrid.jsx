import PokemonCard from './PokemonCard'

function CardGrid({ cards }) {
  return (
    <section className="card-grid">
      {cards.map((card) => (
        <PokemonCard key={card.id} card={card} />
      ))}
    </section>
  )
}

export default CardGrid
