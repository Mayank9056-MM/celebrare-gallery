import { useState, useEffect } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

/**
 * useFetchPhotos
 *
 * Fetches an array of photo objects from the Picsum API.
 *
 * Returns an object with three properties:
 *   - photos: an array of photo objects
 *   - loading: a boolean indicating whether the data is loading
 *   - error: a string containing any error message (or null)
 *
 * The function uses the AbortController API to cancel any ongoing fetches when the component is unmounted.
 */
function useFetchPhotos() {
  const [photos, setPhotos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(API_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()

    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}

export default useFetchPhotos