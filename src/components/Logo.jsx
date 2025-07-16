import { FileText } from 'lucide-react'

function Logo({ className = "w-8 h-8" }) {
  return (
    <div className={`${className} bg-blue-500 rounded-lg flex items-center justify-center`}>
      <FileText className="w-5 h-5 text-white" />
    </div>
  )
}

export default Logo
