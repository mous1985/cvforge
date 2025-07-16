import { Check } from 'lucide-react'

function ProgressBar({ currentStep, totalSteps, steps, onStepClick }) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="mb-8">
      {/* Progress line */}
      <div className="relative">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onStepClick(step.id)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step.id < currentStep
                    ? 'bg-green-500 text-white'
                    : step.id === currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              <span className="text-xs mt-1 text-gray-600 text-center max-w-20">
                {step.title}
              </span>
            </div>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 -translate-y-1/2">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
