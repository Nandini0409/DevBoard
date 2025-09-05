// import { useEffect, useState } from "react"

// const AboutArtisan = () => {
//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     userName: "",
//     bio: ""
//   })


//   const saveProfile = async (e) => {
//     e.preventDefault()
//     const formData = new FormData(e.target)
//     formData.forEach((value, key) => {
//       console.log(key, value)
//     })
//     console.log(profileData)
//     const response = await fetch('http://localhost:3000/api/profile', {
//       method: 'PUT',
//       credentials: 'include',
//       body: formData
//     })
//     const jsonResponse = await response.json()
//     console.log(jsonResponse)
//     alert(jsonResponse.message)
//   }

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const response = await fetch('http://localhost:3000/api/profile', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include'
//       })
//       const jsonResponse = await response.json()
//       console.log(jsonResponse)
//       if (response.status === 200) {
//         setProfileData({ ...jsonResponse.user })
//       }
//       else if (response.status === 401) {
//         const refreshResponse = await fetch('http://localhost:3000/refresh', {
//           method: 'GET',
//           credentials: 'include'
//         })
//         const refreshJson = await refreshResponse.json()
//         console.log(refreshJson)
//       }
//     }
//     fetchProfile()
//   }, [])

//   return (
//     <>



//       <section id="aboutArtisan">
//         <p>Hello {profileData.name} let's setup your public dashboard in just few clicks.</p>
//         <h2>Your Profile</h2>
//         <form onSubmit={saveProfile} enctype="multipart/form-data">

//           <div>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={profileData.name}
//               onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
//             />
//           </div>

//           <div>
//             <label htmlFor="name">Username:(This won't be shown in your public profile)</label>
//             <input
//               type="text"
//               name="username"
//               value={profileData.userName}
//               onChange={(e) => setProfileData({ ...profileData, userName: e.target.value })}
//             />
//           </div>

//           <div>
//             <label htmlFor="profileImage">Upload your Image:(Makes your profile look professional)</label>
//             <input type="file" name="profileImage" />
//             <button>Update profile</button>
//           </div>

//           <div>
//             <label htmlFor="bio">Bio:</label>
//             <input
//               type="text"
//               name="bio"
//               value={profileData.bio}
//               onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
//             />
//           </div>

//           <button type="submit">Save Profile</button>
//         </form>
//       </section>
//     </>
//   )
// }

// export default AboutArtisan




import { useEffect, useState } from "react";

const AboutArtisan = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    userName: "",
    bio: "",
    profileImage: null,
  });

  const saveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Submitting:", profileData);

    const response = await fetch("http://localhost:3000/api/profile", {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    const jsonResponse = await response.json();
    alert(jsonResponse.message);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const jsonResponse = await response.json();
      if (response.status === 200) {
        setProfileData({ ...jsonResponse.user });
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Form Section */}
      <section className="bg-[#fffaf3] border border-[#f0e0c9] shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Profile</h2>
        <p className="mb-6 text-gray-600">
          Hello {profileData.name || "Artist"} 👋, let’s set up your public
          dashboard in just a few clicks.
        </p>

        <form
          onSubmit={saveProfile}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
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
              value={profileData.userName}
              onChange={(e) =>
                setProfileData({ ...profileData, userName: e.target.value })
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
                setProfileData({
                  ...profileData,
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
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
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

      {/* Preview Section */}
      <section className="bg-[#fffaf3] border border-[#f0e0c9] shadow-2xl rounded-2xl p-6 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Live Preview
        </h2>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-400 mb-4">
          {profileData.profileImage ? (
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-800">
          {profileData.name || "Your Name"}
        </h3>
        <p className="text-gray-500 italic mb-2">
          @{profileData.userName || "username"}
        </p>
        <p className="text-gray-600">{profileData.bio || "Your short bio"}</p>
      </section>
    </div>
  );
};

export default AboutArtisan;


// <section
//   id="aboutArtisan" gradient-to-br from-orange-50 to-red-100
//   className="max-w-4xl mx-auto mt-12 bg-white rounded-3xl shadow-xl overflow-hidden"
// >
//   <div className="grid grid-cols-1 md:grid-cols-2">
//     {/* Left - Profile Image */}
//     <div className="flex flex-col items-center justify-center bg-[#fcf8f1] p-8">
//       <div className="relative">
//         <img
//           src={
//             profileData.profileImage
//               ? URL.createObjectURL(profileData.profileImage)
//               : "/default-avatar.png"
//           }
//           alt="Profile"
//           className="h-40 w-40 rounded-full object-cover border-4 border-red-300 shadow-md"
//         />
//         <label className="absolute bottom-2 right-2 bg-red-500 text-white px-3 py-1 text-xs rounded-full cursor-pointer hover:bg-red-600 transition">
//           Upload
//           <input
//             type="file"
//             name="profileImage"
//             className="hidden"
//             onChange={(e) =>
//               setProfileData({
//                 ...profileData,
//                 profileImage: e.target.files[0],
//               })
//             }
//           />
//         </label>
//       </div>
//       <p className="mt-4 text-gray-600 text-sm text-center">
//         A good profile photo makes your dashboard more professional ✨
//       </p>
//     </div>

//     {/* Right - Form */}
//     <div className="p-10">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">
//         Set Up Your Profile
//       </h2>

//       <form onSubmit={saveProfile} className="space-y-6">
//         {/* Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={profileData.name}
//             onChange={(e) =>
//               setProfileData({ ...profileData, name: e.target.value })
//             }
//             className="mt-2 w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-400"
//           />
//         </div>

//         {/* Username */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Username{" "}
//             <span className="text-gray-400 text-xs">
//               (Not visible on your public profile)
//             </span>
//           </label>
//           <input
//             type="text"
//             name="username"
//             value={profileData.userName}
//             onChange={(e) =>
//               setProfileData({ ...profileData, userName: e.target.value })
//             }
//             className="mt-2 w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-400"
//           />
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Bio</label>
//           <textarea
//             name="bio"
//             rows="3"
//             value={profileData.bio}
//             onChange={(e) =>
//               setProfileData({ ...profileData, bio: e.target.value })
//             }
//             className="mt-2 w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-400"
//           />
//         </div>

//         {/* Save Button */}
//         <button
//           type="submit"
//           className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl py-3 shadow-lg transition"
//         >
//           Save Profile
//         </button>
//       </form>
//     </div>
//   </div>
// </section>