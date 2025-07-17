import { useForm } from 'react-hook-form'
import { useEffect, useCallback } from 'react'
import { debounce } from '../../utils/helpers'

function Objective({ data, updateData }) {
  const { register, watch, setValue } = useForm({
    defaultValues: { objective: data.objective || '' }
  })

  const objective = watch('objective')

  // Debounce la mise à jour
  const debouncedUpdate = useCallback(
    debounce((objectiveText) => {
      updateData(objectiveText, 'objective')
    }, 500),
    [updateData]
  )

  useEffect(() => {
    debouncedUpdate(objective)
  }, [objective, debouncedUpdate])

  useEffect(() => {
    setValue('objective', data.objective || '')
  }, []) // Initialisation une seule fois

  return (
    <div className="space-y-6 form-container">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Objectif professionnel
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Décrivez votre objectif de carrière en quelques phrases
        </p>
      </div>

      <div className="form-field">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Objectif professionnel
        </label>
        <textarea
          {...register('objective')}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200 resize-none"
          placeholder="Décrivez en quelques lignes le poste ou l'objectif professionnel que vous recherchez..."
        />
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
          💡 <strong>Conseil :</strong> Soyez concis et précis. Mentionnez le type de poste recherché et vos motivations principales.
        </p>
      </div>

      {objective && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-blue-200 dark:border-gray-600 fade-in">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Aperçu de votre objectif :
          </h3>
          <p className="text-blue-800 dark:text-blue-200 leading-relaxed">{objective}</p>
        </div>
      )}
    </div>
  )
}

export default Objective
