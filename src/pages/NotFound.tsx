import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-9xl font-extrabold text-yellow-400 tracking-widest">404</h1>
      <div className="bg-yellow-400 px-4 py-1 mt-1 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <p className="mt-8 text-lg text-gray-500">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 text-pink-600 bg-yellow-400 hover:bg-yellow-500 font-semibold rounded transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
