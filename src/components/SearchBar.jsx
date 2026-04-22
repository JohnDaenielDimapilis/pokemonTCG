import { useEffect, useState } from 'react'
import useDebouncedValue from '../hooks/useDebouncedValue'

function SearchBar({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value)
  const debouncedValue = useDebouncedValue(inputValue, 350)

  useEffect(() => {
    onChange(debouncedValue)
  }, [debouncedValue, onChange])

  return (
    <label className="search-shell" htmlFor="card-search">
      <span className="sr-only">Search Pokemon cards</span>
      <input
        id="card-search"
        type="search"
        placeholder="Search Pokemon name"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
    </label>
  )
}

export default SearchBar
