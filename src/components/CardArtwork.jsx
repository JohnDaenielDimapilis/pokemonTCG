import { useState } from 'react'

function CardArtwork({
  card,
  className = '',
  large = false,
  eager = false,
}) {
  const smallImage = card.images?.small
  const largeImage = card.images?.large || smallImage
  const sizes = large
    ? '(max-width: 980px) 100vw, 420px'
    : '(max-width: 540px) 90vw, (max-width: 1180px) 30vw, 18vw'
  const [hasImageError, setHasImageError] = useState(false)

  if (hasImageError || !smallImage) {
    return (
      <div className={`card-artwork-fallback ${className}`.trim()}>
        <span>{card.name}</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={large ? largeImage : smallImage}
      srcSet={`${smallImage} 245w, ${largeImage} 734w`}
      sizes={sizes}
      alt={card.name}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'low'}
      decoding="async"
      onError={() => setHasImageError(true)}
    />
  )
}

export default CardArtwork
