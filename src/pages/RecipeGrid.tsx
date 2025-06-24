import { Link } from "react-router-dom"
import { LuChefHat, LuDessert, LuSalad } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import banner from '../assets/banner.png'
import Cardboard from "../components/Cardboard";
import { GiHotMeal, GiSelfLove } from "react-icons/gi";
import { IoIosGlobe } from "react-icons/io";
import { MdAccessTime, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaAngleLeft, FaAngleRight, FaLeaf } from "react-icons/fa";
import { FaBowlFood, FaBowlRice } from "react-icons/fa6";


const RecipeGrid = () => {
    const [recipes, setRecipes] = useState<any[]>([]); 
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>(''); 

    const [page , setPage] = useState<number>(1);
    const [totalResult , setTotalResult ] = useState<number>(0)
  

    const Recipes = async () => {
    setLoading(true);
    setError('');
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
            number: 9,
            apiKey: '93e68c41440948eb9b00e79f8e8fa67b',
            offset: (page - 1) * 30,
        },
        });
        console.log('Fetched recipes:', response.data);
        setRecipes(response.data.results);
        setTotalResult(response.data.totalResults);
    } catch (err) {
        setError('Failed to fetch recipes');
        console.error(err);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
      Recipes(); 
    }, [page]);

    const totalPages = Math.ceil(totalResult / 30)


  return (
    <div className="flex flex-col gap-5 gap-y-4">
      <Cardboard />
      <div className="lg:px-3 p-2 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-3">What to <span className="text-yellow-500">Cook</span>?</h2>
            <div className="my-7 ">
                <ul className="flex flex-wrap font-semibold gap-3 lg:gap-y-3 lg:text-lg justify-center items-center">
                    <li className=""><Link to='' className="bg-gray-100 lg:px-4 px-2 py-1 rounded-full hover:bg-[#000] hover:text-[#fff] duration-1000 ease-out flex items-center gap-2"><GiHotMeal className="text-yellow-500" /> All Types</Link></li>
                    <li><Link to='' className="bg-gray-100 lg:px-4 px-2 py-1 rounded-full hover:bg-[#000] hover:text-[#fff] duration-1000 ease-out flex items-center gap-2"><FaBowlRice className="text-yellow-500" />Appetizers</Link></li>
                    <li><Link to='' className="bg-gray-100 lg:px-4 py-1 rounded-full hover:bg-[#000] hover:text-[#fff] duration-1000 ease-out flex items-center gap-2"><FaBowlFood className="text-yellow-500" />Main Course</Link></li>
                    <li><Link to='' className="bg-gray-100 lg:px-4 px-2 py-1 rounded-full hover:bg-[#000] hover:text-[#fff] duration-1000 ease-out flex items-center gap-2"><LuSalad className="text-yellow-500" />Salads and Sides</Link></li>
                    <li><Link to='' className="bg-gray-100 lg:px-4 px-2 py-1 rounded-full hover:bg-[#000] hover:text-[#fff] duration-1000 ease-out flex items-center gap-2"><FaLeaf className="text-yellow-500" />Vegetarians Delights</Link></li>
                    <li><Link to='' className="bg-gray-100 lg:px-4 px-2 py-1 rounded-full hover:bg-[#000] hover:text-[#fff] duration-1000 ease-out flex items-center gap-2"><IoIosGlobe className="text-yellow-500" />International Flavors</Link></li>
                    <li><Link to='' className="bg-gray-100 lg:px-4 px-2 py-1 rounded-full hover:bg-[#000] hover:text-[#fff] duration-1000 ease-out flex items-center gap-2"><LuDessert className="text-yellow-500" /> Desserts & Sweets</Link></li>
                    <li><Link to='' className="bg-gray-100 lg:px-4 px-2 py-1 rounded-full hover:bg-[#000] hover:text-[#fff] duration-1000 ease-out flex items-center gap-2"><GiSelfLove className="text-yellow-500" /> Healthy Eats</Link></li>
                    <li><Link to='' className="bg-gray-100 lg:px-4 px-2 py-1 rounded-full hover:bg-[#000] hover:text-[#fff] duration-1000 ease-out flex items-center gap-2"><MdAccessTime className="text-yellow-500" />Quick & Easy Supper</Link></li>        
                </ul>
            </div>
      </div>

      <div>
         {loading && 
         <div role="status" className="flex justify-center items-center">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>}    
        <div className="flex flex-wrap justify-start w-full gap-2 lg:gap-5 gap-y-5 lg:gap-y-10">
         {error && <div className="text-red-500">{error}</div>}
        { recipes.map((recipe) => (
              <div className="relative group rounded-lg lg:w-[31.5%] w-[48.5%] md:w-[32% bg-gray-100">
                  <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="gap-2 py-3 px-2 bg-cover w-full bg-center bg-no-repeat duration-500  flex justify-between flex-col group-hover:rounded-md">
                      {/* <div className="group-hover:absolute group-hover:inset-0 rounded-md group-hover:bg-gradient-to-b group-hover:from-[#e9e4e4] to-gray-100" /> */}
                        <h2 className="font-medium lg:text-3xl lg:mb-4 text-blue  line-clamp-2 min-h-5 h-[4.5rem] mb-6">{recipe.title} </h2>
                        {/* <h2 className="font-normal text-3xl absolute top-0 group-hover:text-pink-500">{recipe.title}<br /></h2> */}
                        <div className="w-full relative">
                            <img className="rounded-lg w-full h-[100%]" src={recipe.image ? recipe.image : banner} alt="image" />
                            <p className="absolute right-2 top-2 bg-white shadow-sm font-semibold rounded-full w-20 px-2 py-1 flex gap-2 items-center">
                              <span className="">
                                <MdOutlineRemoveRedEye />  
                              </span>
                              200+
                            </p>
                            <Link to='' className=" mt-5 bg-[#000] w-full py-1 text-xs lg:text-sm px-2 rounded-full text-[#fff] flex justify-between items-center"> <span> See Complete Recipe </span> <span className="bg-white rounded-full p-1"> <LuChefHat className=" text-black"/> </span> </Link> 
                        </div>
                      {/* <ul className="flex flex-wrap lg:gap-2 gap-y-2 group-hover:flex ease-out duration-1000">
                          <li><Link to='' className="bg-white text-black text-sm   px-2 lg:px-4 rounded-full ">{recipe.sourceName}</Link></li>
                          <li><Link to='' className="bg-white text-black text-sm   px-2 lg:px-4  rounded-full ">{`$${recipe.pricePerServing.toFixed(0)}`}</Link></li>
                          <li><Link to='' className="bg-white text-black text-sm   px-2 lg:px-4  rounded-full ">Guides</Link></li>
                          <li><Link to='' className="bg-white text-black text-sm   px-2 lg:px-4 rounded-full ">{`${recipe.aggregateLikes} +`}</Link></li>
                      </ul> */}
                  </Link>
              </div>
            ))
        }       
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded text-yellow-500 ${page === 1 ? 'text-yellow-300  cursor-not-allowed' : ' hover:text-yellow-300'}`}
        >
          <FaAngleLeft className="w-6 h-6" />
        </button>
        <span className="text-sm font-semibold">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded text-yellow-500 ${page === totalPages ? 'cursor-not-allowed' : 'text-yellow-500 hover:text-yellow-300'}`}
        >
          <FaAngleRight className="w-6 h-6" />
        </button>
      </div>
      <Footer/>
    </div>
  )
}

export default RecipeGrid
