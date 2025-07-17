import { useState } from 'react'

function App() {
  const [message] = useState('Application CV fonctionne !')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h1 className="text-4xl font-bold text-white text-center mb-4">CVForge</h1>
          <p className="text-white text-xl text-center mb-8">{message}</p>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Créateur de CV</h2>
            <p className="text-white/90">
              Bienvenue dans votre application de création de CV. Cette interface vous permet de créer un CV professionnel step par step.
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Commencer
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Exemple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
