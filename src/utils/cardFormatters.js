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

export function formatStatLabel(value) {
  if (!value || typeof value !== 'string') {
    return 'Not available'
  }

  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
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

export function flattenPriceEntries(value) {
  return formatKeyValueObject(value).map(([entryLabel, entryValue]) => {
    if (!entryValue || typeof entryValue !== 'object' || Array.isArray(entryValue)) {
      return [formatStatLabel(entryLabel), entryValue]
    }

    const nestedSummary = Object.entries(entryValue)
      .map(([nestedKey, nestedValue]) => `${formatStatLabel(nestedKey)}: ${nestedValue}`)
      .join(' | ')

    return [formatStatLabel(entryLabel), nestedSummary || 'Not available']
  })
}
