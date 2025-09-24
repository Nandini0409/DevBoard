// const AddArtworks = () => {
//   const uploadArtwork = async (e) => {
//     e.preventDefault()
//     const formdata = new FormData(e.target)
//     const response = await fetch('http://localhost:3000/api/artwork', {
//       method: 'POST',
//       body: formdata,
//       credentials: 'include',
//     })
//     const data = await response.json()
//     console.log(data)
//     if(data.status===201){
//       alert("artwork upload.")
//     }
//   }  

//   return(
//     <>
//     <section id="artworks">
//         <h2>Your Artworks</h2>
//         <form onSubmit={uploadArtwork} encType="multipart/form-data">
//           <div>
//             <label htmlFor="artwork">Upload your Artwork:</label>
//             <input type="file" name="artwork"/>
//           </div>
//           <div>
//             <label htmlFor="title">Title:</label>
//             <input type="text" id="title" name="title" required/>
//           </div>
//           <div>
//             <label htmlFor="description">Description:</label>
//             <textarea id="description" name="description" required></textarea>
//           </div>
//           <button type="submit">Save</button>
//         </form>
//         <button>+</button>
//       </section>
//     </>
//   )
// }

// export default AddArtworks



import { useState } from "react";

const Artworks = (artworks, setArtworks) => {
  const [preview, setPreview] = useState(null)
  const [artworkData, setArtworkData] = useState({
    title: "",
    description: "",
    artwork: null,
  })

  const uploadArtwork = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target)
    console.log(...formdata)
    const response = await fetch(`${import.meta.env.VITE_URL}/artworks`, {
      method: "POST",
      body: formdata,
      credentials: "include",
    })
    const data = await response.json()
    console.log(data)
    if (data.status === 201) {
      alert("Artwork uploaded.")
      setArtworks([...artworks, data.artwork])
      setPreview(null)
      setArtworkData({
        title: "",
        description: "",
        artwork: null,
      })
    }
  }

  return (
    <section
      id="artworks"
      className="bg-white shadow-lg rounded-2xl p-6 mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Artworks</h2>

      <form
        onSubmit={uploadArtwork}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label className="block text-gray-700 mb-1">Upload Artwork:</label>
          <input
            type="file"
            name="artwork"
            onChange={(e) => {
              setPreview(URL.createObjectURL(e.target.files[0]))
              setArtworkData({ ...artworkData, artwork: e.target.files[0] })
            }
            }
            required
            className="block w-full text-gray-600"
          />
          {preview && (
            <div className="mt-3 w-40 h-40 rounded-xl overflow-hidden shadow-md border border-gray-200">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block text-gray-700 mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e)=>setArtworkData({...artworkData, title: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            required
            onChange={(e)=>setArtworkData({...artworkData, description: e.target.value})}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition"
        >
          Save Artwork
        </button>
      </form>
    </section>
  )
}

export default Artworks
