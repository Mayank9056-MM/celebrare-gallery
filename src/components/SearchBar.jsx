
/**
 * SearchBar component.
 * Displays a search input field with a search icon and a clear button.
 * When the user types in the input field, the onSearch callback is called with the current input value.
 * When the user clicks the clear button, the onSearch callback is called with an empty string.
 *
 * @param {string} value - the current value of the search input field
 * @param {function(string): void} onSearch - a callback function to handle search queries
 */
function SearchBar({ value, onSearch }) {
  return (
    <div className="relative max-w-lg mx-auto">
      {/* Search icon */}
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-800/40 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by photographer…"
        aria-label="Search photos by author name"
        className="
          w-full
          pl-11 pr-4 py-3
          bg-white
          border border-cream-200
          rounded-full
          font-body text-sm text-charcoal-800
          placeholder-charcoal-800/30
          shadow-sm
          outline-none
          focus:border-charcoal-800/40
          focus:ring-2 focus:ring-charcoal-800/10
          transition-all duration-200
        "
      />

      {/* Clear button — only shown when there's a query */}
      {value && (
        <button
          onClick={() => onSearch('')}
          aria-label="Clear search"
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            w-5 h-5 flex items-center justify-center
            text-charcoal-800/40 hover:text-charcoal-800
            transition-colors duration-150
          "
        >
          <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-4 h-4">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchBar