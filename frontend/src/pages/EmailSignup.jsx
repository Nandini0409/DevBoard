import { useState } from "react"
import { passwordValidator } from "../utils/inputValidator.js"
import {useNavigate} from "react-router-dom"

const EmailSignup = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    password: "",
    userName: ""
  })
  const navigate = useNavigate()

  const signupHandler = async (e) => {
    e.preventDefault()
    console.log(signupData)
    if (!passwordValidator(signupData.password)) {
      alert('Invalid password! should be minimum 8 character long and have atleast 1 special character.')
      return
    }

    const response = await fetch('http://localhost:3000/emailSignup', {
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
    if(response.status === 201){
      navigate('/profile')
    }
  }

  return (
    <>
      <form onSubmit={signupHandler}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            required
            type="text"
            value={signupData.name}
            placeholder="Enter your name"
            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            name="name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            required
            value={signupData.email}
            placeholder="Enter your email"
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            required
            value={signupData.userName}
            placeholder="Enter your username"
            name="username"
            onChange={(e) => setSignupData({ ...signupData, userName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={signupData.password}
            required
            placeholder="Enter your password"
            name="password"
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default EmailSignup