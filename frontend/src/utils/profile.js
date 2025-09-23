const url = import.meta.env.VITE_URL || "http://localhost:3000"

const saveProfile = async (e, userData) => {
  console.log("Form data:", e.target)
  const formData = new FormData(e.target)
  console.log("Submitting:", userData)

  const response = await fetch(`${url}/users/profile`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  })

  const jsonResponse = await response.json()
  alert(jsonResponse.message)
}

const getProfile = async () => {
  const response = await fetch(`${url}/users/profile`, {
    method: "GET",
    credentials: "include",
  })
  const jsonResponse = await response.json()
  return jsonResponse.user
}

export { saveProfile, getProfile }