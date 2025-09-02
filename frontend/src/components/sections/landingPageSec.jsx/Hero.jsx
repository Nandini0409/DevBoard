// const Hero = () => {
//   return (
//     <>
//       <h1>
//         Showcase Your Art. Effortlessly.
//       </h1>
//       <p>
//         EAZL is a minimalist platform designed for emerging artists to display their work beautifully, connect with audiences, and grow their online presence—without distractions or high fees.
//       </p>
//       <button>Get Started for Free</button>
//       <p>Your minimalist online art portfolio, built in seconds.</p>
//     </>
//   )
// }


// export default Hero



const Hero = () => {
  return (
    <section className="relative bg-[#FAF5E9] text-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 py-24 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-[#18B3C4]">
          Showcase Your Art. Effortlessly.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-700">
          EAZL helps you display your artwork beautifully, connect with audiences, and grow your online presence—without distractions or high fees.
        </p>
        <button className="bg-[#F22F1D] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-md hover:bg-[#F24F13] transition">
          Get Started for Free
        </button>
        <p className="mt-6 text-[#F0C26E] font-medium">
          Your minimalist online art portfolio, built in seconds.
        </p>
      </div>

      {/* Decorative angled images */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <div className="flex gap-6">
          <img
            src="/art1.png"
            alt="Artwork 1"
            className="w-48 md:w-64 transform rotate-[-10deg] shadow-xl border-4 border-[#18B3C4]"
          />
          <img
            src="/art2.png"
            alt="Artwork 2"
            className="w-48 md:w-64 transform rotate-[8deg] shadow-xl border-4 border-[#F0C26E]"
          />
          <img
            src="/art3.png"
            alt="Artwork 3"
            className="w-48 md:w-64 transform rotate-[-5deg] shadow-xl border-4 border-[#F24F13]"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero

