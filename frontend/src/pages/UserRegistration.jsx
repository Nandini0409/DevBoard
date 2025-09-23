const url = import.meta.env.VITE_URL
import { useState } from "react"
import EmailLogin from "../components/layouts/forms/EmailLogin"
import EmailSignup from "../components/layouts/forms/EmailSignup"

export default function Register() {
  const [formType, setFormType] = useState("signup")
  const googleLogin = async () => {
    const response = await fetch(`${url}/auth/google`, {
      method: 'get',
      credentials: 'include'
    })
    const jsonRespose = await response.json()
    window.location = `https://accounts.google.com/o/oauth2/v2/auth?
${jsonRespose.params}`
  }

  return (
    <div className="min-h-screen flex w-[75vw] mx-auto my-10 shadow-xl rounded-2xl overflow-hidden">
      <div className="w-1/2 flex flex-col justify-center px-16 bg-[#f3ead4b2]">

        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Create Your Free Portfolio
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          A better way for emerging artists to be seen.
        </p>

        <button onClick={googleLogin} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-xl shadow-sm hover:shadow-md transition">
          <img src="/gIcon.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="flex items-center my-8">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-3 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <p className="text-gray-700 mb-4 font-medium">Sign up using Email</p>


        {formType === "signup"
          &&
          <div>
            <EmailSignup />
            <p className="text-sm text-gray-600 mt-8 text-center">
              Already have an account?{" "}
              <a href='#' onClick={(e) => { setFormType('login') }} className="text-red-500 font-medium hover:underline">
                Log in
              </a>
            </p>
          </div>
        }
        {formType === "login"
          &&
          <div>
            <EmailLogin />
            <p className="text-sm text-gray-600 mt-8 text-center">
              Don't have an account?{" "}
              <a href='#' onClick={(e) => { setFormType('signup') }} className="text-red-500 font-medium hover:underline">
                Sign up
              </a>
            </p>
          </div>

        }







      </div>

      <div className="w-1/2 ">
        <img
          src="/artworkGrid.png"
          alt="Artwork"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
