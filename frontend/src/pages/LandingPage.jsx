import { useNavigate } from "react-router-dom"
import Header from "../components/layouts/Header"
import Hero from "../components/sections/landingPageSection/Hero"
import ProbSection from "../components/sections/landingPageSection/prob&solu"
import Features from "../components/sections/landingPageSection/Features"
import HowItWorks from "../components/sections/landingPageSection/howItWorks"
import FinalCTA from "../components/sections/landingPageSection/FinalCTA"
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

