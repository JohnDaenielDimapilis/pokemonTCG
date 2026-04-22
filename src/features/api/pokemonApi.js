import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://api.pokemontcg.io/v2/'

function buildCardQuery({
  page = 1,
  pageSize = 20,
  search = '',
  type = 'All',
  rarity = 'All',
  setId = 'All',
  sortBy = 'name',
  includeSearch = false,
}) {
  const filters = []

  if (includeSearch && search.trim()) {
    filters.push(`name:*${search.trim()}*`)
  }

  if (type !== 'All') {
    filters.push(`types:"${type}"`)
  }

  if (rarity !== 'All') {
    filters.push(`rarity:"${rarity}"`)
  }

  if (setId !== 'All') {
    filters.push(`set.id:${setId}`)
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
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
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
