const url = import.meta.env.VITE_URL || "http://localhost:3000"


const getArtwork = async (artworks) => {
  const response = await fetch(`${url}/artworks`, {
    method: "GET",
    credentials: "include",
  })
  const jsonResponse = await response.json()
  return jsonResponse.artworks
}

export default getArtwork