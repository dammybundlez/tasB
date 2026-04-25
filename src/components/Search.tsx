import axios from 'axios'
import { useEffect, useState, useRef, useCallback } from 'react'
import { Search, X, Loader2, ChefHat, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface RecipeResult {
  id: number
  title: string
  image: string
  imageType: string
}

// const SPOONACULAR_API = import.meta.env.VITE_SPOONACULAR_API_KEY || ''

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<RecipeResult[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    const handler = setTimeout(() => {
      fetchResults(query.trim())
    }, 400)

    return () => clearTimeout(handler)
  }, [query])

  // Fetch
  const fetchResults = useCallback(async (searchTerm: string) => {
    // if (!SPOONACULAR_API) {
    //   console.error('API key not configured')
    //   return
    // }

    setLoading(true)
    try {
      const res = await axios.get(
        'https://api.spoonacular.com/recipes/complexSearch',
        {
          params: {
            apiKey: 'e7c8dea4c4154d9e89f3db3bc4a72c50',
            query: searchTerm,
            number: 8,
            addRecipeInformation: false,
          },
        }
      )
      setResults(res.data.results || [])
      setSelectedIndex(-1)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleScroll = () => setIsOpen(false)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          window.location.href = `/recipe/${results[selectedIndex].id}`
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const hasResults = results.length > 0
  const showDropdown = isOpen && (loading || hasResults || (query && !loading && !hasResults))

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div
        className={`
          flex items-center gap-2 rounded-xl border bg-white transition-all duration-200
          ${isOpen ? 'border-slate-400 ring-2 ring-slate-100' : 'border-slate-200'}
          ${isOpen ? 'shadow-lg' : 'shadow-sm'}
        `}
      >
        <Search className="w-4 h-4 text-slate-400 ml-3 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search recipes..."
          className="w-full py-2.5 pr-3 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          aria-expanded={showDropdown ? "true" :  "false"}
          aria-controls="search-results"
          aria-activedescendant={selectedIndex >= 0 ? `result-${results[selectedIndex].id}` : undefined}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="p-1 mr-2 rounded-md hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          id="search-results"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-50"
        >
          {loading && (
            <div className="flex items-center gap-3 p-4 text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Searching recipes...</span>
            </div>
          )}

          {!loading && query && !hasResults && (
            <div className="flex flex-col items-center gap-2 py-8 px-4 text-slate-400">
              <ChefHat className="w-8 h-8 text-slate-300" />
              <p className="text-sm font-medium">No recipes found</p>
              <p className="text-xs">Try "pasta", "chicken", or "salad"</p>
            </div>
          )}

          {!loading && hasResults && (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((recipe, index) => (
                <Link to={`/recipe/${recipe.id}`}
                  key={recipe.id}
                  id={`result-${recipe.id}`}
                  className={`
                    flex items-center gap-3 px-3 py-2 mx-2 rounded-lg transition-colors cursor-pointer
                    ${selectedIndex === index ? 'bg-amber-50' : 'hover:bg-slate-50'}
                  `}
                >
                  <img
                    src={recipe.image}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-slate-100"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {recipe.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">Recipe</p>
                  </div>
                  <Link
                    to={`/recipe/${recipe.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`
                      p-2 rounded-lg transition-colors
                      ${selectedIndex === index ? 'text-amber-600' : 'text-slate-400'}
                    `}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Link>
              ))}
            </ul>
          )}

          {/* Footer */}
          {hasResults && (
            <div className="border-t border-slate-100 px-4 py-2.5 bg-slate-50/50">
              <Link
                to={`/recipes?search=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                View all results
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar