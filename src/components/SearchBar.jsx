function SearchBar({ value, onChange }) {
  return (
    <label className="search-shell" htmlFor="card-search">
      <span className="sr-only">Search Pokemon cards</span>
      <input
        id="card-search"
        type="search"
        placeholder="Search Pokemon name"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar
