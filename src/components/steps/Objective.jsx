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
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Objectif professionnel
        </label>
        <textarea
          {...register('objective')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Décrivez en quelques lignes le poste ou l'objectif professionnel que vous recherchez..."
        />
        <p className="mt-2 text-sm text-gray-500">
          Conseil : Soyez concis et précis. Mentionnez le type de poste recherché et vos motivations principales.
        </p>
      </div>

      {objective && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Aperçu :</h3>
          <p className="text-blue-800">{objective}</p>
        </div>
      )}
    </div>
  )
}

export default Objective
