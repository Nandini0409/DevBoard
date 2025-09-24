import { useState, useEffect } from "react"
import { HomeIcon, UserIcon, PhotoIcon, LinkIcon } from "@heroicons/react/24/solid"

import { getProfile } from "../utils/profile"
import getArtwork from "../utils/getArtwork"

import Profile from "../components/sections/DashboardSection/Profile"
import SocialLinks from "../components/sections/DashboardSection/Socials"
import AddArtworks from "../components/sections/DashboardSection/Artwork"

const Dashboard = () => {
  const [formType, setFormType] = useState("artworks")
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    bio: "",
    userName: "",
    profileImage: null,
    socialLinks: {
      instagram: "",
      linkedin: "",
      website: "",
      behance: "",
      dribble: "",
      workemail: "",
    }
  })
  const [artworks, setArtworks] = useState([])


  const fetchProfile = async () => {
    const data = await getProfile()
    const artworkData = await getArtwork()
    setArtworks(artworkData.images || [])
    console.log(artworkData)
    setProfile(data)
    console.log(data)
  }

  useEffect(() => {
    document.title = "Dashboard | EAZL"
    fetchProfile()
  }, [])

  return (
    <div className="flex w-screen min-h-screen bg-gray-50">

      <aside className="w-[15%] bg-white shadow-md flex flex-col justify-between items-center py-6">
        <div className="flex flex-col items-center gap-4">
          <a href="/">
            <img width={70} src="/logo3.png" alt="logo" />
          </a>
        </div>

        <nav className="flex flex-col gap-4 w-full px-4">
          <button
            onClick={() => setFormType("artworks")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${formType === "artworks"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-600"
              }`}
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </button>

          <button
            onClick={() => setFormType("profile")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${formType === "profile"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-600"
              }`}
          >
            <UserIcon className="h-5 w-5" />
            Profile
          </button>

          <button
            onClick={() => setFormType("artworkForm")}
            className={`px-3 flex py-2 gap-2 items-center rounded-lg text-sm font-medium transition ${formType === "artworkForm"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-600"
              }`}
          >
            <PhotoIcon className="h-5 w-5" />
            Artwork
          </button>

          <button
            onClick={() => setFormType("socials")}
            className={`py-2 flex px-3 gap-2 items-center rounded-lg text-sm font-medium transition ${formType === "socials"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-600"
              }`}
          >
            <LinkIcon className="h-5 w-5" />
            Contact & Socials
          </button>
        </nav>

        <div className="flex flex-col items-center gap-2">
          <a href="/">
            <img width={100} src="/helpCenterIcon2.png" alt="help icon" />
          </a>
          <p className="text-xs text-gray-500 text-center px-3">
            Do you have any problem while using EAZL?
          </p>
        </div>
      </aside>

      <main className="w-[60%] p-6 bg-gray-100 overflow-y-auto">
        {formType === "artworks" ? (
          <div className="flex flex-col gap-10">

            <h1 className="text-4xl text-center">Your Artworks</h1>
            <button onClick={() => setFormType("artworkForm")}>Upload Artwork</button>
            <div className="grid grid-cols-3 gap-6">
              {artworks.map((art, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow p-3 flex flex-col gap-2"
                >
                  <img
                    src={art.url}
                    width={200}
                    height={150}
                    alt="title"
                    className="rounded-lg"
                  />
                  <p className="font-semibold text-sm">{art.title}</p>
                  <p className="text-xs text-gray-500">{art.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {formType === "profile" && <Profile userData={profile} setUserData={setProfile} />}
        {formType === "artworkForm" && <AddArtworks artworks={artworks} setArtworks={setArtworks} />}
        {formType === "socials" && <SocialLinks userData={profile} setUserData={setProfile} />}
      </main>

      <aside className="w-[25%] bg-white shadow-md p-6 flex flex-col gap-6">
        <div className="bg-gray-50 rounded-xl p-4 text-center flex flex-col gap-3">
          <img
            src={profile?.profileImage?.url ? profile.profileImage.url : "/avatar.png"}
            alt="user"
            className="w-30 h-30 rounded-full border border-gray-300 mx-auto"
          />
          <p className="font-semibold">{profile.name || ""}</p>
          <p className="text-gray-500 text-sm">{profile.userName || ""}</p>
          <p className="text-xs text-gray-600">{profile.bio || ""}</p>
          <button 
          className="bg-black text-white rounded-lg px-4 py-2 text-sm hover:bg-gray-800"
          onClick={() => setFormType("profile")}
          >
            Update profile
          </button>
          <div>
            {Object.entries(profile.socialLinks || {}).map((link, idx)=>(
              console.log(link),
              <a key={idx} href={link[1]} className="text-xs text-blue-500 block">{link[0]}</a>
            ))}
          </div>
          <button 
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-100"
          onClick={() => setFormType("socials")}
          >
            Update links
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="font-semibold text-gray-700">Portfolio Analytics</p>
          <p className="text-xs text-gray-500 mt-2">
            (Placeholder for stats, charts, etc.)
          </p>
        </div>
      </aside>
    </div>
  )
}

export default Dashboard
