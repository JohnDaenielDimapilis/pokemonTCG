import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardGrid from '../components/CardGrid'
import ErrorMessage from '../components/ErrorMessage'
import FilterPanel from '../components/FilterPanel'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import {
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

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const filters = useSelector((state) => state.ui)
  const {
    data: cardsResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCardsQuery(filters)
  const { data: typesResponse } = useGetTypesQuery()
  const { data: raritiesResponse } = useGetRaritiesQuery()
  const { data: setsResponse } = useGetSetsQuery()

  const cards = useMemo(() => cardsResponse?.data ?? [], [cardsResponse])
  const totalCount = cardsResponse?.totalCount ?? 0
  const hasNextPage = filters.page * filters.pageSize < totalCount

  const featuredRareCards = useMemo(() => {
    return cards.filter((card) => card.rarity?.toLowerCase().includes('rare')).slice(0, 4)
  }, [cards])

  const handleRandomCard = () => {
    if (!cards.length) {
      return
    }

    const randomCard = cards[Math.floor(Math.random() * cards.length)]
    navigate(`/card/${randomCard.id}`)
  }

  return (
    <section className="page-shell">
      <section className="hero-banner">
        <div>
          <p className="eyebrow">PokeVault</p>
          <h1>Discover Pokemon Trading Cards</h1>
          <p className="hero-description">
            Search, explore, and save standout cards in a polished collection
            experience powered by Redux Toolkit and RTK Query.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={handleRandomCard} type="button">
            Random Card
          </button>
          <p className="hero-caption">
            Browse cards, build favorites, and inspect detailed market and set info.
          </p>
        </div>
      </section>

      <div className="content-layout">
        <FilterPanel
          filters={filters}
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
              <p className="eyebrow">Live Catalog</p>
              <h2>Featured Pokemon cards</h2>
              <p>{totalCount.toLocaleString()} cards found in the current view</p>
            </div>
            {isFetching && !isLoading ? <span className="status-pill">Refreshing</span> : null}
          </section>

          {featuredRareCards.length > 0 ? (
            <section className="rare-strip">
              {featuredRareCards.map((card) => (
                <button
                  key={card.id}
                  className="rare-card"
                  onClick={() => navigate(`/card/${card.id}`)}
                  type="button"
                >
                  <img src={card.images.small} alt={card.name} loading="lazy" />
                  <div>
                    <strong>{card.name}</strong>
                    <span>{card.rarity}</span>
                  </div>
                </button>
              ))}
            </section>
          ) : null}

          {isLoading ? <Loader count={8} /> : null}

          {isError ? (
            <ErrorMessage
              title="Unable to load cards"
              message={error?.error || 'The Pokemon TCG API is unavailable right now.'}
              onRetry={refetch}
            />
          ) : null}

          {!isLoading && !isError && cards.length === 0 ? (
            <section className="state-card">
              <h2>No cards found</h2>
              <p>Try changing the search, set, type, or rarity filters.</p>
            </section>
          ) : null}

          {!isLoading && !isError && cards.length > 0 ? (
            <>
              <CardGrid cards={cards} />
              <Pagination
                currentPage={filters.page}
                hasNextPage={hasNextPage}
                onPageChange={(page) => dispatch(setPage(page))}
              />
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Home
