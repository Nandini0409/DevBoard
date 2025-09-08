import { useState } from "react"
import { HomeIcon, UserIcon, PhotoIcon, LinkIcon } from "@heroicons/react/24/solid"

import AboutArtisan from "../components/sections/DashboardSection/aboutArtisan"
import SocialLinks from "../components/sections/DashboardSection/addSocials"
import AddArtworks from "../components/sections/DashboardSection/addArtworks"

const Dashboard = () => {
  const [formType, setFormType] = useState("artworks");

  return (
    <div className="flex w-screen min-h-screen bg-gray-50">

      <aside className="w-[15%] bg-white shadow-md flex flex-col justify-between items-center py-6">
        <div className="flex flex-col items-center gap-4">
          <a href="/">
            <img width={70} src="/images/logo3.png" alt="logo" />
          </a>
        </div>

        <nav className="flex flex-col gap-4 w-full px-4">
          <button
            onClick={() => setFormType("artworks")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
              formType === "artworks"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </button>

          <button
            onClick={() => setFormType("profile")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
              formType === "profile"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <UserIcon className="h-5 w-5" />
            Profile
          </button>

          <button
            onClick={() => setFormType("artworkForm")}
            className={`px-3 flex py-2 gap-2 items-center rounded-lg text-sm font-medium transition ${
              formType === "artworkForm"
              ? "bg-black text-white"
              : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <PhotoIcon className="h-5 w-5" />
            Artwork
          </button>

          <button
            onClick={() => setFormType("socials")}
            className={`py-2 flex px-3 gap-2 items-center rounded-lg text-sm font-medium transition ${
              formType === "socials"
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
            <img width={100} src="/images/helpCenterIcon2.png" alt="help icon" />
          </a>
          <p className="text-xs text-gray-500 text-center px-3">
            Do you have any problem while using EAZL?
          </p>
        </div>
      </aside>

      <main className="w-[60%] p-6 bg-gray-100 overflow-y-auto">
        {formType === "artworks" ? (
          <div>

            <h1 className="text-2xl text-center">Your Artworks</h1>
          <div className="grid grid-cols-3 gap-6">
            {["artwork1", "artwork2", "artwork3"].map((art, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-3 flex flex-col gap-2"
              >
                <img
                  src={`/images/${art}.png`}
                  width={250}
                  height={200}
                  alt="title"
                  className="rounded-lg"
                />
                <p className="font-semibold text-sm">Title</p>
                <p className="text-xs text-gray-500">Description</p>
              </div>
            ))}
            </div>
          </div>
        ) : null}

        {formType === "profile" && <AboutArtisan />}
        {formType === "artworkForm" && <AddArtworks />}
        {formType === "socials" && <SocialLinks />}
      </main>





      <aside className="w-[25%] bg-white shadow-md p-6 flex flex-col gap-6">
        <div className="bg-gray-50 rounded-xl p-4 text-center flex flex-col gap-3">
          <img
            src="/images/userImage.png"
            alt="user"
            className="w-20 h-20 rounded-full mx-auto"
          />
          <p className="font-semibold">Name</p>
          <p className="text-gray-500 text-sm">@username</p>
          <p className="text-xs text-gray-600">About user</p>
          <button className="bg-black text-white rounded-lg px-4 py-2 text-sm hover:bg-gray-800">
            Update profile
          </button>
          <p className="text-xs text-gray-500">Links user has added</p>
          <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-100">
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
