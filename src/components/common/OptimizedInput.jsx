import { memo } from 'react'

// Composant input optimisé avec memo
const OptimizedInput = memo(({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent form-field ${className}`}
      {...props}
    />
  )
})

OptimizedInput.displayName = 'OptimizedInput'

export default OptimizedInput
