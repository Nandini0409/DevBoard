import { useEffect, useState } from "react"

const AboutArtisan = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    userName: "",
    bio: ""
  })


  const saveProfile = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.forEach((value, key) => {
      console.log(key, value)
    })
    console.log(profileData)
    const response = await fetch('http://localhost:3000/api/profile', {
      method: 'PUT',
      credentials: 'include',
      body: formData
    })
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    alert(jsonResponse.message)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      if (response.status === 200) {
        setProfileData({ ...jsonResponse.user })
      }
      else if (response.status === 401) {
        const refreshResponse = await fetch('http://localhost:3000/refresh', {
          method: 'GET',
          credentials: 'include'
        })
        const refreshJson = await refreshResponse.json()
        console.log(refreshJson)
      }
    }
    fetchProfile()
  }, [])

  return (
    <>

      {/* <section id="aboutArtisan">
        <h2>Your Profile</h2>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" />
          </div>
          <div>
            <label htmlFor="fileUpload">Upload your Image:</label>
            <input type="file" />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <input type="text" name="bio" />
          </div>
          <button type="submit">Save</button>
        </form>
      </section> */}

      <section id="aboutArtisan">
        <p>Hello {profileData.name} let's setup your public dashboard in just few clicks.</p>
        <h2>Your Profile</h2>
        <form onSubmit={saveProfile} enctype="multipart/form-data">

          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="name">Username:(This won't be shown in your public profile)</label>
            <input
              type="text"
              name="username"
              value={profileData.userName}
              onChange={(e) => setProfileData({ ...profileData, userName: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="profileImage">Upload your Image:(Makes your profile look professional)</label>
            <input type="file" name="profileImage" />
            {/* preview of image to be shown here */}
            <button>Update profile</button>
          </div>

          <div>
            <label htmlFor="bio">Bio:</label>
            <input
              type="text"
              name="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            />
          </div>

          <button type="submit">Save Profile</button>
        </form>
      </section>
    </>
  )
}

export default AboutArtisan