import { ChevronLeft, ChevronRight } from 'lucide-react'

function Navigation({ currentStep, totalSteps, onNext, onPrev }) {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
              : 'btn-secondary hover:shadow-md'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </button>

        <div className="text-center">
          <span className="text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-full">
            Étape {currentStep} sur {totalSteps}
          </span>
        </div>

        <button
          onClick={onNext}
          disabled={currentStep === totalSteps}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            currentStep === totalSteps
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
              : currentStep === totalSteps - 1
              ? 'btn-success'
              : 'btn-primary'
          }`}
        >
          {currentStep === totalSteps ? 'Terminé' : 'Suivant'}
          {currentStep !== totalSteps && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

export default Navigation
