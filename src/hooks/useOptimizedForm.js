import { useCallback, useRef, useState } from 'react'
import { debounce } from '../utils/helpers'

// Hook personnalisé pour optimiser les mises à jour de formulaire
export function useOptimizedForm(updateData, stepKey, delay = 300) {
  const debouncedUpdateRef = useRef()

  // Créer la fonction debounced une seule fois
  if (!debouncedUpdateRef.current) {
    debouncedUpdateRef.current = debounce((data) => {
      updateData(data, stepKey)
    }, delay)
  }

  const optimizedUpdate = useCallback((data) => {
    debouncedUpdateRef.current(data)
  }, [])

  return optimizedUpdate
}

// Hook pour gérer les états de formulaire avec moins de re-rendus
export function useStableState(initialValue, updateCallback, delay = 300) {
  const [state, setState] = useState(initialValue)
  const debouncedCallback = useRef()

  if (!debouncedCallback.current) {
    debouncedCallback.current = debounce(updateCallback, delay)
  }

  const updateState = useCallback((newValue) => {
    setState(newValue)
    debouncedCallback.current(newValue)
  }, [])

  return [state, updateState]
}
