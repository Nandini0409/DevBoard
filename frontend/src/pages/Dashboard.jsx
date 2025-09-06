import { useState } from 'react'

import AboutArtisan from '../components/sections/DashboardSection/aboutArtisan'
import SocialLinks from '../components/sections/DashboardSection/addSocials'
import AddArtworks from '../components/sections/DashboardSection/addArtworks'
import Header from '../components/layouts/Header'
import { HomeIcon } from '@heroicons/react/24/solid';


const Dashboard = () => {
  const [formType, setFormType] = useState('artworks')
  return (
    <>
    <div className='flex w-[100vw] justify-between '>
      <section id="left" className="w-[15%] py-3 h-[100vh] border-l rounded-xl flex flex-col justify-around items-center text-center">
        <div id="logo">
          <a href='/'>
            <img width={70} src="/images/logo3.png" alt="logo" />
          </a>
        </div>
        <div id="updateLinks" className='flex flex-col'>
          <a href='#' onClick={()=>{setFormType('artworks')}}><HomeIcon />Dashboard</a>
          <a href='#' onClick={() => { setFormType('profile') }}>About me</a>
          <a href='#' onClick={() => { setFormType('artworkForm') }}>Artwork</a>
          <a href='#' onClick={() => { setFormType('socials') }}>Contact & Socials</a>
        </div>
        <div id="helpLink" className='flex flex-col justify-center items-center'>
          <a href='/'>
            <img width={120} src="/images/helpCenterIcon2.png" alt="help icon" />
          </a>
          <p className='leading-0.3 text-[12px] px-4 text-gray-500'>Do you have any problem while using EAZL?</p>
        </div>
      </section>




      <section id="center" className='border-l rounded-xl w-[60%] bg-[#dbd2b533]'>
        {formType === 'artworks'? <div id="cardContainer">
          <div>
            <img src="/images/artwork1.png" alt="title" />
            <p>title</p>
            <p>description</p>
          </div>
          <div>
            <img src="/images/artwork2.png" alt="title" />
            <p>title</p>
            <p>description</p>
          </div>
          <div>
            <img src="/images/artwork3.png" alt="title" />
            <p>title</p>
            <p>description</p>
          </div></div>:null}
        
        
        <p>placehoder or user's uploaded art.</p>
        {formType === 'profile' ? <AboutArtisan /> : null}
        {formType === 'artworkForm' ? <AddArtworks /> : null}
        {formType === 'socials' ? <SocialLinks /> : null}
      </section >



      <section id="right" className='border-l rounded-xl w-[25%]'>
        <div id="userProfile">
          <img src="/images/userImage.png" alt="userImage" />
          <p>Name</p>
          <p>@username</p>
          <p>about user</p>
          <button>Update profile</button>
          <p>links user have added in portfolio</p>
          <button>Update links</button>
        </div>
        <div id="analytics">
          <p>portfolio analytics</p>
        </div>
      </section>
    </div>
    </>
  )
}

export default Dashboard




