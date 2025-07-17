import { Check } from 'lucide-react'

function ProgressBar({ currentStep, totalSteps, steps, onStepClick }) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="glass-card rounded-xl p-6">
      {/* Progress line */}
      <div className="relative">
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center cursor-pointer step-item"
              onClick={() => onStepClick(step.id)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step.id < currentStep
                    ? 'step-completed'
                    : step.id === currentStep
                    ? 'step-active'
                    : 'step-pending'
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <span className="text-xs mt-2 text-white/80 text-center max-w-20 font-medium">
                {step.title}
              </span>
            </div>
          ))}
        </div>
        
        {/* Progress bar avec gradient */}
        <div className="absolute top-5 left-5 right-5 h-1 bg-white/20 rounded-full -translate-y-1/2">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full transition-all duration-500 ease-out shadow-lg"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
