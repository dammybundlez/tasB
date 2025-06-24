import axios from 'axios';
import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
const Search = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [debouncedQuery, setDebouncedQuery] = useState<any>('');
    const [isOpen , setIsOpen] = useState<boolean>(false)


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query)
        }, 500)

        return () => clearTimeout(handler)
    }, [query])


    useEffect(() => {
      if(!debouncedQuery){
        setResults([]);
        return;
      }

    const fetchData = async () => {
        setLoading(true)
        try {
          const res = await axios.get('https://api.spoonacular.com/recipes/complexSearch' , {
            params: {
              apiKey : "e7c8dea4c4154d9e89f3db3bc4a72c50",
              query: debouncedQuery,
              number: 10,
            },
          })
          setResults(res.data.results)
        } catch (error) {
          console.error('search error:', error)
        }finally{
          setLoading(false)
        }
    };
    fetchData()
  },[debouncedQuery])


  useEffect(() => {
    const handleScroll = () => {
      if(isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener( "scroll" , handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen])
 const openSearch = () => setIsOpen((prev) => !prev)
  return (
    <div className='w-full relative'>
      <div className='relative'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input className="outline-none w-[80%] rounded-full lg:w-[80%] md:w-full sm:w-full text-pink-500 bg-gray-200 px-4 py-1" type="text" placeholder="Search..." onClick={openSearch} value={query} onChange={(e) => setQuery(e.target.value)} />
            <span className='rounded-full p-2 bg-gray-200'>
              <FaSearch  />
            </span>
          </div>
          <div className='rounded-full p-2 bg-black'>
            <span>
              <CgProfile className='text-white' />
            </span>
          </div>
        </div>

        <div className='absolute right-0 top-10 w-[80%]'>     
          {loading && <p className='italic text-left text-gray-500 bg-gray-100 p-3'>searching...</p>}
          {!loading && results.length === 0 && debouncedQuery && (
            <p className='italic text-gray-00 bg-gray-100 p-3 text-left'>No recipes found</p>
          )}
        </div>
      </div>   
      <div className={`${isOpen ? 'visible' : 'invisible'}  absolute w-[145%] h-[10vh] lg:flex flex-col top-10 rounded-b-md lg:w-[150%] md:w-[150%] sm:w-[120%] right-[0] search-scroll`}>
          {results.map((recipe) => (
            // <div className='bg-red-500'>
              <div key={recipe.id} className="bg-gray-300 border-1 border-b-2 border-b-slate-950 flex p-2 h-16 overflow-hidden search-item">
                <img src={recipe.image} alt={recipe.title} className="lg:w-20 lg:h-20 md:w-20 md:h-20 w-14 h-20 object-cover" />
                <div className="p-2">
                  <h2 className="lg:text-md md:text-md text-xs font-bold">{recipe.title}</h2>
                  <a
                    href={`/recipe/${recipe.id}`}
                    className="text-yellow-700 hover:underline text-sm mt-2 inline-block"
                  >
                    View Details
                  </a>
                </div>
              </div>
            // </div>
          ))}
      </div>
    </div>
  )
}

export default Search
