
/**
 * favouritesReducer
 *
 * Reducer that manages the favourites Set in the App's state.
 *
 * Handles two actions:
 *   - TOGGLE_FAVOURITE: toggles a photo id in the favourites Set
 *   - INIT: initializes the favourites Set with an array of photo ids
 *
 * @param {Set<number>} state - current favourites Set
 * @param {{type: string, id: number}} action - action to handle
 * @return {Set<number>} next - new favourites Set after handling the action
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const next = new Set(state)
      if (next.has(action.id)) {
        next.delete(action.id)
      } else {
        next.add(action.id)
      }
      return next
    }

    case 'INIT': {
      return new Set(action.ids)
    }

    default:
      return state
  }
}

// localStorage helpers

const STORAGE_KEY = 'celebrare_favourites'

/**
 * Loads the favourites array from localStorage.
 * If the storage key is not present, or if the stored value is
 * not a valid JSON array, returns an empty array.
 * @returns {Array<number>} favourites array
 */
export function loadFavourites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Saves the given favourites array to localStorage.
 * If localStorage is full or disabled, does nothing.
 * @param {Set<number>} favouriteSet - set of photo ids to save
 */
export function saveFavourites(favouriteSet) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favouriteSet]))
  } catch {
    // storage might be full or disabled.
  }
}