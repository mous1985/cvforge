import { useForm } from 'react-hook-form'
import { useEffect, useCallback } from 'react'
import { debounce } from '../../utils/helpers'

function PersonalInfo({ data, updateData }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: data.personalInfo || {}
  })

  const formData = watch()

  // Debounce la mise à jour pour éviter les re-rendus excessifs
  const debouncedUpdate = useCallback(
    debounce((data) => {
      updateData(data, 'personalInfo')
    }, 300),
    [updateData]
  )

  useEffect(() => {
    debouncedUpdate(formData)
  }, [formData, debouncedUpdate])

  // Initialiser les valeurs du formulaire une seule fois
  useEffect(() => {
    if (data.personalInfo) {
      Object.keys(data.personalInfo).forEach(key => {
        setValue(key, data.personalInfo[key])
      })
    }
  }, []) // Enlever les dépendances pour éviter les re-initialisations

  return (
    <div className="space-y-6 form-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prénom *
          </label>
          <input
            {...register('firstName', { required: 'Le prénom est requis' })}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Votre prénom"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="form-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom *
          </label>
          <input
            {...register('lastName', { required: 'Le nom est requis' })}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Votre nom"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse *
        </label>
        <textarea
          {...register('address', { required: 'L\'adresse est requise' })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Votre adresse complète"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            {...register('email', { 
              required: 'L\'email est requis',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email invalide'
              }
            })}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="votre@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone *
          </label>
          <input
            {...register('phone', { required: 'Le téléphone est requis' })}
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="06 12 34 56 78"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn (optionnel)
          </label>
          <input
            {...register('linkedin')}
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/in/votreprofil"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub (optionnel)
          </label>
          <input
            {...register('github')}
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://github.com/votreprofil"
          />
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
