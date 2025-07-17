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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Informations personnelles
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Commençons par vos informations de base
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Prénom *
          </label>
          <input
            {...register('firstName', { required: 'Le prénom est requis' })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            placeholder="Votre prénom"
          />
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.firstName.message}</p>
          )}
        </div>

        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Nom *
          </label>
          <input
            {...register('lastName', { required: 'Le nom est requis' })}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            placeholder="Votre nom"
          />
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.lastName.message}</p>
          )}
        </div>

        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Email *
          </label>
          <input
            {...register('email', { 
              required: 'L\'email est requis',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email invalide'
              }
            })}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            placeholder="votre.email@exemple.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Téléphone
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        <div className="form-field md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Adresse
          </label>
          <input
            {...register('address')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            placeholder="123 Rue de la Paix, 75001 Paris"
          />
        </div>

        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Ville
          </label>
          <input
            {...register('city')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            placeholder="Paris"
          />
        </div>

        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Code postal
          </label>
          <input
            {...register('postalCode')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            placeholder="75001"
          />
        </div>

        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Date de naissance
          </label>
          <input
            {...register('birthDate')}
            type="date"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
          />
        </div>

        <div className="form-field">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Nationalité
          </label>
          <input
            {...register('nationality')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            placeholder="Française"
          />
        </div>

        <div className="form-field md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            LinkedIn (optionnel)
          </label>
          <input
            {...register('linkedin')}
            type="url"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            placeholder="https://linkedin.com/in/votre-profil"
          />
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
