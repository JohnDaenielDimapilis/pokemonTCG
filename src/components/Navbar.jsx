import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar({ searchValue, onSearchChange, onThemeToggle, theme }) {
  return (
    <header className="navbar">
      <NavLink className="brand" to="/">
        <span className="brand-mark">PV</span>
        <div>
          <p className="brand-title">PokeVault</p>
          <p className="brand-subtitle">
            Explore, search, and collect Pokemon TCG cards
          </p>
        </div>
      </NavLink>

      <nav className="nav-links" aria-label="Primary">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/favorites">
          Favorites
        </NavLink>
      </nav>

      <div className="navbar-actions">
        <SearchBar value={searchValue} onChange={onSearchChange} />
        <button className="theme-toggle" onClick={onThemeToggle} type="button">
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </header>
  )
}

export default Navbar
