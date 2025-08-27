import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EmailLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/emailLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(loginData)
    })
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    if(response.status === 200){
      navigate('/profile')
    }
  }

  return (
    <>
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            required
            value={loginData.email}
            placeholder="Enter your email"
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={loginData.password}
            required
            placeholder="Enter your password"
            name="password"
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </>
  )
}

export default EmailLogin