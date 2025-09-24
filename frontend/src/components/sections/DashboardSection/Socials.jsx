import { useState, useEffect } from "react"

const Socials = ({ userData, setUserData }) => {
  console.log(userData)
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    linkedin: "",
    website: "",  
    behance: "",
    dribbble: "",
    workemail: "",
  })

    useEffect(() => {
    if (userData?.socialLinks) {
      setSocialLinks(userData.socialLinks)
    }
  }, [userData])


  const updateSocialLinks = async (e) => {
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_URL}/users/socials`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(socialLinks),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok) {
      alert("Error updating socials")
      return
    }
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    setUserData(prev => ({ ...prev, socialLinks }))
  }

  return (
    <>
      <section id="contact">
        <h2>Your Social profiles</h2>
        <form onSubmit={updateSocialLinks} >
          <div>
            <label htmlFor="instagram">Instagram</label>
            <input
              type="text"
              id="instagram"
              onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
              value={socialLinks.instagram || ""}
              name="instagram"
              placeholder="Instagram URL"
            />
          </div>
          <div>
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="text"
              id="linkedin"
              onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
              value={socialLinks?.linkedin||""}
              name="linkedin"
              placeholder="LinkedIn URL"
            />
          </div>
          <div>
            <label htmlFor="behance">Behance</label>
            <input
              type="text"
              id="behance"
              onChange={(e) => setSocialLinks({...socialLinks, behance: e.target.value})}
              value={socialLinks?.behance||""}
              name="behance"
              placeholder="Behance URL"
            />
          </div>
          <div>
            <label htmlFor="dribble">Dribble</label>
            <input
              type="text"
              id="dribble"
              onChange={(e) => setSocialLinks({...socialLinks, dribble: e.target.value})}
              value={socialLinks?.dribble||""}
              name="dribble"
              placeholder="Dribble URL"
            />
          </div>
          <div>
            <label htmlFor="workemail">Work Email</label>
            <input
              type="email"
              id="workemail"
              onChange={(e) => setSocialLinks({...socialLinks, workemail: e.target.value})}
              value={socialLinks?.workemail||""}
              name="workemail"
              placeholder="Work Email"
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              onChange={(e) => setSocialLinks({...socialLinks, website: e.target.value})}
              value={socialLinks?.website||""}
              name="website"
              placeholder="Website URL"
            />
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Socials