import  banner  from '../assets/banner.png'

const Cardboard = () => {
  return (
    <div className="relative lg:h-96">
        <span className="absolute text-white lg:text-black lg:left-32 md:left-8 left-2 lg:top-40 top-20 font-semibold leading-16 text-3xl sm:text-4xl lg:text-5xl flex flex-col gap-3">
            <p className="">Explore</p>
            <p className=""><span className="text-yellow-500">Culinary</span> Insights</p>
        </span>
      <img className="w-[100%] lg:h-[100%] md:h-[300px] sm:h-[250px] rounded-lg object-cover" src={banner} alt="img" />
    </div>
  )
}

export default Cardboard
