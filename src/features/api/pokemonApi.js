import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://api.pokemontcg.io/v2/'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getCards: builder.query({
      query: ({
        page = 1,
        pageSize = 20,
        search = '',
        type = 'All',
        rarity = 'All',
        setId = 'All',
        sortBy = 'name',
      }) => {
        const filters = []

        if (search.trim()) {
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
      },
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
  useGetCardByIdQuery,
  useGetTypesQuery,
  useGetRaritiesQuery,
  useGetSetsQuery,
} = pokemonApi
