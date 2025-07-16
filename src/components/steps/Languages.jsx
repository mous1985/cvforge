import { useState, useEffect, useCallback } from 'react'
import { Plus, X, Languages as LanguagesIcon } from 'lucide-react'
import { debounce } from '../../utils/helpers'

function Languages({ data, updateData }) {
  const [languages, setLanguages] = useState(data.languages || [])

  const levels = [
    { value: 'beginner', label: 'Débutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'advanced', label: 'Courant' },
    { value: 'native', label: 'Natif' }
  ]

  // Debounce la mise à jour
  const debouncedUpdate = useCallback(
    debounce((languagesList) => {
      updateData(languagesList, 'languages')
    }, 300),
    [updateData]
  )

  useEffect(() => {
    debouncedUpdate(languages)
  }, [languages, debouncedUpdate])

  useEffect(() => {
    setLanguages(data.languages || [])
  }, []) // Initialisation une seule fois

  const addLanguage = () => {
    setLanguages([...languages, { language: '', level: 'intermediate' }])
  }

  const updateLanguage = (index, field, value) => {
    const updated = languages.map((lang, i) => 
      i === index ? { ...lang, [field]: value } : lang
    )
    setLanguages(updated)
  }

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Langues</h3>
        <button
          onClick={addLanguage}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter une langue
        </button>
      </div>

      {languages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <LanguagesIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Aucune langue ajoutée pour le moment.</p>
          <p className="text-sm">Cliquez sur "Ajouter une langue" pour commencer.</p>
        </div>
      )}

      {languages.map((lang, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Langue #{index + 1}</h4>
            <button
              onClick={() => removeLanguage(index)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Langue *
              </label>
              <input
                type="text"
                value={lang.language}
                onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Français, Anglais, Espagnol..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau *
              </label>
              <select
                value={lang.level}
                onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Languages
