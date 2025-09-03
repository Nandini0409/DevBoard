const Features = () => {
  const features = [
  {
    icon: "🖼️",
    title: "Clean, Minimalist Layout",
    desc: "Keep the spotlight on your artwork with a distraction-free portfolio layout. No ads, no clutter—just your creations, showcased with modern design that loads fast and looks great on any device.",
    span: "md:col-span-2",
    bg: "from-[#F22F1D]/10 to-[#F22F1D]/30",
  },
  {
    icon: "🌐",
    title: "Free and Accessible",
    desc: "Launch your online art gallery with no cost, hidden fees, or paywalls. Our platform is free to use, open to all, and optimized for growing your creative presence on the web.",
    span: "md:row-span-2",
    bg: "from-[#18B3C4]/10 to-[#18B3C4]/30",
  },
  {
    icon: "🎨",
    title: "Creative Freedom",
    desc: "Upload, organize, and present your art exactly how you envision it.",
    bg: "from-[#1b5748]/10 to-[#1b5748]/30",
  },
  {
    icon: "🤝",
    title: "Direct Connections",
    desc: "Share your gallery and engage with collectors, enthusiasts, and peers.",
    bg: "from-[#F0C26E]/10 to-[#F0C26E]/30",
  },
]


  return (
    <section className="relative bg-gradient-to-b from-[#FAF5E9] to-[#fef2f2] py-20 px-6">
      <div className="relative max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#222] mb-4">
          Modern Features, <span className="text-[#F22F1D]">Artist-First Design</span>
        </h2>
        <p className="max-w-xl mx-auto text-gray-700 text-lg leading-relaxed">
          Experience a clean, creative platform built for showcasing your art beautifully.
        </p>
      </div>

      <div className="grid md:grid-cols-3 w-[80vw] mx-auto grid-cols-1 gap-6 auto-rows-[200px]">
        {features.map((feature, index) => (
          <div
  key={index}
  className={`bg-gradient-to-br ${feature.bg} p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 flex flex-col justify-between ${feature.span || ""}`}
>
  <div>
    <span className="text-3xl mb-2 block">{feature.icon}</span>
    <h3 className="text-xl font-bold text-[#1b5748] mb-2">
      {feature.title}
    </h3>
    <p className="text-gray-700 text-base">{feature.desc}</p>
  </div>
  <a
    href="#"
    className="mt-4 text-sm font-medium text-[#1b5748] hover:underline"
  >
  </a>
</div>

        ))}
      </div>
    </section>
  )
}

export default Features


