import { Loader } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loader className="animate-spin h-16 w-16" style={{ color: '#3869EB' }} />
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait...</p>
    </div>
  )
}

export default LoadingSpinner