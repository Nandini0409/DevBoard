const AddArtworks = () => {
  return(
    <>
    <section id="artworks">
        <h2>Your Artworks</h2>
        <form>
          <div>
            <label htmlFor="artworkUpload">Upload your Artwork:</label>
            <input type="file" multiple/>
          </div>
          <button type="submit">Save</button>
        </form>
      </section>
    </>
  )
}

export default AddArtworks