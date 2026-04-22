import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CardDetails from './pages/CardDetails'
import Favorites from './pages/Favorites'
import { setSearch, toggleTheme } from './features/ui/uiSlice'

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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card/:id" element={<CardDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
