const ProbSection = () => {
  return (
    <section className="bg-[#eff5dc] py-10 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
          A Better Way for Emerging Artists to Be Seen
        </h2>
        <p className="text-lg max-w-2xl mx-auto sm:leading-relaxed leading-0.6">
          Most platforms make it harder than it should be for artists to thrive online.
          We're changing that—radically.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="bg-white shadow-md p-4 sm:p-8 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-bold text-red-600 mb-4">The Problem</h3>
          <p className="text-gray-700 leading-relaxed text-base">
            For many emerging artists, building an online presence is harder than it should be. 
            Traditional platforms are cluttered with ads, charge high fees, or make the submission process 
            unnecessarily complicated—often overshadowing the art itself.
          </p>
        </div>

        <div className="bg-white shadow-md p-4 sm:p-8 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-bold text-green-700 mb-4">Our Solution</h3>
          <p className="text-gray-700 leading-relaxed text-base">
            EAZL changes that. With a minimalist, distraction-free design, artists can easily build a personalized 
            online gallery, showcase their artwork beautifully, and connect directly with art lovers and clients—
            without the noise or restrictions.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProbSection
