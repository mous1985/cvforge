import { useState } from 'react'
import { Download, Eye, User, Mail, Phone, MapPin, Linkedin, Github, Calendar } from 'lucide-react'
import jsPDF from 'jspdf'

function Preview({ data }) {
  const [isGenerating, setIsGenerating] = useState(false)

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
  }

  const getLevelLabel = (level) => {
    const levels = {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Courant',
      native: 'Natif'
    }
    return levels[level] || level
  }

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      const pdf = new jsPDF()
      const pageWidth = pdf.internal.pageSize.width
      const margin = 20
      let yPosition = margin

      // Helper function to add text with word wrap
      const addText = (text, x, y, options = {}) => {
        const { fontSize = 10, fontStyle = 'normal', maxWidth = pageWidth - 2 * margin } = options
        pdf.setFontSize(fontSize)
        pdf.setFont('helvetica', fontStyle)
        
        if (text) {
          const lines = pdf.splitTextToSize(text, maxWidth)
          pdf.text(lines, x, y)
          return y + (lines.length * fontSize * 0.5)
        }
        return y
      }

      // Title
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      const fullName = `${data.personalInfo?.firstName || ''} ${data.personalInfo?.lastName || ''}`.trim()
      pdf.text(fullName, margin, yPosition)
      yPosition += 15

      // Contact info
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      if (data.personalInfo?.email) {
        pdf.text(`📧 ${data.personalInfo.email}`, margin, yPosition)
        yPosition += 6
      }
      if (data.personalInfo?.phone) {
        pdf.text(`📞 ${data.personalInfo.phone}`, margin, yPosition)
        yPosition += 6
      }
      if (data.personalInfo?.address) {
        yPosition = addText(`📍 ${data.personalInfo.address}`, margin, yPosition, { maxWidth: pageWidth - 2 * margin })
        yPosition += 6
      }
      
      yPosition += 10

      // Objective
      if (data.objective) {
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('OBJECTIF PROFESSIONNEL', margin, yPosition)
        yPosition += 8
        
        yPosition = addText(data.objective, margin, yPosition, { fontSize: 10 })
        yPosition += 15
      }

      // Skills
      if (data.skills?.length > 0) {
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('COMPÉTENCES', margin, yPosition)
        yPosition += 8
        
        const skillsText = data.skills.join(' • ')
        yPosition = addText(skillsText, margin, yPosition, { fontSize: 10 })
        yPosition += 15
      }

      // Experience
      if (data.experiences?.length > 0) {
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('EXPÉRIENCE PROFESSIONNELLE', margin, yPosition)
        yPosition += 8

        data.experiences.forEach((exp, index) => {
          // Check if we need a new page
          if (yPosition > 250) {
            pdf.addPage()
            yPosition = margin
          }

          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'bold')
          yPosition = addText(exp.title, margin, yPosition, { fontSize: 12, fontStyle: 'bold' })
          yPosition += 2

          pdf.setFont('helvetica', 'normal')
          yPosition = addText(exp.company, margin, yPosition, { fontSize: 11 })
          yPosition += 2

          const dates = `${formatDate(exp.startDate)} - ${exp.current ? 'Présent' : formatDate(exp.endDate)}`
          yPosition = addText(dates, margin, yPosition, { fontSize: 10 })
          yPosition += 4

          if (exp.description) {
            yPosition = addText(exp.description, margin, yPosition, { fontSize: 10 })
          }
          yPosition += 10
        })
      }

      // Education
      if (data.education?.length > 0) {
        if (yPosition > 200) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('FORMATION', margin, yPosition)
        yPosition += 8

        data.education.forEach((edu) => {
          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'bold')
          yPosition = addText(edu.degree, margin, yPosition, { fontSize: 12, fontStyle: 'bold' })
          yPosition += 2

          pdf.setFont('helvetica', 'normal')
          yPosition = addText(edu.institution, margin, yPosition, { fontSize: 11 })
          yPosition += 2

          const dates = `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`
          yPosition = addText(dates, margin, yPosition, { fontSize: 10 })
          
          if (edu.details) {
            yPosition += 2
            yPosition = addText(edu.details, margin, yPosition, { fontSize: 10 })
          }
          yPosition += 10
        })
      }

      // Languages
      if (data.languages?.length > 0) {
        if (yPosition > 240) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('LANGUES', margin, yPosition)
        yPosition += 8

        data.languages.forEach((lang) => {
          const langText = `${lang.language}: ${getLevelLabel(lang.level)}`
          yPosition = addText(langText, margin, yPosition, { fontSize: 10 })
          yPosition += 4
        })
        yPosition += 6
      }

      // Interests
      if (data.interests?.length > 0) {
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('CENTRES D\'INTÉRÊT', margin, yPosition)
        yPosition += 8

        const interestsText = data.interests.join(' • ')
        yPosition = addText(interestsText, margin, yPosition, { fontSize: 10 })
      }

      // Save the PDF
      const fileName = `CV_${fullName.replace(/\s+/g, '_')}.pdf`
      pdf.save(fileName)
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error)
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.')
    } finally {
      setIsGenerating(false)
    }
  }

  const isDataComplete = () => {
    return data.personalInfo?.firstName && 
           data.personalInfo?.lastName && 
           data.personalInfo?.email
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Aperçu de votre CV</h3>
        <button
          onClick={generatePDF}
          disabled={!isDataComplete() || isGenerating}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isDataComplete() && !isGenerating
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Génération...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Générer le PDF
            </>
          )}
        </button>
      </div>

      {!isDataComplete() && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            ⚠️ Veuillez remplir au minimum les informations personnelles (prénom, nom, email) pour générer le PDF.
          </p>
        </div>
      )}

      {/* CV Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {data.personalInfo?.firstName} {data.personalInfo?.lastName}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {data.personalInfo?.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo?.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo?.address && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {data.personalInfo.address}
              </div>
            )}
          </div>
          
          {(data.personalInfo?.linkedin || data.personalInfo?.github) && (
            <div className="flex gap-4 mt-2 text-sm text-blue-600">
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  GitHub
                </div>
              )}
            </div>
          )}
        </div>

        {/* Objective */}
        {data.objective && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Objectif professionnel</h2>
            <p className="text-gray-700">{data.objective}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experiences?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Expérience professionnelle</h2>
            {data.experiences.map((exp, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                <p className="text-gray-700 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(exp.startDate)} - {exp.current ? 'Présent' : formatDate(exp.endDate)}
                </p>
                {exp.description && (
                  <p className="text-gray-700 text-sm">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Formation</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700 font-medium">{edu.institution}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
                {edu.details && (
                  <p className="text-gray-700 text-sm">{edu.details}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Langues</h2>
            <div className="grid grid-cols-2 gap-2">
              {data.languages.map((lang, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{lang.language}:</span> {getLevelLabel(lang.level)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {data.interests?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Centres d'intérêt</h2>
            <p className="text-gray-700">{data.interests.join(' • ')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Preview
