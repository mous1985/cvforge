import { useState, useEffect, useCallback } from 'react'
import { Plus, X, GraduationCap } from 'lucide-react'
import { debounce } from '../../utils/helpers'

function Education({ data, updateData }) {
  const [education, setEducation] = useState(data.education || [])

  // Debounce la mise à jour
  const debouncedUpdate = useCallback(
    debounce((educationList) => {
      updateData(educationList, 'education')
    }, 500),
    [updateData]
  )

  useEffect(() => {
    debouncedUpdate(education)
  }, [education, debouncedUpdate])

  useEffect(() => {
    setEducation(data.education || [])
  }, []) // Initialisation une seule fois

  const addEducation = () => {
    setEducation([...education, {
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      details: ''
    }])
  }

  const updateEducation = (index, field, value) => {
    const updated = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    )
    setEducation(updated)
  }

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Formations</h3>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter une formation
        </button>
      </div>

      {education.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Aucune formation ajoutée pour le moment.</p>
          <p className="text-sm">Cliquez sur "Ajouter une formation" pour commencer.</p>
        </div>
      )}

      {education.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">Formation #{index + 1}</h4>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diplôme *
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Master en Informatique"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Établissement *
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom de l'établissement"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début
              </label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin
              </label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Détails (optionnel)
            </label>
            <textarea
              value={edu.details}
              onChange={(e) => updateEducation(index, 'details', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mention, projets particuliers, spécialisation..."
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Education
