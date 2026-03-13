import PhotoCard from "./PhotoCard"


/**
 * PhotoGrid component.
 * Displays a grid of PhotoCard components based on the given photos array.
 * If the photos array is empty, displays a "no results" message instead.
 *
 * @param {{Photo[]}} photos - array of Photo objects to display
 * @param {Set<number>} favourites - set of photo IDs that are currently favourited
 * @param {function(number): void)} onToggleFavourite - callback to toggle the favourite state of a photo
 * @param {string} searchQuery - current search query string
 */
function PhotoGrid({ photos, favourites, onToggleFavourite, searchQuery }) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-4">
        <svg className="w-12 h-12 text-charcoal-800/20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
        </svg>
        <p className="font-body text-charcoal-800/40 text-center">
          No photographers match <span className="font-medium text-charcoal-800/60">"{searchQuery}"</span>
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourited={favourites.has(photo.id)}
          onToggleFavourite={onToggleFavourite}
          animationIndex={index}
        />
      ))}
    </div>
  )
}

export default PhotoGrid