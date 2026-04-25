import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X,  ChefHat } from 'lucide-react'
import Search from './Search'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  // { path: '/recipes', label: 'Recipes' },
  { path: '/favorites', label: 'Favorites' },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) return
    const handleScroll = () => setIsOpen(false)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              {/* <ChefHat className="w-7 h-7 text-amber-500" /> */}
              <h2 className="text-2xl font-bold mb-4">
                FLA<span className="text-amber-500">VORIZ</span>
              </h2>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive(link.path) ? 'text-slate-100 bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                  {link.label}
                  {/* {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500" />
                  )} */}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <Search />
              </div>
              
              <button
                onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div 
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ease-out
            ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
          `}
        >
          <div className="px-4 py-6 space-y-4">
            <div className="md:hidden">
              <Search />
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${isActive(link.path)
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <span className={`
                    w-2 h-2 rounded-full
                    ${isActive(link.path) ? 'bg-amber-500' : 'bg-slate-300'}
                  `} />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="h-16 lg:h-20" />
    </>
  )
}

export default Header