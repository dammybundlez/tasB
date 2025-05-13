// import { Link } from "react-router-dom"
import {  useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import chef from '../assets/chef.png'
import SimilarItem from "../components/SimilarItem";
import { useFavorites } from '../context/FavContext'

const RecipeDetail = () => {
    const [recipe, setRecipes] = useState<any>(null); 
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { isFavorite , addFavorites , removeFavorites } = useFavorites();

    const handleFav = () => {
        isFavorite(recipe.id) ? removeFavorites(recipe.id) : addFavorites(recipe)
    }

    const { id } = useParams()
  
    const fetchRandomRecipes = async () => {
    setLoading(true);
    setError('');
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
            apiKey: '93e68c41440948eb9b00e79f8e8fa67b',
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
    }, []);
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
                    <div className="relative lg:h-96 mb-4 lg:mb-0">
                        <img className="w-full h-[100%] opacity-40 md:h-[300px] rounded-lg bg-cover" src={recipe.image} alt="img" />
                        <span className="absolute left-10 top-10 lg:left-28 md:top-24 lg:top-36 text-white font-semibold leading-16 flex flex-col gap-3">
                            <p className="text-normal text-pink-700">Let's Cook</p>
                            <p className="lg:text-5xl text-3xl text-pink-700"> {recipe.title}</p>
                        </span>
                        <button onClick={handleFav} className={`cursor-pointer bg-gray-300 absolute right-0  px-4 py-1 my-2 rounded-sm ${isFavorite(recipe.id) ? 'bg-zinc-100' : 'bg-zinc-200'}`}>
                            {isFavorite(recipe.id) ? 'Liked❤️' : `Like🤍`}
                        </button>
                    </div>

                    <div className="flex lg:justify-between md:justify-between justify-between  gap-4 flex-wrap lg:mt-2 mt-8">
                        <div className="flex flex-col items-center">
                            <span className="text-gray-600 lg:text-normal text-xs">Cuisine</span>
                            <h5 className="font-bold text-md lg:text-xl">{recipe.cuisines[0] ? recipe.cuisines[0] : 'Food' } </h5>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-gray-600 lg:text-normal text-xs">Servings</span>
                            <h5 className="font-bold text-md lg:text-xl"> {recipe.servings ? recipe.servings : '1' } persons</h5>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-600 lg:text-normal text-xs">CookingTime</span>
                            <h5 className="font-bold text-md lg:text-xl">{recipe.cookingMinutes ? recipe.cookingMinutes : "30"} mins </h5>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-600 lg:text-normal text-xs">PrepTime</span>
                            <h5 className="font-bold text-md lg:text-xl">{recipe.preparationMinutes ? recipe.preparationMinutes : '30' } mins </h5>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-600 lg:text-normal text-xs">Ratings</span>
                            <h5 className="font-bold text-md lg:text-xl">{recipe.spoonacularScore.toFixed(1)}</h5>
                        </div>
                    </div>

                    <div className="flex mt-14 lg:gap-2 gap-5 flex-col lg:flex-row">
                        <div className="lg:w-[70%] flex flex-col lg:justify-self-auto justify-between ">
                                <p className="mb-2 lg:mb-0 text-lg font-bold">Summary</p>
                                <div
                                    className="text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: recipe.summary }}
                                />
                                <div className="flex justify-between items-end mt-5 lg:mt-0">
                                    <span className="flex flex-col">
                                        <p>Tags</p>
                                        <span className="capitalize text-yellow-600 text-xs lg:text-normal">{`${recipe.dishTypes}`}</span>
                                    </span>
                                    <span>
                                        <button className="rounded-full bg-black text-white text-xs lg:text-normal px-2 py-1">Download Recipe PDF</button>
                                    </span>
                                </div>
                            </div>
                            <div className="lg:w-[30%]">
                                <img src={chef}  className="rounded-lg" alt="" />
                            </div>
                    </div>

                    <div className="flex flex-col lg:flex-row mt-14 gap-2">
                        <div className="lg:w-[70%] shadow-md rounded-md p-4">
                            <p className="text-xl font-bold">Ingredients</p>
                            <span>
                                {recipe.extendedIngredients?.[0]?.aisle?.length > 0 ? (
                                    <ul className="flex flex-col gap-2 mt-2">
                                       {recipe.extendedIngredients?.map((ingredient: any, index: number) => (
                                            <li key={index} className="text-gray-500">
                                                {ingredient.name} - {ingredient.aisle} {ingredient.amount.toFixed(1)} {ingredient.unit}
                                            </li>
                                        ))}
                                    </ul>
                                    ) : (
                                    <p className="text-gray-500 italic">No instructions found.</p>
                                    )}
                            </span>
                        </div>
                        <div className="lg:w-[30%] bg-gray-100 rounded-md p-4">
                            <p>Nutritional Info</p>
                            <span className="italic text-gray-400">
                                loading...
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row mt-14 gap-2">
                        <div className="lg:w-[70%] rounded-md flex flex-col gap-3">
                            <h5 className="text-3xl mb-1">Cooking <span className="text-yellow-500">Instructions</span></h5>
                            <div className="flex items-start bg-gray-100 rounded-md p-4 gap-3">
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
                                        <p key={index} className="text-3xl text-yellow-500">{step.number}</p>
                                        <li className="" key={index}>{step.step}</li>
                                    </div> 
                                    ))}
                                </ul>
                                ) : (
                                <p className="text-gray-500 italic">No instructions found.</p>
                                )}
                            </div>
                        </div>
                        <div className="lg:w-[30%] lg:h-[100%] rounded-md">
                            <img src='https://plus.unsplash.com/premium_photo-1687697859912-a20ca9af9fc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGNoZWZ8ZW58MHx8MHx8fDA%3D' alt="" className="rounded-md w-full" />
                        </div>
                     </div>

                    <div className="mt-14">
                        <h5 className="text-3xl mb-1">Related <span className="text-yellow-500">Recipes</span></h5>
                        <SimilarItem id={id!} />
                    </div>
                </div>
                <footer className="relative py-2 mt-5 flex flex-col lg:flex-row justify-between items-center">
                    {/* right */}
                    <div className="w-[100%] flex flex-col lg:flex-row gap-2 rounded-md bg-black">
                        <div className=" p-5 flex flex-col justify-between gap-10 lg:w-[50%]">
                            <div className="flex flex-col gap-5">
                                <h1 className="text-5xl font-bold text-[#fff]">🍽 Tasty<span className="text-pink-600">Bits</span></h1>
                                <p className="text-white">Join TastyBits now and embark on a culinary Journey to explore,create, and savor amazing recipes!</p>
                            </div>
                            <div className="flex gap-5 w-full">
                                <input type="text" defaultValue="Enter your email address" placeholder="" className="bg-black outline-none focus:outline-none border-b-2 border-white text-white w-full border-0 rounded-sm focus:border-yellow-400 border-b-[#ffffff]" />
                                <button className="rounded-full bg-yellow-600 px-6 py-1 text-center text-white">Subscribe</button>
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
