export function dedupeCardsById(cards = []) {
  const seenIds = new Set()

  return cards.filter((card) => {
    if (!card?.id || seenIds.has(card.id)) {
      return false
    }

    seenIds.add(card.id)
    return true
  })
}

export function formatValue(value, fallback = 'Not available') {
  if (value === null || value === undefined || value === '') {
    return fallback
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : fallback
  }

  if (typeof value === 'object') {
    return Object.keys(value).length ? JSON.stringify(value) : fallback
  }

  return String(value)
}

export function formatKeyValueObject(value) {
  if (!value || typeof value !== 'object') {
    return []
  }

  return Object.entries(value)
}
