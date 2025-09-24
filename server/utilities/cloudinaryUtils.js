const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const uploadToCloud = async (file, folder) => {
  console.log("Uploading file to Cloudinary:", file)
  if (!file || !file.buffer) {
    throw new Error("File buffer is missing.");
  }
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image', folder: folder },
      (error, result) => {
        if (error) {
          console.log("Cloudinary upload error:", error)
          return reject(error)
        }
        resolve(result)
      }
    )
    streamifier.createReadStream(file.buffer).pipe(uploadStream)
  })
}

const deleteFromCloud = async (public_id) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudConfig.uploader.destroy(public_id, (error, result)=>{
        if(error){
          console.log(error)
        }
        console.log(result)
      })
    })
  }

module.exports = {uploadToCloud, deleteFromCloud}
