import { useState, useEffect, useCallback } from 'react'
import { Plus, X, Heart } from 'lucide-react'
import { debounce } from '../../utils/helpers'

function Interests({ data, updateData }) {
  const [interests, setInterests] = useState(data.interests || [])
  const [newInterest, setNewInterest] = useState('')

  // Debounce la mise à jour
  const debouncedUpdate = useCallback(
    debounce((interestsList) => {
      updateData(interestsList, 'interests')
    }, 300),
    [updateData]
  )

  useEffect(() => {
    debouncedUpdate(interests)
  }, [interests, debouncedUpdate])

  useEffect(() => {
    setInterests(data.interests || [])
  }, []) // Initialisation une seule fois

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest('')
    }
  }

  const removeInterest = (interestToRemove) => {
    setInterests(interests.filter(interest => interest !== interestToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addInterest()
    }
  }

  const suggestedInterests = [
    'Lecture', 'Sport', 'Voyage', 'Photographie', 'Musique', 'Cuisine',
    'Jardinage', 'Cinéma', 'Théâtre', 'Art', 'Technologie', 'Jeux vidéo',
    'Randonnée', 'Natation', 'Course à pied', 'Yoga', 'Méditation',
    'Bénévolat', 'Écriture', 'Dessin', 'Danse', 'Échecs'
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Centres d'intérêt</h3>
        <p className="text-sm text-gray-600 mb-4">
          Cette section est optionnelle mais peut aider à créer du lien avec le recruteur.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ajouter un centre d'intérêt
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Lecture, Sport, Voyage..."
          />
          <button
            onClick={addInterest}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Suggestions :</h4>
        <div className="flex flex-wrap gap-2">
          {suggestedInterests
            .filter(interest => !interests.includes(interest))
            .map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  setInterests([...interests, interest])
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                + {interest}
              </button>
            ))}
        </div>
      </div>

      {/* Liste des centres d'intérêt */}
      {interests.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Vos centres d'intérêt ({interests.length}) :
          </h4>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-lg"
              >
                <span className="text-sm font-medium">{interest}</span>
                <button
                  onClick={() => removeInterest(interest)}
                  className="text-green-600 hover:text-green-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {interests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Aucun centre d'intérêt ajouté pour le moment.</p>
          <p className="text-sm">Cette section est optionnelle mais peut enrichir votre profil.</p>
        </div>
      )}
    </div>
  )
}

export default Interests
