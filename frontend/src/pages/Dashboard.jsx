import { useState } from 'react'

import AboutArtisan from '../components/sections/DashboardSection/aboutArtisan'
import SocialLinks from '../components/sections/DashboardSection/addSocials'
import AddArtworks from '../components/sections/DashboardSection/addArtworks'
import Header from '../components/layouts/Header'

const Dashboard = () => {
  const [formType, setFormType]=useState('profile')
  return (
    <>
    {/* <div className='bg-[#fcf2e1]'>
      <Header showName={true}/>
      <div className='flex'>
      <section className='flex flex-col w-[20vw] h-[100vh] items-center gap-4 px-5 py-7' id="sidebar">
        <a className='bg-white w-[100%] shadow-lg text-center py-4 rounded-xl' href='#' onClick={()=>{setFormType('profile')}}>About me</a>
        <a className='bg-white w-[100%] shadow-lg text-center py-4 rounded-xl' href='#' onClick={()=>{setFormType('artwork')}}>Artwork</a>
        <a className='bg-white w-[100%] shadow-lg text-center py-4 rounded-xl' href='#' onClick={()=>{setFormType('socials')}}>Contact & Socials</a>
      </section>
      {formType==='profile'?<AboutArtisan />:null}
      {formType==='artwork'?<AddArtworks />:null}
      {formType==='socials'?<SocialLinks/>:null}
      </div>
    </div> */}
<>
  <div className="bg-white min-h-screen">

    <div className="flex">
      {/* Sidebar */}
      <section
        id="sidebar"
        className="flex flex-col w-[16vw] h-[100vh] bg-[#fffaf3] border-r border-[#f0e0c9] shadow-md px-4 py-6 gap-4"
      >
        <a href='/'><img className='mx-auto' src="/images/logo3.png" width={100} alt="EAZL logo" /></a>
        <p className='bg-white w-full shadow-sm text-center py-3 rounded-lg font-medium text-gray-700 hover:bg-[#ffe9d6] hover:shadow-md transition'>Nandini Dixit</p>
        <a
          className="bg-white w-full shadow-sm text-center py-3 rounded-lg font-medium text-gray-700 hover:bg-[#ffe9d6] hover:shadow-md transition"
          href="#"
          onClick={() => {
            setFormType("profile");
          }}
        >
          About Me
        </a>
        <a
          className="bg-white w-full shadow-sm text-center py-3 rounded-lg font-medium text-gray-700 hover:bg-[#ffe9d6] hover:shadow-md transition"
          href="#"
          onClick={() => {
            setFormType("artwork");
          }}
        >
          Artwork
        </a>
        <a
          className="bg-white w-full shadow-sm text-center py-3 rounded-lg font-medium text-gray-700 hover:bg-[#ffe9d6] hover:shadow-md transition"
          href="#"
          onClick={() => {
            setFormType("socials");
          }}
        >
          Contact & Socials
        </a>
      </section>

      {/* Content Area */}
      <main className="flex-1 px-5 overflow-y-auto">
        {formType === "profile" ? <AboutArtisan /> : null}
        {formType === "artwork" ? <AddArtworks /> : null}
        {formType === "socials" ? <SocialLinks /> : null}
      </main>
    </div>
  </div>
</>

    </>
  )
}

export default Dashboard





