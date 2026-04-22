export function getCardDisplayName(card) {
  if (!card) {
    return 'Unknown Card'
  }

  if (card.set?.name) {
    return `${card.name} (${card.set.name})`
  }

  return card.name
}

export function getCardDescription(card) {
  if (!card) {
    return 'Card details are not available yet.'
  }

  const typeText = card.types?.length ? card.types.join(', ') : card.supertype || 'Pokemon'
  const subtypeText = card.subtypes?.length ? card.subtypes.join(', ') : 'TCG'
  const rarityText = card.rarity || 'Unspecified rarity'
  const hpText = card.hp ? `${card.hp} HP` : 'unknown HP'
  const attackName = card.attacks?.[0]?.name
  const setName = card.set?.name || 'an unlisted set'
  const weaknessText = card.weaknesses?.[0]?.type

  const sentences = [
    `${getCardDisplayName(card)} is a ${subtypeText.toLowerCase()} card from ${setName} with ${hpText} and ${typeText.toLowerCase()} alignment.`,
    attackName
      ? `Its featured move is ${attackName}, giving this card a clear battle identity in the collection.`
      : 'This entry stands out more for its collectible profile than a listed attack package.',
    weaknessText
      ? `Collectors should note its ${weaknessText.toLowerCase()} weakness and ${rarityText.toLowerCase()} finish when comparing variants.`
      : `${rarityText} status and set details make this version easy to separate from similar cards.`,
  ]

  return sentences.join(' ')
}
