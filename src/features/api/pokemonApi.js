import { retry } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://api.pokemontcg.io/v2/'
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('accept', 'application/json')
    return headers
  },
})
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 })

function escapeQueryValue(value = '') {
  return value.replace(/["\\]/g, '\\$&').trim()
}

function buildCardQuery({
  page = 1,
  pageSize = 20,
  search = '',
  type = 'All',
  rarity = 'All',
  rarityMode = 'exact',
  setId = 'All',
  sortBy = 'name',
  includeSearch = false,
}) {
  const filters = []
  const normalizedSearch = escapeQueryValue(search)

  if (includeSearch && normalizedSearch) {
    filters.push(`name:*${normalizedSearch}*`)
  }

  if (type !== 'All') {
    filters.push(`types:"${escapeQueryValue(type)}"`)
  }

  if (rarity !== 'All') {
    filters.push(
      rarityMode === 'contains'
        ? `rarity:*${escapeQueryValue(rarity)}*`
        : `rarity:"${escapeQueryValue(rarity)}"`,
    )
  }

  if (setId !== 'All') {
    filters.push(`set.id:${escapeQueryValue(setId)}`)
  }

  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy: sortBy,
  })

  if (filters.length > 0) {
    queryParams.set('q', filters.join(' '))
  }

  return `cards?${queryParams.toString()}`
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: baseQueryWithRetry,
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getCards: builder.query({
      query: (params) =>
        buildCardQuery({
          ...params,
          search: '',
          includeSearch: false,
        }),
    }),
    getCardsBySearch: builder.query({
      query: (params) =>
        buildCardQuery({
          ...params,
          includeSearch: true,
        }),
    }),
    getCardById: builder.query({
      query: (id) => `cards/${id}`,
    }),
    getTypes: builder.query({
      query: () => 'types',
    }),
    getRarities: builder.query({
      query: () => 'rarities',
    }),
    getSets: builder.query({
      query: () => 'sets?orderBy=-releaseDate',
    }),
  }),
})

export const {
  useGetCardsQuery,
  useGetCardsBySearchQuery,
  useGetCardByIdQuery,
  useGetTypesQuery,
  useGetRaritiesQuery,
  useGetSetsQuery,
} = pokemonApi
