import { skipToken } from '@reduxjs/toolkit/query'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardGrid from './CardGrid'
import CardArtwork from './CardArtwork'
import ErrorMessage from './ErrorMessage'
import FilterPanel from './FilterPanel'
import Loader from './Loader'
import Pagination from './Pagination'
import {
  pokemonApi,
  useGetCardsQuery,
  useGetCardsBySearchQuery,
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
import { dedupeCardsById } from '../utils/cardFormatters'

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
      rarityMode: lockedRarity ? 'contains' : 'exact',
    }),
    [filters, lockedRarity],
  )
  const hasSearch = queryFilters.search.trim().length > 0
  const listQuery = useGetCardsQuery(hasSearch ? skipToken : queryFilters)
  const searchQuery = useGetCardsBySearchQuery(hasSearch ? queryFilters : skipToken)
  const { data: typesResponse } = useGetTypesQuery()
  const { data: raritiesResponse } = useGetRaritiesQuery()
  const { data: setsResponse } = useGetSetsQuery()
  const prefetchCard = pokemonApi.usePrefetch('getCardById')
  const prefetchCards = pokemonApi.usePrefetch('getCards')
  const prefetchCardsBySearch = pokemonApi.usePrefetch('getCardsBySearch')
  const activeQuery = hasSearch ? searchQuery : listQuery

  const resolvedData = activeQuery.currentData ?? activeQuery.data
  const displayedCards = useMemo(
    () => dedupeCardsById(resolvedData?.data ?? []),
    [resolvedData],
  )
  const responsePage = resolvedData?.page ?? queryFilters.page
  const responsePageSize = resolvedData?.pageSize ?? queryFilters.pageSize
  const responseCount = resolvedData?.count ?? displayedCards.length
  const totalCount = resolvedData?.totalCount ?? 0
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / responsePageSize) : 0
  const isOutOfRangePage = totalPages > 0 && responsePage > totalPages
  const visibleStart =
    totalCount > 0 && !isOutOfRangePage
      ? (responsePage - 1) * responsePageSize + 1
      : 0
  const visibleEnd =
    totalCount > 0 && !isOutOfRangePage
      ? Math.min(visibleStart + responseCount - 1, totalCount)
      : 0
  const hasNextPage = totalPages > 0 ? responsePage < totalPages : responseCount === responsePageSize
  const showSkeletonOnly = activeQuery.isLoading && !displayedCards.length
  const gridRenderKey = `${queryFilters.page}-${queryFilters.search}-${queryFilters.type}-${queryFilters.rarity}-${queryFilters.setId}-${queryFilters.sortBy}`
  const featuredRareCards = useMemo(() => {
    return displayedCards
      .filter((card) => card.rarity?.toLowerCase().includes('rare'))
      .slice(0, 4)
  }, [displayedCards])

  useEffect(() => {
    if (isOutOfRangePage) {
      dispatch(setPage(totalPages))
    }
  }, [dispatch, isOutOfRangePage, totalPages])

  useEffect(() => {
    if (!activeQuery.data) {
      return
    }

    // Prefetch adjacent pages so Prev/Next feels immediate without rendering more cards up front.
    if (queryFilters.page > 1) {
      const previousPageFilters = {
        ...queryFilters,
        page: queryFilters.page - 1,
      }

      if (hasSearch) {
        prefetchCardsBySearch(previousPageFilters, { ifOlderThan: 120 })
      } else {
        prefetchCards(previousPageFilters, { ifOlderThan: 120 })
      }
    }

    if (hasNextPage) {
      const nextPageFilters = {
        ...queryFilters,
        page: queryFilters.page + 1,
      }

      if (hasSearch) {
        prefetchCardsBySearch(nextPageFilters, { ifOlderThan: 120 })
      } else {
        prefetchCards(nextPageFilters, { ifOlderThan: 120 })
      }
    }
  }, [
    activeQuery.data,
    hasNextPage,
    hasSearch,
    prefetchCards,
    prefetchCardsBySearch,
    queryFilters,
  ])

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
            <p className="catalog-summary">
              Showing {visibleStart}-{visibleEnd} of {totalCount.toLocaleString()} unique cards.
              {totalCount >= 1000 ? ' More than 1,000 cards are available through paginated browsing.' : ''}
            </p>
          </div>
          <div className="section-status">
            <span className="count-pill">{totalCount.toLocaleString()} matches</span>
            {lockedRarity ? <span className="status-pill">{lockedRarity} only</span> : null}
            {activeQuery.isFetching && !activeQuery.isLoading ? (
              <span className="status-pill">Refreshing</span>
            ) : null}
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
                <CardArtwork card={card} />
                <div>
                  <strong>{card.name}</strong>
                  <span>{card.rarity}</span>
                </div>
              </button>
            ))}
          </section>
        ) : null}

        {showSkeletonOnly ? <Loader count={8} /> : null}

        {activeQuery.isError && !displayedCards.length ? (
          <ErrorMessage
            title="Unable to load cards"
            message={activeQuery.error?.error || 'The Pokemon TCG API is unavailable right now.'}
            onRetry={activeQuery.refetch}
          />
        ) : null}

        {!showSkeletonOnly && !activeQuery.isError && displayedCards.length === 0 ? (
          <section className="state-card">
            <h2>{emptyTitle}</h2>
            <p>{emptyMessage}</p>
          </section>
        ) : null}

        {!showSkeletonOnly && !activeQuery.isError && displayedCards.length > 0 ? (
          <>
            <div
              className={
                activeQuery.isFetching ? 'results-shell results-shell-refreshing' : 'results-shell'
              }
            >
              <CardGrid key={gridRenderKey} cards={displayedCards} />
            </div>
            <Pagination
              currentPage={responsePage}
              totalPages={totalPages}
              pageSize={responsePageSize}
              totalCount={totalCount}
              hasNextPage={hasNextPage}
              onPageChange={(page) => {
                const safePage = totalPages > 0 ? Math.min(Math.max(page, 1), totalPages) : Math.max(page, 1)
                dispatch(setPage(safePage))
              }}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default CatalogSection
