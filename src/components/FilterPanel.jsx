function FilterPanel({
  filters,
  types,
  rarities,
  sets,
  hideRarityFilter = false,
  lockedRarity = null,
  onTypeChange,
  onRarityChange,
  onSetChange,
  onSortChange,
  onReset,
}) {
  return (
    <aside className="filter-panel">
      <div className="panel-heading">
        <p className="eyebrow">Filters</p>
        <h2>Refine your collection view</h2>
      </div>

      <label className="field" htmlFor="type-filter">
        Type
        <select
          id="type-filter"
          value={filters.type}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          <option value="All">All types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      {hideRarityFilter ? (
        <div className="locked-filter-card">
          <span className="eyebrow">Pinned Filter</span>
          <strong>{lockedRarity}</strong>
          <p>This page is dedicated to rare cards.</p>
        </div>
      ) : (
        <label className="field" htmlFor="rarity-filter">
          Rarity
          <select
            id="rarity-filter"
            value={filters.rarity}
            onChange={(event) => onRarityChange(event.target.value)}
          >
            <option value="All">All rarities</option>
            {rarities.map((rarity) => (
              <option key={rarity} value={rarity}>
                {rarity}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="field" htmlFor="set-filter">
        Set
        <select
          id="set-filter"
          value={filters.setId}
          onChange={(event) => onSetChange(event.target.value)}
        >
          <option value="All">All sets</option>
          {sets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </select>
      </label>

      <label className="field" htmlFor="sort-filter">
        Sort by
        <select
          id="sort-filter"
          value={filters.sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="name">Name A-Z</option>
          <option value="-name">Name Z-A</option>
          <option value="-hp">Highest HP</option>
          <option value="hp">Lowest HP</option>
        </select>
      </label>

      <button className="secondary-button" onClick={onReset} type="button">
        Reset filters
      </button>
    </aside>
  )
}

export default FilterPanel
