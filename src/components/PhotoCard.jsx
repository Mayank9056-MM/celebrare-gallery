import { useState, useRef } from 'react'


/**
 * PhotoCard
 *
 * A card component that displays a photo thumbnail, author name, and a heart button.
 * The heart button toggles the favourite state of the photo when clicked.
 * The component also includes a skeleton shimmer animation while the image loads.
 *
 * Props:
 *   photo            — a photo object containing the id, author, and url
 *   isFavourited — a boolean indicating whether the photo is favourited
 *   onToggleFavourite — a function to toggle the favourite state of the photo
 *   animationIndex — an integer indicating the animation delay for the card
 */
function PhotoCard({ photo, isFavourited, onToggleFavourite, animationIndex }) {
  const [imgLoaded, setImgLoaded]   = useState(false)
  const [imgError, setImgError]     = useState(false)
  const [heartAnim, setHeartAnim]   = useState(false)
  const heartRef                    = useRef(null)

  const thumbUrl = `https://picsum.photos/id/${photo.id}/600/400`

  function handleHeartClick() {
    // Trigger the pop animation on every click
    setHeartAnim(false)

    requestAnimationFrame(() => {
      setHeartAnim(true)
      setTimeout(() => setHeartAnim(false), 300)
    })
    onToggleFavourite(photo.id)
  }

  const delayClass = `card-delay-${Math.min(animationIndex % 8, 7)}`

  return (
    <article
      className={`
        group relative bg-white rounded-2xl overflow-hidden
        shadow-[0_2px_12px_rgba(0,0,0,0.07)]
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.13)]
        transition-all duration-300 ease-out
        hover:-translate-y-1
        opacity-0 animate-fade-up ${delayClass}
      `}
    >
      {/* Image area */}
      <div className="relative w-full aspect-[3/2] bg-cream-100 overflow-hidden">
        {/* Skeleton shimmer shown while image loads */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-200 to-cream-100 animate-pulse" />
        )}

        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-charcoal-800/30">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3l18 18" />
            </svg>
            <span className="text-xs font-body">Image unavailable</span>
          </div>
        ) : (
          <img
            src={thumbUrl}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true) }}
            className={`
              w-full h-full object-cover
              transition-all duration-500 ease-out
              group-hover:scale-105
              ${imgLoaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
        )}

        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/30 via-transparent to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        " />
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="min-w-0 mr-2">
          <p className="text-[11px] font-body font-400 tracking-widest uppercase text-charcoal-800/40 leading-none mb-1">
            Photographer
          </p>
          <p className="text-sm font-body font-medium text-charcoal-800 truncate leading-tight">
            {photo.author}
          </p>
        </div>

        {/* Heart button */}
        <button
          ref={heartRef}
          onClick={handleHeartClick}
          aria-label={isFavourited ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          aria-pressed={isFavourited}
          className={`
            flex-shrink-0
            w-9 h-9 rounded-full flex items-center justify-center
            transition-all duration-200 ease-out
            ${isFavourited
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
              : 'bg-cream-100 text-charcoal-800/30 hover:bg-cream-200 hover:text-charcoal-800/60'
            }
          `}
        >
          <svg
            className={`w-4 h-4 transition-transform ${heartAnim ? 'heart-pop' : ''}`}
            viewBox="0 0 24 24"
            fill={isFavourited ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavourited ? 0 : 2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935
                 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1
                 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default PhotoCard