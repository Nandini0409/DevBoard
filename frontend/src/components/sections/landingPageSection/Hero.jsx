import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
  return (
    <>
      <section className="relative h-[90vh] bg-[url('images/heroBg.png')] bg-cover flex bg-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFEDD5]/40 to-[#F87171]/20"></div>
        <div className="flex gap-4 flex-col w-[60vw] py-8 mx-auto text-center items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-xl mb-6">
           Showcase Your Art{" "}
          <span className="text-[#F22F1D] italic">Effortlessly</span>
         </h1>
          <div className="z-10">

          <p className="">Your minimalist online art portfolio, built in seconds.</p>
          <button onClick={(e)=>{navigate('userRegistration')}} className="bg-[#F22F1D] hover:bg-[#F24F13] text-white px-10 py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition"> Get Started for Free
         </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero







