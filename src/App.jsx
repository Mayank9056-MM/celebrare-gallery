import { useState, useReducer, useCallback, useMemo, useEffect } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import {
  favouritesReducer,
  loadFavourites,
  saveFavourites,
} from "./reducers/favouritesReducer";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/Loading";
import PhotoGrid from "./components/PhotoGrid";

function App() {
  const { photos, loading, error } = useFetchPhotos();

  const [favourites, dispatch] = useReducer(favouritesReducer, new Set());

  useEffect(() => {
    const saved = loadFavourites();
    if (saved.length > 0) {
      dispatch({ type: "INIT", ids: saved });
    }
  }, []);

  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: "TOGGLE_FAVOURITE", id });
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(query));
  }, [photos, searchQuery]);

  // Derived: count of currently favourited photos in the visible list
  const favouriteCount = useMemo(() => [...favourites].length, [favourites]);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="border-b border-cream-200 bg-cream-50/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex-shrink-0">
            <h1 className="font-display text-2xl font-bold tracking-tight text-charcoal-900">
              Lumière
            </h1>
            <p className="font-body text-[11px] tracking-widest uppercase text-charcoal-800/40 -mt-0.5">
              Photo Gallery
            </p>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <SearchBar value={searchQuery} onSearch={handleSearch} />
          </div>

          {/* Favourites badge */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-rose-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span className="font-body text-sm font-medium text-charcoal-800">
              {favouriteCount}
              <span className="text-charcoal-800/40 ml-1 hidden sm:inline">
                saved
              </span>
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results meta-line */}
        {!loading && !error && (
          <p className="font-body text-xs tracking-widest uppercase text-charcoal-800/40 mb-6">
            {filteredPhotos.length === photos.length
              ? `${photos.length} photos`
              : `${filteredPhotos.length} of ${photos.length} photos`}
          </p>
        )}

        {/* Loading state */}
        {loading && <LoadingSpinner />}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-body font-medium text-charcoal-800 mb-1">
                Failed to load photos
              </p>
              <p className="font-body text-sm text-charcoal-800/50">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="
                mt-2 px-5 py-2.5
                bg-charcoal-900 text-cream-50
                rounded-full font-body text-sm font-medium
                hover:bg-charcoal-800 transition-colors duration-200
              "
            >
              Try again
            </button>
          </div>
        )}

        {/* Gallery grid */}
        {!loading && !error && (
          <PhotoGrid
            photos={filteredPhotos}
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-cream-200 mt-16 py-8 text-center">
        <p className="font-body text-xs text-charcoal-800/30 tracking-wide">
          Photos via{" "}
          <a
            href="https://picsum.photos"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-charcoal-800/60 transition-colors"
          >
            Picsum Photos
          </a>{" "}
          · Built for Celebrare Frontend Internship
        </p>
      </footer>
    </div>
  );
}

export default App;
