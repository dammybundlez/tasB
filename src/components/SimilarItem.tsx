import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { LuChefHat } from 'react-icons/lu';

const foodImages = [
  'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY2fHxmb29kfGVufDB8fDB8fHww,1',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D,2',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGZvb2R8ZW58MHx8MHx8fDA%3D,3',
  'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGZvb2R8ZW58MHx8MHx8fDA%3D,4',
  'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGZvb2R8ZW58MHx8MHx8fDA%3D,5',
  'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGZvb2R8ZW58MHx8MHx8fDA%3D,6',
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGZvb2R8ZW58MHx8MHx8fDA%3D,7',
  'https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxmb29kfGVufDB8fDB8fHww,8',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIwfHxmb29kfGVufDB8fDB8fHww,9',
  'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHxmb29kfGVufDB8fDB8fHww,10',
];

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
         similar.map((recipe , i) => {
          const imageUrl = foodImages[i % foodImages.length];
          return(
          <div onClick={() => window.location.reload()} className="story-item w-[55%] lg:w-[25%] sm:w-[35%] md:w-[32%] bg-gray-200">
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}  className="bg-gray-100 rounded-lg shadow-md p-4  gap-2 py-3 px-2 bg-cover w-full bg-center bg-no-repeat duration-500 flex flex-col group-hover:rounded-md">
                <h2 className=" text-black text-lg lg:text-lg font-bold mb-4 line-clamp-3"> {recipe.title} <br /> </h2>
                <div className="relative">
                  <img className="rounded-lg h-40" src={imageUrl} alt="aktl" />
                  <p className="absolute bottom-2 bg-[#000] w-[95%] text-center left-1 py-1 text-sm px-2 rounded-full  text-[#fff] flex justify-between items-center"> <span> See Complete Recipe </span> <span className="bg-white rounded-full p-1"> <LuChefHat className=" text-black"/> </span> </p> 
                </div>
            </Link>
          </div>)
        })
      }
      </div>
    </div>
  )
}

export default SimilarItem
