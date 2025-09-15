import { useState } from "react"
import { passwordValidator } from "../../../utils/inputValidator"
import { useNavigate } from "react-router-dom"

const EmailSignup = (formType, setFormType) => {
  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    password: ""
  })
  const navigate = useNavigate()

  const signupHandler = async (e) => {
    e.preventDefault()
    console.log(signupData)
    if (!passwordValidator(signupData.password)) {
      alert('Invalid password! should be minimum 8 character long and have atleast 1 special character.')
      return
    }

    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(signupData)
    })
    const jsonResponse = await response.json()
    console.log(jsonResponse, response.status)
    alert(jsonResponse.message)
    if (response.status === 201) {
      navigate('/dashboard')
    }
  }

  return (
    <>
      <form className="space-y-5" onSubmit={signupHandler}>
        <div>
          <input
            required
            type="text"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={signupData.name}
            placeholder="Enter your name"
            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
          />
        </div>
        <div>
          <input
            type="email"
            required
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={signupData.email}
            placeholder="Enter your email"
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            value={signupData.password}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
            placeholder="Enter your password"
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          />
        </div>
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl py-4 shadow-md transition" type="submit">Sign Up</button>
      </form>

    </>
  )
}

export default EmailSignup








// <div>
//   <input
//     type="text"
//     required
//     value={signupData.userName}
//     placeholder="Enter your username"
//     onChange={(e) => setSignupData({ ...signupData, userName: e.target.value })}
//   />
// </div>