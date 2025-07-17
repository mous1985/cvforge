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
    <div className="space-y-8 form-container">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Expériences professionnelles</h3>
          <p className="text-gray-600 mt-1">Ajoutez vos expériences les plus récentes en premier</p>
        </div>
        <button
          onClick={addExperience}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter une expérience
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-200">
          <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">Aucune expérience ajoutée pour le moment.</p>
          <p className="text-sm">Cliquez sur "Ajouter une expérience" pour commencer.</p>
        </div>
      )}

      {experiences.map((experience, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm hover:shadow-md transition-all duration-200 fade-in">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-lg">Expérience #{index + 1}</h4>
            </div>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Titre du poste *
              </label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
                placeholder="Ex: Développeur Frontend"
              />
            </div>

            <div className="form-field">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Entreprise *
              </label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
                placeholder="Nom de l'entreprise"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Date de début
              </label>
              <input
                type="month"
                value={experience.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
              />
            </div>

            <div className="form-field">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Date de fin
              </label>
              <div className="space-y-3">
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  disabled={experience.current}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                />
                <label className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => {
                      updateExperience(index, 'current', e.target.checked)
                      if (e.target.checked) {
                        updateExperience(index, 'endDate', '')
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-blue-800">Poste actuel</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-field">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Description des missions
            </label>
            <textarea
              value={experience.description}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200 resize-none"
              placeholder="Décrivez vos principales missions et réalisations..."
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Experience
