import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import EmailSignup from './pages/EmailSignup.jsx'
import EmailLogin from './pages/EmailLogin.jsx'
import Profile from './pages/Profile.jsx'
import PublicDashboard from './pages/PublicDashboard.jsx'
import PrivateDashboard from './pages/PrivateDashboard.jsx'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/emailSignup" element={<EmailSignup />} />
          <Route path="/emailLogin" element={<EmailLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/publicDashboard" element={<PublicDashboard />} />
          <Route path="/privateDashboard" element={<PrivateDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
