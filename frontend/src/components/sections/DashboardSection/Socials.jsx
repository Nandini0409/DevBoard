import { useState } from "react"

const Socials = ({ userData, setUserData }) => {
  // const [socialLinks, setSocialLinks] = useState({
  //   instagram: "",
  //   linkedin: "",
  //   website: "",  
  //   behance: "",
  //   dribbble: "",
  //   workemail: "",
  // })
  console.log(userData.socialLinks)
  const updateSocialLinks = async (e) => {
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_URL / users / socials}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(userData.socialLinks),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const jsonResponse = await response.json()
    console.log(jsonResponse)

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
              onChange={(e) => setUserData({
                ...userData,
                socialLinks: {
                  ...userData.socialLinks,
                  instagram: e.target.value || ""
                }
              })}
              value={userData.socialLinks.instagram || ""}
              name="instagram"
              placeholder="Instagram URL"
            />
          </div>
          <div>
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="text"
              id="linkedin"
              onChange={(e) => setUserData({
                ...userData,
                socialLinks: {
                  ...userData.socialLinks,
                  linkedin: e.target.value || ""
                }
              })}
              value={userData.socialLinks.linkedin || ""}
              name="linkedin"
              placeholder="LinkedIn URL"
            />
          </div>
          <div>
            <label htmlFor="behance">Behance</label>
            <input
              type="text"
              id="behance"
              onChange={(e) => setUserData({
                ...userData,
                socialLinks: {
                  ...userData.socialLinks,
                  behance: e.target.value || ""
                }
              })}
              value={userData.socialLinks.behance || ""}
              name="behance"
              placeholder="Behance URL"
            />
          </div>
          <div>
            <label htmlFor="dribbble">Dribble</label>
            <input
              type="text"
              id="dribble"
              onChange={(e) => setUserData({
                ...userData,
                socialLinks: {
                  ...userData.socialLinks,
                  dribble: e.target.value || ""
                }
              })}
              value={userData.socialLinks.dribble || ""}
              name="dribble"
              placeholder="Dribble URL"
            />
          </div>
          <div>
            <label htmlFor="workemail">Work Email</label>
            <input
              type="email"
              id="workemail"
              onChange={(e) => setUserData({
                ...userData,
                socialLinks: {
                  ...userData.socialLinks,
                  workemail: e.target.value || ""
                }
              })}
              value={userData.socialLinks.workemail || ""}
              name="workemail"
              placeholder="Work Email"
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              onChange={(e) => setUserData({
                ...userData,
                socialLinks: {
                  ...userData.socialLinks,
                  website: e.target.value || ""
                }
              })}
              value={userData.socialLinks.website || ""}
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