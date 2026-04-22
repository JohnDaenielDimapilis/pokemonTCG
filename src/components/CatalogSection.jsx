import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardGrid from './CardGrid'
import ErrorMessage from './ErrorMessage'
import FilterPanel from './FilterPanel'
import Loader from './Loader'
import Pagination from './Pagination'
import {
  pokemonApi,
  useGetCardsQuery,
  useGetRaritiesQuery,
  useGetSetsQuery,
  useGetTypesQuery,
} from '../features/api/pokemonApi'
import {
  resetFilters,
  setPage,
  setRarity,
  setSetId,
  setSortBy,
  setType,
} from '../features/ui/uiSlice'

function CatalogSection({
  eyebrow,
  title,
  description,
  filters,
  lockedRarity = null,
  emptyTitle = 'No cards found',
  emptyMessage = 'Try changing the search, set, type, or rarity filters.',
  showFeaturedRareStrip = false,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryFilters = useMemo(
    () => ({
      ...filters,
      rarity: lockedRarity || filters.rarity,
    }),
    [filters, lockedRarity],
  )
  const {
    data: cardsResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCardsQuery(queryFilters)
  const { data: typesResponse } = useGetTypesQuery()
  const { data: raritiesResponse } = useGetRaritiesQuery()
  const { data: setsResponse } = useGetSetsQuery()
  const prefetchCard = pokemonApi.usePrefetch('getCardById')

  const displayedCards = useMemo(() => cardsResponse?.data ?? [], [cardsResponse])
  const totalCount = cardsResponse?.totalCount ?? 0
  const hasNextPage = queryFilters.page * queryFilters.pageSize < totalCount
  const showSkeletonOnly = isLoading && !displayedCards.length
  const gridRenderKey = `${queryFilters.page}-${queryFilters.search}-${queryFilters.type}-${queryFilters.rarity}-${queryFilters.setId}-${queryFilters.sortBy}`
  const featuredRareCards = useMemo(() => {
    return displayedCards
      .filter((card) => card.rarity?.toLowerCase().includes('rare'))
      .slice(0, 4)
  }, [displayedCards])

  return (
    <div className="content-layout">
      <FilterPanel
        filters={queryFilters}
        hideRarityFilter={Boolean(lockedRarity)}
        lockedRarity={lockedRarity}
        types={typesResponse?.data ?? []}
        rarities={raritiesResponse?.data ?? []}
        sets={setsResponse?.data ?? []}
        onTypeChange={(value) => dispatch(setType(value))}
        onRarityChange={(value) => dispatch(setRarity(value))}
        onSetChange={(value) => dispatch(setSetId(value))}
        onSortChange={(value) => dispatch(setSortBy(value))}
        onReset={() => dispatch(resetFilters())}
      />

      <div className="main-feed">
        <section className="section-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="section-status">
            <span className="count-pill">{totalCount.toLocaleString()} matches</span>
            {lockedRarity ? <span className="status-pill">{lockedRarity} only</span> : null}
            {isFetching && !isLoading ? <span className="status-pill">Refreshing</span> : null}
          </div>
        </section>

        {showFeaturedRareStrip && featuredRareCards.length > 0 ? (
          <section className="rare-strip">
            {featuredRareCards.map((card) => (
              <button
                key={card.id}
                className="rare-card"
                onClick={() => navigate(`/card/${card.id}`)}
                onMouseEnter={() => prefetchCard(card.id, { ifOlderThan: 120 })}
                type="button"
              >
                <img
                  src={card.images.small}
                  alt={card.name}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <strong>{card.name}</strong>
                  <span>{card.rarity}</span>
                </div>
              </button>
            ))}
          </section>
        ) : null}

        {showSkeletonOnly ? <Loader count={8} /> : null}

        {isError ? (
          <ErrorMessage
            title="Unable to load cards"
            message={error?.error || 'The Pokemon TCG API is unavailable right now.'}
            onRetry={refetch}
          />
        ) : null}

        {!showSkeletonOnly && !isError && displayedCards.length === 0 ? (
          <section className="state-card">
            <h2>{emptyTitle}</h2>
            <p>{emptyMessage}</p>
          </section>
        ) : null}

        {!showSkeletonOnly && !isError && displayedCards.length > 0 ? (
          <>
            <div className={isFetching ? 'results-shell results-shell-refreshing' : 'results-shell'}>
              <CardGrid key={gridRenderKey} cards={displayedCards} />
            </div>
            <Pagination
              currentPage={queryFilters.page}
              hasNextPage={hasNextPage}
              onPageChange={(page) => dispatch(setPage(page))}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default CatalogSection
