import { FileText } from 'lucide-react'

function Logo({ className = "w-8 h-8" }) {
  return (
    <div className={`${className} bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <FileText className="w-6 h-6 text-white" />
    </div>
  )
}

export default Logo
