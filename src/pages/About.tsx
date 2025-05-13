// src/pages/About.tsx
const About = () => {
    return (
      <div className=" bg-yellow-50 text-gray-800 p-8">
        <div className=" flex flex-col lg:flex-col items-center gap-10">
          <img
            src="https://plus.unsplash.com/premium_photo-1661601616684-8b8a2939ce1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNoZWZ8ZW58MHx8MHx8fDA%3D"
            alt="Chef"
            className=""
          />
  
          {/* Text section */}
          <div>
            <h1 className="text-4xl font-bold text-yellow-600 mb-4">About Us</h1>
            <p className="text-lg mb-4 leading-relaxed">
              Welcome to <span className="font-semibold">TastyBits</span> – your cozy corner for discovering mouthwatering recipes from around the world.
              Whether you're a curious beginner or a passionate foodie, we’re here to make your cooking journey fun and flavorful.
            </p>
            <p className="text-md mb-4">
              Our recipes are powered by the amazing <a href="https://spoonacular.com/" className="text-yellow-500 underline">Spoonacular API</a>, served up in a beautiful, scroll-friendly layout designed to inspire.
            </p>
            <p className="italic text-sm text-gray-600">
              “Cooking is an art, and every recipe is a canvas.”
            </p>
          </div>

          <div className="text-center py-12 px-6 bg-white">
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">Want to contribute or give feedback?</h2>
            <p className="text-gray-600 mb-4">Let’s cook together! 👨‍🍳</p>
            <button className="bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold py-2 px-4 rounded shadow">
                Contact Us
            </button>
            </div>
        </div>
      </div>
    );
  };
  
  export default About;
  