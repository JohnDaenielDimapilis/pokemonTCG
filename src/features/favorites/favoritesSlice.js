import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const existingCard = state.items.find(
        (card) => card.id === action.payload.id,
      )

      if (existingCard) {
        state.items = state.items.filter((card) => card.id !== action.payload.id)
        return
      }

      state.items.unshift(action.payload)
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((card) => card.id !== action.payload)
    },
  },
})

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
