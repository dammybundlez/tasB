import { Link } from 'react-router-dom'
import { Home, Search, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Display */}
        <div className="relative inline-block mb-8">
          <span className="text-8xl md:text-9xl font-black text-slate-200 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-7xl">🍳</span>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
          Page not found
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Looks like this recipe got away from us. The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          {/* <Link
            to="/recipes"
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse Recipes
          </Link> */}
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Or go back to previous page
        </button>
      </div>
    </div>
  )
}

export default NotFound