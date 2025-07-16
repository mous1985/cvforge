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
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ajouter une compétence
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: JavaScript, Communication, etc."
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Compétences suggérées */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Suggestions :</h3>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills
            .filter(skill => !skills.includes(skill))
            .map((skill) => (
              <button
                key={skill}
                onClick={() => {
                  setSkills([...skills, skill])
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                + {skill}
              </button>
            ))}
        </div>
      </div>

      {/* Liste des compétences ajoutées */}
      {skills.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Vos compétences ({skills.length}) :
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg"
              >
                <span className="text-sm font-medium">{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Aucune compétence ajoutée pour le moment.</p>
          <p className="text-sm">Commencez par ajouter vos compétences techniques et soft skills.</p>
        </div>
      )}
    </div>
  )
}

export default Skills
