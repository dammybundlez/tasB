import { FaPlus } from 'react-icons/fa'
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import p3 from '../assets/p3.jpg'


function Footer() {
    return (
      <footer className="py-2 flex flex-col lg:flex-row justify-between gap-4 mt-10 items-center">
        <div className="lg:w-[49%] relative">
            <img className=' w-[100%] h-[250px] md:w-full md:h-[300px] rounded-md lg:h-[516px] object-cover bg-cover' src='https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZvb2R8ZW58MHx8MHx8fDA%3D' alt="" height={4}/>
            <div className="absolute top-6 right-6 bg-white p-3 w-[50%] rounded-lg">
                <h3 className="font-extrabold">Join the community</h3>
                <p className="text-gray-600 font-medium">1,000+ Members</p>
                <div className='flex items-center justify-between'>
                    <div className="flex items-center space-x-[-15px]">
                        <img src={p1} alt="Image 1" className="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover" />
                        <img src={p2}alt="Image 2" className="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover" />
                        <img src={p3} alt="Image 3" className="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover" />
                    </div>
                    <div>
                        <button className='bg-zinc-800 text-white p-3 rounded-full'><FaPlus/></button>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-6 left-6'>
                <h2 className='text-white text-2xl font-bold'>The place of the best food</h2>
            </div>
        </div>

        <div className="lg:w-[49%] flex flex-col gap-2">
            <div className="bg-gray-100 rounded-lg p-5 flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-medium text-[#000]">FLA<span className="text-yellow-500">VORIZ</span></h1>
                    <p>Join TastyBits now and embark on a culinary Journey to explore, create, and savor amazing recipes!</p>
                </div>
                <div className="flex gap-5 w-full">
                    <input type="text" placeholder="Enter your email address" className="bg-gray-100 outline-none focus:outline-none border-b-2 border-gray-400 w-full border-0 rounded-sm focus:border-yellow-400 border-b-[#000]" />
                    <button className="rounded-full bg-yellow-500 px-6 py-1 text-center text-white">Subscribe</button>
                </div>
            </div>
            <div className="flex flex-col gap-14 bg-zinc-900 rounded-md p-5">
                <div className="flex justify-between items-center w-full">
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
                        <p>Copyright @ 2025 TastyBits</p>
                        <div>
                            <span>Privacy Policy </span> &nbsp;&nbsp;  | &nbsp;&nbsp; <span> Terms and Conditions</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  