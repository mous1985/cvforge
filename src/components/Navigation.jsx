import { ChevronLeft, ChevronRight } from 'lucide-react'

function Navigation({ currentStep, totalSteps, onNext, onPrev }) {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrev}
        disabled={currentStep === 1}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
          currentStep === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Précédent
      </button>

      <span className="text-sm text-gray-500">
        Étape {currentStep} sur {totalSteps}
      </span>

      <button
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
          currentStep === totalSteps
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {currentStep === totalSteps ? 'Terminé' : 'Suivant'}
        {currentStep !== totalSteps && <ChevronRight className="w-4 h-4 ml-1" />}
      </button>
    </div>
  )
}

export default Navigation
