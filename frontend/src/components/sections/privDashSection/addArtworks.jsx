const AddArtworks = () => {
  const uploadArtwork = async (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    const response = await fetch('http://localhost:3000/api/artwork', {
      method: 'POST',
      body: formdata,
      credentials: 'include',
    })
    const data = await response.json()
    console.log(data)
    if(data.status===201){
      alert("artwork upload.")
    }
  }  

  return(
    <>
    <section id="artworks">
        <h2>Your Artworks</h2>
        <form onSubmit={uploadArtwork} encType="multipart/form-data">
          <div>
            <label htmlFor="artwork">Upload your Artwork:</label>
            <input type="file" name="artwork"/>
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required/>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" required></textarea>
          </div>
          <button type="submit">Save</button>
        </form>
        <button>+</button>
      </section>
    </>
  )
}

export default AddArtworks