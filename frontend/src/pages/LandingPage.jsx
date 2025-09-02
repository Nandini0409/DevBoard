import { useNavigate } from "react-router-dom"
import Header from "../components/layouts/Header"
import Hero from "../components/sections/landingPageSec.jsx/Hero"
import ProbSection from "../components/sections/landingPageSec.jsx/prob&solu"
import Features from "../components/sections/landingPageSec.jsx/Features"
import HowItWorks from "../components/sections/landingPageSec.jsx/howItWorks"
import FinalCTA from "../components/sections/landingPageSec.jsx/FinalCTA"
import Footer from "../components/layouts/Footer"

const LandingPage = () => {
  const navigate = useNavigate()
  const googleLoginHandler = async () => {
    const response = await fetch('http://localhost:3000/auth/googleLogin', {
      method: 'GET',
      credentials: 'include'
    })
    const data = await response.json()
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${data.params}`
  }

  return (
    <>
      <Header />
      <Hero />
      <ProbSection/>
      <Features/>
      <HowItWorks/>
      <FinalCTA/>
      <Footer/>
    </>
  )
}

export default LandingPage

{/* <h1>Landing Page</h1>
<button onClick={googleLoginHandler}>Sign up with Google</button>
<button onClick={navigate('/emailSignup')}>Sign up with Email</button>
<p>Already have an account? Login:</p>
<button onClick={navigate('/emailLogin')}>Sign up with Email</button> */}