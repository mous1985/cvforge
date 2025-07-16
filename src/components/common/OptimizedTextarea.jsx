import { useState, useCallback, memo } from 'react'
import { debounce } from '../../utils/helpers'

// Composant memo pour éviter les re-rendus inutiles
const OptimizedTextarea = memo(({ value, onChange, placeholder, rows = 4 }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent form-field"
      placeholder={placeholder}
    />
  )
})

OptimizedTextarea.displayName = 'OptimizedTextarea'

export default OptimizedTextarea
