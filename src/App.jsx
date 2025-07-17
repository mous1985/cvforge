import { useState } from 'react'
import PersonalInfo from './components/steps/PersonalInfo'
import Logo from './components/Logo'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showCV, setShowCV] = useState(false)
  const [formData, setFormData] = useState({
    personalInfo: {},
    objective: '',
    skills: [],
    experience: [],
    education: [],
    languages: [],
    interests: []
  })

  const updateData = (data, section) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const startCV = () => {
    setShowCV(true)
  }

  if (!showCV) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-all duration-500 p-6">
        <div className="max-w-4xl mx-auto">
          {/* En-tête avec logo et toggle thème */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Logo />
              <h1 className="text-2xl font-bold text-white dark:text-gray-200">CVForge</h1>
            </div>
            <ThemeToggle />
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <h1 className="text-4xl font-bold text-white dark:text-gray-200 text-center mb-4">Créateur de CV</h1>
            <p className="text-white dark:text-gray-300 text-xl text-center mb-8">Créez votre CV professionnel en quelques étapes</p>
            
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white dark:text-gray-200 mb-4">Bienvenue</h2>
              <p className="text-white/90 dark:text-gray-300 mb-6">
                Cette interface vous permet de créer un CV professionnel étape par étape avec une interface moderne et intuitive.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={startCV}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Commencer mon CV
                </button>
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                  Voir un exemple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-all duration-500">
      <div className="max-w-7xl mx-auto p-6">
        {/* En-tête avec logo et toggle thème */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="text-2xl font-bold text-white dark:text-gray-200">CVForge</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Barre de progression simple */}
        <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white dark:text-gray-200 font-semibold">Étape 1 sur 8</span>
              <span className="text-white/80 dark:text-gray-300">Informations personnelles</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '12.5%'}}></div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
          <PersonalInfo 
            data={formData} 
            updateData={updateData}
          />
        </div>

        {/* Navigation simple */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setShowCV(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Retour
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Étape suivante
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
