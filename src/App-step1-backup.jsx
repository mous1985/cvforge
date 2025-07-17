import { useState } from 'react'
import Logo from './components/Logo'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [message] = useState('Application CV fonctionne !')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto">
        {/* En-tête avec logo et toggle thème */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="text-2xl font-bold text-white">CVForge</h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h1 className="text-4xl font-bold text-white text-center mb-4">Créateur de CV</h1>
          <p className="text-white text-xl text-center mb-8">{message}</p>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Bienvenue</h2>
            <p className="text-white/90 mb-6">
              Cette interface vous permet de créer un CV professionnel étape par étape avec une interface moderne et intuitive.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Commencer mon CV
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Voir un exemple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
