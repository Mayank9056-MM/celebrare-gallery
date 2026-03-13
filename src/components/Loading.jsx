
/**
 * LoadingSpinner
 *
 * A component that displays a loading animation while the photos are being fetched.
 *
 * It consists of a spinning ring and a text message that says "Loading photos…".
 *
 * This component is used in the App component while the photos are being fetched.
 */
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-5">
      {/* Animated ring */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-cream-200" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-charcoal-900 animate-spin" />
      </div>
      <p className="font-body text-sm tracking-widest uppercase text-charcoal-800/50">
        Loading photos…
      </p>
    </div>
  )
}

export default LoadingSpinner