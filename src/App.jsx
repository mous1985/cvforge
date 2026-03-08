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
import { debounce } from './utils/helpers'
import './App.css'

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
    experiences: [],
    education: [],
    languages: [],
    interests: []
  })

  // Sauvegarde automatique dans localStorage avec debounce
  useEffect(() => {
    const savedData = localStorage.getItem('cvforge-data')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  // Debounce la sauvegarde pour éviter trop d'écritures
  const debouncedSave = useCallback(
    debounce((data) => {
      localStorage.setItem('cvforge-data', JSON.stringify(data))
    }, 1000),
    []
  )

  useEffect(() => {
    debouncedSave(formData)
  }, [formData, debouncedSave])

  const updateFormData = (stepData, stepKey) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: stepData
    }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step) => {
    setCurrentStep(step)
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo className="w-10 h-10" />
            <h1 className="text-3xl font-bold text-gray-900">CVForge</h1>
          </div>
          <p className="text-gray-600">Créez votre CV professionnel en quelques étapes</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={STEPS.length}
          steps={STEPS}
          onStepClick={goToStep}
        />

        {/* Current Step */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {STEPS[currentStep - 1].title}
          </h2>
          
          <CurrentStepComponent 
            data={formData}
            updateData={updateFormData}
          />
        </div>

        {/* Navigation */}
        <Navigation 
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onNext={nextStep}
          onPrev={prevStep}
        />
      </div>
    </div>
  )
}

export default App
