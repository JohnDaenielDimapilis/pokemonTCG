import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import { setSearch, toggleTheme } from './features/ui/uiSlice'

const Home = lazy(() => import('./pages/Home'))
const CardDetails = lazy(() => import('./pages/CardDetails'))
const Favorites = lazy(() => import('./pages/Favorites'))

function App() {
  const dispatch = useDispatch()
  const { search, theme } = useSelector((state) => state.ui)

  return (
    <BrowserRouter>
      <div className={`app-frame theme-${theme}`}>
        <Navbar
          searchValue={search}
          onSearchChange={(value) => dispatch(setSearch(value))}
          onThemeToggle={() => dispatch(toggleTheme())}
          theme={theme}
        />

        <Suspense fallback={<Loader count={6} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card/:id" element={<CardDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App
