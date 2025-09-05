import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import UserRegistration from './pages/UserRegistration.jsx'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/userRegistration" element={<UserRegistration />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

{/* <Route path="/emailSignup" element={<EmailSignup />} />
  <Route path="/emailLogin" element={<EmailLogin />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/publicDashboard" element={<PublicDashboard />} />
  */}
  // import EmailSignup from './pages/EmailSignup.jsx'
  // import EmailLogin from './pages/EmailLogin.jsx'
  // import Profile from './pages/Profile.jsx'
  // import PublicDashboard from './pages/PublicDashboard.jsx'