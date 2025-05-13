import axios from 'axios';
import { useEffect, useState } from 'react'


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
              apiKey : "93e68c41440948eb9b00e79f8e8fa67b",
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
        <input className="outline-none w-[80%] rounded-full lg:w-full md:w-full sm:w-full text-pink-500 bg-gray-200 px-4 py-1" type="text" placeholder="search recipes..." onClick={openSearch} value={query} onChange={(e) => setQuery(e.target.value)} />
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
