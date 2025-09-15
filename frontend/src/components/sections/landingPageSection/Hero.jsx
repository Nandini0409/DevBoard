import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
  return (
    <>
      <section className="relative h-[70vh] sm:h-[100vh] bg-[url('/heroBg.png')] bg-cover flex bg-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFEDD5]/40 to-[#F87171]/20"></div>
        <div className="flex gap-4 flex-col w-[60vw] py-8 mx-auto text-center items-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold drop-shadow-xl mb-6">
            Showcase Your Art{" "}
            <span className="text-[#F22F1D] italic">Effortlessly</span>
          </h1>
          <div className="z-10">
            <p className="">Your minimalist online art portfolio, built in seconds.</p>
            <button onClick={(e) => { navigate('userRegistration') }} className="bg-[#F22F1D] hover:bg-[#F24F13] text-white px-4 my-2 sm:px-10 py-1.5 rounded-full text-sm sm:text-lg sm:py-3 font-bold shadow-lg hover:shadow-xl transition"> Get Started for Free
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero







