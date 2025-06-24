import { Link } from "react-router-dom"
import '../App.css'
import { IoMenuSharp } from "react-icons/io5"
import { MdCancel } from "react-icons/md"
import { useEffect, useState } from "react"
import Search from "./Search"
import { LuDot } from "react-icons/lu"

const Header = () => {
  const [ isOpen , setIsOpen ] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if(isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener( "scroll" , handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen])

  const toggleMenu = () => setIsOpen((prev) => !prev)
  return (
    <header className="bg-white sticky top-0 z-10 flex justify-between">
      <div className="container mx-auto lg:px-10 p-2 py-4 flex justify-between items-center">
        <h1 className="lg:text-3xl text-xl font-normal text-[#000]"><Link to='/'>FLA<span className="text-yellow-500">VORIZ</span></Link></h1>
        <nav className="lg:block hidden ">
          <ul className="flex gap-6 font-semibold justify-between text-gray-700 uppercase w-1/3">
            <li><Link to="/" className="hover:font-extrabold flex items-center group"><span><LuDot className="text-yellow-500 hidden group-hover:block" /></span>Home</Link></li>
            <li><Link to="/about" className="hover:font-extrabold flex items-center group"><span><LuDot className="text-yellow-500 hidden group-hover:block" /></span>About</Link></li>
            <li><Link to="/" className="hover:font-extrabold flex items-center group"><span><LuDot className="text-yellow-500 hidden group-hover:block" /></span>Recipes</Link></li>
            <li><Link to="/blog" className="hover:font-extrabold flex items-center group"><span><LuDot className="text-yellow-500 hidden group-hover:block" /></span>Blog</Link></li>
            <li><Link to="/contact" className="hover:font-extrabold flex items-center group"><span><LuDot className="text-yellow-500 hidden group-hover:block" /></span>Contact</Link></li>
            {/* <li><Link to="/favorites" className="hover:font-bold">Favourites</Link></li> */}
          </ul>
        </nav> 
        <div className="rounded-lg text-right lg:text-center md:text-center flex">
          <Search/>
        </div>

        <div onClick={toggleMenu} className="cursor-pointer lg:hidden">    
            { isOpen ? <MdCancel size={26}/> : <IoMenuSharp className="cursor-pointer" size={26} /> }
        </div>
      </div>
          <div className={` mt-[4.3rem] lg:hidden flex flex-col p-3 absolute w-full py-10 top-0 left-0 transition-all duration-500 ease-in-out transform animate-slide-down ${
            isOpen ? "max-h-[500px] opacity-100 bg-yellow-500 translate-y-0" : "left-[-300px] opacity-0 -translate-y-2"
          }`}>
              <ul className="flex gap-4 text-gray-700 uppercase p-3 flex-col">
                <li><Link to="/" className="hover:font-bold">Home</Link></li>
                <li><Link to="/about" className="hover:font-bold">About</Link></li>
                <li><Link to="/recipes" className="hover:font-bold">Recipes</Link></li>
                <li><Link to="/favorites" className="hover:font-bold">Favourites</Link></li>
              </ul>
          </div>      
    </header>
  )
}

export default Header
