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
    console.log(profileData)
    const response = await fetch('http://localhost:3000/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(profileData)
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
        setProfileData({...jsonResponse.user})
      }
      else if(response.status === 401){
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
    <section id="aboutArtisan">
      <h2>Your Profile</h2>
      <form onSubmit={saveProfile}>
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
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            readOnly
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            name="username"
            value={profileData.userName}
            onChange={(e) => setProfileData({ ...profileData, userName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="name">Bio:</label>
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