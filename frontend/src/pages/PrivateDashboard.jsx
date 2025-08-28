const PrivateDashboard = () => {
  return (
    <>
      <section id="aboutArtisan">
        <p>Hello Nandini! let's setup your public dashboard in just few clicks.</p>
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
      </section>

      <section id="artworks">
        <h2>Your Artworks</h2>
        <form>
          <div>
            <label htmlFor="artworkUpload">Upload your Artwork:</label>
            <input type="file" />
          </div>
          <button>Add More</button>
          <button type="submit">Save</button>
        </form>
      </section>

      <section id="socialLinks">
        <h2>Your Social Links</h2>
        <form>
          <div>
            <label htmlFor="twitter">Twitter:</label>
            <input type="text" name="twitter" />
          </div>
          <div>
            <label htmlFor="instagram">Instagram:</label>
            <input type="text" name="instagram" />
          </div>
          <div>
            <label htmlFor="linkedin">LinkedIn:</label>
            <input type="text" name="linkedin" />
          </div>
          <button type="submit">Save</button>
        </form>
      </section>

      <section id="contact">
        <h2>Your Contact Information</h2>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input type="text" name="phone" />
          </div>
          <button type="submit">Save</button>
        </form>
      </section>
    </>
  )
}

export default PrivateDashboard