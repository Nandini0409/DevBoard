import AboutArtisan from '../components/sections/privDashSection/aboutArtisan'
import SocialLinks from '../components/sections/privDashSection/addSocials'
import AddArtworks from '../components/sections/privDashSection/addArtworks'
import Header from '../components/layouts/Header'

const PrivateDashboard = () => {
  return (
    <>
      <Header showName={true}/>
      <AboutArtisan />
      <AddArtworks />
      <SocialLinks />
    </>
  )
}

export default PrivateDashboard