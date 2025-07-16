import { useState, useEffect, useCallback } from 'react'
import { Plus, X, Briefcase } from 'lucide-react'
import { debounce } from '../../utils/helpers'

function Experience({ data, updateData }) {
  const [experiences, setExperiences] = useState(data.experiences || [])

  // Debounce la mise à jour
  const debouncedUpdate = useCallback(
    debounce((experiencesList) => {
      updateData(experiencesList, 'experiences')
    }, 500),
    [updateData]
  )

  useEffect(() => {
    debouncedUpdate(experiences)
  }, [experiences, debouncedUpdate])

  useEffect(() => {
    setExperiences(data.experiences || [])
  }, []) // Initialisation une seule fois

  const addExperience = () => {
    setExperiences([...experiences, {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    }])
  }

  const updateExperience = (index, field, value) => {
    const updated = experiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    )
    setExperiences(updated)
  }

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Expériences professionnelles</h3>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter une expérience
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Aucune expérience ajoutée pour le moment.</p>
          <p className="text-sm">Cliquez sur "Ajouter une expérience" pour commencer.</p>
        </div>
      )}

      {experiences.map((experience, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">Expérience #{index + 1}</h4>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du poste *
              </label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Développeur Frontend"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entreprise *
              </label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom de l'entreprise"
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
                value={experience.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin
              </label>
              <div className="space-y-2">
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  disabled={experience.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => {
                      updateExperience(index, 'current', e.target.checked)
                      if (e.target.checked) {
                        updateExperience(index, 'endDate', '')
                      }
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">Poste actuel</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description des missions
            </label>
            <textarea
              value={experience.description}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Décrivez vos principales missions et réalisations..."
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Experience
