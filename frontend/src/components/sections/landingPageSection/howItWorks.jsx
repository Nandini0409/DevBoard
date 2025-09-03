const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up",
      desc: "Start your free EAZL account in seconds. No credit card or complicated forms required.",
      icon: "📝",
    },
    {
      title: "Upload Your Art",
      desc: "Add your best work — paintings, illustrations, sketches, or digital art — and organize it your way.",
      icon: "🎨",
    },
    {
      title: "Share and Grow",
      desc: "Share your personalized portfolio link to connect with collectors, fans, and opportunities.",
      icon: "🚀",
    },
  ];

  return (
    <section className="bg-[#eff5dc] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#222] mb-4">
          Create Your Portfolio in 3 Simple Steps
        </h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto leading-relaxed">
          EAZL makes it easy to get your art online and in front of the right audience—fast.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <div className="text-3xl mb-3">{step.icon}</div>
            <h3 className="text-xl font-semibold text-[#1b5748] mb-2">
              {step.title}
            </h3>
            <p className="text-gray-700">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
