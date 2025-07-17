import { useState, useEffect, useCallback } from 'react'
import { Plus, X } from 'lucide-react'
import { debounce } from '../../utils/helpers'

function Skills({ data, updateData }) {
  const [skills, setSkills] = useState(data.skills || [])
  const [newSkill, setNewSkill] = useState('')

  // Debounce la mise à jour
  const debouncedUpdate = useCallback(
    debounce((skillsList) => {
      updateData(skillsList, 'skills')
    }, 300),
    [updateData]
  )

  useEffect(() => {
    debouncedUpdate(skills)
  }, [skills, debouncedUpdate])

  useEffect(() => {
    setSkills(data.skills || [])
  }, []) // Initialisation une seule fois

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const suggestedSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PHP', 'SQL', 'HTML/CSS',
    'Git', 'Docker', 'AWS', 'MongoDB', 'TypeScript', 'Vue.js', 'Angular',
    'Communication', 'Travail d\'équipe', 'Leadership', 'Gestion de projet',
    'Résolution de problèmes', 'Créativité', 'Adaptabilité', 'Autonomie'
  ]

  return (
    <div className="space-y-8 form-container">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Compétences
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Ajoutez vos compétences techniques et soft skills
        </p>
      </div>

      <div className="form-field">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Ajouter une compétence
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            placeholder="Ex: JavaScript, Communication, etc."
          />
          <button
            onClick={addSkill}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Compétences suggérées */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Suggestions :
        </h3>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills
            .filter(skill => !skills.includes(skill))
            .slice(0, 12)
            .map((skill) => (
              <button
                key={skill}
                onClick={() => {
                  setSkills([...skills, skill])
                }}
                className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 transform hover:scale-105 shadow-sm"
              >
                + {skill}
              </button>
            ))}
        </div>
      </div>

      {/* Liste des compétences ajoutées */}
      {skills.length > 0 && (
        <div className="fade-in">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Vos compétences ({skills.length}) :
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span className="text-sm font-medium flex-1">{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-blue-600 hover:text-red-600 transition-colors duration-200 p-1 hover:bg-white/50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg font-medium mb-2">Aucune compétence ajoutée pour le moment.</p>
          <p className="text-sm">Commencez par ajouter vos compétences techniques et soft skills.</p>
        </div>
      )}
    </div>
  )
}

export default Skills
