import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { LuChefHat } from 'react-icons/lu';

    const SimilarItem = ({ id }: { id: string }) => {
    const [similar, setSimilar] = useState<any[]>([]);

    useEffect(() => {
        const fetchSimilar = async ( count : number = 10) => {
            try {
                const res = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar` ,
                   { params : { 
                      number : count,
                      apiKey : "93e68c41440948eb9b00e79f8e8fa67b"
                    }});
                   setSimilar(res.data)
            } catch (err) {
              console.error("Error fetching similar recipes", err);
            }
        }
        fetchSimilar()
    } , [id])
   
    if(!similar) return <p>Loading similar items...</p>
  return (
    <div className="">
      <div className="space-x-2 px-2 lg:px-4 md:px-2 story-scroll">
      {
         similar.map((recipe) => (
          <div onClick={() => window.location.reload()} className="story-item w-[55%] lg:w-[25%] sm:w-[35%] md:w-[32%] bg-gray-200 ">
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}  className="bg-gray-400 rounded-lg shadow-md p-4  gap-2 py-3 px-2 bg-cover w-full bg-center bg-no-repeat duration-500 flex flex-col group-hover:rounded-md">
                <div className="group-hover:absolute group-hover:inset-0 rounded-md group-hover:bg-gradient-to-b group-hover:from-[#e9e4e4] to-red-800" />
                <h2 className="font-normal text-black text-lg lg:text-3xl mb-4 text-blue truncate"> {recipe.title} <br /> </h2>
                <br /> <br />
                <ul className="flex flex-wrap gap-2 gap-y-2 group-hover:flex ease-out duration-1000">
                    <li className="bg-white text-black px-4 rounded-full ">{`${recipe.readyInMinutes} mins`}</li>
                    <li className="bg-white text-black px-4  rounded-full ">{`${recipe.servings} servings`}</li>
                    <li className="bg-white text-black px-4  rounded-full ">Step by step Guides</li>
                    {/* <li><Link to='' className="bg-white text-black px-4 rounded-full ">{`${recipe.aggregateLikes} +`}</Link></li> */}
                </ul>
                <p className=" mt-5 bg-[#000] w-full py-1 text-sm px-2 rounded-lg text-[#fff] flex justify-between items-center"> <span> See Complete Recipe </span> <span className="bg-white rounded-full p-1"> <LuChefHat className=" text-black"/> </span> </p> 
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default SimilarItem
