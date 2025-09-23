import { useState, useEffect } from "react"

import { saveProfile } from "../../../utils/profile"

const Profile = ({ userData, setUserData }) => {
  // const [profileData, setProfileData] = useState({
  //   name: "",
  //   email: "",
  //   userName: "",
  //   bio: "",
  //   profileImage: null,
  // })

  return (
    <section className="bg-[#fffaf3] border border-[#f0e0c9] shadow-2xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Profile</h2>
      <p className="mb-6 text-gray-600">
        Hello {userData.name || "Artist"} 👋, let’s set up your public
        dashboard in just a few clicks.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log("Submitting form")
          saveProfile(e, userData)
        }}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label className="block text-gray-700 mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">
            Username (hidden from public):
          </label>
          <input
            type="text"
            name="username"
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">
            Upload your Profile Image:
          </label>
          <input
            type="file"
            name="profileImage"
            onChange={(e) =>
              setUserData({
                ...userData,
                profileImage: URL.createObjectURL(e.target.files[0]),
              })
            }
            className="block w-full text-gray-600"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Bio:</label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={(e) =>
              setUserData({ ...userData, bio: e.target.value })
            }
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition"
        >
          Save Profile
        </button>
      </form>
    </section>


  )
}

export default Profile

