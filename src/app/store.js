import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from '../features/api/pokemonApi'
import favoritesReducer from '../features/favorites/favoritesSlice'
import uiReducer from '../features/ui/uiSlice'
import { loadPersistedState, savePersistedState } from './storage'

const persistedState = loadPersistedState()

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    ui: uiReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
  preloadedState: persistedState,
})

setupListeners(store.dispatch)

store.subscribe(() => {
  const state = store.getState()

  savePersistedState({
    favorites: state.favorites,
    ui: {
      ...state.ui,
      search: '',
      page: 1,
    },
  })
})
