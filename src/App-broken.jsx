import { useState, useEffect, useCallback } from 'react'
import PersonalInfo from './components/steps/PersonalInfo'
import Objective from './components/steps/Objective'
import Skills from './components/steps/Skills'
import Experience from './components/steps/Experience'
import Education from './components/steps/Education'
import Languages from './components/steps/Languages'
import Interests from './components/steps/Interests'
import Preview from './components/steps/Preview'
import ProgressBar from './components/ProgressBar'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ThemeToggle from './components/ThemeToggle'
import { debounce } from './utils/helpers'

const STEPS = [
  { id: 1, title: 'Informations personnelles', component: PersonalInfo },
  { id: 2, title: 'Objectif professionnel', component: Objective },
  { id: 3, title: 'Compétences', component: Skills },
  { id: 4, title: 'Expériences', component: Experience },
  { id: 5, title: 'Formations', component: Education },
  { id: 6, title: 'Langues', component: Languages },
  { id: 7, title: 'Centres d\'intérêt', component: Interests },
  { id: 8, title: 'Aperçu & Génération', component: Preview }
]

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {},
    objective: '',
    skills: [],
    experience: [],
    education: [],
    languages: [],
    interests: []
  })

  // Fonction debounced pour sauvegarder dans localStorage
  const debouncedSave = useCallback(
    debounce((data) => {
      localStorage.setItem('cvData', JSON.stringify(data))
    }, 1000),
    []
  )

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem('cvData')
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      }
    }
  }, [])

  // Sauvegarder quand formData change
  useEffect(() => {
    debouncedSave(formData)
  }, [formData, debouncedSave])

  const updateData = useCallback((data, section) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }))
  }, [])

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const goToStep = (step) => {
    setCurrentStep(step)
  }

  const currentStepData = STEPS.find(step => step.id === currentStep)
  const CurrentComponent = currentStepData?.component

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-all duration-500">
      <div className="max-w-7xl mx-auto p-6">
        {/* En-tête avec logo et toggle thème */}
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <ThemeToggle />
        </div>

        {/* Barre de progression */}
        <div className="mb-8">
          <ProgressBar 
            currentStep={currentStep} 
            totalSteps={STEPS.length}
            onStepClick={goToStep}
          />
        </div>

        {/* Contenu principal */}
        <div className="glass rounded-3xl p-8 mb-8 shadow-2xl backdrop-blur-xl border border-white/20">
          <div className="slide-in-bottom">
            {CurrentComponent && (
              <CurrentComponent 
                data={formData} 
                updateData={updateData}
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <Navigation 
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onNext={nextStep}
          onPrev={prevStep}
          canNext={true}
        />
      </div>
    </div>
  )
}

export default App
