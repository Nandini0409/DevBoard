const cloudConfig = require('./cloudinaryConfig')
const streamifier = require('streamifier')

const uploadToCloud = async (file) => {
  
    return new Promise((resolve, reject) => {
      const uploadStream = cloudConfig.uploader.upload_stream(
      { resource_type: 'image', folder: 'profile_images' },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })
}

module.exports = uploadToCloud