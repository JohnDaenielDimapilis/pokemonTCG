import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'dark',
  search: '',
  type: 'All',
  rarity: 'All',
  setId: 'All',
  sortBy: 'name',
  page: 1,
  pageSize: 20,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    setSearch: (state, action) => {
      state.search = action.payload
      state.page = 1
    },
    setType: (state, action) => {
      state.type = action.payload
      state.page = 1
    },
    setRarity: (state, action) => {
      state.rarity = action.payload
      state.page = 1
    },
    setSetId: (state, action) => {
      state.setId = action.payload
      state.page = 1
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
      state.page = 1
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    resetFilters: (state) => {
      state.search = ''
      state.type = 'All'
      state.rarity = 'All'
      state.setId = 'All'
      state.sortBy = 'name'
      state.page = 1
    },
  },
})

export const {
  setTheme,
  toggleTheme,
  setSearch,
  setType,
  setRarity,
  setSetId,
  setSortBy,
  setPage,
  resetFilters,
} = uiSlice.actions

export default uiSlice.reducer
