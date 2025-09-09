const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 text-center md:grid-cols-4 gap-8">

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">EAZL</h2>
            <p className="mt-2 text-sm">
              Your art, showcased beautifully.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#howItWorks" className="hover:text-white">How It Works</a></li>
              <li><a href="/userRegistration" className="hover:text-white">Sign Up</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm hidden sm:block">
              Email:
              <a href="mailto:support.eazl@gmail.com" className="hover:text-white ml-1">
                nandinidixit0409@gmail.com
              </a>
            </p>
            <p className="text-sm sm:hidden">
              <a
                href="mailto:support.eazl@gmail.com"
                className="bg-white text-gray-900 px-3 py-1 rounded-md font-medium hover:bg-gray-200"
              >
                Email Us
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Connect</h3>
            <a
              href="https://www.linkedin.com/in/nandini-dixit-1830a825a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} EAZL. All rights reserved.
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white">Privacy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white">Terms</a>
          </p>

          <div className="mt-4">
            <a
              href="/userRegistration"
              className="inline-block bg-white text-gray-900 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Create Your Free Portfolio
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer