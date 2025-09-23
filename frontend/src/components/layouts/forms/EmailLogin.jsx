import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EmailLogin = ({formType, setFormType}) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  console.log(formType, setFormType)
  const loginHandler = async (e) => {
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(loginData)
    })
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    if (response.status === 200) {
      navigate('/dashboard')
    }
  }

  return (
    <>
      <form className="space-y-5" onSubmit={loginHandler}>
        <div>
          <input
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            type="email"
            required
            value={loginData.email}
            placeholder="Enter your email"
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            value={loginData.password}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
            placeholder="Enter your password"
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </div>
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl py-4 shadow-md transition" type="submit">
          Log In
        </button>
      </form>



      
    </>
  )
}

export default EmailLogin