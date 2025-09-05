export default function Register() {
  return (
    <div className="min-h-screen flex w-[75vw] mx-auto my-10 shadow-xl rounded-2xl overflow-hidden">
      <div className="w-1/2 flex flex-col justify-center px-16 bg-[#f3ead4b2]">
      
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Create Your Free Portfolio
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          A better way for emerging artists to be seen.
        </p>

        <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-xl shadow-sm hover:shadow-md transition">
          <img src="images/gIcon.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="flex items-center my-8">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-3 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <p className="text-gray-700 mb-4 font-medium">Sign up using Email</p>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl py-4 shadow-md transition">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-8 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-red-500 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>

      <div className="w-1/2 ">
        <img
          src="images/artworkGrid.png"
          alt="Artwork"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
