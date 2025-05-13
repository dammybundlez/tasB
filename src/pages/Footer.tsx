// src/components/Footer.tsx
function Footer() {
    return (
      <footer className="relative py-2 flex flex-col lg:flex-row justify-between gap-2 items-center">
       <img className='lg:w-[49%] w-[100%] h-[250px] md:w-full md:h-[300px] rounded-md lg:h-[520px] object-cover bg-cover' src='https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZvb2R8ZW58MHx8MHx8fDA%3D' alt="" height={4}/>
       <div className="absolute lg:left-8 p-3 md:left-10 md:top-10">
            <h2 className='capitalize text-pink-600 lg:w-[50%] w-[80%] text-3xl font-bold mb-5'>ready to elevate your culinary skills to the next level</h2>
            <button className='bg-white px-4 py-2'>Book Now</button>
       </div>

       {/* right */}
       <div className="lg:w-[49%] flex flex-col gap-2">
        <div className="bg-gray-100 rounded-lg p-5 flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold text-[#000]">🍽 Tasty<span className="text-yellow-400">Bits</span></h1>
                <p>Join TastyBits now and embark on a culinary Journey to explore,create, and savor amazing recipes!</p>
            </div>
            <div className="flex gap-5 w-full">
                <input type="text" defaultValue="Enter your email address" placeholder="Enter your email address" className="bg-gray-100 outline-none focus:outline-none border-b-2 border-gray-400 w-full border-0 rounded-sm focus:border-yellow-400 border-b-[#000]" />
                <button className="rounded-full bg-yellow-600 px-6 py-1 text-center text-white">Subscribe</button>
            </div>
        </div>
        <div className="flex flex-col gap-14 bg-gray-900 rounded-md p-5">
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
  