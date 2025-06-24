// import { Link } from "react-router-dom"
import {  Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import chef from '../assets/chef.png'
import SimilarItem from "../components/SimilarItem";
import { CgProfile } from "react-icons/cg";
import { IoGlobeOutline } from "react-icons/io5";
import { IoIosLink, IoIosStarOutline, IoMdTime } from "react-icons/io";
import { LuChefHat } from "react-icons/lu";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// import { useFavorites } from '../context/FavContext'

const RecipeDetail = () => {
    const [recipe, setRecipes] = useState<any>(null); 
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [ nutrition , setNutrition ] = useState<any>(null)

    // const { isFavorite , addFavorites , removeFavorites } = useFavorites();

    // const handleFav = () => {
    //     isFavorite(recipe.id) ? removeFavorites(recipe.id) : addFavorites(recipe)
    // }
    const API_KEY = '93e68c41440948eb9b00e79f8e8fa67b'
    const { id } = useParams()
  
    const fetchRandomRecipes = async () => {
    setLoading(true);
    setError('');
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
            apiKey: API_KEY,
        },
        });
        console.log('Fetched recipes:', response.data);
        setRecipes(response.data);
    } catch (err) {
        setError('Failed to fetch recipes');
        console.error(err);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
      fetchRandomRecipes();
    }, [id]);

    useEffect(() => {
    const fetchNutrition = async () => {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`
      );
      const data = await res.json();
      setNutrition(data);
    };

    fetchNutrition();
  }, [id]);
  return (
    <div>
        {loading && 
            <div role="status" className="flex justify-center items-center">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>}    
        {error && <div className="text-red-500">{error}</div>}
            {
                recipe && (
            <>
                <div className="flex flex-col gap-2">
                    <div className="relative lg:h-80 mb-4 lg:mb-0 w-full">
                        <img className="w-full h-[100%]  md:h-[300px] rounded-lg bg-cover" src={recipe.image} alt="img" />
                        <span className="absolute left-10 top-10 lg:left-16 md:top-24 lg:top-20 text-white font-semibold leading-16 flex flex-col gap-3">
                            <p className="text-sm text-black font-semibold">Let's Cook</p>
                                {recipe?.title && (() => {
                                    const words = recipe.title.split(" ");
                                    return (      
                                        <p className="lg:text-6xl text-3xl font-bold text-black"> 
                                            <span className="flex gap-2">
                                                {words[0]}
                                                <span className="text-yellow-500 block">{words[1]}</span>{" "}
                                            </span>
                                            {words.slice(2).join(" ")}
                                        </p>                          
                                    );
                                    })()}
                                {/* {recipe.title} */}
                        </span>
                        {/* <button onClick={handleFav} className={`cursor-pointer bg-gray-300 absolute right-0  px-4 py-1 my-2 rounded-sm ${isFavorite(recipe.id) ? 'bg-zinc-100' : 'bg-zinc-200'}`}>
                            {isFavorite(recipe.id) ? 'Liked❤️' : `Like🤍`}
                        </button> */}
                    </div>

                    <div className="flex lg:justify-between md:justify-between justify-between gap-4 flex-wrap lg:mt-0">
                        <div className="flex items-center gap-2">
                            <div className="bg-yellow-100 rounded-full p-2">
                                <IoGlobeOutline className="text-yellow-500" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-600 lg:text-normal text-xs">Cuisine</span>
                                <h5 className="font-bold text-md lg:text-xl">{recipe.cuisines[0] ? recipe.cuisines[0] : 'Food' } </h5>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="bg-yellow-100 rounded-full p-2">
                                <CgProfile className="text-yellow-500" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-600 lg:text-normal text-xs">Servings</span>
                                <h5 className="font-bold text-md lg:text-xl"> {recipe.servings ? recipe.servings : '1' } persons</h5>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="bg-yellow-100 rounded-full p-2">
                                <IoMdTime  className="text-yellow-500" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-600 lg:text-normal text-xs">Prep Time</span>
                                <h5 className="font-bold text-md lg:text-xl">{recipe.preparationMinutes ? recipe.preparationMinutes : '30' } mins </h5>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="bg-yellow-100 rounded-full p-2">
                                <LuChefHat className="text-yellow-500" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-600 lg:text-normal text-xs">Cook Time</span>
                                <h5 className="font-bold text-md lg:text-xl">{recipe.cookingMinutes ? recipe.cookingMinutes : "30"} mins </h5>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <div className="bg-yellow-100 rounded-full p-2">
                                <IoIosStarOutline className="text-yellow-500" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-gray-600 lg:text-normal text-xs">Ratings</span>
                                <h5 className="font-bold text-md lg:text-xl">{recipe.spoonacularScore.toFixed(1)}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-14 lg:gap-2 gap-5 flex-col lg:flex-row">
                        <div className="lg:w-[70%] flex flex-col lg:justify-self-auto justify-between ">
                                {/* <p className="mb-2 lg:mb-0 text-lg font-bold">Summary</p> */}
                                <div
                                    className="text-gray-700 font-medium line-clamp-5"
                                    dangerouslySetInnerHTML={{ __html: recipe.summary }}
                                />
                                <div className="flex justify-between items-end mt-5 lg:mt-0">
                                    <span className="flex flex-col">
                                        <p className="text-sm font-semibold">Tags</p>
                                        <span className="capitalize text-yellow-500 text-xs lg:text-normal"> {`${recipe.dishTypes}` + ' '} </span>
                                    </span>
                                    <span className="flex gap-2">
                                        <button className="rounded-full flex bg-black gap-2 items-center font-semibold text-white text-xs lg:text-normal px-2 py-1">Download Recipe PDF 
                                            <span className="bg-white rounded-full p-2">
                                                <LuChefHat className="text-black w-3 h-3 bg-white" />
                                            </span>
                                        </button>
                                        <button className="bg-black text-white rounded-full p-2">
                                            <IoIosLink className="w-5 h-5" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className="lg:w-[30%] relative">
                                <img src={chef}  className="rounded-lg" alt="" />
                                <Link to='' className="underline absolute top-4 right-4 font-semibold">See More</Link>
                                <span className="absolute bottom-4 left-4">
                                    <p className="text-sm text-gray-700 font-normal">Recipe by</p>
                                    <h2 className="font-bold text-lg">Chef Chulu Rodriguez</h2>
                                </span>
                            </div>
                    </div>

                    <div className="flex flex-col lg:flex-row mt-14 gap-2">
                        <div className="lg:w-[70%] shadow-md rounded-md p-4">
                            <p className="text-xl font-bold">Ingredients</p>
                            <span>
                                {recipe.extendedIngredients?.[0]?.aisle?.length > 0 ? (
                                    <ul className="flex flex-col gap-2 mt-2">
                                       {recipe.extendedIngredients?.map((ingredient: any, index: number) => (
                                            <li key={index} className="text-gray-500 font-semibold">
                                                {ingredient.name} - {ingredient.amount.toFixed(1)} {ingredient.unit}
                                            </li>
                                        ))}
                                    </ul>
                                    ) : (
                                    <p className="text-gray-500 italic">No instructions found.</p>
                                    )}
                            </span>
                        </div>
                        <div className="lg:w-[30%] bg-gray-100 rounded-md p-4">
                            <p className="font-bold text-xl">Nutritional Info</p>
                            <span className="text-gray-500 font-semibold">
                                { nutrition ? (
                                    <ul className="mt-2 flex flex-col gap-2">
                                        <li>Protein ~ {nutrition.protein}</li>
                                        <li>Carbs ~ {nutrition.carbs}</li>
                                        <li>Fats ~ {nutrition.fat}</li>
                                        <li>Calories ~ {nutrition.calories}</li>
                                    </ul>
                                    ) : ( 
                                    <p className="italic text-gray-500">Loading...</p>
                                    )
                                }
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row mt-14 gap-2">
                        <div className="lg:w-[70%] rounded-md flex flex-col gap-3 font-semibold">
                            <h5 className="text-3xl mb-1 font-bold">Cooking <span className="text-yellow-500">Instructions</span></h5>
                            <div className="flex items-start bg-gray-100 rounded-md p-4 gap-3 text-gray-300">
                                <div
                            className="text-gray-700"
                            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                            />
                            </div> 
                            <div>
                                {recipe.analyzedInstructions?.[0]?.steps?.length > 0 ? (
                                <ul className="">
                                    {recipe.analyzedInstructions[0].steps.map((step: any, index: number) => (
                                    <div className="flex items-start bg-gray-100 rounded-md p-4 gap-3 mb-2">
                                        <p key={index} className="text-3xl text-yellow-500 font-semibold"><span>0</span>{step.number}</p>
                                        <li className="" key={index}>{step.step}</li>
                                    </div> 
                                    ))}
                                </ul>
                                ) : (
                                <p className="text-gray-500 italic">No instructions found.</p>
                                )}
                            </div>
                        </div>
                        <div className="relative lg:w-[30%] lg:h-[100%] rounded-full">
                            <img src='https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D' alt="" className="rounded-md w-full h-full" />
                            <h1 className="absolute top-2 right-2 lg:text-3xl text-xl font-normal text-[#fff]"><Link to='/'>FLA<span className="text-yellow-600">VORIZ</span></Link></h1>
                            <span className="absolute bottom-2 px-2 left-2 right-2 flex flex-col ">
                               <p className="text-white text-3xl font-semibold">Let's dive more into Cooking!</p> 
                                <Link to='' className=" mt-2 bg-[#000] w-full py-1 text-xs lg:text-sm px-2 rounded-full text-[#fff] flex justify-between items-center"> <span> See All Recipe </span> <span className="bg-white rounded-full p-1"> <LuChefHat className=" text-black"/> </span> </Link> 
                            </span>
                        </div>
                     </div>
                    <div className="mt-5 lg:w-[70%] flex flex-col space-y-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-black font-bold text-3xl">Cooking <span className="text-yellow-500"> Reviews</span></h1>
                            <span>
                                <div className="flex justify-center items-center gap-4">
                                        <button                                         
                                          className={`px-4 py-2 rounded text-yellow-500 'text-yellow-300  cursor-not-allowed' : ' hover:text-yellow-300'}`}
                                        >
                                          <FaAngleLeft className="w-6 h-6" />
                                        </button>
                                        <span className="text-sm font-bold">
                                          1 / 2
                                        </span>
                                        <button                           
                                          className={`px-4 py-2 rounded text-yellow-500  'cursor-not-allowed' : 'text-yellow-500 hover:text-yellow-300'}`}
                                        >
                                          <FaAngleRight className="w-6 h-6" />
                                        </button>
                                      </div>
                            </span>
                        </div>
                        <div className="flex gap-x-6">
                            <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D" alt="img" className="rounded-lg w-60 lg:h-40" />
                            <div className="flex flex-col justify-between">
                                <div>
                                    <span>
                                        <BiSolidQuoteAltRight className="text-yellow-500 w-7 h-7" />
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <p className="text-xs text-gray-500 font-semibold mb-3">A culinary delight that brings together perfectly seasoned beef 
                                        with a medley of fresh toppings, delivering a burst of flavor in every bite.
                                        The simplicity of this recipe makes it a go-to choice.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <img className="w-10 h-10 rounded-full" src="https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="prolife" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-sm">Angelina Nguyen</p>
                                        <p className="capitalize font-medium text-xs text-gray-500">8 september 2023</p>
                                    </div>
                                </div>      
                            </div>
                        </div>
                    </div>
                    <div className="mt-14">
                        <h5 className="text-3xl font-bold mb-1">Related <span className="text-yellow-500">Recipes</span></h5>
                        <SimilarItem id={id!} />
                    </div>
                </div>
                <footer className="relative py-2 mt-5 flex flex-col lg:flex-row justify-between items-center">
                    {/* right */}
                    <div className="w-[100%] flex flex-col lg:flex-row gap-2 rounded-md bg-black">
                        <div className=" p-5 flex flex-col justify-between gap-10 lg:w-[50%]">
                            <div className="flex flex-col gap-5">
                                <h1 className="text-5xl font-bold text-[#fff]">FLA<span className="text-yellow-500">VORIZ</span></h1>
                                <p className="text-white">Join TastyBits now and embark on a culinary Journey to explore,create, and savor amazing recipes!</p>
                            </div>
                            <div className="flex gap-5 w-full">
                                <input type="text" defaultValue="Enter your email address" placeholder="" className="bg-black outline-none focus:outline-none border-b-2 border-white text-white w-full border-0 rounded-sm focus:border-yellow-400 border-b-[#ffffff]" />
                                <button className="rounded-full bg-yellow-500 px-6 py-1 text-center text-white">Subscribe</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-14 rounded-md p-5 lg:w-[50%]">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h5 className="text-white text-lg mb-3">Company</h5>
                                    <div className="text-gray-400 flex flex-col text-sm">
                                        <span>About Us</span>
                                        <span>Our Stories</span>
                                        <span>Work with Us</span>
                                        <span>User Testimonials</span>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-white text-lg mb-3">Support</h5>
                                    <div className="text-gray-400 flex flex-col text-sm">
                                        <span>FAQ</span>
                                        <span>Membership</span>
                                        <span>User policy</span>
                                        <span>Customer Support</span>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-white text-lg mb-3">Contact</h5>
                                    <div className="text-gray-400 flex flex-col text-sm">
                                        <span>Phone Number</span>
                                        <span>Email</span>
                                        <span>Social Media</span>
                                        <span>Company Location</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <hr className="border-t-2 border-gray-500 my-6" />  
                                <div className="flex justify-between text-xs text-gray-500">
                                    <p className="text-xs">Copyright @ 2025 TastyBits</p>
                                    <div>
                                        <span>Privacy Policy </span> &nbsp;&nbsp;  | &nbsp;&nbsp; <span> Terms and Conditions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </> 
                 )
            }  
    </div>
  )
}

export default RecipeDetail
